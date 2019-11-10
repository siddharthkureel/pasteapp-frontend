import React from 'react';
import { connect } from "react-redux";

import { deletePost, fetchSinglePost, editPost } from "../../actions";

class Post extends React.Component {
    state = {
        edit: false,
        textarea: '',
        title: '',
        name:'',
        showSaveButton:false
    }
    renderButtons(postId) {
        return <>
            <button onClick={() => this.props.deletePost(postId, this.props.currentUser._id)} className="button" style={{ background: '#f44336', padding: '10px 10px' }} >delete</button>&nbsp;&nbsp;
            {(!this.state.showSaveButton) ?
                <button onClick={() => this.editHandler(postId)} className="button" style={{ background: 'orange', padding: '10px 18px' }} >
                    edit</button>
                :
                <button onClick={() => this.onSubmit(postId)} className="button" style={{ background: 'green', padding: '10px 18px' }} >
                    save</button>
            }
        </>
    }
    editHandler = async (postId) => {
        this.setState({
            edit: true
        })
        await this.props.fetchSinglePost(postId)
        if (this.props.editedPost) {
            this.setState({
                title: this.props.editedPost.post.title,
                name: this.props.editedPost.post.name,
                textarea: this.props.editedPost.post.post,
                showSaveButton: true
            })
        }
    }
    onSubmit = async (id) => {
        let dataToSubmit = {}
        if (this.state.textarea === '' || this.state.title === '') {
            return alert('please enter something')
        } else {
            dataToSubmit.post = this.state.textarea;
            dataToSubmit.title = this.state.title;
            dataToSubmit.name = this.state.name;
            await this.props.editPost(dataToSubmit, id, this.props.currentUser._id)
            this.setState({
                edit: false,
                showSaveButton: false
            })
        }
    }
    updateValue = (e) => this.setState({ [e.target.name]: e.target.value })
    download=(filename, text)=>{
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    raw=(text)=>{
        let newWindow = window.open();
        newWindow.document.write(text);
        newWindow.document.close();
    }
    print=(text,title,name)=>{
        let mywindow = window.open();
        mywindow.document.write('<html><head><title>' + title + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<p>' + text + '</p>');
        mywindow.document.write('<p>by ' + name + '</p>');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();

    }
    render() {
        const { name, post, title, date, postId } = this.props;
        const getDate = date.split('T');
        return (
            <div className="post-area">
                {(this.state.edit) ?
                    <div>
                        <label className="label" >Enter your Paste</label>
                        <textarea className="post-box" name="textarea" onChange={this.updateValue} value={this.state.textarea} placeholder="New Paste" rows="10" /><br />
                        <br/>
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
                    </div>
                    : <div>
                        <strong className="title" >{title}</strong>
                        <div className="post-body">
                            {post}
                        </div>
                    </div>
                }
                <span>By:<strong>{name}</strong></span>
               
                <div className="modify-container" >
                    <span style={{ fontStyle: 'italic' }}>{getDate[0]}</span>
                    <div className="options" >
                        {!this.state.showSaveButton ?
                            <>
                                <button onClick={()=>this.download(title,post)} >download</button>&nbsp;
                                <button onClick={() => this.print(post, title, name)}>print</button>&nbsp;
                                <button onClick={() => this.raw(post)} >raw</button>
                            </>
                            : null
                        }
                    </div>
                    <div className="modify-buttons" >
                        {this.renderButtons(postId) }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        editedPost: state.fetchSinglePost,
        currentUser: state.createUser.currentUser
    }
}
export default connect(mapStateToProps, { deletePost, fetchSinglePost, editPost })(Post);
