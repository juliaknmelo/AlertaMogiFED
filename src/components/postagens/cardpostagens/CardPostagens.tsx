/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../context/AuthContext";
import { FaLocationDot } from "react-icons/fa6";

interface CardPostagemProps {
  post: Postagem;
}

function CardPostagem({ post }: CardPostagemProps) {
  const { usuario } = useContext(AuthContext);
 
  let cardComponent;

  if (usuario.token !== "" && usuario.id == post.usuario?.id) {
    cardComponent = (
      <div className="font-padrão flex flex-col rounded-md overflow-hidden hover:shadow-xl w-[45vw] mt-4">
        <div className={`flex w-full h-[250px] bg-img-${post.tag} bg-cover`}>
          <div className="w-full flex justify-end p-4">
            <p
              className={`flex h-6 rounded-lg p-2 items-center text-txt-white font-bold bg-${post.tag}`}
            >
              {post.tag}
            </p>
          </div>
        </div>

        <div className={`p-4 bg-${post.tag}`}>
          <div className="flex flex-col px-4 items-center"></div>
          <div>
            {/* Card novo daqui para baixo */}

            <div className="flex gap-2 items-center bg-[#334155]/60 rounded-lg px-2">
              <FaLocationDot className="text-txt-white" />

              <p className="text-txt-white">
                {post.rua}, {post.numero} - {post.bairro}
              </p>
            </div>

            <div className="mt-6 break-words">
              <p className="text-txt-white">{post.texto}</p>
            </div>

            <div className="mt-6">
              <p className="text-lg font-bold text-txt-white">
                Postado por: {post.usuario?.nome}
              </p>
            </div>

            <div className="flex justify-end">
              <p className="text-txt-white">
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(post.data))}
              </p>
            </div>

            {/* Card novo daqui para cima */}
          </div>
        </div>
        {/* Apacere só logado */}
        <div className={`flex text-left bg-${post.tag} text-txt-white`}>
          <Link
            to={`/editarPostagem/${post.id}`}
            className=" pl-4 text-white bg-indigo-400 hover:bg-indigo-800 flex py-2"
          >
            <button>Editar</button>
          </Link>
          <Link
            to={`/deletarPostagem/${post.id}`}
            className="pl-4 text-white bg-red-400 hover:bg-red-700 w-full flex "
          >
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    );
  } else
    cardComponent = (
      <div className="font-padrão flex flex-col rounded-md overflow-hidden hover:shadow-xl w-[45vw] mt-4">
        <div className={`flex w-full h-[250px] bg-cover bg-img-${post.tag}`}>
          <div className="w-full flex justify-end p-4">
            <p
              className={`flex h-6 rounded-lg p-2 items-center text-txt-white font-bold bg-${post.tag}`}
            >
              {post.tag}
            </p>
          </div>
        </div>

        <div className={`p-4 bg-${post.tag}`}>
          <div className="flex flex-col px-4 items-center"></div>
          <div>
            {/* Card novo daqui para baixo */}

            <div className="flex gap-2 items-center bg-[#334155]/60 rounded-lg px-2">
              <FaLocationDot className="text-txt-white" />

              <p className="text-txt-white">
                {post.rua}, {post.numero} - {post.bairro}
              </p>
            </div>

            <div className="mt-6 break-words">
              <p className="text-txt-white">{post.texto}</p>
            </div>

            <div className="mt-6">
              <p className="text-lg font-bold text-txt-white">
                Postado por: {post.usuario?.nome}
              </p>
            </div>

            <div className="flex justify-end">
              <p className="text-txt-white">
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(post.data))}
              </p>
            </div>

            {/* Card novo daqui para cima */}
          </div>
        </div>
      </div>
    );

  return <>{cardComponent}</>;
}

export default CardPostagem;
