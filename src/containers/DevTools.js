import React from 'react';
import { createDevTools } from 'redux-devtools';

// Import commonly used monitors
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// Take a monitor and make a DevTools component
export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
  >
    <LogMonitor />
  </DockMonitor>
);
