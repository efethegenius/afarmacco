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
} = require("../Controllers/create");

router.post(
  "https://afarmacco-api.herokuapp.com/doc_purchase",
  validateToken,
  createDocPurchase
);
router.post(
  "https://afarmacco-api.herokuapp.com/doc_mortality",
  validateToken,
  createDocMortality
);
router.post(
  "https://afarmacco-api.herokuapp.com/drug_purchase",
  validateToken,
  createDrugPurchase
);
router.post(
  "https://afarmacco-api.herokuapp.com/drug_consumed",
  validateToken,
  createDrugConsumed
);
router.post(
  "https://afarmacco-api.herokuapp.com/expense",
  validateToken,
  createExpense
);
router.post(
  "https://afarmacco-api.herokuapp.com/bird_sales",
  validateToken,
  createBirdSales
);
router.post(
  "https://afarmacco-api.herokuapp.com/other_sales",
  validateToken,
  createOtherSales
);
router.post(
  "https://afarmacco-api.herokuapp.com/feed_purchase",
  validateToken,
  createFeedPurchase
);
router.post(
  "https://afarmacco-api.herokuapp.com/feed_consumed",
  validateToken,
  createFeedConsumed
);
router.post(
  "https://afarmacco-api.herokuapp.com/depr",
  validateToken,
  createDepr
);
router.post(
  "https://afarmacco-api.herokuapp.com/capex",
  validateToken,
  createCapex
);
router.post(
  "https://afarmacco-api.herokuapp.com/validation",
  createUserValidation
);
router.post(
  "https://afarmacco-api.herokuapp.com/debtor-pay",
  validateToken,
  debtorPay
);
router.post(
  "https://afarmacco-api.herokuapp.com/creditor-pay",
  validateToken,
  creditorPay
);

module.exports = router;
