import React from 'react'

const Navigation = ({onRouteChange, resetState, userName, entries}) => {

    return (
        <nav className='ma0 pr0 pt1'>
            <div className = 'pa0 f4 ma2 dib z-2'>
                <a 
                    className='pl1 pr1 link shadow5 b pointer z-2'>
                    {userName}
                </a>
                    |
                        {entries 
                            ? <a className='pl1 pr1 fw5'>Images scanned: {entries}</a> 
                            : <a className='pl1 pr1 fw5'>No images scanned yet</a>}
                | 
                <a href=''
                    className='pl1 pr1 fw6 link dim black pointer z-2' 
                    onClick={() => {
                        onRouteChange('signin')
                        resetState()
                    }}>
                    Sign Out
                </a> 
            </div>
        </nav>
    )
}

export default Navigation
