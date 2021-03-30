import React, { useState } from 'react'
import { DialogContent, DialogOverlay } from "@reach/dialog"
import classNames from 'classnames/bind'

import "@reach/dialog/styles.css"
import "./Profile.css" 

const Profile = ({isProfileOpen, toggleProfile, loadUser, user}) => {

    const [name, setName] = useState(user.name ||'')
    const [email, setEmail] = useState(user.email ||'')
    const [birthday, setBirthday] = useState(user.birthday || "2000-01-01")

    const [nameChanged, setnameChanged] = useState(false)
    const [emailChanged, setEmailChanged] = useState(false)
    const [birthdayChanged, setBirthdayChanged] = useState(false)

    const btnInputClass = "b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"

    const btnNameClass = classNames(btnInputClass, 
        {'invalid': !nameCheck(name)}
    )

    const btnEmailClass = classNames(btnInputClass, 
        {'invalid': !emailCheck(email)}
    )

    console.log('Signed in user: ', user)

    function onNameChange(event) {
        setnameChanged(true)
        setName(event.target.value)
    }

    function onEmailChange(event) {
        setEmailChanged(true)
        setEmail(event.target.value)
    }

    function onBirthdayChange(event) {
        setBirthdayChanged(true)
        setBirthday(event.target.value)
    }

    function emailCheck(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
        return re.test(email)        
    }

    function nameCheck(name) {
        const re = /^[a-z ,.'-]{3,16}$/i
        return re.test(name)        
    }

    function birthdayCheck(birthday) {
        const today = new Date().toISOString().slice(0,10)
        if (birthday < today) {
            return true
        } else {
            setBirthday(user.birthday || "2000-01-01") 
            return false
        }
    }

    function onSave(loadUser) {

        const savedData = [
            ["name", nameChanged && nameCheck(name) && name],
            ["email", emailChanged && emailCheck(email) && email],
            ["birthday", birthdayChanged && birthdayCheck(birthday) && birthday]
        ]
        
        const filteredData = Object.fromEntries(savedData.filter(k => k[1] !== false))

        fetch(process.env.REACT_APP_LOCALHOST + `/api/profile/${user.id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(filteredData)
        }).then(response => {
                console.log(response)
                if (response.status === 200 || response.status === 304) {
                    loadUser({...user, ...filteredData})
                    toggleProfile()
                } else {
                    alert('Unable to update.')
                }
            })
            .catch(err => {
                alert('Oops, something went wrong...')
                console.log('error:',err)})
    }

    return ( 
        <DialogOverlay        
            className="flex flex-column z-3"
            isOpen={isProfileOpen}        
            onDismiss={() => toggleProfile()}
        >   
            <DialogContent  className="w-auto bg-white-90" aria-labelledby="dialog-content">        
                    <fieldset id="sign_up" className="flex-auto ma0 pa0 b--transparent">
                        <div className="flex">
                            <legend className="pa0 code f2 fw6 ph0 mh0 center">Profile</legend>
                            <div className="close-button f2 b self-end grow" onClick={() => toggleProfile()}>          
                                &times;       
                            </div>
                        </div>
                            {user.entries 
                                ? <p className="f4 code">Images scanned:&nbsp;{user.entries}</p> 
                                : <p className="f4 code">No images scanned yet</p>}
                            <p className="f4 code">Member since: {new Date(user.joined).toLocaleDateString()} </p>
                        <div className="mt3">
                            <label className="code db fw6 lh-copy f5" htmlFor="name">Name</label>
                            <input
                                id="name-input"
                                className={btnNameClass}
                                placeholder={user.name || "enter name"}
                                type="text" 
                                name="name" 
                                value={name}
                                onChange={onNameChange}
                                />
                        </div>
                        <div className="mt3">
                            <label className="code db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input
                                id="email-input"
                                className={btnEmailClass}
                                placeholder={user.email || "enter email"}
                                type="text" 
                                name="email-address"
                                value={email}
                                onChange={onEmailChange} 
                                />
                        </div>
                        <div className="mv3">
                            <label className="bd-label code db fw6 lh-copy f5" htmlFor="password">Birthday</label>
                            <input className={btnInputClass}
                                id="bd-input"
                                type="date"
                                min="1900-01-01" 
                                max={new Date().toISOString().slice(0,10)}
                                name="birthday"
                                value={birthday}
                                onKeyDown={e => e.preventDefault()}
                                onChange={onBirthdayChange}
                                />
                        </div>
                        <div className="flex justify-between mt4">
                            <input
                                onClick = {() => onSave(loadUser)} 
                                className="shadow-1 w-40 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 hover-bg-light-purple hover-white" 
                                type="submit" 
                                value="Save"/>

                            <input
                                onClick = {() => toggleProfile()} 
                                className="shadow-1 w-40 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 hover-bg-black hover-white" 
                                type="submit" 
                                value="Cancel"/>
                        </div>
                    </fieldset>
            </DialogContent>
        </DialogOverlay>
    )
}

export default Profile