"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const MemberData = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [selectedMember, setSelectedMember] = useState(null);

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
      (item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.id && item.id.includes(searchTerm))
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
      <div className="card-header">
        <h5 className="card-title mb-0">Default Data Tables</h5>
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
              <div className="col-sm-6">
                <Link
                href={'/members/create'}
                  type="button"
                  className="btn btn-primary-600 radius-8 px-20 py-11 d-flex align-items-center gap-2 float-end"
                >
                  Add Member{" "}
                  <Icon icon="mingcute:add-fill" className="text-xl" />
                </Link>
              </div>

              <div className="col-sm-6">
                <div className="input-group">
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
      </div>
      <div className="card-body">
        <table className="table bordered-table mb-0" id="dataTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Email</th>
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
                    {item.name}
                  </Link>
                </td>
                <td>{item.title}</td>
                <td>{item.email}</td>
                <td>
                  <Link
                    href="#"
                    className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                    data-bs-toggle='modal'
                    data-bs-target='#viewAllMember'
                    onClick={() => setSelectedMember(item)}
                  >
                    <Icon icon="iconamoon:eye-light" />
                  </Link>
                  <Link
                    href={`/members/edit?id=${item.id}&name=${encodeURIComponent(item.name)}&designation=${encodeURIComponent(item.title)}&email=${encodeURIComponent(item.email)}`}
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

      {/* Modal */}
      <div
        className='modal fade'
        id='viewAllMember'
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content radius-16 bg-base'>
            <div className='modal-header py-16 px-24 border border-top-0 border-start-0 border-end-0'>
              <h1 className='modal-title fs-5'>
                Member Details
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body p-24'>
              {selectedMember && (
                <form action='#'>
                  <div className='row'>
                    <div className='col-6 mb-20'>
                      <label
                        htmlFor='name'
                        className='form-label fw-semibold text-primary-light text-sm mb-8'
                      >
                        Name
                      </label>
                      <input
                        type='text'
                        className='form-control radius-8'
                        id='name'
                        value={selectedMember.name}
                        readOnly
                      />
                    </div>
                    <div className='col-6 mb-20'>
                      <label
                        htmlFor='designation'
                        className='form-label fw-semibold text-primary-light text-sm mb-8'
                      >
                        Designation
                      </label>
                      <input
                        type='text'
                        className='form-control radius-8'
                        id='name'
                        value={selectedMember.title}
                        readOnly
                      />
                    </div>
                    <div className='col-6 mb-20'>
                      <label
                        htmlFor='email'
                        className='form-label fw-semibold text-primary-light text-sm mb-8'
                      >
                        Email
                      </label>
                      <input
                        type='text'
                        className='form-control radius-8'
                        id='name'
                        value={selectedMember.email}
                        readOnly
                      />
                    </div>
                    <div className='col-6 mb-20'>
                      <label
                        htmlFor='image'
                        className='form-label fw-semibold text-primary-light text-sm mb-8'
                      >
                        Image
                      </label>
                      <br/>
                      <img src="/assets/images/avatar/avatar.png" alt=""  className="w-80-px h-80-px rounded-circle object-fit-cover"/>
                      
                    </div>
                    <div className='d-flex align-items-center justify-content-center gap-3 mt-24'>
                      <button
                        className='btn btn-primary border border-primary-600 text-md px-50 py-12 radius-8'
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberData;