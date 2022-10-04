import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, Login, Page404, Profile, SignUp, Token, PageList, Page } from '../../pages';

import { Layout } from './Layout';
import { Logout } from './Logout';
import { ProtectedRoute } from './ProtectedRoute';

export function Router() {
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
