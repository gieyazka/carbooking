import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router} from "react-router-dom";
import DataContextProvider from './component/store/store'
import {  Route, Link, useLocation } from "react-router-dom";
import Login from './component/login'

// import FromRequest from './component/form/formrequest'
// import Genaral from './component/general'
import Layout from './component/layout'
function App() {
  return (
    <div style={{ fontFamily: 'Bai Jamjuree' }}>
        <DataContextProvider>
      <Router>
      <Route path="/login" component={Login} />
      <Route path="/user" component={Layout} />
      </Router>
      </DataContextProvider>
    </div>
  );
}

export default App;
