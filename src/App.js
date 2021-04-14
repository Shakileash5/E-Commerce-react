import logo from './logo.svg';
import './App.css';
import Home from "./homePage";
import Product from "./productPage";
import Search from "./searchPage";
import Cart from "./cartPage";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/product/:id" component={Product} />
            <Route exact={true} path="/search" component={Search} />
            <Route exact={true} path="/cart" component={Cart} />
          </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
