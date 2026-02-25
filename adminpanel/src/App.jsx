
import './App.css'

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import Test from './components/test/test';

function App() {
  return <MantineProvider>
     <Test />
  </MantineProvider>;
}

export default App
