import HomePage from './Containers/HomePage'; 
import { Route, Routes } from 'react-router-dom';
import queries from './Containers/Queries';
import PopularMovies from './Containers/PopularMovies';
import Genres from './Containers/Genres';
import HighestRated from './Containers/HighestRated';

function App() {
  return (
    <Routes>
      <Route path="*" Component={HomePage}/>
      <Route path="/home" Component={HomePage}/>
      <Route path="/queries" Component={queries}/>
      <Route path="/popularMovies" Component={PopularMovies}/>
      <Route path="/genres" Component={Genres}/>
      <Route path="/highestRated" Component={HighestRated}/>



    </Routes>
  );
}

export default App;
