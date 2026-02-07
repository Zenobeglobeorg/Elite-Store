const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

// @desc    Admin Dashboard Test
// @route   GET /api/admin/dashboard
// @access  Private/Admin
router.get("/dashboard", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
