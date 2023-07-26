import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './Pages/Forms/Login'
import Register from './Pages/Forms/Register'
import ForgotPass from './Pages/Forms/ForgotPass'
import Footer from './Pages/Footer';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register'  element={<Register /> }/>
        <Route path='/login'  element={<Login /> }/>
        <Route path='/forgotpass'  element={<ForgotPass /> }/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
