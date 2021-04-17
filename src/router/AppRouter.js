import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import WeightBalanceCalc from "../components/WeightBalance";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TakeOff from "../components/TakeOff";
import NotFoundPage from "../components/NotFoundPage";

export const history = createHistory();

const subtitle = "! Not for real life usage - Flight Simulation only !";
const credits = (<div>
  <span style={{ fontSize: "11pt", textAlign:"center", display: "flex",
  justifyContent: "space-between"}}>
  <a href="https://flightplandatabase.com" style={{color: "white"}}>Using airport data from the Flight Plan Database</a>
  <a href="https://www.checkwxapi.com/" style={{color: "white"}}>Using metars from the CheckWX API</a>
  </span>
  </div>)

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header subtitle={subtitle}/>
      <Switch>
        <Route path="/" component={WeightBalanceCalc} exact={true} />
        <Route path="/takeoff" component={TakeOff} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer credits={credits}/>
    </div>
  </Router>
);

export default AppRouter;
