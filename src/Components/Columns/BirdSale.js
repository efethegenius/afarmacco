import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const BIRDSALE = [
  {
    Header: "Sales Id",
    Footer: "SalesId",
    accessor: "id",
    disableFilters: true,
  },
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
    Header: "Bird Type",
    Footer: "Bird Type",
    accessor: "BirdName",
  },
  {
    Header: "Batch",
    Footer: "Batch",
    accessor: "Batch",
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
