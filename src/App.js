import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Maps from './component/Maps';
import List from './component/List';

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Maps />} />
            <Route path="/List" element = {<List />}/>
          </Routes>
        </Router>
      </>
  );
}

export default App;
