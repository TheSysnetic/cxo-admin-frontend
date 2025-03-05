"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'

const EditMember = ({ id, name, designation, email }) => {
    const [formData, setFormData] = useState({
        name: name,
        designation: designation,
        email: email,
        phone: '',
        password: '',
        confirmPassword: ''
    })



    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Edit Details</h5>
                </div>
                <div className="card-body">
                    <form className="row gy-3 needs-validation" noValidate="">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="f7:person" />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required=""
                                />
                                <div className="invalid-feedback">Please provide first name</div>
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
                                    className="form-control"
                                    placeholder="Enter Designation"
                                    value={formData.designation}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    required=""
                                />
                                <div className="invalid-feedback">Please provide last name</div>
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
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required=""
                                />
                                <div className="invalid-feedback">Please provide email address</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Image</label>
                           <ImageUpload/>
                        </div>
                        <div className="col-md-12 mt-32 d-flex justify-content-start">
                            <Link href={'/members'} className="btn btn-primary-600" type="submit">
                                Save Changes
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditMember;