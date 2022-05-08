const dbOperation = require("../dbFiles/dbOperation");

const getBirdTypes = async (req, res) => {
  const result = await dbOperation.getBirdTypes();
  res.json({ name: result.recordset });
};

const getBanks = async (req, res) => {
  const result = await dbOperation.getBanks();
  res.json({ name: result.recordset });
};
const getStates = async (req, res) => {
  const result = await dbOperation.getStates();
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
const getReports = async (req, res) => {
  const result = await dbOperation.getReports();
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
const getSupplyPipeline = async (req, res) => {
  const result = await dbOperation.getSupplyPipeline();
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
const getAllPolEggs = async (req, res) => {
  const result = await dbOperation.getAllPolEggs();
  res.json({ name: result.recordset });
};
const getAllPolLayers = async (req, res) => {
  const result = await dbOperation.getAllPolLayers();
  res.json({ name: result.recordset });
};
const getAllBirdSales = async (req, res) => {
  const result = await dbOperation.getAllBirdSales();
  res.json({ name: result.recordset });
};
const getAllFrozenChickenSales = async (req, res) => {
  const result = await dbOperation.getAllFrozenChickenSales();
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
const getAllPolMortality = async (req, res) => {
  const result = await dbOperation.getAllPolMortality();
  res.json({ name: result.recordset });
};
const getAllPolSales = async (req, res) => {
  const result = await dbOperation.getAllPolSales();
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
const getFarmHands = async (req, res) => {
  const result = await dbOperation.getFarmHands();
  res.json({ name: result.recordset });
};
const getDocSales = async (req, res) => {
  const result = await dbOperation.getDocSales();
  res.json({ name: result.recordset });
};
const getFeedMart = async (req, res) => {
  const result = await dbOperation.getFeedMart();
  res.json({ name: result.recordset });
};
const getMultivitamins = async (req, res) => {
  const result = await dbOperation.getMultivitamins();
  res.json({ name: result.recordset });
};
const getAntibiotics = async (req, res) => {
  const result = await dbOperation.getAntibiotics();
  res.json({ name: result.recordset });
};
const getAnticoccidiosis = async (req, res) => {
  const result = await dbOperation.getAnticoccidiosis();
  res.json({ name: result.recordset });
};
const getAntiviral = async (req, res) => {
  const result = await dbOperation.getAntiviral();
  res.json({ name: result.recordset });
};
const getLasota = async (req, res) => {
  const result = await dbOperation.getLasota();
  res.json({ name: result.recordset });
};
const getGumboro = async (req, res) => {
  const result = await dbOperation.getGumboro();
  res.json({ name: result.recordset });
};
const getDeworm = async (req, res) => {
  const result = await dbOperation.getDeworm();
  res.json({ name: result.recordset });
};
const getCoryza = async (req, res) => {
  const result = await dbOperation.getCoryza();
  res.json({ name: result.recordset });
};
const getFarmgate = async (req, res) => {
  const result = await dbOperation.getFarmgate();
  res.json({ name: result.recordset });
};
const getFarmgateEggs = async (req, res) => {
  const result = await dbOperation.getFarmgateEggs();
  res.json({ name: result.recordset });
};
const getOperatingExpense = async (req, res) => {
  const result = await dbOperation.getOperatingExpense();
  res.json({ name: result.recordset });
};
const getCashBook = async (req, res) => {
  const result = await dbOperation.getCashBook();
  res.json({ name: result.recordset });
};

module.exports = {
  getCashBook,
  getOperatingExpense,
  getFarmgate,
  getFarmgateEggs,
  getDeworm,
  getCoryza,
  getGumboro,
  getAntiviral,
  getLasota,
  getAnticoccidiosis,
  getMultivitamins,
  getAntibiotics,
  getFeedMart,
  getDocSales,
  getFarmHands,
  getActiveDebtors,
  getActiveCreditors,
  getBirdTypes,
  getBanks,
  getStates,
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
  getSupplyPipeline,
  getAllDocMortality,
  getAllDocPurchase,
  getAllDrugConsumed,
  getAllDrugPurchase,
  getAllFeedConsumed,
  getAllFeedPurchase,
  getAllExpenses,
  getAllBirdSales,
  getAllFrozenChickenSales,
  getAllOtherSales,
  getReports,
  getAllPolEggs,
  getAllPolLayers,
  getAllPolSales,
  getAllPolMortality,
};
