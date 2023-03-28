import React from 'react';
import {BrowserRouter as Router, Switch,Route,Redirect} from 'react-router-dom';
import Register from './components/frontend/auth/Register'
import Login from './components/frontend/auth/Login'
import Navbar from './layouts/frontend/Navbar'


import MasterLayout from './layouts/admin/MasterLayout';
import AdminPrivateRoute from './AdminPrivateRoute';
import PublicRoute from './PublicRoute';


import axios from 'axios';
import Page404 from './components/errors/Page404';
import Home from './components/frontend/Home'
import Page403 from './components/errors/Page403'
import ViewCategory from './components/admin/category/ViewCategory'
import EditCategory from './components/admin/category/EditCategory'

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


function App() {
  return (
    <div className="App">
        <Router>
          <Switch>

            {/* <Route exact path="/" component={Home}/> */}
            <Route path="/403" component={Page403}/>
            <Route path="/404" component={Page404}/>

            <AdminPrivateRoute path="/admin" name="Admin" />

            <PublicRoute path="/" name="Home" /> 
            {/* <Route path="/view" component={ViewCategory}/> */}
            {/* <Route path="/edit" component={EditCategory}/> */}
            <Route path="/login">
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
            </Route>
            <Route path="/register">
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
            </Route> 

            <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />} />
            {/* <AdminPrivateRoute/> */}

          </Switch>
        </Router>
    </div>
  );
}

export default App;
