import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { About } from '../../views/About/About';
import { Home } from '../../views/Home/Home';
import { Page404 } from '../../views/Page404/Page404';
import { PagesList } from '../../views/PageList/PageList';
import { Profile } from '../../views/Profile/Profile';
import { Layout } from '../Layout/Layout';
import { Authorization } from '../../views/Authorization/Authorization';
import { isAuthorized as checkAuth } from '../../services/cookies';
import { Page } from '../../views/PageList/Page/Page';
import { Start } from '../../views/Start/Start';

const isAuthorized = (component: JSX.Element) =>
  checkAuth() ? component : <Navigate to="/authorization" />;

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="profile" element={isAuthorized(<Profile />)} />

            <Route path="pages" element={isAuthorized(<PagesList />)} />

            <Route path="page" element={isAuthorized(<Page />)}>
              <Route path=":id" element={isAuthorized(<Page />)} />
            </Route>

            <Route path="about" element={<About />} />

            <Route
              path="authorization"
              element={checkAuth() ? <Navigate to="/" /> : <Authorization />}
            />
            <Route path="start" element={<Start status="login" />}>
              <Route path=":id" element={<Start status="login" />} />
            </Route>

            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
