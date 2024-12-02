/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { toastAlerta } from "../../../utils/toastAlerta";
import PostagemCreate from "../../../models/PostagemCreate";

function FormularioPostagem() {
  // eslint-disable-next-line prefer-const
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [postagem, setPostagem] = useState<PostagemCreate>({
    titulo: "",
    texto: "",
    tag: 0,
    rua: "",
    numero: "",
    bairro: "",
    usuario: null,
  });

  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      usuario: usuario,
    });
  }

  function setTag(e: any) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ postagem });

    if (id != undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toastAlerta("Postagem atualizada com sucesso", "sucesso");
        retornar();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlerta("Erro ao atualizar a postagem", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta("Postagem cadastrada com sucesso", "sucesso");
        retornar();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlerta("Erro ao cadastrar a Postagem", "erro");
        }
      }
    }
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="rua">Endereço</label>
          <input
            value={postagem.rua}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            name="rua"
            type="text"
            placeholder="Rua exemplo..."
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="numero">Número</label>
          <input
            value={postagem.numero}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            name="numero"
            type="text"
            placeholder="Número"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="bairro">Bairro</label>
          <input
            value={postagem.bairro}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            name="bairro"
            type="text"
            placeholder="Bairro..."
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da postagem</label>
          <input
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div>
          <select name="tag" id="tag" required onChange={(e) => setTag(e)}>
            <option id="tag" value="">
              Selecione a tag
            </option>
            <option id="tag" value={0}>
              Inundação
            </option>
            <option id="tag" value={1}>
              Alagamento
            </option>
            <option id="tag" value={2}>
              Queimada
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2"
        >
          {id !== undefined ? "Editar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default FormularioPostagem;
