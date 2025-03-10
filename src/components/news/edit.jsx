"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'

const EditNews = ({  title, description }) => {
    const [formData, setFormData] = useState({
        title: title,
        description: description,
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
                            <label className="form-label">Title</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="f7:person" />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required=""
                                />
                                <div className="invalid-feedback">Please provide title</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <div className="icon-field has-validation">
                                <span className="icon">
                                    <Icon icon="f7:person" />
                                </span>
                                <input
                                    type="text"
                                    name="designation"
                                    className="form-control"
                                    placeholder="Enter Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required=""
                                />
                                <div className="invalid-feedback">Please provide description</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Image</label>
                           <ImageUpload/>
                        </div>
                        <div className="col-md-12 mt-32 d-flex justify-content-start">
                            <Link href={'/news'} className="btn btn-primary-600" type="submit">
                                Save Changes
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditNews;