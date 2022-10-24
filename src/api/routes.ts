import { DynamoHelper, LambdaToolkit, ProxyGatewayHandler } from '@tfs-code/lambda';
import { GetBalance, UpdateBalance, UpdateBalances } from '../functions/dynamo/balance';
import { GetLastRunDate, UpdateLastRunDate } from '../functions/dynamo/lastRun';
export const Toolkit = LambdaToolkit('DailySpend');
const routeHandler = Toolkit.manifestHandler(ProxyGatewayHandler);
export const dbHelper = Toolkit.manifestHelper(DynamoHelper);

export const handler = routeHandler({
  v1: {
    dynamodb: {
      lastRunDate: {
        get: GetLastRunDate,
        post: UpdateLastRunDate
      },
      balance: {
        get: GetBalance,
        post: UpdateBalances
      }
    },
    rds: {
      balance: {
        get: GetBalance,
        post: UpdateBalance,
      },
      multipleBalances: {
        post: UpdateBalances
      }
    }
  }
});