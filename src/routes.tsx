import { MemoryRouter as Router, Routes as LibRoutes, Route} from 'react-router-dom';
import Hello from './windows/pages/hello';
import Home from './windows/pages/home';
import LearnMore from './windows/pages/learn-more';

export function Routes() {

  return (
    <Router>
    <LibRoutes>
      <Route path="/" element={<Hello />} />
      <Route path="/home" element={<Home />} />
      <Route path="/learn" element={<LearnMore />} />
    </LibRoutes>
  </Router>
  )
}