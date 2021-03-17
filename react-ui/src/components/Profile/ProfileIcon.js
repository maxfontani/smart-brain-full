import React from 'react'

import {  Menu,  
    MenuList,  
    MenuButton,  
    MenuItem,  
    MenuLink } 
from "@reach/menu-button"

import "@reach/menu-button/styles.css"
import "./ProfileIcon.css"

export const ProfileIcon = ({onRouteChange, toggleProfile}) => {

    return (
        <Menu> 
            <MenuButton className="bg-transparent b--transparent pb2" aria-expanded="false">                     
                <img id='menu-button'
                src="http://tachyons.io/img/logo.jpg"
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