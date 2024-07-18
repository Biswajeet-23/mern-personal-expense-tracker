import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./global_context/UserContext";
import Expenses from "./components/Expenses";
import Dashboard from "./pages/home_pages/Dashboard";
import Settings from "./pages/home_pages/Settings";
import { ExpenseProvider } from "./global_context/ExpenseProvider";

function App() {
  return (
    <UserProvider>
      <ExpenseProvider>
        <Layout />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="expences" element={<Expenses />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ExpenseProvider>
    </UserProvider>
  );
}

export default App;
