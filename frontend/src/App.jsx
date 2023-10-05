import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Dashboard from "./componentes user/Dashboard"
import Edit from "./componentes user/Edit"
import Enlaces from "./componentes admin/Enlaces"
import Usuarios from "./componentes admin/Usuarios"
import Roles from "./componentes admin/Roles"
import Bitacoras from "./componentes admin/Bitacoras"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard edit" element={<Edit />} />
        <Route path="/enlaces" element={<Enlaces/>} />
        <Route path="/usuarios" element={<Usuarios/>} />
        <Route path="/roles" element={<Roles/>} />
        <Route path="/bitacoras" element={<Bitacoras/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
