import React from 'react'
import Logo from '../Logo/Logo'
import { ProfileIcon } from '../Profile/ProfileIcon'

import './navigation.css'

const Navigation = ({onRouteChange, onSubmit, resetState, user, toggleProfile, isProfileOpen}) => {

    return (
        <nav className="ma0 pr0 pt1 z-4">
            <div className = "nav-inner relative flex w-100 justify-center pa2 f4 ma2 bg-transparent">
                <div className="logo relative pt1 mt1 z-1">
                    <Logo onSubmit={onSubmit}  />
                </div>
                <div className="profile-icon absolute top-0 right-0 z-3">
                    <ProfileIcon user={user} onRouteChange={onRouteChange} resetState={resetState} toggleProfile={toggleProfile}/>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
