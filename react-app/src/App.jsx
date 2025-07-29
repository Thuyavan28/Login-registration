import { Routes, Route } from 'react-router-dom';
import Signup from "./Signup";

import Login from './login';
import Dashboard from './dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} /> 
      <Route path='/dashboard' element={<Dashboard/>}  />
    </Routes>
  );
}

export default App;
