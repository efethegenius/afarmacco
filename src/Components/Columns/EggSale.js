import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const EGGSALE = [
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
    Header: "Quantity (Crates)",
    Footer: "Quantity (Crates)",
    accessor: "CrateQty",
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
    Header: "Customer",
    Footer: "Customer",
    accessor: "CustomerName",
  },
];
