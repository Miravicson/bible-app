import {
  MemoryRouter as Router,
  Routes as LibRoutes,
  Route,
} from 'react-router-dom';
import { Welcome } from './screens/Welcome';
import { Home } from './screens/Home';
import { LearnMore } from './screens/LearnMore';

export function Routes() {
  return (
    <Router>
      <LibRoutes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn" element={<LearnMore />} />
      </LibRoutes>
    </Router>
  );
}
