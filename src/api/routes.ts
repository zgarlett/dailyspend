import { DynamoHelper, LambdaToolkit, ProxyGatewayHandler } from '@tfs-code/lambda';
import { GetBalance, UpdateBalance, UpdateBalances } from '../functions/dynamo/balance';
import { GetLastRunDate, UpdateLastRunDate } from '../functions/dynamo/lastRun';
import { BatchInsert, InsertBalance, InsertBalances, SelectBalance } from '../functions/rds/index';
import { SSMClient } from "@aws-sdk/client-ssm";
import { RDSHelper } from '@snacpacc/lambda';

const { resourceArn = '', secretArn = '', database = '' } = process.env;

export const Toolkit = LambdaToolkit('DailySpend');
export const dbHelper = Toolkit.manifestHelper(DynamoHelper);
export const ssmClient = new SSMClient({ region: 'us-east-1' });
export const rdsHelper = Toolkit.manifestHelper(RDSHelper, { secretArn, resourceArn, database });

const routeHandler = Toolkit.manifestHandler(ProxyGatewayHandler);
export const handler = routeHandler({
  v1: {
    dynamo: {
      lastRunDate: {
        get: GetLastRunDate,
        post: UpdateLastRunDate
      },
      balance: {
        get: GetBalance,
        post: UpdateBalance      
      },
      multipleBalances: {
        post: UpdateBalances
      }
    },
    rds: {
      balance: {
        get: SelectBalance,
        post: InsertBalance,
      },
      multipleBalances: {
        post: InsertBalances
      },
      batch: {
        post: BatchInsert
      }
    }
  }
});