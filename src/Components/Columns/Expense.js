import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const EXPENSE = [
  {
    Header: "Date",
    Footer: "Date",
    accessor: "ExpenseDate",
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
    Header: "Type",
    Footer: "Type",
    accessor: "ExpenseName",
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "HeadName",
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
    Header: "Creditor",
    Footer: "Creditor",
    accessor: "SupplierName",
  },
  {
    Header: "Amount",
    Footer: "Amount",
    accessor: "Amount",
  },
];
