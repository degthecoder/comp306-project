import HomePage from './Containers/HomePage'; 
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="*" Component={HomePage}/>
      <Route path="/home" Component={HomePage}/>
    </Routes>
  );
}

export default App;
