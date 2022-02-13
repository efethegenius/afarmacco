const config = require("./dbConfig");
const sql = require("mssql");
const { sign } = require("jsonwebtoken");

// User Form start
const createUserValidation = async (user) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("FirstName", sql.NVarChar, user.FirstName)
      .input("LastName", sql.NVarChar, user.LastName)
      .input("Email", sql.NVarChar, user.Email)
      .input("SignOnName", sql.NVarChar, user.SignOnName)
      .input("UserPassword", sql.NVarChar, user.UserPassword)
      // .input("Action", sql.Int, user.Action)
      .output("ResponseMessage", sql.NVarChar)
      .execute("sp_User_Register", (err, recordsets, returnValue) => {
        console.log(recordsets.output.ResponseMessage);
      });
  } catch (error) {
    console.log(error);
  }
};
// User Form End

// ----------------------------------------------------------------------
//Get User Login
const getLogin = async (user) => {
  try {
    let pool = await sql.connect(config);
    let login = await pool
      .request()
      .query(
        `select * from tbl_Users Where SignOnName = '${user.SignOnName}'  And UserPassword = HASHBYTES('SHA2_512', '${user.UserPassword}'+CAST([Salt] AS NVARCHAR(36)))`
      );
    if (login.recordset[0] === undefined) {
      console.log("Wrong Username and Password Combination");
      console.log(login);
      return { error: "Username or Password is incorrect" };
    }

    const accessToken = sign(
      {
        username: login.recordset[0].SignOnName,
        id: login.recordset[0].UserId,
      },
      "7JUU39959Eohyue"
    );
    console.log(accessToken);

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
//Get User Login
// ---------------------------------------------------------------------

const payDebt = async (id) => {
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        `update tbl_debtor set Status = 'PAID' Where CustomerId = '${id}'`
      );
  } catch (error) {
    console.log(error);
  }
};
// DOC PURCHASES START
const getDocPurchases = async (invoiceNo) => {
  try {
    let pool = await sql.connect(config);
    let purchases = await pool
      .request()
      .query(`select * from vwDOCPurchase_1 Where InvoiceNo = '${invoiceNo}'`);
    console.log(purchases);
    return purchases;
  } catch (error) {
    console.log(error);
  }
};

const createDocPurchase = async (purchase) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("PurchaseDate", sql.Date, purchase.PurchaseDate)
      .input("InvoiceNo", sql.Int, purchase.InvoiceNo)
      .input("BirdType", sql.NVarChar, purchase.BirdType)
      .input("Batch", sql.Int, purchase.Batch)
      .input("Qty", sql.Int, purchase.Qty)
      .input("UnitPrice", sql.Int, purchase.UnitPrice)
      .input("PmtMethod", sql.NVarChar, purchase.PmtMethod)
      .input("Creditor", sql.NVarChar, purchase.Creditor)
      .input("BankName", sql.NVarChar, purchase.BankName)
      .input("UpdType", sql.Int, purchase.UpdType)
      .input("RecId", sql.Int, purchase.RecId)
      .execute("sp_DOC_Purchase");
  } catch (error) {
    console.log(error);
  }
};
// DOC PURCHASES END

// Capex Transaction START
const createCapex = async (capex) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("TxnType", sql.NVarChar, capex.TxnType)
      .input("TxnDate", sql.Date, capex.TxnDate)
      .input("AssetType", sql.NVarChar, capex.AssetType)
      .input("FADesc", sql.NVarChar, capex.FADesc)
      .input("FACode", sql.NVarChar, capex.FACode)
      .input("Lifespan", sql.Int, capex.Lifespan)
      .input("Amount", sql.Money, capex.Amount)
      .input("PmtMethod", sql.NVarChar, capex.PmtMethod)
      .input("BankName", sql.NVarChar, capex.BankName)
      .input("Debtor", sql.NVarChar, capex.Debtor)
      .input("Creditor", sql.NVarChar, capex.Creditor)
      .input("UpdType", sql.Int, capex.UpdType)
      .input("RecId", sql.Int, capex.RecId)
      .execute("sp_FA_Transaction");
  } catch (error) {
    console.log(error);
  }
};
// Capex Transaction END

