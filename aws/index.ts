import MyStack from "./MyStack";
import * as sst from "@serverless-stack/resources";
import ResourceStack from "./ResourceStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    srcPath: "src",
    runtime: "nodejs14.x"
  });

  const resourceStack = new ResourceStack(app, "resources");
  new MyStack(app, "main", {
    rds: resourceStack.GetRDS(),
  });
  

  //const website = new
  // Add more stacks
}
