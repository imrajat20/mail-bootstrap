import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Welcome from './components/Welcome/Welcome';
import ComposeEmail from './components/ComposeEmail/ComposeEmail';
import Inbox from './components/Inbox/Inbox';
import SentMails from './components/SentMails/SentMails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<SignUp />} />
        <Route path='/Welcome' element={<Welcome/>}/> 
        <Route path='/Compose' element={<ComposeEmail/>}/>
        <Route path='/Inbox' element={<Inbox/>}/>
        <Route path='/SentMails' element={<SentMails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
