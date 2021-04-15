import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {CarouselApp} from './components/carousel';
import {CategorySlider} from './components/categories';
import PrimarySearchAppBar from './appBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import firebase from './firebase';
import "firebase/auth";

function Home() {
  return (
    <div className="App">
        <PrimarySearchAppBar />

        <CarouselApp />

        <CategorySlider />
        


    </div>
  );
}

export default Home;