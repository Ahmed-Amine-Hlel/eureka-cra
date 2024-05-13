import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Footer from './layout/Footer';
import { SessionProvider } from './contexts/SessionContext';

function App() {
  return (
    <main style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/callback.com"
            element={
              <SessionProvider>
                <HomePage />
              </SessionProvider>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
