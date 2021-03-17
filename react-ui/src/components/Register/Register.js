import React from 'react'
import path from 'path'

class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            newLogin: '',
            newEmail: '',
            newPass: ''
        }
    }

    onLoginChange = (event) => {
        this.setState({newLogin: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({newEmail: event.target.value})
    }

    onPassChange = (event) => {
        this.setState({newPass: event.target.value})
    }

    emailCheck = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
        return re.test(email)        
    }

    onSubmitReg = () => {

        if (!this.state.newEmail.length || !this.state.newPass || !this.state.newLogin) {
            alert('All fields are required.')
        } else {
            if (!this.emailCheck(this.state.newEmail)) {
                alert('Invalid e-mail address.')
            } else {
                fetch(process.env.REACT_APP_LOCALHOST + '/api/register', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: this.state.newEmail,
                        password: this.state.newPass,
                        login: this.state.newLogin
                    })
                }).then(response => response.json())
                .then(data => {
                    if (data.user.login) {
                        window.sessionStorage.setItem('token', data.token)
                        this.props.loadUser(data.user)
                        this.props.onRouteChange('home')
                    } else {
                        alert('Registration failed. Try another login/password.')
                    }
                })
                .catch(err=> {
                    alert('Oops, something went wrong...')
                    console.log('error:',err)})
            }
        }
    }

    render () {
        const { onRouteChange } = this.props
        return (
            <main className="pa4">
                <div className='ba bg-black-05  b--black-30 mv4 mw6 center shadow-5'>
                    <div className="z-2 measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="pa1 code f2 fw6 ph0 mh0 pb1 center">New Account</legend>
                        <div className="mt3">
                            <label className="code db fw6 lh-copy f5" htmlFor="name">Login</label>
                            <input
                                onChange={this.onLoginChange} 
                                className="b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name" 
                                id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="code db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input
                                onChange={this.onEmailChange} 
                                className="b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"
                                id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="code db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input
                                onChange={this.onPassChange} 
                                className="b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick = {this.onSubmitReg} 
                                className="shadow-1 w-50 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 hover-bg-black hover-white" 
                                type="submit" 
                                value="Register"/>
                        </div>
                        <div className="mt3">
                            <input
                                onClick = {() => this.props.onRouteChange('signin')} 
                                className="shadow-1 w-50 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 hover-bg-black hover-white" 
                                type="submit" 
                                value="To Sign In"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Register
