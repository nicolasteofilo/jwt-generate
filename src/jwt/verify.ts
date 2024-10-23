import { generateSignature } from "./utils/generateSignature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

interface IVerifyResponse {
  iat: number;
  exp: number;
  sub: string;
  [key: string]: any;
}

export function verify({
  token,
  secret,
}: IVerifyOptions): IVerifyResponse {
  const [headerSent, payloadSent, signatureSent] = token.split(".");

  const signature = generateSignature({
    headerBase64URL: headerSent,
    payloadBase64URL: payloadSent,
    secret,
  });

  if (signature !== signatureSent) {
    throw new Error("Invalid JWT token.");
  }

  const decodedPaylod: IVerifyResponse = JSON.parse(
    Buffer.from(payloadSent, "base64url").toString("utf-8")
  );

  const exp = decodedPaylod.exp;

  if (!exp) {
    throw new Error("Expiration date not provided.");
  }

  if (exp < Date.now()) {
    throw new Error("Expired token.");
  }

  return decodedPaylod;
}
