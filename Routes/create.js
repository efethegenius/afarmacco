const express = require("express");
const router = express.Router();
const cors = require("cors");
const { validateToken } = require("../Middlewares/AuthMiddleware");

const dbOperation = require("../dbFiles/dbOperation");
const {
  createBirdSales,
  createCapex,
  createDocMortality,
  createDocPurchase,
  createDrugConsumed,
  createDrugPurchase,
  createExpense,
  createFeedConsumed,
  createFeedPurchase,
  createOtherSales,
  createUserValidation,
  createDepr,
  payDebt,
} = require("../Controllers/create");

router.post("/doc_purchase", validateToken, createDocPurchase);
router.post("/doc_mortality", validateToken, createDocMortality);
router.post("/drug_purchase", validateToken, createDrugPurchase);
router.post("/drug_consumed", validateToken, createDrugConsumed);
router.post("/expense", validateToken, createExpense);
router.post("/bird_sales", validateToken, createBirdSales);
router.post("/other_sales", validateToken, createOtherSales);
router.post("/feed_purchase", validateToken, createFeedPurchase);
router.post("/feed_consumed", validateToken, createFeedConsumed);
router.post("/depr", validateToken, createDepr);
router.post("/capex", validateToken, createCapex);
router.post("/validation", createUserValidation);
router.post("/pay-debt", payDebt);

module.exports = router;