// DOC MORTALITY START
const createDocMortality = async (mortality) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("MortalityDate", sql.Date, mortality.MortalityDate)
      .input("BirdType", sql.NVarChar, mortality.BirdType)
      .input("Batch", sql.Int, mortality.Batch)
      .input("Qty", sql.Int, mortality.Qty)
      .input("UpdType", sql.Int, mortality.UpdType)
      .input("RecId", sql.Int, mortality.RecId)
      .execute("sp_DOC_Mortality");
  } catch (error) {
    console.log(error);
  }
};
// DOC MORTALITY END

// DRUG PURCHASE START
const createDrugPurchase = async (purchase) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LotNo", sql.Int, purchase.LotNo)
      .input("PurchaseDate", sql.Date, purchase.PurchaseDate)
      .input("InvoiceNo", sql.Int, purchase.InvoiceNo)
      .input("DrugName", sql.NVarChar, purchase.DrugName)
      .input("BagWeight", sql.Int, purchase.BagWeight)
      .input("Qty", sql.Int, purchase.Qty)
      .input("UnitPrice", sql.Money, purchase.UnitPrice)
      .input("PmtMethod", sql.NVarChar, purchase.PmtMethod)
      .input("BankName", sql.NVarChar, purchase.BankName)
      .input("Creditor", sql.NVarChar, purchase.Creditor)
      .input("UpdType", sql.Int, purchase.UpdType)
      .input("RecId", sql.Int, purchase.RecId)
      .execute("sp_Drug_Purchase");
  } catch (error) {
    console.log(error);
  }
};
// DRUG PURCHASE END

// DRUG CONSUMED START
const createDrugConsumed = async (consumed) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("ConsumptionDate", sql.Date, consumed.ConsumptionDate)
      .input("LotNo", sql.Int, consumed.LotNo)
      .input("DrugName", sql.NVarChar, consumed.DrugName)
      .input("BirdType", sql.NVarChar, consumed.BirdType)
      .input("Batch", sql.Int, consumed.Batch)
      .input("SizeQtyUsed", sql.Int, consumed.SizeQtyUsed)
      .input("SatchetQtyUsed", sql.Int, consumed.SatchetQtyUsed)
      .input("UpdType", sql.Int, consumed.UpdType)
      .input("RecId", sql.Int, consumed.RecId)
      .execute("sp_Drug_Consumption");
  } catch (error) {
    console.log(error);
  }
};
// DRUG CONSUMED END

// EXPENSE START
const createExpense = async (expense) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("ExpenseDate", sql.Date, expense.ExpenseDate)
      .input("InvoiceNo", sql.Int, expense.InvoiceNo)
      .input("ExpenseType", sql.NVarChar, expense.ExpenseType)
      .input("ExpenseHead", sql.NVarChar, expense.ExpenseHead)
      .input("Amount", sql.Int, expense.Amount)
      .input("PmtMethod", sql.NVarChar, expense.PmtMethod)
      .input("Creditor", sql.NVarChar, expense.Creditor)
      .input("BankName", sql.NVarChar, expense.BankName)
      .input("UpdType", sql.Int, expense.UpdType)
      .input("RecId", sql.Int, expense.RecId)
      .execute("sp_Expense");
  } catch (error) {
    console.log(error);
  }
};
// EXPENSE END

// DEPR START
const createDepr = async (depr) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("ExpenseDate", sql.Date, depr.ExpenseDate)
      .input("ExpenseType", sql.NVarChar, depr.ExpenseType)
      .input("ExpenseHead", sql.NVarChar, depr.ExpenseHead)
      .execute("sp_Depr");
  } catch (error) {
    console.log(error);
  }
};
// EXPENSE END

// BIRD SALES START
const createBirdSales = async (sales) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("UserId", sql.Int, user.id);
    request.input("SalesDate", sql.Date, sales.SalesDate);
    request.input("Reference", sql.Int, sales.Reference);
    request.input("BirdType", sql.NVarChar, sales.BirdType);
    request.input("Batch", sql.Int, sales.Batch);
    request.input("Qty", sql.Int, sales.Qty);
    request.input("UnitPrice", sql.Money, sales.UnitPrice);
    request.input("PmtMethod", sql.NVarChar, sales.PmtMethod);
    request.input("Debtor", sql.NVarChar, sales.Debtor);
    request.input("BankName", sql.NVarChar, sales.BankName);
    request.input("UpdType", sql.Int, sales.UpdType);
    request.input("RecId", sql.Int, sales.RecId);
    request.execute("sp_BirdSales");
  } catch (error) {
    console.log(error);
  }
};
// BIRD SALES END

// OTHER SALES START
const createOtherSales = async (sales) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("UserId", sql.Int, user.id);
    request.input("ItemDate", sql.Date, sales.ItemDate);
    request.input("Reference", sql.Int, sales.Reference);
    request.input("Item", sql.NVarChar, sales.Item);
    request.input("Qty", sql.Int, sales.Qty);
    request.input("UnitPrice", sql.Money, sales.UnitPrice);
    request.input("PmtMethod", sql.NVarChar, sales.PmtMethod);
    request.input("Debtor", sql.NVarChar, sales.Debtor);
    request.input("BankName", sql.NVarChar, sales.BankName);
    request.input("UpdType", sql.Int, sales.UpdType);
    request.input("RecId", sql.Int, sales.RecId);
    request.execute("sp_OtherSales");
  } catch (error) {
    console.log(error);
  }
};
// OTHER SALES END

// FEED PURCHASE START
const createFeedPurchase = async (purchase) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LotNo", sql.Int, purchase.LotNo)
      .input("PurchaseDate", sql.Date, purchase.PurchaseDate)
      .input("InvoiceNo", sql.Int, purchase.InvoiceNo)
      .input("FeedType", sql.NVarChar, purchase.FeedType)
      .input("BagWeight", sql.Int, purchase.BagWeight)
      .input("Qty", sql.Int, purchase.Qty)
      .input("UnitPrice", sql.Money, purchase.UnitPrice)
      .input("PmtMethod", sql.NVarChar, purchase.PmtMethod)
      .input("BankName", sql.NVarChar, purchase.BankName)
      .input("Creditor", sql.NVarChar, purchase.Creditor)
      .input("UpdType", sql.Int, purchase.UpdType)
      .input("RecId", sql.Int, purchase.RecId)
      .execute("sp_Feed_Purchase");
  } catch (error) {
    console.log(error);
  }
};
// FEED PURCHASE END

// FEED CONSUMPTION START
const createFeedConsumed = async (consumed) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("ConsumptionDate", sql.Date, consumed.ConsumptionDate)
      .input("LotNo", sql.Int, consumed.LotNo)
      .input("FeedType", sql.NVarChar, consumed.FeedType)
      .input("BirdType", sql.NVarChar, consumed.BirdType)
      .input("Batch", sql.Int, consumed.Batch)
      .input("SizeQtyUsed", sql.Int, consumed.SizeQtyUsed)
      .input("BagQtyUsed", sql.Int, consumed.BagQtyUsed)
      .input("UpdType", sql.Int, consumed.UpdType)
      .input("RecId", sql.Int, consumed.RecId)
      .execute("sp_Feed_Consumption");
  } catch (error) {
    console.log(error);
  }
};
// FEED CONSUMPTION END

// GET REQUESTS START
const getBirdTypes = async () => {
  try {
    let pool = await sql.connect(config);
    let birds = await pool.request().query("select * from tbl_BirdType");
    console.log(birds);
    return birds;
  } catch (error) {
    console.log(error);
  }
};
const getBanks = async () => {
  try {
    let pool = await sql.connect(config);
    let banks = await pool.request().query("select * from tbl_Bank");
    console.log(banks);
    return banks;
  } catch (error) {
    console.log(error);
  }
};
const getPmtMethod = async () => {
  try {
    let pool = await sql.connect(config);
    let pmtMethod = await pool.request().query("select * from tbl_PmtMethod");
    console.log(pmtMethod);
    return pmtMethod;
  } catch (error) {
    console.log(error);
  }
};
const getDrugs = async () => {
  try {
    let pool = await sql.connect(config);
    let drugs = await pool.request().query("select * from tbl_DrugType");
    console.log(drugs);
    return drugs;
  } catch (error) {
    console.log(error);
  }
};

const getFeeds = async () => {
  try {
    let pool = await sql.connect(config);
    let feeds = await pool.request().query("select * from tbl_FeedType");
    console.log(feeds);
    return feeds;
  } catch (error) {
    console.log(error);
  }
};
const getOtherItems = async () => {
  try {
    let pool = await sql.connect(config);
    let otherItems = await pool
      .request()
      .query("select * from tbl_OtherSalesItem");
    console.log(otherItems);
    return otherItems;
  } catch (error) {
    console.log(error);
  }
};
const getExpenseType = async () => {
  try {
    let pool = await sql.connect(config);
    let expenseType = await pool
      .request()
      .query("select * from tbl_ExpenseType");
    console.log(expenseType);
    return expenseType;
  } catch (error) {
    console.log(error);
  }
};
const getExpenseHead = async () => {
  try {
    let pool = await sql.connect(config);
    let expenseHead = await pool
      .request()
      .query("select * from tbl_ExpenseHead");
    console.log(expenseHead);
    return expenseHead;
  } catch (error) {
    console.log(error);
  }
};
const getAssetType = async () => {
  try {
    let pool = await sql.connect(config);
    let assetType = await pool.request().query("select * from tbl_FA_Type");
    console.log(assetType);
    return assetType;
  } catch (error) {
    console.log(error);
  }
};
const getTxnType = async () => {
  try {
    let pool = await sql.connect(config);
    let txnType = await pool.request().query("select * from tbl_TxnType");
    console.log(txnType);
    return txnType;
  } catch (error) {
    console.log(error);
  }
};
const getUser = async () => {
  try {
    let pool = await sql.connect(config);
    let currentUser = await pool
      .request()
      .query(`select * from vw_Users Where UserId = ${user.id}`);
    console.log(currentUser);
    return currentUser;
  } catch (error) {
    console.log(error);
  }
};
const getActiveDebtors = async () => {
  try {
    let pool = await sql.connect(config);
    let activeDebtors = await pool
      .request()
      .query(
        `select * from vw_ActiveDebtors Where UserId = ${user.id} Order by CustomerId desc`
      );
    console.log(activeDebtors);
    return activeDebtors;
  } catch (error) {
    console.log(error);
  }
};
const getActiveCreditors = async () => {
  try {
    let pool = await sql.connect(config);
    let activeCreditors = await pool
      .request()
      .query(
        `select * from vw_ActiveSuppliers Where UserId = ${user.id} Order by SupplierId desc`
      );
    console.log(activeCreditors);
    return activeCreditors;
  } catch (error) {
    console.log(error);
  }
};
const getCapexs = async () => {
  try {
    let pool = await sql.connect(config);
    let capexs = await pool
      .request()
      .query(
        `select * from vw_FixedAsset Where UserId = ${user.id} Order by FAId desc`
      );
    console.log(capexs);
    return capexs;
  } catch (error) {
    console.log(error);
  }
};
const getAllExpenses = async () => {
  try {
    let pool = await sql.connect(config);
    let expenses = await pool
      .request()
      .query(
        `select * from vw_Expense  Where UserId = ${user.id} Order by ExpenseId desc`
      );
    console.log(expenses);
    return expenses;
  } catch (error) {
    console.log(error);
  }
};
const getAllBirdSales = async () => {
  try {
    let pool = await sql.connect(config);
    let birdSales = await pool
      .request()
      .query(
        `select * from vw_BirdSales  Where UserId = ${user.id} Order by SalesId desc`
      );
    console.log(birdSales);
    return birdSales;
  } catch (error) {
    console.log(error);
  }
};
const getAllOtherSales = async () => {
  try {
    let pool = await sql.connect(config);
    let otherSales = await pool
      .request()
      .query(
        `select * from vw_OtherSales  Where UserId = ${user.id} Order by OtherSalesId desc`
      );
    console.log(otherSales);
    return otherSales;
  } catch (error) {
    console.log(error);
  }
};
const getAllDocPurchase = async () => {
  try {
    let pool = await sql.connect(config);
    let docPurchase = await pool
      .request()
      .query(
        `select * from vw_DocPurchase  Where UserId = ${user.id} Order by DOCPurchaseId desc`
      );
    console.log(docPurchase);
    return docPurchase;
  } catch (error) {
    console.log(error);
  }
};
const getAllDocMortality = async () => {
  try {
    let pool = await sql.connect(config);
    let docMortality = await pool
      .request()
      .query(
        `select * from vw_DocMortality  Where UserId = ${user.id} Order by MortalityId desc`
      );
    console.log(docMortality);
    return docMortality;
  } catch (error) {
    console.log(error);
  }
};
const getAllDrugPurchase = async () => {
  try {
    let pool = await sql.connect(config);
    let drugPurchase = await pool
      .request()
      .query(
        `select * from vw_DrugPurchase  Where UserId = ${user.id} Order by DrugPurchaseId desc`
      );
    console.log(drugPurchase);
    return drugPurchase;
  } catch (error) {
    console.log(error);
  }
};
const getAllDrugConsumed = async () => {
  try {
    let pool = await sql.connect(config);
    let drugConsumed = await pool
      .request()
      .query(
        `select * from vw_DrugConsumption  Where UserId = ${user.id} Order by DrugConsumptionId desc`
      );
    console.log(drugConsumed);
    return drugConsumed;
  } catch (error) {
    console.log(error);
  }
};
const getAllFeedPurchase = async () => {
  try {
    let pool = await sql.connect(config);
    let feedPurchase = await pool
      .request()
      .query(
        `select * from vw_FeedPurchase  Where UserId = ${user.id}  Order by FeedPurchaseId desc`
      );
    console.log(feedPurchase);
    return feedPurchase;
  } catch (error) {
    console.log(error);
  }
};
const getAllFeedConsumed = async () => {
  try {
    let pool = await sql.connect(config);
    let feedConsumed = await pool
      .request()
      .query(
        `select * from vw_FeedConsumption  Where UserId = ${user.id} Order by FeedConsumptionId desc`
      );
    console.log(feedConsumed);
    return feedConsumed;
  } catch (error) {
    console.log(error);
  }
};
// GET REQUESTS END

module.exports = {
  createBirdSales,
  createCapex,
  createDocMortality,
  createDocPurchase,
  createDrugConsumed,
  createDrugPurchase,
  createDepr,
  createExpense,
  createFeedConsumed,
  createFeedPurchase,
  createOtherSales,
  createUserValidation,
  getCapexs,
  getAllDocMortality,
  getAllDocPurchase,
  getAllDrugConsumed,
  getAllDrugPurchase,
  getAllExpenses,
  getAllFeedConsumed,
  getAllFeedPurchase,
  getAllBirdSales,
  getAllOtherSales,
  getActiveCreditors,
  getActiveDebtors,
  getBanks,
  getBirdTypes,
  getDocPurchases,
  getDrugs,
  getExpenseType,
  getExpenseHead,
  getFeeds,
  getLogin,
  getOtherItems,
  getPmtMethod,
  getUser,
  getAssetType,
  getTxnType,
  payDebt,
};
