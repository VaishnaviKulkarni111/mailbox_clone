import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import AuthPage from './components/login/Auth';
import ComposeMail from './components/compose/composeMail';
function App() {
  return (<>
  <Navbar />
  <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/compose" element={<ComposeMail />} />
      </Routes>
  
  </>  
  );
}

export default App;
