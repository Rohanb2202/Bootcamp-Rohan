// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import ResearchExplorer from './research-paper';

// function App() {
//   return <ResearchExplorer />;
// }

// export default App;

import React from 'react';

import ResearchPapersExplorer from './research-paper';

function App() {
  return (
    <div>
      <ResearchPapersExplorer />
    </div>
  );
}

export default App;