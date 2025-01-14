const roleCheck = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (!req.user || req.user.userRole !== requiredRole) {
                return res.status(403).json({ error: 'You do not have authorization to perform this action.' });
            }
            next();
        } catch (error) {
            console.error("Role check error:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
};

module.exports = { roleCheck };
