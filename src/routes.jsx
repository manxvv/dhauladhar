import React, { memo, useMemo } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Layout from './layout';
import LoginForm from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Overview from './components/Overview';
import useAuth from './store/useAuth';
import Dashboard from "./components/Dashboard";
import Profile from './components/Profile';
import SetPassword from './components/SetPassword';
import ListProperties from './components/ListProperties';
import PropertiesPage from './components/PropertiesPage';
import { SidebarDemo } from './components/SidebarComponent';
import Contact from './components/Contact';

// Memoize the AuthRequired component to prevent unnecessary rerenders
const AuthRequired = memo(({ requiredRoles = [], children }) => {
    const { user, authenticated } = useAuth();
    
    // Use useMemo to prevent recalculation of rolePermitted on each render
    const rolePermitted = useMemo(() => {
        if (!requiredRoles.length) return true;
        return requiredRoles.includes(user?.role);
    }, [user?.role, requiredRoles]);

    if (!authenticated) {
        return <Navigate to="/auth/signup" />;
    }
    
    if (!rolePermitted) {
        return <Navigate to="/auth/signup" />;
    }
    
    return children;
});

// Memoize the NotFound component
const NotFound = memo(() => (
    <div>
        404 - Page Not Found. The requested URL does not exist.
    </div>
));

// Create routes configuration outside the router creation
const routesConfig = [
    {
        path: '/auth/login',
        element: <LoginForm />,
    },
    {
        path: '/auth/signup',
        element: <SignUp />,
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/',
        element: <Overview />,
    },
    {
        path: '/password/:id',
        element: <SetPassword />,
    },
    {
        path: '/properties',
        element: <PropertiesPage />,
    },
        {
        path: '/contact',
        element: <Contact />,
    },
    {
        path: '/app/',
        element: (
            <AuthRequired requiredRoles={["Admin"]}>
                <SidebarDemo outlet={<Outlet />} />
            </AuthRequired>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'setting',
                element: <div>abc Details</div>,
            },
            {
                path: 'list-properties',
                element: <ListProperties />,
            },
            {
                path: 'available-courses',
                element: <div>available courses</div>,
            },
            {
                path: 'completed-courses',
                element: <div>completed courses</div>,
            },
            {
                path: 'scheduled-classes',
                element: <div>scheduled classsess Details</div>,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

// Create router with memoized routes
const router = createBrowserRouter(routesConfig);

export default router;