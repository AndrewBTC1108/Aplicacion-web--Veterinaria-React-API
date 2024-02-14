import { createBrowserRouter } from "react-router-dom"
import AuthLayout from "./Layouts/AuthLayout";//auth
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import ForgotPassword from "./views/Auth/ForgotPassword";
import PasswordReset from "./views/Auth/PasswordReset";
import VerifyEmail from "./views/Auth/VerifyEmail";
import AdminLayout from "./Layouts/AdminLayout";//Admin
import ConsultasAdmin from './views/Admin/ConsultasAdmin'
import AdminUsuarios from './views/Admin/AdminUsuarios'
import Layout from "./Layouts/Layout";//users
import Mascotas from "./views/Mascotas";
import Consultas from './views/Consultas';
import Perfil from "./views/Perfil";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Mascotas />
            },
            {
                path: '/consultas',
                element: <Consultas />
            },
            {
                path: '/perfil',
                element: <Perfil />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            },
            {
                path: '/auth/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/auth/reset-password',
                element: <PasswordReset />
            },
            {
                path: '/auth/verify-email',
                element: <VerifyEmail />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <ConsultasAdmin/>
            },
            {
                path: '/admin/usuarios',
                element: <AdminUsuarios />
            }
        ]
    },
    {// Ruta para manejar errores 404
        path: '*',
        element: <NotFound />
    }
]);

export default router
