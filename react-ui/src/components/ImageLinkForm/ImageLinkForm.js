import React from 'react'
 
const ImageLinkForm = ({onInputChange, facesDetected}) => {

    let manyFaces = false
    if (facesDetected > 1) {
        manyFaces = true
    }

    return (
        <div>
            {facesDetected
                ? <p className='f2 white code'>Smart Brain has detected {facesDetected} face{manyFaces ? 's' : ''} in your image</p> 
                : <p className='f2 code'>Smart Brain will detect faces in your image</p>                 
            }
            <p className='f3 code'>1. Enter image URL</p>
            <p className='f3 code'>2. Click on the Smart Brain</p>
            <div className='center'>
                <input className='input-url f4 pa0 w-70 shadow-2 center' type='text' onChange={onInputChange} />
            </div>
        </div>
    )
}
export default ImageLinkForm
