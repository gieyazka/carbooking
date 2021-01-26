import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Link, useLocation, Switch } from "react-router-dom";
import DataContextProvider from './component/store/store'

import Login from './component/login'
import Approve from './component/approve'
import Flow from './component/flow'

// import FromRequest from './component/form/formrequest'
// import Genaral from './component/general'
import Layout from './component/layout'
function App() {
  return (
    <div style={{ fontFamily: 'Bai Jamjuree' }}>
      <DataContextProvider>
        <Router
         basename={'/carbooking'}
         >
          
          <Switch>
            <Route exact path="/carbooking" component={Login} />

            <Route path="/carbooking/login" component={Login} />
            <Route path="/carbooking/approve/:id/:uuid" component={Approve} />
            <Route path="/carbooking/user" component={Layout} />
            <Route path="/carbooking/flow" component={Flow} />
            <Route path="/carbooking/*" component={Layout} />
          </Switch>
        </Router>
      </DataContextProvider>
    </div>
  );
}

export default App;
