import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import Link from 'next/link'
import UploadPDF from './upload-file'

const AddMagazine = () => {
    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Add Magazine</h5>
                </div>
                <div className="card-body">
                    <form className="row gy-3 needs-validation" noValidate="">
                    <UploadPDF />
                        
                        <div className="col-md-12 mt-32 d-flex justify-content-start">
                            <Link href={'/magazine'} className="btn btn-primary-600" type="submit">
                                Add Magazine
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMagazine;