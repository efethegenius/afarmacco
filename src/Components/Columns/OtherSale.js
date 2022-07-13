import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const OTHERSALE = [
  {
    Header: "Date",
    Footer: "Date",
    accessor: "ItemDate",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/mm/yyyy");
    },
  },
  {
    Header: "Ref",
    Footer: "Ref",
    accessor: "Reference",
  },
  {
    Header: "Item",
    Footer: "Item",
    accessor: "ItemName",
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
