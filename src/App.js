import logo from './logo.svg';
import './App.css';
import { Employee } from './Employee';
import { useState } from 'react';

function App() {
  const [mylist, setmylist] = useState([
    {name: 'Gaby', sid: 'F581463'}, {name: 'Bob', sid: 'I123456'}, {name: 'Kiki', sid: 'W456789'}]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        App.js
        <Employee names={mylist} />
      </header>
    </div>
  );
}

export default App;
