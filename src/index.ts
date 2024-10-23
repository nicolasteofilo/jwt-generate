import { sign, verify } from "./jwt";

const token = sign({
  exp: Date.now() + 24 * 60 * 60 * 1000, // hours -> minutes -> seconds -> milliseconds = 1 day
  data: {
    sub: "@nicolasteofilo",
    email: "nicolas.dev@gmail.com",
  },
  secret: "supersecret",
});

const decoded = verify({
  token,
  secret: "supersecret"
});
