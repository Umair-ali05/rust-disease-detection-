import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            component={Home}
          />
        </Switch>
      </Router>
    </>
  );
};
export default App;
