import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {CarouselApp} from './components/carousel';
import {CategorySlider} from './components/categories';
import PrimarySearchAppBar from './appBar';

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