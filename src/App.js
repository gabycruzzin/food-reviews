import logo from './logo.svg';
import './App.css';
import { Employee } from './Employee';
import { useState } from 'react';
import { CreateEmployee } from './components/CreateEmployee';
import { UpdateEmployee } from './components/UpdateEmployee';
import { DeleteEmployee } from './components/DeleteEmployee';
import { ViewEmployee } from './components/ViewEmployee';

function App() {
  const [mylist, setmylist] = useState([
    {name: 'Gaby', sid: 'F581463'}, 
    {name: 'Bob', sid: 'I123456'}, 
    {name: 'Kiki', sid: 'W456789'}]);

  return (
    <div className="App">
      <header className="App-header">        
        <Employee names={mylist} />

        <CreateEmployee />
        <UpdateEmployee />
        <DeleteEmployee />
        <ViewEmployee />
      </header>
    </div>
  );
}

export default App;
