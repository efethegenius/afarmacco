const dbOperation = require("../dbFiles/dbOperation");

const createDocPurchase = async (req, res) => {
  await dbOperation.createDocPurchase(req.body);
  res.json({ code: 1, msg: "success" });
};

const createDocMortality = async (req, res) => {
  await dbOperation.createDocMortality(req.body);
  res.json({ code: 1, msg: "success" });
};

const createDrugPurchase = async (req, res) => {
  await dbOperation.createDrugPurchase(req.body);
  res.json({ code: 1, msg: "success" });
};

const createDrugConsumed = async (req, res) => {
  await dbOperation.createDrugConsumed(req.body);
  res.json({ code: 1, msg: "success" });
};

const createExpense = async (req, res) => {
  await dbOperation.createExpense(req.body);
  res.json({ code: 1, msg: "success" });
};
const createDepr = async (req, res) => {
  await dbOperation.createDepr(req.body);
  res.json({ code: 1, msg: "success" });
};

const createBirdSales = async (req, res) => {
  await dbOperation.createBirdSales(req.body);
  res.json({ code: 1, msg: "success" });
};

const createOtherSales = async (req, res) => {
  await dbOperation.createOtherSales(req.body);
  res.json({ code: 1, msg: "success" });
};

//working on this--------------------------
const createFeedPurchase = async (req, res) => {
  await dbOperation.createFeedPurchase(req.body);
  res.json({ code: 1, msg: "success" });
};
//working on this--------------------------

const createFeedConsumed = async (req, res) => {
  await dbOperation.createFeedConsumed(req.body);
  res.json({ code: 1, msg: "success" });
};

const createCapex = async (req, res) => {
  await dbOperation.createCapex(req.body);
  res.json({ code: 1, msg: "success" });
};

const createUserValidation = async (req, res) => {
  await dbOperation.createUserValidation(req.body);
  res.json({ code: 1, msg: "success" });
};

module.exports = {
  createBirdSales,
  createCapex,
  createDepr,
  createDocMortality,
  createDocPurchase,
  createDrugConsumed,
  createDrugPurchase,
  createExpense,
  createFeedConsumed,
  createFeedPurchase,
  createOtherSales,
  createUserValidation,
};
