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
  debtorPay,
  creditorPay,
  createPolEgg,
  createPolLayer,
  createPolSales,
  createFarmHands,
  createPolMortality,
  createDocSales,
  createSupplyPipeline,
  createFeedMart,
  createAntibiotics,
  createMultivitamin,
  createAnticoccidiosis,
  createAntiviral,
  createLasota,
  createGumboro,
  createDeworm,
  createCoryza,
  createFarmgate,
  createFrozenChickenSales,
} = require("../Controllers/create");

router.post("/doc_purchase", validateToken, createDocPurchase);
router.post("/doc_sales", validateToken, createDocSales);
router.post("/doc_mortality", validateToken, createDocMortality);
router.post("/drug_purchase", validateToken, createDrugPurchase);
router.post("/drug_consumed", validateToken, createDrugConsumed);
router.post("/expense", validateToken, createExpense);
router.post("/bird_sales", validateToken, createBirdSales);
router.post("/frozen_chicken_sales", validateToken, createFrozenChickenSales);
router.post("/pol_egg", validateToken, createPolEgg);
router.post("/pol_layer", validateToken, createPolLayer);
router.post("/pol_sales", validateToken, createPolSales);
router.post("/pol_mortality", validateToken, createPolMortality);
router.post("/other_sales", validateToken, createOtherSales);
router.post("/feed_purchase", validateToken, createFeedPurchase);
router.post("/feed_consumed", validateToken, createFeedConsumed);
router.post("/depr", validateToken, createDepr);
router.post("/capex", validateToken, createCapex);
router.post("/validation", createUserValidation);
router.post("/debtor-pay", validateToken, debtorPay);
router.post("/creditor-pay", validateToken, creditorPay);
router.post("/farm-hand", validateToken, createFarmHands);
router.post("/supply_pipeline", validateToken, createSupplyPipeline);
router.post("/feed_mart", validateToken, createFeedMart);
router.post("/multivitamin", validateToken, createMultivitamin);
router.post("/antibiotics", validateToken, createAntibiotics);
router.post("/anticoccidiosis", validateToken, createAnticoccidiosis);
router.post("/antiviral", validateToken, createAntiviral);
router.post("/lasota", validateToken, createLasota);
router.post("/gumboro", validateToken, createGumboro);
router.post("/deworm", validateToken, createDeworm);
router.post("/coryza", validateToken, createCoryza);
router.post("/farmgate", validateToken, createFarmgate);

module.exports = router;
