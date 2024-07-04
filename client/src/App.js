import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './Component/Home/home';


function App() {
  return (
    <>
  
    <ChakraProvider>
    <Home/>
    </ChakraProvider>
    </>
  );
}

export default App;
