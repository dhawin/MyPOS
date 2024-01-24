import {
  HashRouter, 
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <HashRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/pos" element={<POSPage/>} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
}

export default App;
