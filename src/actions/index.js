import database from "../api/database"; 
//---------------------POST---------------------//
export const showPosts = (userId) => async dispatch=>{
   const posts = await database.get(`/userposts/${userId}`);
   const response = posts.data.reverse();
   dispatch({
      type:'SHOW_POSTS',
      payload:response
   })
}
export const fetchSinglePost = (id) => async dispatch => {
   const response = await database.get(`/posts/${id}`)
   dispatch({
      type: 'FETCH_SINGLE_POST',
      payload: response.data
   })
}

export const addPost=(data)=>async (dispatch)=>{
  const response = await database.post('/posts',data)
  dispatch({
     type:'ADD_POST',
     payload:response.data
  })
   dispatch(showPosts(data.userId))
}

export const deletePost=(id,userId)=>async dispatch=>{
   const response= await database.delete(`/posts/${id}`)
   dispatch({
      type:'DELETE_POST',
      payload:response.data
   })
   dispatch(showPosts(userId))
}
export const editPost=(data,id,userId)=>async dispatch=>{
   const response = await database.patch(`/posts/${id}`,data)
   dispatch({
      type:'EDIT_POST',
      payload:response.data
   })
   dispatch(showPosts(userId))
}
//---------------------USER---------------------//
   function makeUser(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
export const createUser=()=>async dispatch =>{
   const data={}
   data.name = makeUser(6);
   const response = await database.post(`/user`,data)
   localStorage.setItem('jwtToken', response.data.token);
   dispatch({
      type: 'USER_CREATED', payload: response.data.user
   })
}
export const loadUser = () => async dispatch => {
   try {
      const token = localStorage.getItem('jwtToken');
      if (token === '' || !token) {
         return
      }
      const userInfo = await database.get('/userinfo', { headers: { "Authorization": `Bearer ${token}` } })
      dispatch({
         type: 'USER_CREATED',
         payload: userInfo.data
      })
   } catch (error) {

   }
}