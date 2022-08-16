import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { About } from '../../views/About/About';
import { Home } from '../../views/Home/Home';
import { Page404 } from '../../views/404page/404page';
import { PageList } from '../../views/PageList/PageList';
import { Profile } from '../../views/Profile/Profile';
import { Layout } from '../Layout/Layout';
import { Page } from '../../views/Page/Page';
import { Start } from '../../views/Start/Start';
import { Logout } from '../Logout/Logout';
import { ProtectedRoute } from './ProtectedRoute';
import { Token } from '../../views/Token/Token';

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="token"
              element={
                <ProtectedRoute>
                  <Token />
                </ProtectedRoute>
              }
            />

            <Route
              path="pages"
              element={
                <ProtectedRoute>
                  <PageList />
                </ProtectedRoute>
              }
            />

            <Route
              path="page"
              element={
                <ProtectedRoute>
                  <Page />
                </ProtectedRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <Page />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="about" element={<About />} />

            <Route path="start" element={<Start status="login" />}>
              <Route path=":id" element={<Start status="login" />} />
            </Route>

            <Route path="logout" element={<Logout />} />

            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
