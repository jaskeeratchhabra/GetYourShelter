
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";

function NavbarComponent() {
  const location = useLocation();
  const [darkTheme, setDarkTheme] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userName=JSON.parse(localStorage.getItem("user")).name;

//   const [themeIcon,setThemeIcon] =useState(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//   <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
// </svg>
// );

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [locality, setLocality] = useState('');

  const [toggleDropdown,setToggle]=useState(true);

  const [toggleDropdownState,setToggleState]=useState(false);

  const [cCode,setCCode]=useState("")
  const [sCode,setSCode]=useState("");

  var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}

  async function fetchCountries(){
    let apiEndPoint = config.cUrl;
    try{
     await fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.ckey}})
     .then(Response => Response.json())
     .then(data => 
       {setCountries(data)
        // console.log(data);
      }
       )

    }
    catch(error){
      console.log(error.message)
    }
  }

  async function fetchStates(){
    try{
      await fetch(`${config.cUrl}/${cCode}/states`, {headers: {"X-CSCAPI-KEY": config.ckey}})
      .then(response => response.json())
      .then(data => {
        setStates(data);
        // console.log(cCode);
        // console.log(data);
      })
    }
    catch(error){
      console.log(error.message)
      console.log("in fetchStates")
    }

  }
  async function fetchCities(){
    try{
      fetch(`${config.cUrl}/${cCode}/states/${sCode}/cities`, {headers: {"X-CSCAPI-KEY": config.ckey}})
      .then(response=>response.json())
      .then((data)=>{
         setCities(data);
        console.log("city")
        console.log(data)
      })
    }
    catch(error){
     console.log(error)
    }
 
}
 
  useEffect(() => {
    if(selectedState){
      fetchCities()
    }
    if(selectedCountry){
      fetchStates()
    }
    fetchCountries();
  }, [selectedCountry,selectedState])



  // async function searchRooms{
  //   const location={
      
  //   }
  //   const data=(axios.get(`/api/rooms/getRoomByLocation`))data
  //     .then(response => {
  //       console.log('Search results:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error searching rooms:', error);
  //     });
  // };
  

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeToggle = () => {
    if (darkTheme) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      setDarkTheme(false);
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      setDarkTheme(true);
    }
  };
  

  return (
    <>
      <Navbar className='bg-gray-800'>
        <Container className="flex justify-between items-center px-2 py-2">
          <Navbar.Brand href="/home" className='text-white flex items-center text-xl'>
            <img 
              src="https://i.pinimg.com/originals/f4/fa/ec/f4faec1798f199132d27ed903701818b.png"
              className="d-inline-block align-top mr-2 h-10 w-10 rounded-3xl"
              alt="PgDekho Logo"
            />
            PgDekho.com
          </Navbar.Brand>
          {(location.pathname === '/home') && (
           <div className="flex justify-center ml-52">
                 {toggleDropdown && (<select
                      className="p-2 border border-gray-300 rounded-s-2xl min-w-80"
                      value={selectedCountry}
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        const selectedCountryObject = countries.find(country => country.name === e.target.value);
                        if (selectedCountryObject) {
                          setCCode(selectedCountryObject.iso2);
                        }
                        setToggle(false);
                        setToggleState(true);
                       }
                      }
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country.iso2} value={country.name}>{country.name}</option>
                      ))}
                    </select>)
                 }
                 {toggleDropdownState && (selectedCountry) && (<select
                    className="p-2 border border-gray-300 rounded-s-2xl min-w-80"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      const selectedStateObject = states.find(state => state.name === e.target.value);
                      if (selectedStateObject) {
                        setSCode(selectedStateObject.iso2);
                      } 
                      setToggleState(false)
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.iso2} value={state.name}>{state.name}</option>
                    ))}
                  </select>)
                 }
                 { (selectedCountry) && (selectedState) && (
                    <select
                      className="p-2 border border-gray-300 rounded-s-2xl min-w-80"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                      ))}
                    </select>
                    )
                 }
                 {/* <p className='text-white'>{selectedCountry}  {selectedCity} {selectedCity}</p> */}

                 {/* </div> */}
                 <input
                   type="text"
                   className="p-2 border border-gray-300"
                   placeholder="Locality/Address/College"
                   value={locality}
                   onChange={(e) => setLocality(e.target.value)}
                 />
                 <Link to={`/location/${selectedCountry}/${selectedState}/${selectedCity}/${locality}`}>
 
                     <button
                       className="p-2 bg-blue-500 text-white rounded-e-2xl hover:bg-gray-500"
                      //  onClick={searchRooms}
                     >
                       Search
                     </button>
                 </Link>
             
            </div>

          )}
          {(location.pathname === '/home' || location.pathname === '/AdminScreen' || location.pathname.startsWith("/location")) && (
            <Nav className="items-center flex ml-auto">
              <label className="radio-container mr-4 text-white">
                {/* <input type="checkbox" checked={darkTheme} onChange={handleThemeToggle} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:bg-gray-500" onClick={handleThemeToggle}>
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>


              </label>
              <div className="relative right-1">
                <h1>
                  <span className="cursor-pointer text-gray-800 flex bg-white px-1 rounded-sm" onClick={handleDropdown}>
                    {userName} 
                    <span>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                     <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                   </span>
                  </span>
                </h1>
                {isOpen && (
                  <div className="absolute top-16 right-4 bg-white shadow-md rounded w-36 py-2 z-10">
                    <Link to="/myaccount" className="block px-4 py-2 text-gray-1000 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link to="/">
                      <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none">
                        Logout
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarComponent;
