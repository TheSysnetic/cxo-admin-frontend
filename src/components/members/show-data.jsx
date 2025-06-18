"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import ApiService from "@/app/api-services/apiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    // Fetch data from API using axios
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const response = await ApiService.get("users");
        setData(response.data.users);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await ApiService.delete(`users/${id}`);
      if (response.status === 200) {
        // Update the state by filtering out the deleted member
        setData((prevData) => prevData.filter((member) => member.id !== id));
        toast.success("Member deleted successfully!");
      } else {
        toast.error("Failed to delete member");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Error deleting member");
    }
  };

  // Sorting function
  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => {
        if (!a || !b) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      })
    : [];

  // Filter data based on search term
  const filteredData = sortedData.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.id && item.id.toString().includes(searchTerm))
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
        <h5 className="card-title mb-0">Member Data Table</h5>
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
                  href={"/members/create"}
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
              <th scope="col">Contact</th>
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
                <td>{item.designation}</td>
                <td>{item.email}</td>
                <td>{item.contact_number ? item.contact_number : "-"}</td>
                <td>
                  <Link
                    href="#"
                    className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#viewAllMember"
                    onClick={() => setSelectedMember(item)}
                  >
                    <Icon icon="iconamoon:eye-light" />
                  </Link>
                  <Link
                    href={`/members/edit?id=${item.id}`}
                    className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                  >
                    <Icon icon="lucide:edit" />
                  </Link>
                  <Link
                    href="#"
                    className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                    onClick={() => handleDelete(item.id)}
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
        className="modal fade"
        id="viewAllMember"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-header py-16 px-24 border border-top-0 border-start-0 border-end-0">
              <h1 className="modal-title fs-5">Member Details</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body p-24">
              {selectedMember && (
                <form action="#">
                  <div className="row">
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="name"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Name
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:account" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="name"
                          value={
                            selectedMember.name ? selectedMember.name : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="designation"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Designation
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:briefcase" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="designation"
                          value={
                            selectedMember.designation
                              ? selectedMember.designation
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="email"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Email
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:email" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="email"
                          value={
                            selectedMember.email ? selectedMember.email : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="contact"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Contact
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:phone" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="contact"
                          value={
                            selectedMember.contact_number
                              ? selectedMember.contact_number
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="orgName"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Organization Name
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:office-building" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="orgName"
                          value={
                            selectedMember.organization_name
                              ? selectedMember.organization_name
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="orgStatus"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Organization Status
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:chart-line" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="orgStatus"
                          value={
                            selectedMember.organization_status
                              ? selectedMember.organization_status
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="employees"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Number of Employees
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:account-group" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="employees"
                          value={
                            selectedMember.number_of_employees
                              ? selectedMember.number_of_employees
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="gender"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Gender
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:gender-male-female" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="gender"
                          value={
                            selectedMember.gender ? selectedMember.gender : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="country"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Country
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:map-marker" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="country"
                          value={
                            selectedMember.country
                              ? selectedMember.country
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="city"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        City
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:city" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="city"
                          value={
                            selectedMember.city ? selectedMember.city : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="qualification"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Qualification
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:school" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="qualification"
                          value={
                            selectedMember.qualification
                              ? selectedMember.qualification
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="expertAreas"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Expert Areas
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:lightbulb" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="expertAreas"
                          value={
                            selectedMember.expert_areas
                              ? selectedMember.expert_areas
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="mailingAddress"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Mailing Address
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:map-marker-outline" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="mailingAddress"
                          value={
                            selectedMember.mailing_address
                              ? selectedMember.mailing_address
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="expectationForum"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Expectation Forum
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:forum" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="expectationForum"
                          value={
                            selectedMember.expectation_from_forum
                              ? selectedMember.expectation_from_forum
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-20">
                      <label
                        htmlFor="interestAreas"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Areas of interest
                      </label>
                      <div className="icon-field">
                        <span className="icon">
                          <Icon icon="mdi:star" />
                        </span>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="interestAreas"
                          value={
                            selectedMember.interest_areas
                              ? selectedMember.interest_areas
                              : "-"
                          }
                          readOnly
                        />
                      </div>

                      <div className="col-6 mb-20">
                        <label
                          htmlFor="image"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Image
                        </label>
                        <br />
                        {selectedMember.image == null ? (
                          <img
                            src="/assets/images/avatar/avatar.png"
                            alt="Default avatar"
                            className="w-80-px h-80-px rounded-circle object-fit-cover"
                          />
                        ) : (
                          <img
                            src={
                              process.env.NEXT_PUBLIC_API_BASE_URL +
                              selectedMember.image
                            }
                            alt="Member avatar"
                            className="w-80-px h-80-px rounded-circle object-fit-cover"
                          />
                        )}
                      </div>
                      <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                        <button className="btn btn-primary border border-primary-600 text-md px-50 py-12 radius-8">
                          Close
                        </button>
                      </div>
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

export default MemberData;
