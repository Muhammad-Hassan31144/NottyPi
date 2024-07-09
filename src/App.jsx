import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Dashboard from './components/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './slices/userSlice';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useSelector((state) => state.user);
  console.log(token);


  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
