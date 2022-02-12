const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middlewares/AuthMiddleware");
const cors = require("cors");
const {
  getBirdTypes,
  getBanks,
  getPmtMethod,
  getDrugs,
  getExpenseType,
  getExpenseHead,
  getFeeds,
  getUser,
  getAssetType,
  getTxnType,
  getOtherItems,
  getActiveDebtors,
  getActiveCreditors,
  getCapexs,
  getAllDocMortality,
  getAllDocPurchase,
  getAllDrugConsumed,
  getAllDrugPurchase,
  getAllFeedConsumed,
  getAllFeedPurchase,
  getAllExpenses,
  getAllBirdSales,
  getAllOtherSales,
} = require("../Controllers/api");

const dbOperation = require("../dbFiles/dbOperation");

//Birds Api
router.get("/birds", getBirdTypes);

//Banks Api
router.get("/banks", getBanks);

//Payment Method API
router.get("/payments", getPmtMethod);

//Drugs Api
router.get("/drugs", getDrugs);

//Feeds Api
router.get("/feeds", getFeeds);

//Other Items Api
router.get("/other-items", getOtherItems);

//Expense Type Api
router.get("/expense-types", getExpenseType);

//Expense Head Api
router.get("/expense-heads", getExpenseHead);

router.get("/asset-types", getAssetType);

router.get("/txn-types", getTxnType);

router.get("/capexs", validateToken, getCapexs);

router.get("/active-debtors", validateToken, getActiveDebtors);

router.get("/active-creditors", validateToken, getActiveCreditors);

router.get("/user", validateToken, getUser);

router.get("/all-expenses", validateToken, getAllExpenses);

router.get("/all-bird-sales", validateToken, getAllBirdSales);

router.get("/all-other-sales", validateToken, getAllOtherSales);

router.get("/all-doc-mortality", validateToken, getAllDocMortality);

router.get("/all-doc-purchase", validateToken, getAllDocPurchase);

router.get("/all-drug-purchase", validateToken, getAllDrugPurchase);

router.get("/all-drug-consumed", validateToken, getAllDrugConsumed);

router.get("/all-feed-purchase", validateToken, getAllFeedPurchase);

router.get("/all-feed-consumed", validateToken, getAllFeedConsumed);

module.exports = router;
