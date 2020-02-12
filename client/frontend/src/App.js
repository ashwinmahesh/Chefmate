import React from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@material-ui/core/Box';
import Template from './template/template'

export default function FlexGrow() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" p={1} bgcolor="background.paper">
        <Box p={1} flexGrow={1} bgcolor="grey.300"
        css={{ maxWidth: 270, height: 200, margin: 2  }}>
          Item 1
        </Box>
        <Box p={1} flexGrow={1} bgcolor="grey.300"
          css={{ maxWidth: 270, height: 200, margin: 2  }}>
          Item 2
        </Box>
        <Box p={1} flexGrow={1} bgcolor="grey.300"
        css={{ maxWidth: 270, height: 200, margin: 2  }}>
          Item 3
        </Box>
        <Box p={1} flexGrow={1} bgcolor="grey.300"
        css={{ maxWidth: 270, height: 200, margin: 2  }}>
          Item 4
        </Box>
        <Box p={1} flexGrow={1} bgcolor="grey.300"
        css={{ maxWidth: 270, height: 200, margin: 2  }}>
          Item 5
        </Box>
      </Box>
    </div>
  );
}

// const FlexboxPage = () => (
//   <>
  
//     <div className="d-flex flex-col">
//       <div className="p-2 col-example text-left">Flex item 1</div>
//       <div className="p-2 col-example text-left">Flex item 2</div>
//       <div className="p-2 col-example text-left">Flex item 3</div>
//     </div>
   
//   </>
// );


// export default FlexboxPage;
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
       
//         <Template />
        
//       </header>
//     </div>
//   );
// }
// export default App;


