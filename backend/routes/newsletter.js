const express = require("express");
const {
  subscribe,
  unsubscribe,
  sendNewsletter,
  getSubscriberCount,
} = require("../controllers/newsletterController.js");

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/unsubscribe", unsubscribe);
router.post("/send", sendNewsletter);
router.get("/count", getSubscriberCount);

module.exports = router;
