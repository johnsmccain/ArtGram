import React from 'react';

import { useAuth } from '../contexts/AuthContext';

const AppHeader: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header>
            <nav>
                <ul>
                    <li>My App</li>
                    {user && (
                        <>
                            <li>
                                Logged in as {user.name} ({user.email})
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;



// ////



// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { Link, Navigate } from 'react-router-dom';

// const AppHeader: React.FC = () => {
//     const { user, logout } = useAuth();

//     const handleLogout = async () => {
//         await logout();
//         return <Navigate to="/login" />;
//     };

//     return (
//         <header>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     {user ? (
//                         <>
//                             <li>
//                                 <Link to="/profile">{user.name}</Link>
//                             </li>
//                             <li>
//                                 <button onClick={handleLogout}>Logout</button>
//                             </li>
//                         </>
//                     ) : (
//                         <li>
//                             <Link to="/login">Login</Link>
//                         </li>
//                     )}
//                 </ul>
//             </nav>
//         </header>
//     );
// };

// export default AppHeader;
