import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from './components/navbar';
import {CarouselApp} from './components/carousel';
import {CategorySlider} from './components/categories';
import PrimarySearchAppBar from './components/appBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
      <Router>
        <PrimarySearchAppBar />

        <CarouselApp />

        <CategorySlider />
        

    </Router>
    </div>
  );
}

export default App;
