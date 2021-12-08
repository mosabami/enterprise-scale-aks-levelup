import React from 'react';
const Navigation = ({onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style = {{display: 'flex',justifyContent: 'flex-end'}}>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange("signin")}>Sign out</p>
            </nav>
        )
    } else {
        return (
            <div>
                <nav style = {{display: 'flex',justifyContent: 'flex-end'}}>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange("register")}>Register</p>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange("signin")}>Sign in</p>
                </nav>
            </div>
        )
    }
}

export default Navigation;

