import React from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
//import { Sample } from './features/sample/Sample';
import { ParkMain } from './features/parks/ParkMain';
import { ParkDetail } from './features/parks/ParkDetail';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <h1><a className="title_a" href="http://hwan2272.dothome.co.kr/">설힐공 - 서울의 힐링공원</a></h1>
      </header>
      <main id="content" className="content">
        <Routes>
          <Route exact path={`/`} element={<ParkMain />} />
          <Route path={`/detail/:parkIdx`} element={<ParkDetail />} />
          {/* <Route exact path="/" component={ParkMain} />
          <Route path="/detail/:parkIdx" component={ParkDetail} /> */}
        </Routes>
      </main>
      <footer></footer>
      {/* <ParkMain /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
    </div>
  );
}

export default App;
