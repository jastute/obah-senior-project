// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/navbar';
// import Home from './pages/home';
// import Footer from './components/footer';
// import Register from './pages/register';
// import Login from './pages/login';
// import Contacts from './pages/contacts';
// import Equipments from './pages/equipmemts';
// import EquipmentRent from './pages/rentNow';
// import Dashboard from './pages/admin/dashbaord';
// import AdminNav from './components/adminNav';



// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/aboutus" element={<Contacts />} />
//         <Route path="/equipmemts" element={<Equipments />} />
//         <Route path="/equipmemts/:id" element={<EquipmentRent />} />
//         <Route path="/admin/" element={<Dashboard />} />
//       </Routes>
//       <Footer />
    
//     </BrowserRouter>
//   )
// }


// export default App;


import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Footer from './components/footer';
import Register from './pages/register';
import Login from './pages/login';
import Contacts from './pages/contacts';
import Equipments from './pages/equipmemts';
import EquipmentRent from './pages/rentNow';
import Dashboard from './pages/admin/dashbaord';
import AdminNav from './components/adminNav';
import Inventory from './pages/admin/inventories';
import UserProfile from './pages/profile';
import TermsAndConditions from './pages/terms&condition';

function Main() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? <AdminNav /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/aboutus" element={<Contacts />} />
        <Route path="/equipmemts" element={<Equipments />} />
        <Route path="/terms&condtion" element={<TermsAndConditions />} />
        <Route path="/equipmemts/:id" element={<EquipmentRent />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/inventory" element={<Inventory />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;

