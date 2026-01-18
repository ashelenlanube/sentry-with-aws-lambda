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

    // Definimos la Lambda
    const mySentryLambda = new NodejsFunction(this, "SentryExampleFunction", {
      functionName: "sentry-example-lambda",
      runtime: Runtime.NODEJS_20_X, // Usa siempre versiones LTS recientes
      entry: path.join(__dirname, "../src/lambdas/handler.ts"), // Ruta al archivo de la Lambda
      handler: "handler",
      environment: {
        // Pasamos el DSN como variable de entorno
        // RECOMENDACIÓN: En producción, usa AWS Secrets Manager o SSM Parameter Store
        SENTRY_DSN: config.SENTRY_DSN,
      },
    });
  }
}
