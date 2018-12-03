import React, {component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './pages/home';
import AboutPage from './pages/about';
import TopicsPage from './pages/topics';
import SettingsPage from './pages/settings';
import Navbar from './components/navbar';

const App = () => (
  <Router>
    <div>
      <Navbar />

      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/topics" component={TopicsPage} />
      <Route path="/settings" component={SettingsPage} />
    </div>
  </Router>
);

export default App;
