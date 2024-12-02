/* eslint-disable prefer-const */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import loginLogo from "../../assets/capa.jpg";
import { toastAlerta } from "../../utils/toastAlerta";
import ListaPostagensPerfil from "../../components/postagens/listapostagens/ListaPostagensPerfil";





function Perfil() {

  

  let navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [usuario.token]);


  return (
    <div className="container mx-auto mt-4 rounded-2xl overflow-hidden flex">
      <div>
        <img
        className=" h-72 object-cover border-b-8  w-1/3 rounded-2xl "
        src={loginLogo}
        alt="Capa do Perfil"
      />
      <div className=" mt-[-6rem] h-72 flex flex-col bg-tiffany text-white text-2xl items-center justify-center w-1/3 rounded-2xl ">
        <p>Nome: {usuario.nome} </p>
        <p>Email: {usuario.usuario}</p>
      </div>
      </div>
      <div>
        <ListaPostagensPerfil idUser={usuario.id} />
      </div>
    </div>
  );
}

export default Perfil
