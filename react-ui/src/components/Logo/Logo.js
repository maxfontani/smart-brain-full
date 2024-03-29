import React from 'react'
import Tilt from 'react-tilt'
import logo from './logo.png'
 

const Logo = ({onSubmit}) => {
    return (
            <Tilt className="Tilt br2 shadow-2" options={{ max : 30,  scale : 1.15}} style={{ height: 165, width: 150 }}>
                <div className="Tilt-inner ma0"> 
                    <img 
                        className='logo' 
                        src = {logo} 
                        alt='Smart Brain logo' 
                        onClick= {onSubmit}
                    />
                </div>
            </Tilt>
    )
}
export default Logo
