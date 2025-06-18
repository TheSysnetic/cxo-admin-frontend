"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import { ApiService } from '@/app/api-services/apiServices'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditNews = ({ id }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: ''
    })

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    })

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        
        // Validate the field
        const error = validateField(name, value)
        setErrors(prev => ({ ...prev, [name]: error }))
    }

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await ApiService.get(`news/${id}`)
                if (response.data.data) {
                    setFormData({
                        title: response.data.data.title || '',
                        description: response.data.data.description || '',
                        active: response.data.data.active,
                        image: response.data.data.image || ''
                    })
                   
                }
                console.log(response.data.data)
            } catch (error) {
                console.error('Error fetching news data:', error)
                toast.error('Error fetching news data', {
                    position: "top-right",
                    autoClose: 3000,
                })
            }
        }
        fetchNewsData()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate all required fields before submission
        const newErrors = {
            title: validateField('title', formData.title),
            description: validateField('description', formData.description)
        }
        
        setErrors(newErrors)
        
        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== '')) {
            return
        }

        try {
            const response = await ApiService.put(`news/${id}`, formData)
            if (response.status === 200) {
                toast.success('News updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(() => {
                    router.push('/news')
                }, 2000)
            } else {
                toast.error('Failed to update news', {
                    position: "top-right",
                    autoClose: 3000,
                })
            }
        } catch (error) {
            toast.error('Error updating news', {
                position: "top-right",
                autoClose: 3000,
            })
            console.error('Error updating news:', error)
        }
    }

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Edit News Details</h5>
                </div>
                <div className="card-body">
                    <form className="row gy-3 needs-validation" noValidate onSubmit={handleSubmit}>
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
                                    placeholder="Enter title"
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
                                <textarea
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
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:image" />
                                </span>
                                <ImageUpload
                                    value={formData.image}
                                    onChange={(value) => setFormData({ ...formData, image: value })}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 mt-32 d-flex justify-content-start">
                            <button className="btn btn-primary-600" type="submit">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditNews