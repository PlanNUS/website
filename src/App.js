import React from 'react';
import JsonRetrival from './ModuleLoader/JsonRetrival';

function App() {
  var newObj = JsonRetrival();

  console.log(JsonRetrival());

  return (
    <div>
      <p>{JSON.stringify(newObj)}</p>
    </div>
  );
}

export default App;
