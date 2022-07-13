import React, { useState, useEffect, useMemo } from "react";
import { Loading } from "../Loading";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { FEEDCONSUMED } from "../Columns/FeedConsumed";
import { GlobalFilter } from "../Columns/GlobalFilter";
import { ColumnFilter } from "../Columns/ColumnFilter";
import { Checkbox } from "../Columns/Checkbox";

export const FeedConsumedTable = React.forwardRef((props, ref) => {
  const [returnedFeedConsumed, setReturnedFeedConsumed] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [birdFilter, setBirdFilter] = useState("");
  const [feedFilter, setFeedFilter] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [isFeedFilter, setIsFeedFilter] = useState(false);
  const [isBirdFilter, setIsBirdFilter] = useState(false);

  // getting feed consumed start-----------------------------------------------------
  const getAllFeedConsumed = async () => {
    try {
      const allFeedConsumed = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-feed-consumed",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedFeedConsumed(allFeedConsumed);
    } catch (error) {
      console.log(error);
    }
  };
  // getting feed consumed end-----------------------------------------------------

  useEffect(() => {
    getAllFeedConsumed();
  }, []);

  // calculating totals-----------------------------------------------------------------
  // let totalAmount;
  // if (returnedFeedConsumed.name) {
  //   totalAmount = data.reduce((a, v) => (a = a + v.ValueUsed), 0);
  // }
  // let totalBag;
  // if (returnedFeedConsumed.name) {
  //   totalBag = data.reduce((a, v) => (a = a + v.BagQtyUsed), 0);
  // }
  // let totalSize;
  // if (returnedFeedConsumed.name) {
  //   totalSize = data.reduce((a, v) => (a = a + v.SizeQtyUsed), 0);
  // }
  // calculating totals-----------------------------------------------------------------

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  const columns = useMemo(() => FEEDCONSUMED, []);
  const data = returnedFeedConsumed.name || [];
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  });

  const {
    getTableProps,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      {data && data.length === 0 ? (
        <div className="empty-main-report">
          <h1> There are no Feed Consumed report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : data ? (
        <>
          <div className="table-container" ref={ref}>
            <table {...getTableProps()} id="table-to-xls">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="table-nav">
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: "50px" }}
              />
            </span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
});
