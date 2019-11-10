import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux"; 
import thunk from "redux-thunk";
import Layout from "./components/HOC/Layout";
import Home from "./components/Home/index";
import { rootReducer } from "./reducers/index";
import "./scss/main.scss"
const App = () =>{
    return (
        <Layout>
            <Home/>
        </Layout>
    )
}
ReactDOM.render(
<Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
   <App />
</Provider>
, document.getElementById('root'));