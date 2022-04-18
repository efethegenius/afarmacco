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
const createDocSales = async (req, res) => {
  await dbOperation.createDocSales(req.body);
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
const createFrozenChickenSales = async (req, res) => {
  await dbOperation.createFrozenChickenSales(req.body);
  res.json({ code: 1, msg: "success" });
};
const createPolSales = async (req, res) => {
  await dbOperation.createPolSales(req.body);
  res.json({ code: 1, msg: "success" });
};
const createPolMortality = async (req, res) => {
  await dbOperation.createPolMortality(req.body);
  res.json({ code: 1, msg: "success" });
};
const createPolEgg = async (req, res) => {
  await dbOperation.createPolEgg(req.body);
  res.json({ code: 1, msg: "success" });
};
const createPolLayer = async (req, res) => {
  await dbOperation.createPolLayer(req.body);
  res.json({ code: 1, msg: "success" });
};

const createOtherSales = async (req, res) => {
  await dbOperation.createOtherSales(req.body);
  res.json({ code: 1, msg: "success" });
};

const createFeedPurchase = async (req, res) => {
  await dbOperation.createFeedPurchase(req.body);
  res.json({ code: 1, msg: "success" });
};

const createFeedConsumed = async (req, res) => {
  await dbOperation.createFeedConsumed(req.body);
  res.json({ code: 1, msg: "success" });
};

const createCapex = async (req, res) => {
  await dbOperation.createCapex(req.body);
  res.json({ code: 1, msg: "success" });
};
const debtorPay = async (req, res) => {
  await dbOperation.debtorPay(req.body);
  res.json({ code: 1, msg: "success" });
};
const creditorPay = async (req, res) => {
  await dbOperation.creditorPay(req.body);
  res.json({ code: 1, msg: "success" });
};

const createUserValidation = async (req, res) => {
  await dbOperation.createUserValidation(req.body);
  res.json({ code: 1, msg: "success" });
};

const createFarmHands = async (req, res) => {
  await dbOperation.createFarmHands(req.body);
  res.json({ code: 1, msg: "success" });
};
const createSupplyPipeline = async (req, res) => {
  await dbOperation.createSupplyPipeline(req.body);
  res.json({ code: 1, msg: "success" });
};
const createFeedMart = async (req, res) => {
  await dbOperation.createFeedMart(req.body);
  res.json({ code: 1, msg: "success" });
};
const createMultivitamin = async (req, res) => {
  await dbOperation.createMultivitamin(req.body);
  res.json({ code: 1, msg: "success" });
};
const createAntibiotics = async (req, res) => {
  await dbOperation.createAntibiotics(req.body);
  res.json({ code: 1, msg: "success" });
};
const createAnticoccidiosis = async (req, res) => {
  await dbOperation.createAnticoccidiosis(req.body);
  res.json({ code: 1, msg: "success" });
};
const createAntiviral = async (req, res) => {
  await dbOperation.createAntiviral(req.body);
  res.json({ code: 1, msg: "success" });
};
const createLasota = async (req, res) => {
  await dbOperation.createLasota(req.body);
  res.json({ code: 1, msg: "success" });
};
const createGumboro = async (req, res) => {
  await dbOperation.createGumboro(req.body);
  res.json({ code: 1, msg: "success" });
};
const createDeworm = async (req, res) => {
  await dbOperation.createDeworm(req.body);
  res.json({ code: 1, msg: "success" });
};
const createCoryza = async (req, res) => {
  await dbOperation.createCoryza(req.body);
  res.json({ code: 1, msg: "success" });
};
const createFarmgate = async (req, res) => {
  await dbOperation.createFarmgate(req.body);
  res.json({ code: 1, msg: "success" });
};

module.exports = {
  createFarmgate,
  createCoryza,
  createGumboro,
  createDeworm,
  createLasota,
  createAntiviral,
  createAnticoccidiosis,
  createAntibiotics,
  createMultivitamin,
  createFeedMart,
  createSupplyPipeline,
  createBirdSales,
  createFrozenChickenSales,
  createCapex,
  createFarmHands,
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
  debtorPay,
  creditorPay,
  createPolEgg,
  createPolLayer,
  createPolSales,
  createPolMortality,
  createDocSales,
};
