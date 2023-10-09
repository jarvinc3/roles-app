import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/details.css';
import Nav from "./Nav"

export default function Usuarios({ datos }) {
    const [dataUsuario, setDataUsuario] = useState([]);


    useEffect(() => {
        if (datos && datos.length > 0) {
            setDataUsuario(datos);
        }
    }, [datos]);

    const endpoint = 'http://127.0.0.1:8000/api/';

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        getAllUsuarios();
    }, []);

    const getAllUsuarios = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/usuarios`);
            setUsuarios(response.data); // Actualiza el estado con los datos de la respuesta
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const deleteUsuario = async (idusuario) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/usuarios/${idusuario}`);
            // Si la eliminación fue exitosa, actualiza la lista de usuarios
            getAllUsuarios();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);


        }
    };


    return (
        <div className="px-10 flex flex-col gap-5">
            <Nav/>

            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Persona#
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Usuario
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Habilitado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rol
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((el) => (
                            <tr key={el.idusuario} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    {el.idusuario}
                                </td>
                                <td className="px-6 py-4">
                                    {el.idpersona}
                                </td>
                                <td className="px-6 py-4">
                                    {el.usuario}
                                </td>
                                <td className="px-6 py-4">
                                    {el.habilitado}
                                </td>

                                <td className="px-6 py-4">
                                    <p className="p-[2px] w-[100px] rounded-lg text-white bg-green-800">Administrador</p>
                                </td>
                                <td className="flex items-center px-6 py-4 space-x-3">
                                    <p className='flex bg-green-600 p-1 gap-4 rounded-md'>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyklEQVR4nO2UPwrCMBSHM3oAQephXFysOOlFegmnzp7FY+gipGu8ghScPmlJaAnmjzFjPugSXn5f3muIEJkBKuAOtLmzR4ALE23ukzfAArhqwc0u2gNP4uiB7Sxc6vWzlgydVLYgNvwNHL+EGxpXm4aD56uBpa5fAQ8rvAPWqYI6OdwSuMZySg4PCPrZD/WGmzqvIHAIaYVLc1uADfD6V+Aci+7Uvf9HQWfPPLg/RuCjCIKUEWUZUexz7UP5BMNrqUhHAbtwrwUx8QEo8BbR2puCUwAAAABJRU5ErkJggg==" />
                                        <Link to={`/edit/${el.idusuario}`} className="no-underline">
                                            <p className="font-medium text-white">Edit</p>
                                        </Link>

                                    </p>
                                    <p className='flex bg-red-600 p-1 gap-4 rounded-md'>
                                        {/* icons */}
                                        <button onClick={() => deleteUsuario(el.idusuario)} className="font-medium text-white">Eliminar</button>
                                    </p>
                                </td>

                            </tr>
                        ))}
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                ,
                            </td>
                            <td className="px-6 py-4">
                                .
                            </td>
                            <td className="px-6 py-4">
                                /
                            </td>
                            <td className="px-6 py-4">
                                ;
                            </td>

                            <td className="px-6 py-4">
                                <p className="p-[2px] w-[100px] rounded-lg text-white bg-green-800">Administrador</p>
                            </td>
                            <td className="flex items-center px-6 py-4 space-x-3">
                                <p className='flex bg-green-600 p-1 gap-4 rounded-md'>
                                    <img className='cursor-pointer' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyklEQVR4nO2UPwrCMBSHM3oAQephXFysOOlFegmnzp7FY+gipGu8ghScPmlJaAnmjzFjPugSXn5f3muIEJkBKuAOtLmzR4ALE23ukzfAArhqwc0u2gNP4uiB7Sxc6vWzlgydVLYgNvwNHL+EGxpXm4aD56uBpa5fAQ8rvAPWqYI6OdwSuMZySg4PCPrZD/WGmzqvIHAIaYVLc1uADfD6V+Aci+7Uvf9HQWfPPLg/RuCjCIKUEWUZUexz7UP5BMNrqUhHAbtwrwUx8QEo8BbR2puCUwAAAABJRU5ErkJggg==" />
                                    <Link to={`/edit`} className="no-underline">
                                        <p className="font-medium text-white cursor-pointer">Edit</p>
                                    </Link>
                                </p>
                                <p className='flex bg-red-600 p-1 gap-4 rounded-md'>
                                    <button className="font-medium text-white">Eliminar</button>
                                </p>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
            
            <Link to={`/create`}>
                <a className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500" href="">
                    <span className="text-white font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">Agregar</span>
                    <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                        <svg className="svg w-8 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <line x1="12" x2="12" y1="5" y2="19"></line>
                            <line x1="5" x2="19" y1="12" y2="12"></line>
                        </svg>
                    </span>
                </a>
            </Link>
        </div>
    )
}
