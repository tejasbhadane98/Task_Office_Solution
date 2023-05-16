import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './Components/SignIn/SignIn';
import Signup from './Components/SignUp/SignUp';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
      </Routes>
     </BrowserRouter> 
     
    </div>
  );
}

export default App;
