const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// Get account info
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update account info
router.put("/", authMiddleware, async (req, res) => {
    try {
        const { firstName, lastName, phone, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, phone, address },
            { new: true }
        ).select("-password");
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
