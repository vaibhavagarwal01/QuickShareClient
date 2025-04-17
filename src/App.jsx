import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from './pages/Home'
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { ListFiles } from "./pages/ListFiles"
import { FileUpload } from "./pages/FileUpload"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/fileUpload' element={<FileUpload />} />
        <Route path='/listFile' element={<ListFiles />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
