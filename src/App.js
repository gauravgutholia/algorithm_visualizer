import './App.css';
import HomeDisplay from './AlgorithmVisualizer/Home';
import Display from './SortingVisualizer/SortingVisualizer';
import {Route, Link} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Route exact path='/' component={HomeDisplay}></Route>
      <Route exact path='/AlgoView' component={Display}></Route>
    </div>
  );
}


export default App;
