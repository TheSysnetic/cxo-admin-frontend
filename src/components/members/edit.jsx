"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import { ApiService } from '@/app/api-services/apiServices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditMember = ({ id }) => {
    let router = useRouter();
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
                } else if (!/^[a-zA-Z\s.]*$/.test(value)) {
                    error = 'Name can only contain letters, spaces and dots'
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
        
        // Validate the field if it's one of the required fields
        if (['name', 'designation', 'email'].includes(name)) {
            const error = validateField(name, value)
            setErrors(prev => ({ ...prev, [name]: error }))
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await ApiService.get(`users/${id}`)
                if (response.data.user) {
                    const updatedData = {
                        ...formData,
                        ...response.data.user,
                        name: response.data.user.name || '',
                        designation: response.data.user.designation || '',
                        email: response.data.user.email || '',
                        contact_number: response.data.user.contact_number || '',
                        organization_name: response.data.user.organization_name || '',
                        organization_status: response.data.user.organization_status || '',
                        number_of_employees: response.data.user.number_of_employees || '',
                        gender: response.data.user.gender || '',
                        country: response.data.user.country || '',
                        city: response.data.user.city || '',
                        qualification: response.data.user.qualification || '',
                        expert_areas: response.data.user.expert_areas || '',
                        mailing_address: response.data.user.mailing_address || '',
                        expectation_from_forum: response.data.user.expectation_from_forum || '',
                        interest_areas: response.data.user.interest_areas || '',
                        image: response.data.user.image || ''
                    }
                    setFormData(updatedData)
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        fetchUserData()
    }, [id])

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
            const response = await ApiService.put(`users/${id}`, formData)
            if (response.status === 200) {
                toast.info('Member updated successfully!', {
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
                toast.error('Failed to update member', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error('Error updating member', {
                position: "top-right",
                autoClose: 3000,
            });
            console.error('Error updating member:', error)
        }
    }

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Edit Member Details</h5>
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
                                    onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, organization_status: e.target.value })}
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
                                    value={formData.number_of_employees ? parseInt(formData.number_of_employees) : 0}
                                    onChange={(e) => setFormData({ ...formData, number_of_employees: parseInt(e.target.value) })}
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
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, expert_areas: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, mailing_address: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, expectation_from_forum: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, interest_areas: e.target.value })}
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

export default EditMember