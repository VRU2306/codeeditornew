import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProblemsSet from './components/problems/problem';
import Editor from './components/editor/editor';
import Home from './components/home/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Header from './components/home/header';
import Footer from './components/home/footer';

function App() {
  const isHomepage = window.location.pathname === "/"
  const footerClass = isHomepage ? '' : 'footer'
  const contentClass = isHomepage ? '' : 'content'
  return (
    <div className="app-container">
      <BrowserRouter>
        <div className='header'>
          <Header />

        </div>
        <div className={contentClass}>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/problems-all" element={<ProblemsSet />} />
            <Route path="/problem/:id" element={<Editor />} />
          </Routes>
        </div>
        <div className={footerClass}>
          <Footer />

        </div>

      </BrowserRouter>

    </div>
  );
}

export default App;
