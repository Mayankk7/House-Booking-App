
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Link } from "react-router-dom"
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import ProfileScreen from './screens/ProfileScreen';
import Adminscreen from './screens/Adminscreen';
import Loadingscreen from './screens/Loadingscreen';
import Forgotscreen from './screens/Forgotscreen';
import Resetscreen from './screens/Resetscreen';
import Footer from "./components/Footer"
import { useEffect } from 'react';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar />
          <Route path="/" exact component={Loadingscreen} />
          <Route path="/home" exact component={Homescreen} />
          <Route path="/book/:roomid/:fromdate/:todate" exact component={Bookingscreen} />
          <Route path="/login" exact component={Loginscreen} />
          <Route path="/register" exact component={Registerscreen} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/admin" exact component={Adminscreen} />
          <Route path="/forgot" exact component={Forgotscreen} />
          <Route path="/reset/:id" exact component={Resetscreen} />
        </div>
        <div style={{ position: "fixed", bottom: "0", left: "0", right: "0" }}>
          <Footer />
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
