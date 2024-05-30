import { BrowserRouter,Route,Routes } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import WelcomeScreen from './screens/WelcomeScreen';
import BookingScreen from './screens/BookingScreen';
import LoginForm from './components/LoginForm';
import HomeScreen from './screens/HomeScreen';
import RegisterForm from './components/RegisterForm';
import AdminScreen from './screens/AdminScreen';
import LocationScreen from './screens/LocationScreen';
import Footer from './components/Footer';
function App() {
  return (
    <div className="dark:bg-gray-800">
      <BrowserRouter>
       <NavbarComponent />
        <Routes>
          <Route path="/" exact element={<WelcomeScreen/>}/>
          <Route path="/home" exact element={<HomeScreen/>} />
          <Route path="/book/:roomid" element={<BookingScreen/>} />
          <Route path="/register" exact element={<RegisterForm/>}/>
          <Route path="/login" exact element={<LoginForm/>}/>
          <Route path="/location/:country/:state/:city/:locality" exact element={<LocationScreen/>}/>
          <Route path="/AdminScreen" exact element={<AdminScreen/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
