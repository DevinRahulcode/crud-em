import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import AllEmployees from './components/AllEmployees';
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<AllEmployees/>} />  
       <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/EditEmployee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
