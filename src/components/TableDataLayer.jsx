"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const TableDataLayer = ({member, feed, job, events, news}) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  useEffect(() => {
    // Fetch data from JSON file
    fetch("/data.json") // Ensure this path is correct
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  // Sorting function
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Filter data based on search term
  const filteredData = sortedData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.invoice.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="card basic-data-table">
      <div className='card-header'>
        <h5 className='card-title mb-0'>Default Data Tables</h5>
      </div>
      <div className="card-header">
        <div className="row mt-20">
          <div className="col-sm-1 col-md-1">
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="form-select form-select me-2"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-7 p-0 align-content-center">
            <span>entries per page</span>
          </div>
          <div className="col-sm-4">
            <div className="row">
              {member ? (
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-primary-600 radius-8 px-20 py-11 d-flex align-items-center gap-2 float-end"
                  >
                    Add Member{" "}
                    <Icon
                      icon="material-symbols:add"
                      className="text-xl"
                    />
                  </button>
                </div>
              ): <div className="col-sm-6"></div>}
              
              <div className="col-sm-6">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table bordered-table mb-0" id="dataTable">
          <thead>
            <tr>
              <th scope="col">
                <div className="form-check style-check d-flex align-items-center">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label">S.L</label>
                </div>
              </th>
              <th
                scope="col"
                onClick={() => requestSort("invoice")}
                style={{ cursor: "pointer" }}
              >
                Invoice
                {sortConfig.key === "invoice" && (
                  <Icon
                    icon={
                      sortConfig.direction === "ascending"
                        ? "mdi:arrow-up"
                        : "mdi:arrow-down"
                    }
                  />
                )}
              </th>
              <th scope="col">Name</th>
              <th scope="col">Issued Date</th>
              <th
                scope="col"
                onClick={() => requestSort("amount")}
                style={{ cursor: "pointer" }}
              >
                Amount
                {sortConfig.key === "amount" && (
                  <Icon
                    icon={
                      sortConfig.direction === "ascending"
                        ? "mdi:arrow-up"
                        : "mdi:arrow-down"
                    }
                  />
                )}
              </th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="form-check style-check d-flex align-items-center">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">{item.id}</label>
                  </div>
                </td>
                <td>
                  <Link href="#" className="text-primary-600">
                    {item.invoice}
                  </Link>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image} // Assuming image URL is part of the item
                      alt=""
                      className="flex-shrink-0 me-12 radius-8"
                    />
                    <h6 className="text-md mb-0 fw-medium flex-grow-1">
                      {item.name}
                    </h6>
                  </div>
                </td>
                <td>{item.issuedDate}</td>
                <td>{item.amount}</td>
                <td>
                  <span
                    className={`bg-${
                      item.status === "Paid" ? "success" : "warning"
                    }-focus text-${
                      item.status === "Paid" ? "success" : "warning"
                    }-main px-24 py-4 rounded-pill fw-medium text-sm`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  {member ?  <Link
                    href="#"
                    className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                  >
                    <Icon icon="iconamoon:eye-light" />
                  </Link>: ""}
                 
                  <Link
                    href="#"
                    className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                  >
                    <Icon icon="lucide:edit" />
                  </Link>
                  <Link
                    href="#"
                    className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                  >
                    <Icon icon="mingcute:delete-2-line" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination d-flex justify-content-between align-items-center mt-3">
          <div>
            <button
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
              className={`btn btn-sm ${
                currentPage === 0 ? "btn-light" : "btn-secondary"
              }`}
            >
              {"<<"}
            </button>
            <span className="mx-2"></span>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className={`btn btn-sm ${
                currentPage === 0 ? "btn-light" : "btn-secondary"
              }`}
            >
              {"<"}
            </button>
            <span className="mx-2"></span>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`btn btn-sm ${
                  currentPage === index ? "btn-primary" : "btn-light"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <span className="mx-2"></span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))
              }
              disabled={currentPage >= pageCount - 1}
              className={`btn btn-sm ${
                currentPage >= pageCount - 1 ? "btn-light" : "btn-secondary"
              }`}
            >
              {">"}
            </button>
            <span className="mx-2"></span>
            <button
              onClick={() => setCurrentPage(pageCount - 1)}
              disabled={currentPage >= pageCount - 1}
              className={`btn btn-sm ${
                currentPage >= pageCount - 1 ? "btn-light" : "btn-secondary"
              }`}
            >
              {">>"}
            </button>
          </div>
          <span>
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
            entries
          </span>
          <span>
            Page{" "}
            <strong>
              {currentPage + 1} of {pageCount}
            </strong>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableDataLayer;
