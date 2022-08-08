import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

// Context
import { AuthContextProvider } from './context/AuthContext';
// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(undefined);

  const { auth } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  const loadingUser = user === undefined;

  if (loadingUser) {
    return <p>Carregando ...</p>;
  }

  return (
    <div className='App'>
      <AuthContextProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />
              <Route
                path='/register'
                element={!user ? <Register /> : <Navigate to='/' />}
              />
              <Route
                path='/dashboard'
                element={user ? <Dashboard /> : <Navigate to='/login' />}
              />
              <Route
                path='/posts/create'
                element={user ? <CreatePost /> : <Navigate to='/login' />}
              />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
