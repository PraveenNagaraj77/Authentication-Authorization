const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Auth Header:", authHeader);

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access Denied. No token provided.',
        });
    }

    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decodedTokenInfo); // Debugging log

        req.userInfo = decodedTokenInfo; // ✅ Attach user info to request
        next(); // ✅ Correct placement of next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Access Denied. Invalid Token.',
        });
    }
};

module.exports = authMiddleware;
