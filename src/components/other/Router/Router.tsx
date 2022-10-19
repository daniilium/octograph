import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './../Layout';
import { Logout } from './../Logout';
import { ProtectedRoute } from './ProtectedRoute';

import { Home } from '../../../pages';
const SignUp = lazy(() => import('./routes/SignUp'));
const Login = lazy(() => import('./routes/Login'));
const Profile = lazy(() => import('./routes/Profile'));
const Token = lazy(() => import('./routes/Token'));
const PageList = lazy(() => import('./routes/PageList'));
const Page = lazy(() => import('./routes/Page'));
const Page404 = lazy(() => import('./routes/Page404'));

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<></>}>
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}
