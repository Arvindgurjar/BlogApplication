import Otpvarification from './components/Otpvarification';
import './App.css';
import Addblog from './components/Addblog';
import Register from "./components/Register"
import Login from './components/Login';
import ForgetPass from './components/ForgetPass';
import Sendforgetpassmail from "./components/sendforgetpassmail"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BlogDetail from './components/BlogDetail';
import Home from './components/Home';

function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgetpassword/:id' element={<ForgetPass />} />
          <Route path='/addblog' element={<Addblog />} />
          <Route path='/verification' element={<Otpvarification />} />
          <Route path='/sendlink' element={<Sendforgetpassmail />} />
          <Route path="/blogdetail" element={<BlogDetail/>}/>

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
