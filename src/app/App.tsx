import { AppProvider } from '@/providers/AppProvider';
import { AppRoutes } from '@/routes/AppRoutes';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
