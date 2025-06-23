import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({ error: 'Bot detected' });
      }

      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.error(`Arcjet Middleware Error: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

export default arcjetMiddleware;
