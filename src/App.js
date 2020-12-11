import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";

// import FromRequest from './component/form/formrequest'
// import Genaral from './component/general'
import Layout from './component/layout'
function App() {
  return (
    <div style={{ fontFamily: 'Bai Jamjuree' }}>
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
