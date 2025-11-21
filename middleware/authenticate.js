// middleware/authenticate.js
import { decodeToken } from "../utils/tokens.js";

export default function authenticate(req, res, next) {
  try {
    let tokenHeader = req.headers.authorization;
    if (!tokenHeader || !tokenHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "You're not authorized to do this action!" });

    const token = tokenHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.user = { user_id: payload.user_id, username: payload.username };
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "You're not authorized to do this action!" });
  }
}


