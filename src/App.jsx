import { useState } from 'react'
import MainSite from "./components/MainSite.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainSite/>
    </>
  )
}

export default App
