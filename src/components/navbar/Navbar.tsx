import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toastAlerta } from "../../utils/toastAlerta";
import ModalPostagem from "../postagens/modalPostagem/ModalPostagem";

function Navbar() {
  // eslint-disable-next-line prefer-const
  let navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    toastAlerta("Usuário deslogado com sucesso", "sucesso");
    navigate("/login");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let navbarComponent;

  if (usuario.token !== "") {
    navbarComponent = (
      <div className="w-full bg-tiffany text-white flex justify-center py-4 px-4 font-padrão">
        <div className="container flex justify-between text-lg">
          <Link to="/home" className="text-2xl font-bold uppercase">
            AlERTA MOGI
          </Link>

          <div className="flex gap-6">
            <div className="">
              <ModalPostagem />
            </div>
            <Link to="/perfil" className="hover:underline">
              Perfil
            </Link>
            <Link to="" onClick={logout} className="hover:underline">
              Sair
            </Link>
          </div>
        </div>
      </div>
    );
  } else
    navbarComponent = (
      <div className="w-full  bg-tiffany text-white flex justify-center py-4 px-4 font-padrão">
        <div className="container flex justify-between text-lg">
          <Link to="/home" className="text-3xl font-bold uppercase">
            ALERTA MOGI
          </Link>

          <div className="flex ">
            <Link to="/login" className="hover:underline">
              login
            </Link>
          </div>
        </div>
      </div>
    );

  return <>{navbarComponent}</>;
}

export default Navbar;
