import { CloudFrontRequestEvent } from "aws-lambda";

export const handler = async (event: CloudFrontRequestEvent) => {
  const request = event.Records[0].cf.request;
  const uri = request.uri;

  console.log(`handling request ${JSON.stringify(request)}`);

  // Check whether the URI is missing a file name.
  if (uri.endsWith("/") || uri === "") {
    request.uri += "index.html";
  }
  // Check whether the URI is missing a file extension.
  else if (!uri.includes(".")) {
    request.uri += "/index.html";
  }

  return request;
};
