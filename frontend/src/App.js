import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Title  from './components/Title';
import Thread from "./components//Thread";
import SubGenre from "./components/SubGenre";
import NewThread from "./components/NewThread";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Title />} />
        <Route path="/SubGenre/:id" element={<SubGenre />} />
        <Route path="/NewThread/:id" element={<NewThread />} />
        <Route path={`/Thread/`} element={<Thread />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
