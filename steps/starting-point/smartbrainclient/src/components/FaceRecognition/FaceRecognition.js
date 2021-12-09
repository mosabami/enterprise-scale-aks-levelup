import React from 'react';
import './FaceRecognition.css'
const FaceRecognition = ({ imageURL, box }) => {    
    try{ 
    var boundingBox = {top: box.topRow , right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}
    } catch(e){ 
    var boundingBox = {top: 0 , right: 0, bottom: 0, left: 0}
    } 
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageURL} alt="predicted" width='500px' height='auto' />
                <div className='bounding-box' style={boundingBox}></div>
            </div>
            
        </div>
    )
}

export default FaceRecognition;

