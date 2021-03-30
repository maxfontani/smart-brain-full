import React from 'react'

const FaceRecognition = ({inputUrl, boxes}) => {
    if (boxes.length) {
        return (
            <div className='mw9 center '>
                <div className='absolute pb4 z-1'>
                    <img id ='input-image' className='shadow-5 z-1' alt='' src={inputUrl}/>
                        {boxes.map((box, i) => {
                            return ( 
                                <div key = {i} className='bounding-box z-2' style={{
                                    top: box.topRow, 
                                    bottom: box.bottomRow, 
                                    left: box.leftCol, 
                                    right: box.rightCol}}>
                                </div>
                            )}
                        )}
                </div>
            </div>
        )
        
    }   else {
            return (
                <div className='mw9 center'>
                    <div className='absolute mt2'>
                        <img id ='input-image' alt='' src={inputUrl}/>
                    </div>
                </div>
            )
        }
}
    
export default FaceRecognition
