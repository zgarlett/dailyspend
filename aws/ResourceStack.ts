import * as sst from '@serverless-stack/resources';

export default class ResourceStack extends sst.Stack {
    private rds: sst.RDS;
    private web: sst.ViteStaticSite;
    constructor(scope: sst.App, id: string, props?: sst.StackProps) {
        super(scope, id, props);

        this.rds = new sst.RDS(this, 'dailyspend', {
            defaultDatabaseName: 'dailyspend',
            engine: 'mysql5.7',
        });

        this.web = new sst.ViteStaticSite(this, 'Dashboard', {
            path: 'web',
        })

        this.addOutputs({
            RDS: this.rds.defaultDatabaseName,
            Host: this.rds.clusterEndpoint.hostname ,
            Port: this.rds.clusterEndpoint.port.toString(),
            ADDRESS: this.rds.clusterEndpoint.socketAddress,
            Web: this.web.url,
        });
    }

    public GetRDS(){
        return this.rds;
    }

    public GetWeb(){
        return this.web;
    }
}