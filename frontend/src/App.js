import './App.css';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<JoinPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>

    </BrowserRouter>
    //<Chat/>
    
  );
}

export default App;
