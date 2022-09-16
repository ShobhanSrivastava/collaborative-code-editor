import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import {Toaster} from 'react-hot-toast';

function App() {
  return (
    <div className='bg-[#1c1e29]'>
      <div>
        <Toaster position="top-center" />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:id" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
