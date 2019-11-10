import React from 'react'
import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";
const Layout = (props) => {
    return (
         <React.Fragment>
            <div className="body-wrapper" >
                <Header/>
                <div className="container main" >
                    {props.children}
                </div>
                <div className="push"></div>
             </div>
            <div className="margin-50"></div>
            <Footer/>
         </React.Fragment>
    )
}
export default Layout;
