import './App.css';
import Home from "./homePage";
import Product from "./productPage";
import Search from "./searchPage";
import Cart from "./cartPage";
import Admin from "./adminPage";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/product/:id" component={Product} />
            <Route exact={true} path="/search/:keyword" component={Search} />
            <Route exact={true} path="/cart" component={Cart} />
            <Route exact={true} path="/admin" component={Admin} />
          </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
