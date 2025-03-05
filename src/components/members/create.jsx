import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import Link from 'next/link'
import ImageUpload from './ImageUpload'

const AddMember = () => {
    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Add Details</h5>
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
                                    name="#0"
                                    className="form-control"
                                    placeholder="Enter Name"
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
                                    name="#0"
                                    className="form-control"
                                    placeholder="Enter Designation"
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
                                    name="#0"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    required=""
                                />
                                <div className="invalid-feedback">
                                    Please provide email address
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Image</label>
                           <ImageUpload/>
                        </div>
                        
                        <div className="col-md-12 mt-32 d-flex justify-content-start">
                            <Link href={'/members'} className="btn btn-primary-600" type="submit">
                                Add Member
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMember;