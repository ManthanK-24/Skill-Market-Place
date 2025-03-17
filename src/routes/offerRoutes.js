const express = require("express");
const router = express.Router();
const { makeOffer, acceptOrRejectOffer } = require("../controllers/offerController");

// Route for making an offer
router.post("/make-offer", makeOffer);
// router.post("/accept-reject-offer", authMiddleware, acceptOrRejectOffer);
router.post("/accept-reject-offer", acceptOrRejectOffer);

module.exports = router;
