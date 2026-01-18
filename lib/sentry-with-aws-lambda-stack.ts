import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("node:path");
import { getConfig } from "./config/config";

export class SentryWithAwsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const config = getConfig();

    // Defining the lambda
    const mySentryLambda = new NodejsFunction(this, "SentryExampleFunction", {
      functionName: "sentry-example-lambda",
      runtime: Runtime.NODEJS_20_X, // Use always the latest LTS version
      entry: path.join(__dirname, "../src/lambdas/handler.ts"), // Path to your lambda handler
      handler: "handler",
      environment: {
        // Pass SENTRY_DSN as an environment variable
        // RECOMMENDED: Use AWS Secrets Manager or AWS Systems Manager Parameter Store for production
        SENTRY_DSN: config.SENTRY_DSN,
      },
    });
  }
}
