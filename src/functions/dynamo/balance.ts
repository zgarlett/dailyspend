import { CompositeAPIEvent, DynamoHelper, LambdaLogger } from "@tfs-code/lambda";
import { ApiResponse } from '@types';
import { dbHelper, Toolkit } from "../../api/routes";
const TableName = 'dev-dailyspend-Balance';
export const GetBalance = async (logger: LambdaLogger, event: CompositeAPIEvent) => {
    const lastRunDate = await dbHelper.ScanTable(
        { TableName }
    );

    logger.info({ lastRunDate });

    if (lastRunDate.Items) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lastRunDate.Items),
        };
    }

    return {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'No Items!',
    };
};

export const UpdateBalances = async (logger: LambdaLogger, event: CompositeAPIEvent) => {
    const listOfBalances = EventValidation(event);
    if (!Array.isArray(listOfBalances)) {
        return listOfBalances as ApiResponse;
    }
    const promises: any[] = [];
    for (const item of listOfBalances) {
        if(Number.isNaN(+item.balance)){
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Balance is not a number',
            };
        }
        promises.push(dbHelper.CreateItem({ TableName, Item: { date: new Date(item.date).toISOString(), balance: +item.balance } }));
    }

    const answer = await Promise.all(promises);

    logger.info({ answer });
    return {
        statusCode: answer[0].$metadata.httpStatusCode === 200 ? 200 : 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answer),
    };

}

export const UpdateBalance = async (logger: LambdaLogger, event: CompositeAPIEvent) => {
    const dbHelper = Toolkit.manifestHelper(DynamoHelper);
    const balance = ParamertValdation(event);

    if (!(typeof balance === 'number')) {
        return balance as ApiResponse;
    }
    const answer = await dbHelper.CreateItem({ TableName, Item: { date: new Date().toISOString(), balance: +balance } });
    logger.info({ answer });
    return {
        statusCode: answer.$metadata.httpStatusCode === 200 ? 200 : 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'Date Posted': new Date().toISOString(), 'Balance Posted': +balance }),
    };
};

function EventValidation(event: CompositeAPIEvent): ApiResponse | any[] {
    if (!event.body) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'No body parameters',
        };
    }
    const listOfBalances = JSON.parse(event.body);
    if (!Array.isArray(listOfBalances)) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Body is not an array',
        };
    }
    return listOfBalances;
}
function ParamertValdation(event: CompositeAPIEvent): Number | ApiResponse {
    if (!event.queryStringParameters) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'No body parameters',
        };
    }

    if (!event.queryStringParameters.balance) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'No balance parameter',
        };
    }
    const balance = event.queryStringParameters ? event.queryStringParameters.balance : '';
    if (Number.isNaN(+balance)) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Balance is not a number',
        };
    }
    return +balance;
}