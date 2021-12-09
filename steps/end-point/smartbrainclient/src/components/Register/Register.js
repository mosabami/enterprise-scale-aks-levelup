import React, { Component } from 'react';
import axios from 'axios';
class Register extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: '',
            name: ''
        }
    }
    onNameChange = (event) => {
        this.setState({name:event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email:event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password:event.target.value})
    }

    onSubmitRegister = async () => {
        console.log(this.state)
        // const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL + '/api/register' : 'http://localhost:5000/api/register'
        const serverUrl =  '/api/register'
        await axios.post(serverUrl, {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
          })
          .then((response) => response.data)
          .then(user => {
              if (user.id) {
                  this.props.loadUser(user)
                  this.props.onRouteChange("home");
              }
          } )

        // fetch(serverUrl,{
        //     method:'post',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify({
        //         email: this.state.email,
        //         password: this.state.password,
        //         name: this.state.name

        //     }) })
        //     .then(Response => Response.json())
        //     .then(user => {
        //         if (user.id) {
        //             this.props.loadUser(user)
        //             this.props.onRouteChange("home");
        //         }
        //     } )
        
    }
    
    render() {
        // const { onRouteChange } = this.props;
        return (
            <div>
                <label className="db fw6 lh-copy f4" htmlFor="names">No email verfication or complex password required</label>    
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                    <main className="pa4 black-80">
                        
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0" >Sign Up!</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="names">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="names"  
                                id="names"
                                onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                                />
                            </div>
                            </fieldset>
                            <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            onClick={() => this.onSubmitRegister("home")} type="submit" value="Sign Up!"/>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default Register;

