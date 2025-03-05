import React from 'react'
import InputCustomStyles from './child/InputCustomStyles'
import InputStatus from './members/create'

const FormValidationLayer = () => {
    return (
        <div className="row gy-4">

            {/* InputCustomStyles */}
            <InputCustomStyles />

            {/* InputStatus */}
            <InputStatus />

        </div>

    )
}

export default FormValidationLayer