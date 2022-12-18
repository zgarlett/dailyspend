import { CompositeAPIEvent, LambdaLogger } from "@tfs-code/lambda";
import { rdsHelper } from "../api/routes";

export const WakeUp = async (logger: LambdaLogger, event: CompositeAPIEvent) => {
    logger.info('WakeUp');
    const result = await rdsHelper.runCommand('SELECT 1');
    logger.info({ result });
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'WakeUp' }),
    };
}