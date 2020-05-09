import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import CreateInvoice from "./pages/CreateInvoice";

import "./scss/App.scss";

function App() {
  return (
    <Router>
    <Header />
    <main id="main-wrap" className="wrap clearfix py-3">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/create-invoice" component={CreateInvoice} />
      </Switch>
    </main>
    <Footer />
    </Router>
  );
}

export default App;
