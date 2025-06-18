"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import Link from 'next/link'
import ImageUpload from './ImageUpload'
import { useRouter } from 'next/navigation'
import { ApiService } from '@/app/api-services/apiServices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMember = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        email: '',
        contact_number: '',
        organization_name: '',
        organization_status: '',
        number_of_employees: '',
        gender: '',
        country: '',
        city: '',
        qualification: '',
        expert_areas: '',
        mailing_address: '',
        expectation_from_forum: '',
        interest_areas: '',
        image: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        designation: '',
        email: ''
    })

    const validateField = (name, value) => {
        let error = ''
        switch (name) {
            case 'name':
                if (!value.trim()) {
                    error = 'Name is required'
                } else if (value.length < 2) {
                    error = 'Name must be at least 2 characters long'
                } else if (!/^[a-zA-Z\s]*$/.test(value)) {
                    error = 'Name can only contain letters and spaces'
                }
                break
            case 'designation':
                if (!value.trim()) {
                    error = 'Designation is required'
                } else if (value.length < 2) {
                    error = 'Designation must be at least 2 characters long'
                }
                break
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required'
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address'
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
        
        // Validate specific fields
        if (['name', 'designation', 'email'].includes(name)) {
            const error = validateField(name, value)
            setErrors(prev => ({ ...prev, [name]: error }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate all required fields before submission
        const newErrors = {
            name: validateField('name', formData.name),
            designation: validateField('designation', formData.designation),
            email: validateField('email', formData.email)
        }
        
        setErrors(newErrors)
        
        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== '')) {
            return
        }

        try {
            const response = await ApiService.post('users', formData)
            if (response.status === 201) {
                toast.success('Member added successfully!', {
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
                    router.push('/members')
                }, 2000);
            } else {
                toast.error('Failed to add member', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error('Error adding member', {
                position: "top-right",
                autoClose: 3000,
            });
            console.error('Error adding member:', error)
        }
    }

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Add Details</h5>
                </div>
                <div className="card-body">
                    <form className="row gy-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="f7:person" />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Enter Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Designation</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="f7:person" />
                                </span>
                                <input
                                    type="text"
                                    name="designation"
                                    className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                                    placeholder="Enter Designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mage:email" />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Contact Number</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:phone" />
                                </span>
                                <input
                                    type="tel"
                                    name="contact_number"
                                    className="form-control"
                                    placeholder="Enter Contact Number"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Organization Name</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:office-building" />
                                </span>
                                <input
                                    type="text"
                                    name="organization_name"
                                    className="form-control"
                                    placeholder="Enter Organization Name"
                                    value={formData.organization_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Organization Status</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:check-circle" />
                                </span>
                                <select
                                    name="organization_status"
                                    className="form-control"
                                    value={formData.organization_status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Number of Employees</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:account-group" />
                                </span>
                                <input
                                    type="number"
                                    name="number_of_employees"
                                    className="form-control"
                                    placeholder="Enter Number of Employees"
                                    value={formData.number_of_employees}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Gender</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:gender-male-female" />
                                </span>
                                <select
                                    name="gender"
                                    className="form-control"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Country</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:map-marker" />
                                </span>
                                <input
                                    type="text"
                                    name="country"
                                    className="form-control"
                                    placeholder="Enter Country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">City</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:city" />
                                </span>
                                <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    placeholder="Enter City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Qualification</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:school" />
                                </span>
                                <input
                                    type="text"
                                    name="qualification"
                                    className="form-control"
                                    placeholder="Enter Qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Expert Areas</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:lightbulb" />
                                </span>
                                <input
                                    type="text"
                                    name="expert_areas"
                                    className="form-control"
                                    placeholder="Enter Expert Areas"
                                    value={formData.expert_areas}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Mailing Address</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:map-marker" />
                                </span>
                                <input
                                    type="text"
                                    name="mailing_address"
                                    className="form-control"
                                    placeholder="Enter Mailing Address"
                                    value={formData.mailing_address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Expectation from Forum</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:comment-quote" />
                                </span>
                                <input
                                    type="text"
                                    name="expectation_from_forum"
                                    className="form-control"
                                    placeholder="Enter Expectation from Forum"
                                    value={formData.expectation_from_forum}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Interest Areas</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:lightbulb" />
                                </span>
                                <input
                                    type="text"
                                    name="interest_areas"
                                    className="form-control"
                                    placeholder="Enter Interest Areas"
                                    value={formData.interest_areas}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Image</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="mdi:image" />
                                </span>
                                <ImageUpload
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12 mt-32 d-flex justify-content-start">
                            <button className="btn btn-primary-600" type="submit" onClick={handleSubmit}>
                                Add Member
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddMember;