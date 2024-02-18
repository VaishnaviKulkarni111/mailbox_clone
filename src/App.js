import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import AuthPage from './components/login/Auth';
function App() {
  return (<>
  <Navbar />
  <Routes>
       
        <Route path="/" element={<AuthPage />} />
      </Routes>
  
  </>  
  );
}

export default App;
