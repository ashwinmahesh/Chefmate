import React from 'react';
import './homeScreen.css';
import Box from '@material-ui/core/Box';
// import cuisine1 from '../images/cuisine1';


export default function FlexGrow() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" p={1} >
        <Box p={1} flexGrow={1} 
        css={{ maxWidth: 270, height: "100vh", margin: 2 }}>
          <div class = "div1"></div>
        </Box>
        <Box p={1} flexGrow={1}
          css={{ maxWidth: 270, height: "100vh", margin: 2  }}>
          <div class = "div2"></div>
        </Box>
        <Box p={1} flexGrow={1} 
        css={{ maxWidth: 270, height: "100vh", margin: 2  }}>
          <div class = "div3"></div>
        </Box>
        <Box p={1} flexGrow={1}
        css={{ maxWidth: 270, height: "100vh", margin: 2  }}>
          <div class = "div4"></div>
        </Box>
        <Box p={1} flexGrow={1} 
        css={{ maxWidth: 270, height: "100vh", margin: 2  }}>
          <div class = "div5"></div>
        </Box>
      </Box>
    </div>
  );
}