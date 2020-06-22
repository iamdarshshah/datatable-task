import React, { useState, useMemo } from "react";
import PaginationComponent from "../Pagination";
import TableHeader from "../TableHeader";
import styles from "./Table.module.css";

export default function Table({ data, num }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [totalItems, setTotalItems] = useState(0);

  const ITEMS_PER_PAGE = num;

  const columns = [
    { name: "id", field: "id", sortable: true },
    { name: "name", field: "name", sortable: true },
    { name: "mode", field: "mode", sortable: true },
    { name: "type", field: "type", sortable: true },
    { name: "destination", field: "destination", sortable: false },
    { name: "origin", field: "origin", sortable: false },
    { name: "total", field: "total", sortable: true },
    { name: "status", field: "status", sortable: true },
    { name: "userId", field: "userId", sortable: true },
  ];

  const dbData = useMemo(() => {
    let computedData = data;

    setTotalItems(computedData.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [data, currentPage, sorting]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className={styles.table}>
            <table className={styles.table}>
              <TableHeader
                headers={columns}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {data &&
                  dbData.map((field) => {
                    return (
                      <tr>
                        {columns.map((i) => {
                          return <td>{field[i.name]}</td>;
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <PaginationComponent
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
