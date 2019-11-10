import React from 'react';
import { connect } from "react-redux";

class Header extends React.Component {
    render(){
        let name = `guest${!this.props.currentUser ? '' : this.props.currentUser.name}`
        return (
            <header className="navbar navbar-expand-lg">
                <div className="container" >
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#paste">PasteApp <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                    <p style={{ color:'white' }}>{name}</p>
                </div>
            </header>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.createUser.currentUser
    }
}
export default connect( mapStateToProps ,null)(Header);
