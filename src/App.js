import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { NavBar } from "./components/navbar/NavBar";
import { TemaDetail } from "./components/home/basedeconocimiento/Details/TemaDetail";
import { Admin } from "./components/Admin/Admin";
import { CrearUsuario } from "./components/Admin/Creacion/CrearUsuario";
import { CreacionDeTema } from "../src/components/Admin/Creacion/CreacionTema/CreacionDeTema";
import "./App.css";
import { Auth } from "./components/auth/Auth";
import { useSelector } from "react-redux";
import { NotFound } from "./not_found/NotFound";
import { EditContenido } from "./components/Admin/Editar/EditContenido/EditContenido";
import { EditUsuario } from "./components/Admin/Editar/EditUsuario/EditUsuario";

function App() {
  const { user } = useSelector((state) => state.user);
  let accesos = "";
  if (user != null) {
    accesos = user.idPerfiles;
  }

  return (
    <div>
      <Auth></Auth>

      <NavBar />

      <Routes>
        {accesos == "Redactor" ? (
          <Route path="crearTema" element={<CreacionDeTema />}></Route>
        ) : accesos == "Administrador" ? (
          <Route>
            <Route path="admin" element={<Admin />} />
            <Route path="crearTema" element={<CreacionDeTema />}></Route>
            <Route
              path="admin/EditContenido/:id"
              element={<EditContenido />}
            ></Route>
            <Route path="admin/:id" element={<TemaDetail />} />

            <Route path="admin/crearUsuario" element={<CrearUsuario />}></Route>
            <Route
              path="admin/EditUsuario/:id"
              element={<EditUsuario />}
            ></Route>
          </Route>
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
        <Route>
          <Route path="/home" element={<Home />} />
          <Route path="home/:id" element={<TemaDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
