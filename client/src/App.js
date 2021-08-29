import {
  Link,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import './App.css';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          Fib Finder
          <Link to="/">Home</Link>
          <Link to="/other-page">Other Page</Link>
        </header>
        <Route exact path="/" component={Fib} />
        <Route exact path="/other-page" component={OtherPage} />
      </div>
    </Router>
  );
}

export default App;
