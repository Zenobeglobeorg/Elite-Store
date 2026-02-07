const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

// @desc    Get seller area (protected)
// @route   GET /api/seller/me
// @access  Private/Seller
router.get("/me", protect, authorize("SELLER", "ADMIN"), (req, res) => {
  res.json({ user: req.user, message: "Seller route OK" });
});

module.exports = router;
