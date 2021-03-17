import React from 'react'
import { ProfileIcon } from '../Profile/ProfileIcon'

const Navigation = ({onRouteChange, resetState, user, toggleProfile, isProfileOpen}) => {

    return (
        <nav className="flex justify-end ma0 pr0 pt1">
            <div className = "fixed pa2 f4 ma2 dib bg-transparent">
                <ProfileIcon user={user} onRouteChange={onRouteChange} resetState={resetState} toggleProfile={toggleProfile}/>
            </div>
        </nav>
    )
}

export default Navigation
