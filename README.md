# Sentry with AWS Lambda

A tutorial project demonstrating how to integrate Sentry error tracking with AWS Lambda functions using AWS CDK and TypeScript.

## Overview

This project shows how to:

- Deploy an AWS Lambda function using AWS CDK
- Integrate Sentry for error tracking and monitoring
- Handle errors and send them automatically to Sentry
- Use environment variables for configuration

## Prerequisites

- Node.js 20.x or later
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed (`npm install -g aws-cdk`)
- A Sentry account and DSN (Data Source Name)

## Project Structure

```
.
├── bin/                          # CDK app entry point
├── lib/                          # CDK stack definitions
│   ├── config/                   # Configuration management
│   └── sentry-with-aws-lambda-stack.ts
├── src/
│   └── lambdas/
│       └── handler.ts            # Lambda function handler with Sentry integration
├── cdk.json                      # CDK configuration
└── package.json                  # Project dependencies
```

## Setup

1. **Clone the repository and install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Sentry DSN:

   ```
   SENTRY_DSN="https://your-sentry-dsn@sentry.io/your-project-id"
   ```

   You can find your Sentry DSN in your Sentry project settings.

3. **Bootstrap CDK (first time only):**

   If you haven't used CDK in your AWS account/region before:

   ```bash
   npx cdk bootstrap
   ```

## Deployment

1. **Build the TypeScript code:**

   ```bash
   npm run build
   ```

2. **Review the changes that will be deployed:**

   ```bash
   npx cdk diff
   ```

3. **Deploy the stack to AWS:**

   ```bash
   npx cdk deploy
   ```

4. **After deployment**, CDK will output the Lambda function ARN and other resources created.

## Testing the Lambda Function

The Lambda function includes a test endpoint that can trigger errors:

- **Normal execution**: Invoke the function without parameters to get a successful response
- **Error simulation**: Pass `error=true` as a query parameter to trigger an error that will be captured by Sentry

You can test the function using the AWS Console, AWS CLI, or by setting up API Gateway (not included in this basic example).

## How It Works

1. **Sentry Initialization**: The Lambda handler initializes Sentry outside the handler function (in `src/lambdas/handler.ts`)
2. **Handler Wrapping**: The main handler is wrapped with `Sentry.wrapHandler()` to automatically capture errors
3. **Error Tracking**: Any unhandled errors are automatically sent to Sentry with full context
4. **Environment Configuration**: The Sentry DSN is passed via environment variables from CDK

## Important Notes

- **Production Security**: For production environments, use AWS Secrets Manager or AWS Systems Manager Parameter Store instead of environment variables for sensitive data like the Sentry DSN
- **Trace Sample Rate**: The `tracesSampleRate` is set to `1` (100%) for development. Adjust this value for production to control performance monitoring costs
- **Runtime**: The function uses Node.js 20.x runtime (always use the latest LTS version)

## Cleanup

To remove all deployed resources:

```bash
npx cdk destroy
```

## Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [Sentry AWS Lambda Integration](https://docs.sentry.io/platforms/javascript/guides/aws-lambda/)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
