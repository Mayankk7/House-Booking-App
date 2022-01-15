
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Link } from "react-router-dom"
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/home" exact component={Homescreen} />
        <Route path="/book/:roomid" exact component={Bookingscreen} />
        <Route path="/login" exact component={Loginscreen}/>
        <Route path="/register" exact component={Registerscreen}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
