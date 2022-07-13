import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const DOCMORTALITY = [
  {
    Header: "Date",
    Footer: "Date",
    accessor: "MortalityDate",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/mm/yyyy");
    },
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
];
