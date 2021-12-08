import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({ onInputChange, onButtonSummit }) => {
    return (
        <div>
            <p className='f3'>
                <div> {'This magic brain will detect a face in your pictures. Give it a try'}</div>
                <div>{'Paste the link to a picture with a face in the field below and hit detect'}</div>
                <div className='b'>{'eg: https://samples.clarifai.com/celebrity.jpg'}</div>
            </p>
                <div className='center'>
                    <div className='form center pa4 br3 shadow-5'>
                        <input className='f4 pa2 w-70 center' type="tex" onChange={onInputChange}/>
                        <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSummit}>Detect</button>
                    </div>
                </div>

            
        </div>
    )
}

export default ImageLinkForm;

