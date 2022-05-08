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

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
//Get User Login
// ---------------------------------------------------------------------
// DOC PURCHASES START
const getDocPurchases = async (invoiceNo) => {
  try {
    let pool = await sql.connect(config);
    let purchases = await pool
      .request()
      .query(`select * from vwDOCPurchase_1 Where InvoiceNo = '${invoiceNo}'`);
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
      .input("ExpenseType", sql.NVarChar, purchase.ExpenseType)
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

// Debtor Pay START
const debtorPay = async (debtor) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("Id", sql.Int, debtor.theDebtor).execute("sp_DebtorPay");
  } catch (error) {
    console.log(error);
  }
};
// Debtor Pay END
// Creditor Pay START
const creditorPay = async (creditor) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("Id", sql.Int, creditor.theCreditor)
      .execute("sp_CreditorPay");
  } catch (error) {
    console.log(error);
  }
};
// Creditor Pay END
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
// POL MORTALITY START
const createPolMortality = async (mortality) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("TxnDate", sql.Date, mortality.TxnDate)
      .input("Batch", sql.Int, mortality.Batch)
      .input("Qty", sql.Int, mortality.Qty)
      .input("UpdType", sql.Int, mortality.UpdType)
      .input("RecId", sql.Int, mortality.RecId)
      .execute("sp_PolMortality");
  } catch (error) {
    console.log(error);
  }
};
// POL MORTALITY END

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
      .input("ExpenseType", sql.NVarChar, purchase.ExpenseType)
      .input("BagWeight", sql.Int, purchase.BagWeight)
      .input("Qty", sql.Int, purchase.Qty)
      .input("UnitPrice", sql.Money, purchase.UnitPrice)
      .input("PmtMethod", sql.NVarChar, purchase.PmtMethod)
      .input("BankName", sql.NVarChar, purchase.BankName)
      .input("Creditor", sql.NVarChar, purchase.Creditor)
      .input("Unit", sql.NVarChar, purchase.Unit)
      .input("DrugForm", sql.NVarChar, purchase.DrugForm)
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
      .input("Unit", sql.NVarChar, consumed.Unit)
      .input("DrugForm", sql.NVarChar, consumed.DrugForm)
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

// Pol Egg START
const createPolEgg = async (sales) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("UserId", sql.Int, user.id);
    request.input("TxnDate", sql.Date, sales.TxnDate);
    request.input("InvoiceNo", sql.Int, sales.InvoiceNo);
    request.input("CrateQty", sql.Int, sales.CrateQty);
    request.input("Batch", sql.Int, sales.Batch);
    request.input("UnitPrice", sql.Money, sales.UnitPrice);
    request.input("PmtMethod", sql.NVarChar, sales.PmtMethod);
    request.input("Debtor", sql.NVarChar, sales.Debtor);
    request.input("BankName", sql.NVarChar, sales.BankName);
    request.input("UpdType", sql.Int, sales.UpdType);
    request.input("RecId", sql.Int, sales.RecId);
    request.execute("sp_PolEgg");
  } catch (error) {
    console.log(error);
  }
};
// Pol Egg END
// Pol Layer START
const createPolLayer = async (convert) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("UserId", sql.Int, user.id);
    request.input("TxnDate", sql.Date, convert.TxnDate);
    request.input("InvoiceNo", sql.Int, convert.InvoiceNo);
    request.input("ExpenseType", sql.NVarChar, convert.ExpenseType);
    request.input("Batch", sql.Int, convert.Batch);
    request.input("Qty", sql.Int, convert.Qty);
    request.input("UnitPrice", sql.Money, convert.UnitPrice);
    request.input("PmtMethod", sql.NVarChar, convert.PmtMethod);
    request.input("Creditor", sql.NVarChar, convert.Creditor);
    request.input("BankName", sql.NVarChar, convert.BankName);
    request.input("UpdType", sql.Int, convert.UpdType);
    request.input("RecId", sql.Int, convert.RecId);
    request.execute("sp_Pol_Convert");
  } catch (error) {
    console.log(error);
  }
};
// Pol Layer END
// BIRD SALES START
const createBirdSales = async (sales) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("UserId", sql.Int, user.id);
    request.input("TxnDate", sql.Date, sales.TxnDate);
    request.input("InvoiceNo", sql.Int, sales.InvoiceNo);
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
// FROZEN CHICKEN SALES START
const createFrozenChickenSales = async (sales) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("UserId", sql.Int, user.id);
    request.input("TxnDate", sql.Date, sales.TxnDate);
    request.input("InvoiceNo", sql.Int, sales.InvoiceNo);
    request.input("Weight", sql.Int, sales.Weight);
    request.input("Qty", sql.Int, sales.Qty);
    request.input("UnitPrice", sql.Money, sales.UnitPrice);
    request.input("PmtMethod", sql.NVarChar, sales.PmtMethod);
    request.input("Debtor", sql.NVarChar, sales.Debtor);
    request.input("BankName", sql.NVarChar, sales.BankName);
    request.input("UpdType", sql.Int, sales.UpdType);
    request.input("RecId", sql.Int, sales.RecId);
    request.execute("sp_FrozenChickenSales");
  } catch (error) {
    console.log(error);
  }
};
// FROZEN CHICKEN SALES END
// POL SALES START
const createPolSales = async (sales) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("UserId", sql.Int, user.id);
    request.input("TxnDate", sql.Date, sales.TxnDate);
    request.input("InvoiceNo", sql.Int, sales.InvoiceNo);
    request.input("Batch", sql.Int, sales.Batch);
    request.input("Qty", sql.Int, sales.Qty);
    request.input("UnitPrice", sql.Money, sales.UnitPrice);
    request.input("PmtMethod", sql.NVarChar, sales.PmtMethod);
    request.input("Debtor", sql.NVarChar, sales.Debtor);
    request.input("BankName", sql.NVarChar, sales.BankName);
    request.input("UpdType", sql.Int, sales.UpdType);
    request.input("RecId", sql.Int, sales.RecId);
    request.execute("sp_PolSales");
  } catch (error) {
    console.log(error);
  }
};
// POL SALES END

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
      .input("ExpenseType", sql.NVarChar, purchase.ExpenseType)
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
// FARM HANDS START
const createFarmHands = async (hands) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("FirstName", sql.NVarChar, hands.FirstName)
      .input("LastName", sql.NVarChar, hands.LastName)
      .input("DOB", sql.Date, hands.DOB)
      .input("Address", sql.NVarChar, hands.Address)
      .input("MobilePhone", sql.NVarChar, hands.MobilePhone)
      .input("OfficePhone", sql.NVarChar, hands.OfficePhone)
      .input("NOK", sql.NVarChar, hands.NOK)
      .input("Guarantor", sql.NVarChar, hands.Guarantor)
      .input("GuarantorMobile", sql.NVarChar, hands.GuarantorMobile)
      .input("GuarantorOffice", sql.NVarChar, hands.GuarantorOffice)
      .input("GuarantorAddress", sql.NVarChar, hands.GuarantorAddress)
      .input("State", sql.NVarChar, hands.State)
      .input("UpdType", sql.Int, hands.UpdType)
      .input("RecId", sql.Int, hands.RecId)
      .execute("sp_FarmHands");
  } catch (error) {
    console.log(error);
  }
};
// FARM HANDS END
// DOC SALES START
const createDocSales = async (sales) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, sales.LastUpdated)
      .input("Hatchery", sql.NVarChar, sales.Hatchery)
      .input("Broiler", sql.Int, sales.Broiler)
      .input("Noiler", sql.Int, sales.Noiler)
      .input("Cockerel", sql.Int, sales.Cockerel)
      .input("Layer", sql.Int, sales.Layer)
      .execute("sp_DocSales");
  } catch (error) {
    console.log(error);
  }
};
// DOC SALES END
// FEED MART START
const createFeedMart = async (mart) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, mart.LastUpdated)
      .input("Brand", sql.NVarChar, mart.Brand)
      .input("Variant", sql.NVarChar, mart.Variant)
      .input("Formulation", sql.NVarChar, mart.Formulation)
      .input("Price", sql.Int, mart.Price)
      .execute("sp_FeedMart");
  } catch (error) {
    console.log(error);
  }
};
// FEED MART END
// MULTIVITAMINS START
const createMultivitamin = async (multivitamin) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, multivitamin.LastUpdated)
      .input("Producer", sql.NVarChar, multivitamin.Producer)
      .input("Brand", sql.NVarChar, multivitamin.Brand)
      .input("Mediums", sql.NVarChar, multivitamin.Mediums)
      .input("KgPerMl", sql.Int, multivitamin.KgPerMl)
      .input("Price", sql.Int, multivitamin.Price)
      .execute("sp_DrugMultivitamin");
  } catch (error) {
    console.log(error);
  }
};
// MULTIVITAMINS END
// ANTIBIOTICS START
const createAntibiotics = async (antibiotics) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, antibiotics.LastUpdated)
      .input("Producer", sql.NVarChar, antibiotics.Producer)
      .input("Brand", sql.NVarChar, antibiotics.Brand)
      .input("Mediums", sql.NVarChar, antibiotics.Mediums)
      .input("KgPerMl", sql.Int, antibiotics.KgPerMl)
      .input("Price", sql.Int, antibiotics.Price)
      .execute("sp_DrugAntibiotics");
  } catch (error) {
    console.log(error);
  }
};
// ANTIBIOTICS END
// ANTICOCCIDIOSIS START
const createAnticoccidiosis = async (anticoccidiosis) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, anticoccidiosis.LastUpdated)
      .input("Producer", sql.NVarChar, anticoccidiosis.Producer)
      .input("Brand", sql.NVarChar, anticoccidiosis.Brand)
      .input("Mediums", sql.NVarChar, anticoccidiosis.Mediums)
      .input("KgPerMl", sql.Int, anticoccidiosis.KgPerMl)
      .input("Price", sql.Int, anticoccidiosis.Price)
      .execute("sp_DrugAnticoccidiosis");
  } catch (error) {
    console.log(error);
  }
};
// ANTICOCCIDIOSIS END
// ANTIVIRAL START
const createAntiviral = async (antiviral) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, antiviral.LastUpdated)
      .input("Producer", sql.NVarChar, antiviral.Producer)
      .input("Brand", sql.NVarChar, antiviral.Brand)
      .input("Mediums", sql.NVarChar, antiviral.Mediums)
      .input("KgPerMl", sql.Int, antiviral.KgPerMl)
      .input("Price", sql.Int, antiviral.Price)
      .execute("sp_DrugAntiviral");
  } catch (error) {
    console.log(error);
  }
};
// ANTIVIRAL END
// LASOTA START
const createLasota = async (lasota) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, lasota.LastUpdated)
      .input("Producer", sql.NVarChar, lasota.Producer)
      .input("Brand", sql.NVarChar, lasota.Brand)
      .input("Mediums", sql.NVarChar, lasota.Mediums)
      .input("KgPerMl", sql.Int, lasota.KgPerMl)
      .input("Price", sql.Int, lasota.Price)
      .execute("sp_DrugLasota");
  } catch (error) {
    console.log(error);
  }
};
// LASOTA END
// GUMBORO START
const createGumboro = async (gumboro) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, gumboro.LastUpdated)
      .input("Producer", sql.NVarChar, gumboro.Producer)
      .input("Brand", sql.NVarChar, gumboro.Brand)
      .input("Mediums", sql.NVarChar, gumboro.Mediums)
      .input("KgPerMl", sql.Int, gumboro.KgPerMl)
      .input("Price", sql.Int, gumboro.Price)
      .execute("sp_DrugGumboro");
  } catch (error) {
    console.log(error);
  }
};
// GUMBORO END
// DEWORM START
const createDeworm = async (deworm) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, deworm.LastUpdated)
      .input("Producer", sql.NVarChar, deworm.Producer)
      .input("Brand", sql.NVarChar, deworm.Brand)
      .input("Mediums", sql.NVarChar, deworm.Mediums)
      .input("KgPerMl", sql.Int, deworm.KgPerMl)
      .input("Price", sql.Int, deworm.Price)
      .execute("sp_DrugDeworm");
  } catch (error) {
    console.log(error);
  }
};
// DEWORM END
// CORYZA START
const createCoryza = async (coryza) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, coryza.LastUpdated)
      .input("Producer", sql.NVarChar, coryza.Producer)
      .input("Brand", sql.NVarChar, coryza.Brand)
      .input("Mediums", sql.NVarChar, coryza.Mediums)
      .input("KgPerMl", sql.Int, coryza.KgPerMl)
      .input("Price", sql.Int, coryza.Price)
      .execute("sp_DrugCoryza");
  } catch (error) {
    console.log(error);
  }
};
// CORYZA END
// FARMGATE START
const createFarmgate = async (farmgate) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, farmgate.LastUpdated)
      .input("Farm", sql.NVarChar, farmgate.Farm)
      .input("Blc", sql.Int, farmgate.Blc)
      .input("Bfc", sql.Int, farmgate.Bfc)
      .input("Nlc", sql.Int, farmgate.Nlc)
      .input("Nfc", sql.Int, farmgate.Nfc)
      .input("Clc", sql.Int, farmgate.Clc)
      .input("Cfc", sql.Int, farmgate.Cfc)
      .input("Llc", sql.Int, farmgate.Llc)
      .input("Lfc", sql.Int, farmgate.Lfc)
      .execute("sp_Farmgate");
  } catch (error) {
    console.log(error);
  }
};
// FARMGATE END
// FARMGATE START
const createFarmgateEggs = async (farmgate) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("LastUpdated", sql.Date, farmgate.LastUpdated)
      .input("Farm", sql.NVarChar, farmgate.Farm)
      .input("BCrate", sql.Int, farmgate.BCrate)
      .input("NCrate", sql.Int, farmgate.NCrate)
      .input("CCrate", sql.Int, farmgate.CCrate)
      .input("LCrate", sql.Int, farmgate.LCrate)
      .execute("sp_FarmgateEggs");
  } catch (error) {
    console.log(error);
  }
};
// FARMGATE END
// SUPPLY PIPELINE START
const createSupplyPipeline = async (supply) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("Farm", sql.NVarChar, supply.Farm)
      .input("LastUpdated", sql.Date, supply.LastUpdated)
      .input("BroilerEmd", sql.Date, supply.BroilerEmd)
      .input("NoilerEmd", sql.Date, supply.NoilerEmd)
      .input("CockerelEmd", sql.Date, supply.CockerelEmd)
      .input("LayerEmd", sql.Date, supply.LayerEmd)
      .input("PolEmd", sql.Date, supply.PolEmd)
      .input("BroilerEq", sql.Int, supply.BroilerEq)
      .input("NoilerEq", sql.Int, supply.NoilerEq)
      .input("CockerelEq", sql.Int, supply.CockerelEq)
      .input("LayerEq", sql.Int, supply.LayerEq)
      .input("PolEq", sql.Int, supply.PolEq)
      .input("BroilerEw", sql.Int, supply.BroilerEw)
      .input("NoilerEw", sql.Int, supply.NoilerEw)
      .input("CockerelEw", sql.Int, supply.CockerelEw)
      .input("LayerEw", sql.Int, supply.LayerEw)
      .input("PolEw", sql.Int, supply.PolEw)
      .input("Name", sql.NVarChar, supply.Name)
      .input("Phone", sql.NVarChar, supply.Phone)
      .input("Address", sql.NVarChar, supply.Address)
      .execute("sp_SupplyPipeline");
  } catch (error) {
    console.log(error);
  }
};
// SUPPLY PIPELINE END
// CASHBOOK START
const createCashbook = async (cash) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request
      .input("UserId", sql.Int, user.id)
      .input("TxnDate", sql.Date, cash.TxnDate)
      .input("TxnRef", sql.NVarChar, cash.TxnRef)
      .input("TxnDesc", sql.NVarChar, cash.TxnDesc)
      .input("TxnType", sql.NVarChar, cash.TxnType)
      .input("Cash", sql.Money, cash.Cash)
      .input("Bank1", sql.Money, cash.Bank1)
      .input("Bank2", sql.Money, cash.Bank2)
      .input("Bank3", sql.Money, cash.Bank3)
      .input("Debtor", sql.NVarChar, cash.Debtor)
      .input("Creditor", sql.NVarChar, cash.Creditor)
      .input("AccountType", sql.NVarChar, cash.AccountType)
      .execute("sp_CashBook");
  } catch (error) {
    console.log(error);
  }
};
// CASHBOOK END

