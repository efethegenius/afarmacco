import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const POLLAYER = [
  {
    Header: "Date",
    Footer: "Date",
    accessor: "TxnDate",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/mm/yyyy");
    },
  },
  {
    Header: "Invoice No",
    Footer: "Invoice No",
    accessor: "InvoiceNo",
  },
  {
    Header: "Batch",
    Footer: "Batch",
    accessor: "Batch",
  },
  {
    Header: "Quantity (Purchased)",
    Footer: "Quantity (Purchased)",
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
