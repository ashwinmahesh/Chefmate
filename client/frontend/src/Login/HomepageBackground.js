import React from 'react';
// import './HomepageBackground.css';
import Box from '@material-ui/core/Box';

export default function HomepageBackground() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div1"></div>
        </Box>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div2"></div>
        </Box>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div3"></div>
        </Box>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div4"></div>
        </Box>
        <Box p={1} flexGrow={1} css={{ maxWidth: 270, height: '100vh', margin: 2 }}>
          <div class="div5"></div>
        </Box>
      </Box>
    </div>
  );
}
