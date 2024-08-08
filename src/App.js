// // src/App.js

// import React from 'react';
// // import './App.css';
//  import FileViewerComponent from './FileViewerComponent';
// import ExcelImporter from './ExcelImporter';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <ExcelImporter/> */}
//          <FileViewerComponent/>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js

import React from 'react';
import './App.css';
import DocViewerComponent from './DocViewerComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DocViewerComponent />
      </header>
    </div>
  );
}

export default App;
