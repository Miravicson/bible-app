import {
  MemoryRouter as Router,
  Routes as LibRoutes,
  Route,
} from 'react-router-dom';
import { Welcome } from './pages/welcome';
import { Home } from './pages/home';
import { LearnMore } from './pages/learn-more';

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
