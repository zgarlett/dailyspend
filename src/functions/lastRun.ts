import { CompositeAPIEvent, LambdaLogger, DynamoHelper } from "@tfs-code/lambda";
import { Toolkit } from "../api/routes";
const TableName = 'dev-dailyspend-LastRunDate';
export const GetLastRunDate = async (logger: LambdaLogger, event: CompositeAPIEvent) => {
    const dbHelper = Toolkit.manifestHelper(DynamoHelper);
    const lastRunDate = await dbHelper.ScanTable(
        { TableName }
    );

    logger.info({ lastRunDate });

    if(lastRunDate.Items){
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lastRunDate:lastRunDate.Items[lastRunDate.Items.length - 1] }),
        };
    }
    
    return {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'No Items',
    };
};

export const UpdateLastRunDate = async (logger: LambdaLogger, event: CompositeAPIEvent) => {
    const dbHelper = Toolkit.manifestHelper(DynamoHelper);
    const answer = await dbHelper.CreateItem({ TableName, Item: { lastRunDate: new Date().toISOString() } });
    logger.info({ answer });
    return {
        statusCode: answer.$metadata.httpStatusCode === 200 ? 200 : 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'Date Posted': new Date().toISOString()}),
    };
};