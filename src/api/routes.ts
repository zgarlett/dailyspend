import { LambdaToolkit, ProxyGatewayHandler } from '@tfs-code/lambda';
import { GetBalance, UpdateBalance, UpdateBalances } from '../functions/balance';
import { GetLastRunDate, UpdateLastRunDate } from '../functions/lastRun';
export const Toolkit = LambdaToolkit('DailySpend');
const routeHandler = Toolkit.manifestHandler(ProxyGatewayHandler);

export const handler = routeHandler({
  v1: {
    dynamodb: {
      lastRunDate: {
        get: GetLastRunDate,
        post: UpdateLastRunDate
      },
      balance: {
        get: GetBalance,
        post: UpdateBalance,
      },
      multipleBalances: {
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