import HomePage from './Containers/HomePage'; 
import { Route, Routes } from 'react-router-dom';
import queries from './Containers/Queries';

function App() {
  return (
    <Routes>
      <Route path="*" Component={HomePage}/>
      <Route path="/home" Component={HomePage}/>
      <Route path="/queries" Component={queries}/>
    </Routes>
  );
}

export default App;
