import { CompositeAPIEvent, LambdaLogger } from "@tfs-code/lambda";
import { BalanceData } from "@types";
import { join } from "path";
import { SqlParameter } from '@aws-sdk/client-rds-data';
import { rdsHelper } from "../../api/routes";

export const SelectBalance = async (logger: LambdaLogger, event: CompositeAPIEvent) => {
    const result = await rdsHelper.runCommand('SELECT * FROM balance');
    logger.info({ result });
    return {
        statusCode: typeof result === 'object' ? 200 : 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
    };
};

export const InsertBalance = async (logger: LambdaLogger, event: CompositeAPIEvent) => {
    if (!(event.queryStringParameters && event.queryStringParameters.date)) {
        throw new Error('Missing date parameter');
    }

    if (!event.queryStringParameters.balance) {
        throw new Error('Missing balance parameter');
    }

    const { date = '', balance = '' } = event.queryStringParameters;
    const query = `INSERT INTO balance (date, balance) VALUES (str_to_date( '${date}', '%Y-%m-%d') , ${balance})`;
    const result = await rdsHelper.runCommand(query);

    return {
        statusCode: result ? 200 : 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramerters: { date, balance }, query, rowsAffected: 1 }),
    };
};

export const InsertBalances = async (logger: LambdaLogger, event: CompositeAPIEvent) => {

    logger.info({ event });
    logger.info('InsertBalances');
    if (!event.body) {
        throw new Error('Missing body');
    }

    const body = JSON.parse(event.body) as BalanceData[];

    if (!Array.isArray(body)) {
        throw new Error('Body is not an array');
    }

    const sqlCommands = body.map((item: BalanceData) => {
        const { date, balance } = item;
        return `INSERT INTO balance (date, balance) VALUES (str_to_date( '${date}', '%Y-%m-%d') , ${balance})`;
    });
    logger.info({ sqlCommands });
    try {
        const result = await rdsHelper.runCommands(sqlCommands);
        logger.info({ result });
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...result }),
        };
    } catch (error) {
        logger.error({ error })
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: error.message }),
        };

    }
};

export const BatchInsert = async (logger: LambdaLogger, event: CompositeAPIEvent) => {

    if (!event.body) {
        throw new Error('Missing body');
    }

    const body = JSON.parse(event.body) as BalanceData[];

    if (!Array.isArray(body)) {
        throw new Error('Body is not an array');
    }

  

    const sql = `INSERT INTO balance (date, balance) VALUES ( :date , :balance)`;
    const parameters: SqlParameter[][] = body.map((item: BalanceData) => { 
        const { date, balance } = item;
        return [{ name: 'date', value: { stringValue: date }, typeHint: 'DATE' }, { name: 'balance', value: { longValue: +balance } }];
    });
    logger.info({ parameters });
    try {
        const result = await rdsHelper.runBatch(sql, parameters);
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...result }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error }),
        };

    }
};