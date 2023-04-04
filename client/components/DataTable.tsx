import React, { useEffect, useState } from "react";

import { useTable } from "react-table";
import uuid from "react-uuid";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@roketid/windmill-react-ui";
import { EditIcon, TrashIcon } from "icons";
import { usersType } from "~/store/users/usersSlice";
import { NumberParam, useQueryParam } from "use-query-params";

export default function DataTable({
  columns,
  data = [],
  links = null,
  totalResults = null,
  resultsPerPage = null,
  meta = null,
}) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [pageTable, setPageTable] = useQueryParam("page", NumberParam);

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    console.log(pageTable);

    // setDataTable(response2.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
  }, [pageTable]);
  return (
    <TableContainer className="mb-8">
      <Table {...getTableProps()}>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={uuid()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()} key={uuid()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </tr>
          ))}
        </TableHeader>
        <TableBody {...getTableBodyProps()}>
          {rows.length == 0 && (
            <TableRow>
              <TableCell className="text-center" colSpan={10}>
                No Data Found
              </TableCell>
            </TableRow>
          )}

          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={uuid()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()} key={uuid()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {meta && (
        <TableFooter>
          <Pagination
            totalResults={(meta as typeof usersType.meta).total}
            resultsPerPage={(meta as typeof usersType.meta).per_page}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      )}
    </TableContainer>
  );
}
