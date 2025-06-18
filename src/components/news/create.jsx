"use client"
import { Icon } from "@iconify/react/dist/iconify.js";
import React, {useState} from "react";
import Link from "next/link";
import ImageUpload from "./ImageUpload";
import { useRouter } from 'next/navigation'
import { ApiService } from '@/app/api-services/apiServices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNews = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    active: false
  })
  const [errors, setErrors] = useState({})

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'title':
        if (!value.trim()) {
          error = 'Title is required'
        } else if (value.length < 2) {
          error = 'Title must be at least 2 characters long'
        }
        break
      case 'description':
        if (!value.trim()) {
          error = 'Description is required'
        } else if (value.length < 10) {
          error = 'Description must be at least 10 characters long'
        }
        break
      default:
        break
    }
    return error
  }

  const validateForm = () => {
    const newErrors = {}
    const titleError = validateField('title', formData.title)
    const descriptionError = validateField('description', formData.description)
    
    if (titleError) newErrors.title = titleError
    if (descriptionError) newErrors.description = descriptionError
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validate specific fields
    if (['title', 'description'].includes(name)) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const response = await ApiService.post('news', formData)
      if (response.status === 201) {
        toast.success('News added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          router.push('/news')
        }, 2000);
      } else {
        toast.error('Failed to add news', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Error adding news', {
        position: "top-right",
        autoClose: 3000,
      });
      console.error('Error adding news:', error)
    }
  }

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Add Details</h5>
        </div>
        <div className="card-body">
          <form className="row gy-3 needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mdi:format-title" />
                </span>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mdi:text-box" />
                </span>
                <input
                  type="text"
                  name="description"
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Image</label>
              <ImageUpload />
            </div>

            <div className="col-md-12 mt-32 d-flex justify-content-start">
              <button
                type="submit"
                className="btn btn-primary-600"
                onClick={handleSubmit}
              >
                Add News
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddNews;