// GET REQUESTS START
const getDeprDate = async () => {
  try {
    let pool = await sql.connect(config);
    let deprDate = await pool
      .request()
      .query(
        `select max(TxnDate) as LastDeprDate FROM tbl_FA_Transaction where TxnTypeId = 3 and userId = ${user.id}`
      );
    return deprDate;
  } catch (error) {
    console.log(error);
  }
};
const getCashBook = async () => {
  try {
    let pool = await sql.connect(config);
    let cashBook = await pool
      .request()
      .query(
        `select * FROM vw_CashBook where userId = ${user.id} order by CashBookId desc`
      );
    return cashBook;
  } catch (error) {
    console.log(error);
  }
};
const getBirdTypes = async () => {
  try {
    let pool = await sql.connect(config);
    let birds = await pool.request().query("select * from tbl_BirdType");
    return birds;
  } catch (error) {
    console.log(error);
  }
};
const getBanks = async () => {
  try {
    let pool = await sql.connect(config);
    let banks = await pool.request().query("select * from tbl_Bank");
    return banks;
  } catch (error) {
    console.log(error);
  }
};
const getStates = async () => {
  try {
    let pool = await sql.connect(config);
    let states = await pool.request().query("select * from tbl_States");
    return states;
  } catch (error) {
    console.log(error);
  }
};
const getPmtMethod = async () => {
  try {
    let pool = await sql.connect(config);
    let pmtMethod = await pool.request().query("select * from tbl_PmtMethod");
    return pmtMethod;
  } catch (error) {
    console.log(error);
  }
};
const getDrugs = async () => {
  try {
    let pool = await sql.connect(config);
    let drugs = await pool.request().query("select * from tbl_DrugType");
    return drugs;
  } catch (error) {
    console.log(error);
  }
};

const getFeeds = async () => {
  try {
    let pool = await sql.connect(config);
    let feeds = await pool.request().query("select * from tbl_FeedType");
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
    return expenseHead;
  } catch (error) {
    console.log(error);
  }
};
const getAssetType = async () => {
  try {
    let pool = await sql.connect(config);
    let assetType = await pool.request().query("select * from tbl_FA_Type");
    return assetType;
  } catch (error) {
    console.log(error);
  }
};
const getTxnType = async () => {
  try {
    let pool = await sql.connect(config);
    let txnType = await pool.request().query("select * from tbl_TxnType");
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
    return expenses;
  } catch (error) {
    console.log(error);
  }
};
const getAllPolEggs = async () => {
  try {
    let pool = await sql.connect(config);
    let polEggs = await pool
      .request()
      .query(
        `select * from vw_PolEgg Where UserId = ${user.id} Order by PolEggId desc`
      );
    return polEggs;
  } catch (error) {
    console.log(error);
  }
};

const getAllPolLayers = async () => {
  try {
    let pool = await sql.connect(config);
    let polLayers = await pool
      .request()
      .query(
        `select * from vw_PolConvert Where UserId = ${user.id} Order by PolConvertId desc`
      );
    return polLayers;
  } catch (error) {
    console.log(error);
  }
};

const getAllPolMortality = async () => {
  try {
    let pool = await sql.connect(config);
    let polMortality = await pool
      .request()
      .query(
        `select * from vw_PolMortality Where UserId = ${user.id} Order by MortalityId desc`
      );
    return polMortality;
  } catch (error) {
    console.log(error);
  }
};

const getAllPolSales = async () => {
  try {
    let pool = await sql.connect(config);
    let polSales = await pool
      .request()
      .query(
        `select * from vw_PolSales Where UserId = ${user.id} Order by SalesId desc`
      );
    return polSales;
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
    return birdSales;
  } catch (error) {
    console.log(error);
  }
};
const getAllFrozenChickenSales = async () => {
  try {
    let pool = await sql.connect(config);
    let frozenChickenSales = await pool
      .request()
      .query(
        `select * from vw_FrozenChickenSales  Where UserId = ${user.id} Order by SalesId desc`
      );
    return frozenChickenSales;
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
    return feedConsumed;
  } catch (error) {
    console.log(error);
  }
};
const getReports = async () => {
  try {
    let pool = await sql.connect(config);
    let reports = await pool
      .request()
      .query(
        `select * from vw_Reports  Where UserId = ${user.id} Order by ReportId desc`
      );
    return reports;
  } catch (error) {
    console.log(error);
  }
};
const getFarmHands = async () => {
  try {
    let pool = await sql.connect(config);
    let farmHands = await pool.request().query(`select * from vw_FarmHands`);
    return farmHands;
  } catch (error) {
    console.log(error);
  }
};
const getDocSales = async () => {
  try {
    let pool = await sql.connect(config);
    let docSales = await pool.request().query(`select * from vw_DocSales`);
    return docSales;
  } catch (error) {
    console.log(error);
  }
};
const getSupplyPipeline = async () => {
  try {
    let pool = await sql.connect(config);
    let supplyPipeline = await pool
      .request()
      .query(`select * from vw_SupplyPipeline`);
    return supplyPipeline;
  } catch (error) {
    console.log(error);
  }
};
const getFeedMart = async () => {
  try {
    let pool = await sql.connect(config);
    let feedMart = await pool.request().query(`select * from vw_FeedMart`);
    return feedMart;
  } catch (error) {
    console.log(error);
  }
};
const getMultivitamins = async () => {
  try {
    let pool = await sql.connect(config);
    let multivitamin = await pool
      .request()
      .query(`select * from vw_DrugMultivitamin`);
    return multivitamin;
  } catch (error) {
    console.log(error);
  }
};
const getAntibiotics = async () => {
  try {
    let pool = await sql.connect(config);
    let antibiotics = await pool
      .request()
      .query(`select * from vw_DrugAntibiotics`);
    return antibiotics;
  } catch (error) {
    console.log(error);
  }
};
const getAnticoccidiosis = async () => {
  try {
    let pool = await sql.connect(config);
    let anticoccidiosis = await pool
      .request()
      .query(`select * from vw_DrugAnticoccidiosis`);
    return anticoccidiosis;
  } catch (error) {
    console.log(error);
  }
};
const getAntiviral = async () => {
  try {
    let pool = await sql.connect(config);
    let antiviral = await pool
      .request()
      .query(`select * from vw_DrugAntiviral`);
    return antiviral;
  } catch (error) {
    console.log(error);
  }
};
const getLasota = async () => {
  try {
    let pool = await sql.connect(config);
    let lasota = await pool.request().query(`select * from vw_DrugLasota`);
    return lasota;
  } catch (error) {
    console.log(error);
  }
};
const getGumboro = async () => {
  try {
    let pool = await sql.connect(config);
    let gumboro = await pool.request().query(`select * from vw_DrugGumboro`);
    return gumboro;
  } catch (error) {
    console.log(error);
  }
};
const getDeworm = async () => {
  try {
    let pool = await sql.connect(config);
    let deworm = await pool.request().query(`select * from vw_DrugDeworm`);
    return deworm;
  } catch (error) {
    console.log(error);
  }
};
const getCoryza = async () => {
  try {
    let pool = await sql.connect(config);
    let coryza = await pool.request().query(`select * from vw_DrugCoryza`);
    return coryza;
  } catch (error) {
    console.log(error);
  }
};
const getFarmgate = async () => {
  try {
    let pool = await sql.connect(config);
    let farmgate = await pool.request().query(`select * from vw_Farmgate`);
    return farmgate;
  } catch (error) {
    console.log(error);
  }
};
const getFarmgateEggs = async () => {
  try {
    let pool = await sql.connect(config);
    let farmgateEggs = await pool
      .request()
      .query(`select * from vw_FarmgateEggs`);
    return farmgateEggs;
  } catch (error) {
    console.log(error);
  }
};
const getOperatingExpense = async () => {
  try {
    let pool = await sql.connect(config);
    let operatingExpense = await pool
      .request()
      .query(`select * from vw_OperatingExpense Where UserId = ${user.id}`);
    return operatingExpense;
  } catch (error) {
    console.log(error);
  }
};
// GET REQUESTS END

module.exports = {
  createCashbook,
  createCoryza,
  createGumboro,
  createAntiviral,
  createAnticoccidiosis,
  createAntibiotics,
  createSupplyPipeline,
  createMultivitamin,
  createLasota,
  createPolEgg,
  createPolLayer,
  createBirdSales,
  createFrozenChickenSales,
  createCapex,
  createFeedMart,
  createDocMortality,
  createDeworm,
  createDocPurchase,
  createDrugConsumed,
  createDrugPurchase,
  createDepr,
  createExpense,
  createFeedConsumed,
  createFeedPurchase,
  createOtherSales,
  createFarmHands,
  createPolMortality,
  createPolSales,
  createDocSales,
  createUserValidation,
  createFarmgate,
  createFarmgateEggs,
  getDeworm,
  getCapexs,
  getAllDocMortality,
  getAllDocPurchase,
  getAllDrugConsumed,
  getAllDrugPurchase,
  getAllExpenses,
  getAllFeedConsumed,
  getGumboro,
  getOperatingExpense,
  getAllFeedPurchase,
  getAllBirdSales,
  getAllFrozenChickenSales,
  getAllOtherSales,
  getAntiviral,
  getFarmgate,
  getFarmgateEggs,
  getLasota,
  getFeedMart,
  getAllPolLayers,
  getActiveCreditors,
  getAnticoccidiosis,
  getSupplyPipeline,
  getActiveDebtors,
  getAllPolEggs,
  getBanks,
  getStates,
  getBirdTypes,
  getAntibiotics,
  getDocPurchases,
  getDrugs,
  getExpenseType,
  getMultivitamins,
  getExpenseHead,
  getFeeds,
  getLogin,
  getOtherItems,
  getPmtMethod,
  getUser,
  getAssetType,
  getAllPolSales,
  getCoryza,
  getAllPolMortality,
  getTxnType,
  getDeprDate,
  getFarmHands,
  getCashBook,
  getReports,
  getDocSales,
  debtorPay,
  creditorPay,
};
