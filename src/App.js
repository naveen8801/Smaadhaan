import './App.css';
import HelpingHands from './pages/Helping Hands/HelpingHands';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashbord';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile/Profile';
import { useDataLayerValues } from './ContextApi/datalayer';

function App() {
  const [{ isAuth }, dispatch] = useDataLayerValues();
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/profile">
          {isAuth ? <Profile /> : <Redirect to="/helping-hands" />}
        </Route>
        <Route exact path="/helping-hands">
          <HelpingHands />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </>
    // <div className="App">
    //   <Navbar />
    //   <HelpingHands />
    // </div>
  );
}

export default App;
