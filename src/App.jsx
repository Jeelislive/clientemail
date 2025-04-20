import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import VerifyEmail from "./components/VerificationPage";
import Dashboard from "./components/dashboard";

function App() {

  const linkStyle = {
    display: 'inline-block',
    textAlign: 'center',
    margin: '15px 40px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  };
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
  <>
    <h1>Welcome to the Email Verification App</h1>
    <p>
      <a href="/login" id="login" style={linkStyle}>Login</a> 
      <span style={{ margin: '0 10px' }}>|</span> 
      <a href="/register" style={linkStyle}>Register</a>
    </p>
  </>
} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
