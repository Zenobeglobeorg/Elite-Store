const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

// @desc    Get current buyer profile (protected)
// @route   GET /api/buyer/me
// @access  Private/Buyer
router.get("/me", protect, authorize("BUYER", "SELLER", "ADMIN"), (req, res) => {
  res.json({ user: req.user, message: "Buyer route OK" });
});

module.exports = router;
