import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import Link from 'next/link'
import ImageUpload from './ImageUpload'

const AddNews = () => {
    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Add Details</h5>
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
                                    name="#0"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    required=""
                                />
                                <div className="invalid-feedback">Please provide Title</div>
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
                                    name="#0"
                                    className="form-control"
                                    placeholder="Enter Description"
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
                                Add News
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNews;