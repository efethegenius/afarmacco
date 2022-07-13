import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const FEEDPURCHASE = [
  {
    Header: "Date",
    Footer: "Date",
    accessor: "PurchaseDate",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/mm/yyyy");
    },
  },
  {
    Header: "Lot No",
    Footer: "Lot No",
    accessor: "LotNo",
  },
  {
    Header: "Invoice No",
    Footer: "Invoice No",
    accessor: "InvoiceNo",
  },
  {
    Header: "Feed",
    Footer: "Feed",
    accessor: "FeedName",
  },
  {
    Header: "Bag Weight (Kg)",
    Footer: "Bag Weight (Kg)",
    accessor: "BagWeight",
  },
  {
    Header: "Quantity",
    Footer: "Quantity",
    accessor: "Qty",
  },
  {
    Header: "Unit Price",
    Footer: "Unit Price",
    accessor: "UnitPrice",
  },
  {
    Header: "Amount",
    Footer: "Amount",
    accessor: "Amount",
  },
  {
    Header: "Expense Type",
    Footer: "Expense Type",
    accessor: "ExpenseName",
  },
  {
    Header: "Payment Type",
    Footer: "Payment Type",
    accessor: "PmtType",
  },
  {
    Header: "Bank",
    Footer: "Bank",
    accessor: "BankName",
  },
  {
    Header: "Supplier",
    Footer: "Supplier",
    accessor: "SupplierName",
  },
];
