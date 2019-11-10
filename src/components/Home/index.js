import React, { Component } from 'react';
import { connect } from "react-redux";
import { showPosts,addPost, createUser,loadUser } from "../../actions/index";
import PostList from './PostList';
class Home extends Component {
    state={
        title:'',
        textarea:'',
        name:''
    }
    updateValue=(e)=>this.setState({ [e.target.name]:e.target.value })

    async componentDidMount(){
        await this.props.loadUser()
        if (!this.props.currentUser){
            await this.props.createUser()
        }
        await this.props.showPosts(this.props.currentUser._id)
    }
    renderError = () => {
        return alert('Please type something')
    }
    submitForm=()=>{
        let dataToSubmit = {};
        if (this.state.textarea === '' || this.state.title === '') {
            this.renderError()
        } else {
            if(this.state.name===''){
                dataToSubmit.name='guest'
            }
            dataToSubmit.post = this.state.textarea;
            dataToSubmit.title = this.state.title;
            dataToSubmit.name = this.state.name;
            dataToSubmit.userId = this.props.currentUser._id;
            this.props.addPost(dataToSubmit)
            this.setState({ textarea: '', title: '', name:'' })
        }
    }
    renderPosts = () => {
        let posts = [];
        if (this.props.posts) {
            posts = this.props.posts
        }
        return posts
    }
    render() {
        return (
            <div className="home" >
                <div className="post-area" id="paste">
                    <label className="label" >Enter your Paste</label>
                    <textarea className="post-box" name="textarea" onChange={this.updateValue} value={this.state.textarea} placeholder="New Paste" rows="10" />
                    <br /><br />
                    <div className="post-info" >
                        <div className="post-info-A" >
                            <label className="label">Enter File Name</label>
                            <input className="title-box" name="title" onChange={this.updateValue} value={this.state.title} placeholder="Enter File Name" />
                        </div>
                        <div className="post-info-B" >
                            <label className="label">Enter Your Name</label>
                           <input className="title-box" name="name" onChange={this.updateValue} value={this.state.name} placeholder="Enter Your Name" />
                        </div>
                    </div>
                    <br />
                    <button className="button" onClick={this.submitForm} >Paste This</button>
                </div>
                <hr/>
                <PostList posts={this.renderPosts()} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.showPosts.posts,
        currentUser:state.createUser.currentUser
    }
}
export default connect(mapStateToProps,{showPosts,addPost,createUser,loadUser})(Home);
