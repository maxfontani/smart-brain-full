import React from 'react'

import {  Menu,  
    MenuList,  
    MenuButton,  
    MenuItem,  
    MenuLink } 
from "@reach/menu-button"

import "@reach/menu-button/styles.css"
import profileIcon from './profile-icon.png'
import "./ProfileIcon.css"

export const ProfileIcon = ({onRouteChange, toggleProfile}) => {

    return (
        // <div className="profile-icon absolute top-0 right-0 z-3">
            <Menu> 
                <MenuButton className="bg-transparent b--transparent pb2" aria-expanded="false">                     
                    <img id='menu-button'
                    src={profileIcon}
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
        // </div>
    )
}