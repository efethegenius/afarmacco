import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const FEEDCONSUMED = [
  {
    Header: "Date",
    Footer: "Date",
    accessor: "ConsumptionDate",
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
    Header: "Feed",
    Footer: "Feed",
    accessor: "FeedName",
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
    Header: "Bag (Qty Used)",
    Footer: "Bag (Qty Used)",
    accessor: "BagQtyUsed",
  },
  {
    Header: "Size (Qty Used)",
    Footer: "Size (Qty Used)",
    accessor: "SizeQtyUsed",
  },
  {
    Header: "Unit Price",
    Footer: "Unit Price",
    accessor: "UnitPrice",
  },
  {
    Header: "Amount Used",
    Footer: "Amount Used",
    accessor: "ValueUsed",
  },
];
