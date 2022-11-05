import MyStack from "./MyStack";
import * as sst from "@serverless-stack/resources";
import ResourceStack from "./ResourceStack";

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    srcPath: "src",
    runtime: "nodejs16.x",
    permissions: ['ssm:GetParameter', 'ssm:PutParameter'],
  });

  const resourceStack = new ResourceStack(app, "resources");
  new MyStack(app, "main", {
    rds: resourceStack.GetRDS(),
  });

}
