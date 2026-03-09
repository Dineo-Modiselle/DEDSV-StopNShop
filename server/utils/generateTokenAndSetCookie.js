import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  
  res.cookie("token", token, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Also send token in response body so frontend can store it
  res.setHeader("X-Auth-Token", token);
  
  return token;
};
