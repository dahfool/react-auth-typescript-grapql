import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Header from './components/Header'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Dashboard from './components/Dashboard'
import requireAuth from './components/requireAuth'
import './App.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id || null
  })
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='container'>
          <Header />
          <Switch>
            <Route path='/login' component={LoginForm} />
            <Route path='/signup' component={SignUpForm} />
            <Route path='/dashboard' component={requireAuth(Dashboard)} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
