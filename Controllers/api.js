const dbOperation = require("../dbFiles/dbOperation");

const getBirdTypes = async (req, res) => {
  const result = await dbOperation.getBirdTypes();
  res.json({ name: result.recordset });
};

const getBanks = async (req, res) => {
  const result = await dbOperation.getBanks();
  res.json({ name: result.recordset });
};

const getPmtMethod = async (req, res) => {
  const result = await dbOperation.getPmtMethod();
  res.json({ name: result.recordset });
};

const getDrugs = async (req, res) => {
  const result = await dbOperation.getDrugs();
  res.json({ name: result.recordset });
};

const getFeeds = async (req, res) => {
  const result = await dbOperation.getFeeds();
  res.json({ name: result.recordset });
};
const getOtherItems = async (req, res) => {
  const result = await dbOperation.getOtherItems();
  res.json({ name: result.recordset });
};
const getExpenseType = async (req, res) => {
  const result = await dbOperation.getExpenseType();
  res.json({ name: result.recordset });
};
const getExpenseHead = async (req, res) => {
  const result = await dbOperation.getExpenseHead();
  res.json({ name: result.recordset });
};
const getUser = async (req, res) => {
  const result = await dbOperation.getUser();
  res.json({ name: result.recordset });
};
const getAssetType = async (req, res) => {
  const result = await dbOperation.getAssetType();
  res.json({ name: result.recordset });
};
const getTxnType = async (req, res) => {
  const result = await dbOperation.getTxnType();
  res.json({ name: result.recordset });
};
const getActiveDebtors = async (req, res) => {
  const result = await dbOperation.getActiveDebtors();
  res.json({ name: result.recordset });
};
const getActiveCreditors = async (req, res) => {
  const result = await dbOperation.getActiveCreditors();
  res.json({ name: result.recordset });
};

const getCapexs = async (req, res) => {
  const result = await dbOperation.getCapexs();
  res.json({ name: result.recordset });
};
const getAllExpenses = async (req, res) => {
  const result = await dbOperation.getAllExpenses();
  res.json({ name: result.recordset });
};
const getAllBirdSales = async (req, res) => {
  const result = await dbOperation.getAllBirdSales();
  res.json({ name: result.recordset });
};
const getAllOtherSales = async (req, res) => {
  const result = await dbOperation.getAllOtherSales();
  res.json({ name: result.recordset });
};
const getAllDocPurchase = async (req, res) => {
  const result = await dbOperation.getAllDocPurchase();
  res.json({ name: result.recordset });
};
const getAllDocMortality = async (req, res) => {
  const result = await dbOperation.getAllDocMortality();
  res.json({ name: result.recordset });
};
const getAllDrugPurchase = async (req, res) => {
  const result = await dbOperation.getAllDrugPurchase();
  res.json({ name: result.recordset });
};
const getAllDrugConsumed = async (req, res) => {
  const result = await dbOperation.getAllDrugConsumed();
  res.json({ name: result.recordset });
};
const getAllFeedPurchase = async (req, res) => {
  const result = await dbOperation.getAllFeedPurchase();
  res.json({ name: result.recordset });
};
const getAllFeedConsumed = async (req, res) => {
  const result = await dbOperation.getAllFeedConsumed();
  res.json({ name: result.recordset });
};
const getDeprDate = async (req, res) => {
  const result = await dbOperation.getDeprDate();
  res.json({ name: result.recordset });
};

module.exports = {
  getActiveDebtors,
  getActiveCreditors,
  getBirdTypes,
  getBanks,
  getAssetType,
  getTxnType,
  getPmtMethod,
  getDrugs,
  getExpenseType,
  getExpenseHead,
  getFeeds,
  getUser,
  getDeprDate,
  getOtherItems,
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
};
