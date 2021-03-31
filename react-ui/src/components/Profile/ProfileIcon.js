import React, { useState } from 'react'
import { Menu,  
    MenuList,  
    MenuButton,  
    MenuItem } 
from "@reach/menu-button"
import md5 from 'md5'

import defProfileIcon from './profile-icon.png'
import "@reach/menu-button/styles.css"
import "./ProfileIcon.css"

export const ProfileIcon = ({onRouteChange, toggleProfile, user }) => {

    // const [gravatarUrl, setGravatarUrl] = useState('')
    const userEmailHash = md5(user.email.trim().toLowerCase()) || ''
    const gravatarUrl = 'https://www.gravatar.com/avatar/' + userEmailHash +'?d=https%3A%2F%2Fi.ibb.co%2FTYzSQjQ%2Fprofile-icon.png&s=105'
    // fetch('https://www.gravatar.com/avatar/' + userEmailHash)

    return (
            <Menu> 
                <MenuButton className="bg-transparent b--transparent pb2" aria-expanded="false">                     
                    <img id='menu-button'
                    src={gravatarUrl}
                    defaultValue={defProfileIcon}
                    className="b--transparent shadow-5 br-100 h3 w3 grow-large" alt="ava" />   
                </MenuButton>      
                <MenuList>        
                    <MenuItem className="code b" onSelect = {() => toggleProfile()}>View Profile</MenuItem>             
                    <MenuItem 
                        className="code b" 
                        onSelect = {
                            () => {
                                window.sessionStorage.removeItem('token')
                                onRouteChange('signin')
                        }}>
                        Sign Out
                    </MenuItem>      
                </MenuList>    
            </Menu>
    )
}