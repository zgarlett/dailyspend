import * as sst from '@serverless-stack/resources';

type MyStackProps = {
    rds: sst.RDS;
} & sst.StackProps;
export default class MyStack extends sst.Stack {
    constructor(scope: sst.App, id: string, props: MyStackProps) {
        super(scope, id, props);

        // Create a HTTP API
        const api = new sst.Api(this, 'DailySpendRestApi', {
            defaults: {
                function: {
                    functionName: 'ApiBalanceFunction',
                    environment: {
                        resourceArn: props.rds.clusterArn,
                        secretArn: props.rds.secretArn,
                        database: props.rds.defaultDatabaseName
                    }
                }
            },
            routes: {
                $default: 'api/routes.handler',
            },
        });

        const balanceTable = new sst.Table(this, 'Balance', {
            fields: {
                date: 'string',
                balance: 'number',
            },
            primaryIndex: { partitionKey: 'balance', sortKey: 'date' },
            
        });

        const lastRunDateTable = new sst.Table(this, 'LastRunDate', {
            fields: {
                lastRunDate: 'string'
            },
            primaryIndex: { partitionKey: 'lastRunDate'},
        });

        api.attachPermissions([balanceTable, lastRunDateTable, props.rds]);
        // Show the endpoint in the output
        this.addOutputs({
            ApiEndpoint: api.url,
            BalanceTable: balanceTable.tableName,
            LastRunDateTable: lastRunDateTable.tableName,
        });
    }
}
