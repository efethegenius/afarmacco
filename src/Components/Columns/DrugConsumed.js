import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const DRUGCONSUMED = [
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
    Header: "Drug",
    Footer: "Drug",
    accessor: "DrugName",
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
    Header: "Satchet (Qty Used)",
    Footer: "Satchet (Qty Used)",
    accessor: "SatchetQtyUsed",
  },
  {
    Header: "Size (Qty Used)",
    Footer: "Size (Qty Used)",
    accessor: "SizeQtyUsed",
  },
  {
    Header: "Unit",
    Footer: "Unit",
    accessor: "Unit",
  },
  {
    Header: "Drug Type",
    Footer: "Drug Type",
    accessor: "DrrugForm",
  },
  {
    Header: "Unit Price",
    Footer: "Unit Price",
    accessor: "UnitPrice",
  },
  {
    Header: "Amount Used",
    Footer: "Amount Used",
    accessor: "AmountUsed",
  },
];
