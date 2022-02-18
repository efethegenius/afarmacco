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
router.get("https://afarmacco-api.herokuapp.com/birds", getBirdTypes);

//Banks Api
router.get("https://afarmacco-api.herokuapp.com/banks", getBanks);

//Payment Method API
router.get("https://afarmacco-api.herokuapp.com/payments", getPmtMethod);

//Drugs Api
router.get("https://afarmacco-api.herokuapp.com/drugs", getDrugs);

//Feeds Api
router.get("https://afarmacco-api.herokuapp.com/feeds", getFeeds);

//Other Items Api
router.get("https://afarmacco-api.herokuapp.com/other-items", getOtherItems);

//Expense Type Api
router.get("https://afarmacco-api.herokuapp.com/expense-types", getExpenseType);

//Expense Head Api
router.get("https://afarmacco-api.herokuapp.com/expense-heads", getExpenseHead);

router.get("https://afarmacco-api.herokuapp.com/asset-types", getAssetType);

router.get("https://afarmacco-api.herokuapp.com/txn-types", getTxnType);

router.get(
  "https://afarmacco-api.herokuapp.com/capexs",
  validateToken,
  getCapexs
);

router.get(
  "https://afarmacco-api.herokuapp.com/active-debtors",
  // validateToken,
  getActiveDebtors
);

router.get(
  "https://afarmacco-api.herokuapp.com/active-creditors",
  validateToken,
  getActiveCreditors
);

router.get("https://afarmacco-api.herokuapp.com/user", validateToken, getUser);

router.get(
  "https://afarmacco-api.herokuapp.com/all-expenses",
  validateToken,
  getAllExpenses
);

router.get(
  "https://afarmacco-api.herokuapp.com/all-bird-sales",
  validateToken,
  getAllBirdSales
);

router.get(
  "https://afarmacco-api.herokuapp.com/all-other-sales",
  validateToken,
  getAllOtherSales
);

router.get(
  "https://afarmacco-api.herokuapp.com/all-doc-mortality",
  validateToken,
  getAllDocMortality
);

router.get(
  "https://afarmacco-api.herokuapp.com/all-doc-purchase",
  validateToken,
  getAllDocPurchase
);

router.get(
  "https://afarmacco-api.herokuapp.com/all-drug-purchase",
  validateToken,
  getAllDrugPurchase
);

router.get(
  "https://afarmacco-api.herokuapp.com/all-drug-consumed",
  validateToken,
  getAllDrugConsumed
);

router.get(
  "https://afarmacco-api.herokuapp.com/all-feed-purchase",
  validateToken,
  getAllFeedPurchase
);

router.get(
  "https://afarmacco-api.herokuapp.com/all-feed-consumed",
  validateToken,
  getAllFeedConsumed
);

module.exports = router;
