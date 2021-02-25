import React from 'react'
import path from 'path'

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInLogin: '',
            signInPass: ''
        }
    }

    onLoginChange = (event) => {
        this.setState({signInLogin: event.target.value})
    }

    onPassChange = (event) => {
        this.setState({signInPass: event.target.value})
    }

    onSubmitSignIn = () => {

        if (!this.state.signInPass || !this.state.signInLogin) {
            alert('Please enter your Login and Password.')
        } else {
            fetch('https://smart-brain-full.herokuapp.com/api/signin'), {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    login: this.state.signInLogin,
                    password: this.state.signInPass
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.onRouteChange('home')
                    this.props.loadUser(user)
                } else {
                    alert('Login/password mismatch!')
                }
            })
        }
    }

    render () {
        const { onRouteChange } = this.props
        return (
            <main className="pa4">
                <div className='ba bg-black-05 b--black-30 mv4 mw6 center shadow-5'>
                    <div className="z-2 ">
                        <fieldset id="sign_up" className="b--transparent ph0 mh0">
                            <legend className="code f2 fw6 pa1 mh0 center">Sign In</legend>
                            <div className="mt3">
                                <label className="code fw6 lh-copy f5" htmlFor="login-address">Login</label>
                                <input 
                                    className="b--black pa2 white input-reset ba bg-transparent w-100 hover-bg-black hover-white" 
                                    onChange={this.onLoginChange} 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="code db fw6 lh-copy f5" htmlFor="password">Password</label>
                                <input 
                                    className="b--black white b pa2 input-reset ba bg-transparent w-100 hover-bg-black hover-white" 
                                    onChange={this.onPassChange} 
                                    type="password" 
                                    name="password"  
                                    id="password"/>
                            </div>
                        </fieldset>
                        <input
                            onClick = {this.onSubmitSignIn} 
                            className="shadow-1 w-40 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 hover-bg-black hover-white" 
                            type="submit" 
                            value="Sign In"/>
                        <div className="lh-copy mt3">
                            <input
                                onClick = {() => onRouteChange('register')} 
                                className="shadow-1 w-40 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 hover-bg-black hover-white" 
                                type="submit" 
                                value="I'm New"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Signin
