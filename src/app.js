import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import 'bulma';
import './assets/scss/style.scss';

import Home from './components/Home';
import Navbar from './components/Navbar';
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';
import SecureRoute from './components/common/SecureRoute';
import NotFound from './components/common/NotFound';
import FlashMessages from './components/common/FlashMessages';
import Index from './components/common/Index';
import ComputerShow from './components/computers/Show';
import PartShow from './components/parts/Show';
import Comments from './components/common/Comments';

class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Navbar />
          <FlashMessages />
          <section className="section">
            <div className="container">
              <Switch>
                {/* <SecureRoute path="/computers/new" component={ComputersNew} />
                <SecureRoute path="/computers/:id/edit" component={ComputersEdit} /> */}
                <SecureRoute path="/computers/:id/comments" component={Comments} />
                <SecureRoute path="/parts/:id/comments" component={Comments} />
                <Route path="/parts/:id" component={PartShow} />
                <Route path="/computers/:id" component={ComputerShow} />
                <Route path="/index" component={Index} />
                <Route path="/login" component={AuthLogin} />
                <Route path="/register" component={AuthRegister} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </section>
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
