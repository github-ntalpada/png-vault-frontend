import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store'
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain="nirav11.us.auth0.com"
        clientId="4Vpvin3kYryJavHcMyeXSj0jcM7OL23N"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'https://nirav11.us.auth0.com/api/v2/'
        }}
        cacheLocation="localstorage"
        useRefreshTokens={true}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>,
);
