import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddProjectPage from './pages/AddProjectPage';
import SettingsPage from './pages/SettingsPage';
import { Toaster } from '@/components/ui/sonner';

/**
 * Layout wrapper for authenticated pages
 */
const AppLayout = ({ children }) => (
  <div className="flex xl:h-screen h-[100dvh] overflow-hidden" style={{backgroundColor: '#F3F4F1'}}>
    <Sidebar />
    <div className="flex-1 flex flex-col h-full pl-6 pr-8 py-6 overflow-hidden">
      <TopHeader />
      <main className="flex-1 overflow-y-auto mt-4 pb-12 pr-2 scrollbar-hide">
        {children}
      </main>
    </div>
  </div>
);

/**
 * App Routes
 */
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Login — redirect if already auth'd */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AddProjectPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
