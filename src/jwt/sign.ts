import { generateSignature } from "./utils/generateSignature";
import { objectToBase64URL } from "./utils/objectToBase64URL";

interface ISignOptions {
  data: Record<string, any>;
  exp: number; // ms
  secret: string;
}

export function sign({ data, exp, secret }: ISignOptions) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    ...data,
    iat: Date.now(),
    exp,
  };

  const base64URLEncodedHeader = objectToBase64URL(header);
  const base64URLEncodedPayload = objectToBase64URL(payload);

  const signature = generateSignature({
    headerBase64URL: base64URLEncodedHeader,
    payloadBase64URL: base64URLEncodedPayload,
    secret,
  });

  const token = `${base64URLEncodedHeader}.${base64URLEncodedPayload}.${signature}`;
  return token;
}
