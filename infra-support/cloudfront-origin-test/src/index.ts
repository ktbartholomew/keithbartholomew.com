import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  if (
    !event.headers["x-cloudfront-key"] ||
    event.headers["x-cloudfront-key"] !== process.env.CLOUDFRONT_KEY
  ) {
    return { statusCode: 403 };
  }

  console.log(`handling request: ${JSON.stringify(event)}`);

  const response = {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      message: "Hello from Lambda!",
      userLocation: `${event.headers["cloudfront-viewer-city"]}, ${event.headers["cloudfront-viewer-country-region"]} ${event.headers["cloudfront-viewer-postal-code"]}`,
    }),
  };
  return response;
};
