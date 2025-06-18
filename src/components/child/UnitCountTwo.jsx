"use client";
import useReactApexChart from "@/hook/useReactApexChart";
import { Icon } from "@iconify/react/dist/iconify.js";
import ApiService from "@/app/api-services/apiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const UnitCountTwo = () => {
  let { createChart } = useReactApexChart();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from JSON file
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const response = await ApiService.get("analytics/summary");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="col-xxl-8">
      <div className="row gy-4">
        <div className="col-xxl-4 col-sm-6">
          <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                <div className="d-flex align-items-center gap-2">
                  <span className="mb-0 w-48-px h-48-px bg-primary-600 flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                    <Icon icon="mingcute:user-follow-fill" className="icon" />
                  </span>
                  <div>
                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                      Members
                    </span>
                    <h6 className="fw-semibold">
                      {data.total_counts?.members}
                    </h6>
                  </div>
                </div>
                <div
                  id="new-user-chart"
                  className="remove-tooltip-title rounded-tooltip-value"
                >
                  {/* Pass the color value here
                  {createChart("#487fff")} */}
                </div>
              </div>
              <p className="text-sm mb-0">
                {data.growth_analytics?.members.trend === "up" ? (
                  <span>
                    Increase by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                      +{data.growth_analytics?.members.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : data.growth_analytics?.members.trend === "down" ? (
                  <span>
                    Decrease by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-danger-main text-sm">
                      -{data.growth_analytics?.members.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : (
                  <span>
                    No change{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-warning-main text-sm">
                      {data.growth_analytics?.members.growth_percentage}%
                    </span>{" "}this week
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-sm-6">
          <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-2">
            <div className="card-body p-0">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                <div className="d-flex align-items-center gap-2">
                  <span className="mb-0 w-48-px h-48-px bg-success-main flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6">
                    <Icon icon="mingcute:user-follow-fill" className="icon" />
                  </span>
                  <div>
                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                      Feeds
                    </span>
                    <h6 className="fw-semibold">{data.total_counts?.feeds}</h6>
                  </div>
                </div>
                <div
                  id="active-user-chart"
                  className="remove-tooltip-title rounded-tooltip-value"
                >
                  {/* Pass the color value here
                  {createChart("#45b369")} */}
                </div>
              </div>
              <p className="text-sm mb-0">
              {data.growth_analytics?.feeds.trend === "up" ? (
                  <span>
                    Increase by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                      +{data.growth_analytics?.feeds.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : data.growth_analytics?.feeds.trend === "down" ? (
                  <span>
                    Decrease by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-danger-main text-sm">
                      -{data.growth_analytics?.feeds.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : (
                  <span>
                    No change{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-warning-main text-sm">
                      {data.growth_analytics?.feeds.growth_percentage}%
                    </span>{" "}this week
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-sm-6">
          <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-3">
            <div className="card-body p-0">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                <div className="d-flex align-items-center gap-2">
                  <span className="mb-0 w-48-px h-48-px bg-yellow text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                    <Icon icon="iconamoon:discount-fill" className="icon" />
                  </span>
                  <div>
                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                      Job Posts
                    </span>
                    <h6 className="fw-semibold">
                      {data.total_counts?.job_posts}
                    </h6>
                  </div>
                </div>
                <div
                  id="total-sales-chart"
                  className="remove-tooltip-title rounded-tooltip-value"
                >
                  {/* Pass the color value here
                  {createChart("#f4941e")} */}
                </div>
              </div>
              <p className="text-sm mb-0">
              {data.growth_analytics?.job_posts.trend === "up" ? (
                  <span>
                    Increase by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                      +{data.growth_analytics?.job_posts.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : data.growth_analytics?.job_posts.trend === "down" ? (
                  <span>
                    Decrease by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-danger-main text-sm">
                      -{data.growth_analytics?.job_posts.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : (
                  <span>
                    No change{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-warning-main text-sm">
                      {data.growth_analytics?.job_posts.growth_percentage}%
                    </span>{" "}this week
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-sm-6">
          <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-4">
            <div className="card-body p-0">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                <div className="d-flex align-items-center gap-2">
                  <span className="mb-0 w-48-px h-48-px bg-purple text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                    <Icon icon="mdi:message-text" className="icon" />
                  </span>
                  <div>
                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                      Events
                    </span>
                    <h6 className="fw-semibold">{data.total_counts?.events}</h6>
                  </div>
                </div>
                <div
                  id="conversion-user-chart"
                  className="remove-tooltip-title rounded-tooltip-value"
                >
                  {/* Pass the color value here
                  {createChart("#8252e9")} */}
                </div>
              </div>
              <p className="text-sm mb-0">
              {data.growth_analytics?.events.trend === "up" ? (
                  <span>
                    Increase by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                      +{data.growth_analytics?.events.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : data.growth_analytics?.events.trend === "down" ? (
                  <span>
                    Decrease by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-danger-main text-sm">
                      -{data.growth_analytics?.events.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : (
                  <span>
                    No change{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-warning-main text-sm">
                      {data.growth_analytics?.events.growth_percentage}%
                    </span>{" "}this week
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-sm-6">
          <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-5">
            <div className="card-body p-0">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                <div className="d-flex align-items-center gap-2">
                  <span className="mb-0 w-48-px h-48-px bg-pink text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                    <Icon icon="mdi:leads" className="icon" />
                  </span>
                  <div>
                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                      News
                    </span>
                    <h6 className="fw-semibold">{data.total_counts?.news}</h6>
                  </div>
                </div>
                <div
                  id="leads-chart"
                  className="remove-tooltip-title rounded-tooltip-value"
                >
                  {/* Pass the color value here
                  {createChart("#de3ace")} */}
                </div>
              </div>
              <p className="text-sm mb-0">
              {data.growth_analytics?.news.trend === "up" ? (
                  <span>
                    Increase by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                      +{data.growth_analytics?.news.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : data.growth_analytics?.news.trend === "down" ? (
                  <span>
                    Decrease by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-danger-main text-sm">
                      -{data.growth_analytics?.news.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : (
                  <span>
                    No change{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-warning-main text-sm">
                      {data.growth_analytics?.news.growth_percentage}%
                    </span>{" "}this week
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-sm-6">
          <div className="card p-3 shadow-2 radius-8 border input-form-light h-100 bg-gradient-end-6">
            <div className="card-body p-0">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                <div className="d-flex align-items-center gap-2">
                  <span className="mb-0 w-48-px h-48-px bg-cyan text-white flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                    <Icon icon="streamline:bag-dollar-solid" className="icon" />
                  </span>
                  <div>
                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                      Magazine
                    </span>
                    <h6 className="fw-semibold">
                      {data.total_counts?.magazines}
                    </h6>
                  </div>
                </div>
                <div
                  id="total-profit-chart"
                  className="remove-tooltip-title rounded-tooltip-value"
                >
                  {/* Pass the color value here
                  {createChart("#00b8f2")} */}
                </div>
              </div>
              <p className="text-sm mb-0">
              {data.growth_analytics?.magazines.trend === "up" ? (
                  <span>
                    Increase by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                      +{data.growth_analytics?.magazines.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : data.growth_analytics?.magazines.trend === "down" ? (
                  <span>
                    Decrease by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-danger-main text-sm">
                      -{data.growth_analytics?.magazines.growth_percentage}%
                    </span>{" "}this week
                  </span>
                ) : (
                  <span>
                    No change{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-warning-main text-sm">
                      {data.growth_analytics?.magazines.growth_percentage}%
                    </span>{" "}this week
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitCountTwo;
