import { useState } from 'react'
import './App.css'

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Demo from './demo/demo';


function App() {

  return (
       <MantineProvider>
        <Demo/>
       </MantineProvider>
  )
}

export default App
