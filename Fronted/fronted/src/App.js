import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/Home';
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <Router>
    <div className="App">
      <Toaster position="top-left" />
      <Header/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
       </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
