import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from 'routes/Layout';
import { Logout } from 'components/other/Logout';
import { ProtectedRoute } from 'routes/ProtectedRoute';

import { Home } from 'pages';
const SignUp = lazy(() => import('routes/default/SignUp'));
const Login = lazy(() => import('routes/default/Login'));
const Profile = lazy(() => import('routes/default/Profile'));
const Token = lazy(() => import('routes/default/Token'));
const PageList = lazy(() => import('routes/default/PageList'));
const Page = lazy(() => import('routes/default/Page'));
const Page404 = lazy(() => import('routes/default/Page404'));

export function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />}>
              <Route path=":token" element={<Login />} />
            </Route>

            <Route path="profile" element={<ProtectedRoute component={<Profile />} />} />
            <Route path="token" element={<ProtectedRoute component={<Token />} />} />

            <Route path="pages" element={<ProtectedRoute component={<PageList />} />} />
            <Route path="page" element={<ProtectedRoute component={<Page />} />}>
              <Route path=":id" element={<ProtectedRoute component={<Page />} />} />
            </Route>

            <Route path="*" element={<Page404 />} />

            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
