import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const POLLAYERMORTALITY = [
  {
    Header: "Date",
    Footer: "Date",
    accessor: "TxnDate",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/mm/yyyy");
    },
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
];
