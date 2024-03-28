import React from 'react';
import EventForm from './components/EventForm';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <h1>Registro de Eventos Universitarios</h1>
      </header>
      <main>
        <EventForm />
      </main>
    </div>
  );
}

export default App;
