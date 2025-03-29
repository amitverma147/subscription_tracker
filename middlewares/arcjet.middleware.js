import aj from "../config/arcjet.js";
const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req,{requested:1});
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          status: "failed",
          message: "Too many requests",
        });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({
          status: "failed",
          message: "Bot detected",
        });
      }
      return res.status(403).json({
        status: "failed",
        message: "Access denied",
      });
    }
    next();
  } catch (error) {
    console.log(`Arcjet Error: ${error.message}`);
    next(error);
  }
};
export default arcjetMiddleware;