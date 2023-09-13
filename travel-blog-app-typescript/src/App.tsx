
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Application from './application'
import './assets/styles/dots.css'
window.global = window;

function App() {
  window.global = window;

  return (
    <>
    <BrowserRouter>
      <Application></Application>
    </BrowserRouter>
    
    </>
  )
}

export default App
