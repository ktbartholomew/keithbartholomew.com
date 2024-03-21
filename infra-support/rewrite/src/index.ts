import { CloudFrontRequestEvent, CloudFrontRequestHandler } from "aws-lambda";

export const handler: CloudFrontRequestHandler = async (event: CloudFrontRequestEvent) => {
  const e = event.Records[0];
  console.log(`handling request ${JSON.stringify(e)}`);
  const request = e.cf.request;

  // Check whether the URI is missing a file name.
  if (request.uri.endsWith("/") || request.uri === "") {
    request.uri = request.uri.replace(/\/?$/, '/index.html');
  }
  // Check whether the URI is missing a file extension.
  else if (!request.uri.includes(".")) {
    request.uri += "/index.html";
  }

  return request;
};
