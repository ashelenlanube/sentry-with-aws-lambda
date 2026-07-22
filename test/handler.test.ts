import { APIGatewayProxyEventV2 } from "aws-lambda";
import { main } from "../src/lambdas/handler";

describe("Lambda handler", () => {
  it("returns a successful response with the request ID", async () => {
    const event = {
      requestContext: {
        requestId: "request-123",
      },
      queryStringParameters: null,
    } as unknown as APIGatewayProxyEventV2;
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    const response = await main(event);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Hello World from Lambda!",
        eventId: "request-123",
      }),
    });
    expect(logSpy).toHaveBeenCalledWith("Event: ", "request-123");

    logSpy.mockRestore();
  });

  it("throws an error when called with error=true", async () => {
    const event = {
      requestContext: {
        requestId: "request-456",
      },
      queryStringParameters: {
        error: "true",
      },
    } as unknown as APIGatewayProxyEventV2;

    await expect(main(event)).rejects.toThrow(
      "Oops, something went wrong in the lambda!",
    );
  });
});
