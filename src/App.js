import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
//import Landing from './components/Landing';
import Detail from './components/Detail.jsx';
//import ActivityCreate from './components/ActivityCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route path="/:id" element={<Detail/>}/>
    {/*<Route path="/addActivity" component={ActivityCreate}/>
    <Route path="/home/:id" component={Detail}/> */}

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;