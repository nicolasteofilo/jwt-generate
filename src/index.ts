import { sign } from "./jwt/sign";

const token = sign({
  exp: Date.now() + (24 * 60 * 60 * 1000), // hours -> minutes -> seconds -> milliseconds = 1 day
  data: {
    sub: '@nicolasteofilo',
    email: 'nicolasteofilodecastro@gmail.com',
  },
  secret: 'supersecret'
})

console.log(token)
