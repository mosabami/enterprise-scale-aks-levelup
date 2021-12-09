import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signinEmail: '',
            signInPassword: '',
            // signinfail:this.props.signinfail
        }
    }

    onEmailChange = (event) => {
        this.setState({signinEmail:event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword:event.target.value})
    }

    onSubmitSignIn = async (props) => {
        // console.log(this.state)
        // const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL + '/api/signin' : 'http://localhost:5000/api/signin'
        const serverUrl = '/api/signin'
        await axios.post(serverUrl, {
            email: this.state.signinEmail,
            password: this.state.signInPassword,
          })
          .then( (response) => response.data)
          .then(data => {
              if (data.id) { // does the user exist? Did we receive a user with a property of id?
                  this.props.loadUser(data)
                  this.props.onRouteChange("home")
                  this.props.signinfailed('')
              } else{
                  this.props.signinfailed("incorrect credentials")
              }
          } )

        // fetch(serverUrl,{
        //     method:'post',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify({
        //         email: this.state.signinEmail,
        //         password: this.state.signInPassword
        //     }) })
        //     .then(Response => Response.json())
        //     .then(data => {
        //         if (data.id) { // does the user exist? Did we receive a user with a property of id?
        //             this.props.loadUser(data)
        //             this.props.onRouteChange("home")
        //             this.props.signinfailed('')
        //         } else{
        //             this.props.signinfailed("incorrect credentials")
        //         }
        //     } )  
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0" >Sign In</legend>
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
                            onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={() => this.onSubmitSignIn('home')} type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p href="#0" className="f6 dim red db pointer" >{this.props.signinfail}</p>
                        <p href="#0" className="f6 link b black db pointer" onClick={() => onRouteChange('register')}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        
            )
    }
}


export default Signin;

