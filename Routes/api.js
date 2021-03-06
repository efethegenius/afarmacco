const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middlewares/AuthMiddleware");
const cors = require("cors");
const {
  getBirdTypes,
  getBanks,
  getStates,
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
  getFeedMart,
  getAllDrugConsumed,
  getAllDrugPurchase,
  getAllFeedConsumed,
  getAllFeedPurchase,
  getAllExpenses,
  getAllBirdSales,
  getAllFrozenChickenSales,
  getAllOtherSales,
  getAllPolEggs,
  getAllPolLayers,
  getAllPolSales,
  getAllPolMortality,
  getDeprDate,
  getReports,
  getFarmHands,
  getDocSales,
  getMultivitamins,
  getSupplyPipeline,
  getAntibiotics,
  getAnticoccidiosis,
  getAntiviral,
  getLasota,
  getGumboro,
  getDeworm,
  getCoryza,
  getFarmgate,
  getFarmgateEggs,
  getOperatingExpense,
  getCashBook,
} = require("../Controllers/api");

const dbOperation = require("../dbFiles/dbOperation");

//Birds Api
router.get("/birds", getBirdTypes);

//Banks Api
router.get("/banks", getBanks);
router.get("/states", getStates);

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
router.get("/depr-date", validateToken, getDeprDate);
router.get("/reports", validateToken, getReports);

router.get("/active-debtors", validateToken, getActiveDebtors);
router.get("/active-creditors", validateToken, getActiveCreditors);
router.get("/user", validateToken, getUser);
router.get("/all-expenses", validateToken, getAllExpenses);
router.get("/all-pol-eggs", validateToken, getAllPolEggs);
router.get("/all-pol-layers", validateToken, getAllPolLayers);
router.get("/all-pol-sales", validateToken, getAllPolSales);
router.get("/all-pol-mortality", validateToken, getAllPolMortality);
router.get("/all-bird-sales", validateToken, getAllBirdSales);
router.get(
  "/all-frozen-chicken-sales",
  validateToken,
  getAllFrozenChickenSales
);
router.get("/all-other-sales", validateToken, getAllOtherSales);
router.get("/all-doc-mortality", validateToken, getAllDocMortality);
router.get("/all-doc-purchase", validateToken, getAllDocPurchase);
router.get("/all-drug-purchase", validateToken, getAllDrugPurchase);
router.get("/all-drug-consumed", validateToken, getAllDrugConsumed);
router.get("/all-feed-purchase", validateToken, getAllFeedPurchase);
router.get("/all-feed-consumed", validateToken, getAllFeedConsumed);
router.get("/all-farm-hands", validateToken, getFarmHands);
router.get("/all-doc-sales", validateToken, getDocSales);
router.get("/all-supply-pipeline", validateToken, getSupplyPipeline);
router.get("/all-feed-mart", validateToken, getFeedMart);
router.get("/all-multivitamin", validateToken, getMultivitamins);
router.get("/all-antibiotics", validateToken, getAntibiotics);
router.get("/all-anticoccidiosis", validateToken, getAnticoccidiosis);
router.get("/all-antiviral", validateToken, getAntiviral);
router.get("/all-lasota", validateToken, getLasota);
router.get("/all-gumboro", validateToken, getGumboro);
router.get("/all-deworm", validateToken, getDeworm);
router.get("/all-coryza", validateToken, getCoryza);
router.get("/all-farmgate", validateToken, getFarmgate);
router.get("/all-farmgate-eggs", validateToken, getFarmgateEggs);
router.get("/all-operating-expense", validateToken, getOperatingExpense);
router.get("/all-cash-book", validateToken, getCashBook);

module.exports = router;
