import React from 'react';
import { 
  Route as ReactRouteDom,
  RouteProps as ReactDomRouteProps,
  Redirect
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactDomRouteProps {
  isPrivate? : boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate= false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactRouteDom {...rest} render={({ location }) => {
      return isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect 
          to={{ 
            pathname: isPrivate ? '/' : 'dashboard', 
            state: { from: location },
          }} 
        />
      )
    }}/>
  );
};

export default Route;