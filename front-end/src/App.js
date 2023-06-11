import HomePage from './Containers/HomePage'; 
import { Route, Routes } from 'react-router-dom';
import Stars from './Containers/Stars';

function App() {
  return (
    <Routes>
      <Route path="*" Component={HomePage}/>
      <Route path="/home" Component={HomePage}/>
      <Route path="/stars" Component={Stars}/>
    </Routes>
  );
}

export default App;
