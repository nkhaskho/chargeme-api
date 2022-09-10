const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        console.log(token);
        if (!token) return res.status(403).send("Access denied.");
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

module.exports = { isAuthenticated }