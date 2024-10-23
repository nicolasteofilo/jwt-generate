import { createHmac } from "node:crypto";

import { objectToBase64URL } from "./utils/objectToBase64URL";

interface ISignOptions {
  data: Record<string, any>;
  exp: number; // ms
  secret: string;
}

export function sign(options: ISignOptions) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    ...options.data,
    iat: Date.now(),
    exp: options.exp,
  };

  const base64URLEncodedHeader = objectToBase64URL(header);
  const base64URLEncodedPayload = objectToBase64URL(payload);

  const hmac = createHmac("sha256", options.secret);

  const signature = hmac
    .update(`${base64URLEncodedHeader}.${base64URLEncodedPayload}`)
    .digest("base64url");

  const token = `${base64URLEncodedHeader}.${base64URLEncodedPayload}.${signature}`;
  return token;
}
