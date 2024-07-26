import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import { AuthContextComponent } from './AuthContext';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Search from './Pages/Search';
import Favorites from './Pages/Favorites';
import Logout from './Pages/Logout';

const App = () => {
    return (
        <AuthContextComponent>
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/search' element={<Search />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
        </Layout>
        </AuthContextComponent>
    );
}

export default App;