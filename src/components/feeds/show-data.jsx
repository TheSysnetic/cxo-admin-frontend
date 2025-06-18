"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import ApiService from "@/app/api-services/apiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedData = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [selectedFeed, setSelectedFeed] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await ApiService.get("feeds");
        setData(response.data.data);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Error loading feeds", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    fetchData();
  }, []);

  // Sorting function
  const sortedData = [...data].sort((a, b) => {
    if (a.id < b.id) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a.id > b.id) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Filter data based on search term
  const filteredData = sortedData.filter(
    (item) =>
      (item.user.name &&
        item.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.user.email &&
        item.user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.id.toString().includes(searchTerm) ||
      (item.approved ? "Approved" : "Pending").toLowerCase().includes(searchTerm.toLowerCase())
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

  // Function to handle approval toggle
  const handleToggleApproval = async (id, currentStatus) => {
    if (currentStatus) {
      toast.warning("Cannot revert approved status", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await ApiService.put(`feeds/${id}/status`, {
        approved: true
      });
      if (response.data.success) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, approved: true } : item
          )
        );
        toast.success("Feed approved successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating feed status:", error);
      toast.error("Error updating feed status", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <h5 className="card-title mb-0">Feed Data Table</h5>
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
              <div className="col-sm-6"></div>
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
              <th scope="col">Description</th>
              <th scope="col">Posted User</th>
              <th scope="col">Approval</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description.split(' ').slice(0, 7).join(' ') + (item.description.split(' ').length > 7 ? '...' : '')}</td>
                <td>{item.user.name}</td>
                <td>
                  <div className="form-switch switch-success d-flex align-items-center gap-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`activeSwitch-${item.id}`}
                      checked={item.approved}
                      disabled={item.approved}
                      onChange={() => handleToggleApproval(item.id, item.approved)}
                    />
                    <label className="form-check-label line-height-1 fw-medium text-secondary-light" htmlFor={`activeSwitch-${item.id}`}>
                      {item.approved ? "Approved" : "Pending"}
                    </label>
                  </div>
                </td>
                <td>
                  <Link
                    href="#"
                    className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#viewFeedDetails"
                    onClick={() => setSelectedFeed(item)}
                  >
                    <Icon icon="iconamoon:eye-light" />
                  </Link>
                  {/* <Link
                    href="#"
                    className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                  >
                    <Icon icon="mingcute:delete-2-line" />
                  </Link> */}
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
              className={`btn btn-sm ${currentPage === 0 ? "btn-light" : "btn-secondary"}`}
            >
              {"<<"}
            </button>
            <span className="mx-2"></span>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className={`btn btn-sm ${currentPage === 0 ? "btn-light" : "btn-secondary"}`}
            >
              {"<"}
            </button>
            <span className="mx-2"></span>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`btn btn-sm ${currentPage === index ? "btn-primary" : "btn-light"}`}
              >
                {index + 1}
              </button>
            ))}
            <span className="mx-2"></span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))}
              disabled={currentPage >= pageCount - 1}
              className={`btn btn-sm ${currentPage >= pageCount - 1 ? "btn-light" : "btn-secondary"}`}
            >
              {">"}
            </button>
            <span className="mx-2"></span>
            <button
              onClick={() => setCurrentPage(pageCount - 1)}
              disabled={currentPage >= pageCount - 1}
              className={`btn btn-sm ${currentPage >= pageCount - 1 ? "btn-light" : "btn-secondary"}`}
            >
              {">>"}
            </button>
          </div>
          <span>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </span>
          <span>
            Page <strong>{currentPage + 1} of {pageCount}</strong>
          </span>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="viewFeedDetails"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-header py-16 px-24 border border-top-0 border-start-0 border-end-0">
              <h1 className="modal-title fs-5">Feed Details</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body p-24">
              {selectedFeed && (
                <form action="#">
                  <div className="row">
                    <div className="col-6 mb-20">
                      <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        ID
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:identifier" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="name"
                          value={selectedFeed.id}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Posted User
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:account" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="name"
                          value={selectedFeed.user.name}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        User Email
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:email" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="name"
                          value={selectedFeed.user.email}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Post Status
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon={selectedFeed.approved ? "mdi:check-circle" : "mdi:clock-outline"} />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="name"
                          value={selectedFeed.approved ? "Approved" : "Pending"}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label htmlFor="description" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Post Description
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:text-box" />
                        </span>
                        <textarea
                          className="form-control radius-8"
                          id="name"
                          value={selectedFeed.description}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label htmlFor="image" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Post Images
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:image" />
                        </span>
                        <img
                          src="/assets/images/avatar/avatar-shape1.png"
                          alt=""
                          className="w-120-px h-120-px object-fit-cover"
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Post Likes
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:heart" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="name"
                          value={selectedFeed.like_count}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <label htmlFor="comments" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Comments
                      </label>
                      <div className="icon-field">
                       
                        <div className="comments-section">
                          {selectedFeed.comments && selectedFeed.comments.length > 0 ? (
                            selectedFeed.comments.map((comment) => (
                              <div key={comment.id} className="comment mb-2">
                                <div className="comment-content">
                                  <strong>{comment.user.name}:</strong> {comment.comment}
                                  {comment.replies && comment.replies.length > 0 && (
                                    <div className="replies ms-4 mt-2">
                                      {comment.replies.map((reply) => (
                                        <div key={reply.id} className="reply mb-1">
                                          <div className="reply-content">
                                            <strong>Reply:</strong> {reply.comment}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No comments available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                      <button className="btn btn-primary border border-primary-600 text-md px-50 py-12 radius-8">
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
      <ToastContainer />
    </div>
  );
};

export default FeedData;
