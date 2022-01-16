
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Link } from "react-router-dom"
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import ProfileScreen from './screens/ProfileScreen';
import Adminscreen from './screens/Adminscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/home" exact component={Homescreen} />
        <Route path="/book/:roomid/:fromdate/:todate" exact component={Bookingscreen} />
        <Route path="/login" exact component={Loginscreen}/>
        <Route path="/register" exact component={Registerscreen}/>
        <Route path="/profile" exact component={ProfileScreen}/>
        <Route path="/admin" exact component={Adminscreen}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
