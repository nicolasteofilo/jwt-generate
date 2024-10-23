import { createHmac } from "crypto";

interface IGenerateSignatureOptions {
  headerBase64URL: string;
  payloadBase64URL: string;
  secret: string;
}

export function generateSignature(options: IGenerateSignatureOptions) {
  const { headerBase64URL, payloadBase64URL, secret } = options;
  const hmac = createHmac("sha256", secret);

  const signature = hmac
    .update(`${headerBase64URL}.${payloadBase64URL}`)
    .digest("base64url");

  return signature;
}
