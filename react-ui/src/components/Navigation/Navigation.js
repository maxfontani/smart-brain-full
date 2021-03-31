import React from 'react'
import Logo from '../Logo/Logo'
import { ProfileIcon } from '../Profile/ProfileIcon'

const Navigation = ({onRouteChange, onSubmit, user, toggleProfile }) => {

    return (
        <nav className="ma0 pr0 pt1 z-4">
            <div className = "nav-inner pa2 f4 ma2 bg-transparent">
                <div className="logo relative pt1 mt1 z-1">
                    <Logo onSubmit={onSubmit}  />
                </div>
                <div className="profile-icon z-3">
                    <ProfileIcon user={user} onRouteChange={onRouteChange} toggleProfile={toggleProfile}/>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
