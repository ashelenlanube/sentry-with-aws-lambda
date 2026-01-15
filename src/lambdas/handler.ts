import * as Sentry from "@sentry/aws-serverless";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

// 1. Initialize Sentry outside of the handler
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1, // Adjust this value in production
});

// 2. Define the main handler function
export const main = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const requestId = event.requestContext.requestId;

  console.log("Event: ", requestId);

  if (event.queryStringParameters?.error === "true") {
    // Simulate an error for testing Sentry integration
    throw new Error("Something went wrong!");
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!",
      eventId: requestId,
    }),
  };
};

// 3. Wrap the main handler with Sentry
export const handler = Sentry.wrapHandler(main);
