import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import Navbar from './components/Navbar'
import AllPrices from "./pages/AllPrices";
import Wallet from './pages/Wallet'

import './App.scss';

function App() {
  return (
    <Router>
    <Navbar />
        <Routes>
            <Route path='/' element={<AllPrices />} />
            <Route path='/wallet' element={<Wallet />} />
        </Routes>
    </Router>
  );
}

export default App;
