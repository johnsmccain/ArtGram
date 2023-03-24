// import React from 'react';
// import { Route, RouteProps, Redirect } from 'react-router-dom';

// import { useAuth } from '../contexts/AuthContext';

// interface PrivateRouteProps extends RouteProps { }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...rest }) => {
//     const { user } = useAuth();

//     return user ? (
//         <Route {...rest} />
//     ) : (
//         <Redirect to="/login" replace state={{ from: rest.location }} />
//     );
// };

// export default PrivateRoute;
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
}

const PrivateRoute = ({ path, element }: PrivateRouteProps) => {
    const { user } = useAuth();

    return (
        <Route
            path={path}
            element={user ? element : <Navigate to="/login" replace />}
        />
    );
};

export default PrivateRoute;
