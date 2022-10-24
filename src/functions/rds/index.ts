import { CompositeAPIEvent, LambdaLogger } from "@tfs-code/lambda";

export const get = async(logger: LambdaLogger, event: CompositeAPIEvent) => {
    logger.info({ event });
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Hello, World!',
    };
};