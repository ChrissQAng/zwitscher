import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export function createToken(user, tokenType = "access") {
  const issuedAtSeconds = Math.ceil(Date.now() / 1000);
  const tokenPayload = {
    sub: user._id,
    type: tokenType,
    iat: issuedAtSeconds,
  };

  const expiresIn =
    {
      access: "10min",
      refresh: "2w",
    }[tokenType] || "10min"; // access field values dynamically using value of tokenType

  const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn });
  return token;
}
