import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import AuthPage from './components/login/Auth';
import ComposeMail from './components/compose/composeMail';
import Inbox from './components/mails/inbox';
import Sent from './components/mails/Sent';
import ShowFullMail from './components/mails/showCurrentMail';
import FullSentMail from './components/mails/FullSentMail';
function App() {
  return (<>
  <Navbar />
  <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/compose" element={<ComposeMail />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/inbox/:id" element={<ShowFullMail />} />
        <Route path="/sent/:id" element={<FullSentMail />} />
      </Routes>
  
  </>  
  );
}

export default App;
