export function objectToBase64URL(obj: Record<string, any>): string {
  const base64URL = Buffer.from(JSON.stringify(obj)).toString(
    "base64url"
  );

  return base64URL;
}
