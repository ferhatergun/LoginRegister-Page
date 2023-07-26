import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './Pages/Forms/Login'
import Register from './Pages/Forms/Register'
import ForgotPass from './Pages/Forms/ForgotPass'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register'  element={<Register /> }/>
        <Route path='/login'  element={<Login /> }/>
        <Route path='/forgotpass'  element={<ForgotPass /> }/>
      </Routes>
    </div>
  );
}

export default App;
