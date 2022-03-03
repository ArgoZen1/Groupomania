const rateLimit = require("express-rate-limit")



const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 4, 
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
    
})

module.exports = { apiLimiter }