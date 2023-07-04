import './App.css';
import Login from './Authentication/Login'
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './Users/Dashboard';
import StudentsLayout from './Users/StudentsLayout'

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/Dashboard' component={Dashboard} />
        <Route exact path='/StudentsLayout' component={StudentsLayout} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
