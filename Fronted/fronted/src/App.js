import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/Home';
import {Toaster} from "react-hot-toast"
import Login from './components/auth/Login';
import ProductDetail from './components/product/productDetail';
import Register from './components/auth/register';

function App() {
  return (
    <Router>
    <div className="App">
      <Toaster position="top-left" />
      <Header/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product/:id' element={<ProductDetail/>}></Route>

          <Route path='/login' element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
       </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
