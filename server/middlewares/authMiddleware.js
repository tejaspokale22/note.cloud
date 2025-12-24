import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.split(" ")[1];

  // If no token, respond with 401 Unauthorized
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    // Verify the token using the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to request object
    req.user = verified;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Respond with 400 Bad Request for invalid tokens
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
