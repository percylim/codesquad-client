import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import StartMenu from './startMenu';
import Navbar from './navbar';
//import Sidebar from './sidebar';

// import Dropdown from 'react-bootstrap/Dropdown';
const name = localStorage.getItem('companyID'); 
export default function Home() {
  return (
    <div>
    {(() => {
   //   return <Navbar />
   
    if (name !== null && name !== '') {
       return <Navbar />
    } else {
     return <StartMenu />
    }
   
   })()}    
    </div>

  );
}
