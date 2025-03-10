"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import UploadPDF from "./upload-file";

const EditMagazine = ({ title, description }) => {
  const [formData, setFormData] = useState({
    title: title,
    description: description,
  });

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Edit Details</h5>
        </div>
        <div className="card-body">
          <form className="row gy-3 needs-validation" noValidate="">
            <UploadPDF />
            <div className="col-md-12 mt-32 d-flex justify-content-start">
              <Link
                href={"/magazine"}
                className="btn btn-primary-600"
                type="submit"
              >
                Save Changes
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMagazine;
