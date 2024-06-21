import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Welcome from './components/Welcome/Welcome';
import ComposeEmail from './components/ComposeEmail/ComposeEmail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<SignUp />} />
        <Route path='/Welcome' element={<Welcome/>}/> 
        <Route path='/ComposeEmail' element={<ComposeEmail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
