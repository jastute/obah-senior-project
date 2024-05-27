import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Footer from './components/footer';
import Register from './pages/register';
import Login from './pages/login';
import Contacts from './pages/contacts';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<Contacts />} />
      </Routes>
      <Footer />
    
    </BrowserRouter>
  )
}


export default App;
