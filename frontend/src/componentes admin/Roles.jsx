import { useState, useEffect } from 'react';
import { Link, useParams, } from "react-router-dom"
import "../css/details.css"
import Nav from "./Nav"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const endpoint = 'http://127.0.0.1:8000/api/roles';


export default function Roles() {
    const [dataRoles, setDataRoles] = useState([]);

    useEffect(() => {
        getAllRoles();
    }, []);

    const getAllRoles = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/roles`);

            const rolesFiltrados = response.data.filter(rol => rol.idrol !== 1);

            setDataRoles(rolesFiltrados);
        } catch (error) {
            console.error('Error al obtener roles:', error);
        }
    };


    const deleteRoles = async (idrol) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/roles/${idrol}`);
            getAllRoles();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);


        }
    };

    return (
        <div className="px-10 flex flex-col gap-5">
            <Nav />

            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-20">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
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
                        {dataRoles.map((el) => (

                            <tr key={el.idrol} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    {el.idrol}
                                </td>
                                <td className="px-6 py-4">
                                    {el.rol}
                                </td>

                                <td className="flex items-center px-6 py-4 space-x-3">
                                    <Link to={`/edit roles/${el.idrol}`} className="no-underline"> <p className='flex bg-green-600 p-1 gap-4 rounded-md'>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyklEQVR4nO2UPwrCMBSHM3oAQephXFysOOlFegmnzp7FY+gipGu8ghScPmlJaAnmjzFjPugSXn5f3muIEJkBKuAOtLmzR4ALE23ukzfAArhqwc0u2gNP4uiB7Sxc6vWzlgydVLYgNvwNHL+EGxpXm4aD56uBpa5fAQ8rvAPWqYI6OdwSuMZySg4PCPrZD/WGmzqvIHAIaYVLc1uADfD6V+Aci+7Uvf9HQWfPPLg/RuCjCIKUEWUZUexz7UP5BMNrqUhHAbtwrwUx8QEo8BbR2puCUwAAAABJRU5ErkJggg==" />
                                        <p className="font-medium text-white">Edit</p>
                                    </p>
                                    </Link>
                                    <p className='flex bg-red-600 p-1 gap-4 rounded-md'>
                                        <button onClick={() => deleteRoles(el.idrol)} className="font-medium text-white">Eliminar</button>
                                    </p>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link to={`/create roles`}>
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


export const EditRoles = () => {
    const [rol, setRol] = useState('');
    const [fechacreacion, setFechacreacion] = useState('');
    const [fechamodificacion, setFechamodificacion] = useState('');
    const [usuariocreacion, setUsuariocreacion] = useState('');
    const [usuariomodificacion, setUsuariomodificacion] = useState('');
    const [editSuccess, setEditSuccess] = useState(false);
    const [editError, setEditError] = useState(false);
    const navigate = useNavigate();
    const { idrol } = useParams();

    const update = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://127.0.0.1:8000/api/roles/${idrol}`, {

                rol: rol,
                fechacreacion: fechacreacion,
                fechamodificacion: fechamodificacion,
                usuariocreacion: usuariocreacion,
                usuariomodificacion: usuariomodificacion

            });

            setEditSuccess(true);
            setEditError(false);

            navigate("/roles");
        } catch (error) {
            console.error(error);
            setEditSuccess(false);
            setEditError(error.response?.data?.error || 'Error al editar los datos.');
        }
    }


    useEffect(() => {
        const getRolById = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/roles/${idrol}`);
            setRol(response.data.rol);
            setFechacreacion(response.data.fechacreacion);
            setFechamodificacion(response.data.fechamodificacion);
            setUsuariocreacion(response.data.usuariocreacion);
            setUsuariomodificacion(response.data.usuariomodificacion);

        }
        getRolById();
    }, [idrol]);


    return (
        <div className="w-full flex justify-center items-center flex-col gap-10">
            <Nav />

            <main className="border border-gray-300 rounded-2xl w-[600px]">
                <div className="flex py-5 justify-between items-center px-8">
                    <h2 className=" text-2xl font-normal">Edit Roles</h2>
                    <Link to={"/bitacoras"}>
                        <button className="flex items-center duration-200 hover:scale-125 active:scale-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300">
                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                            </svg>
                            Back
                        </button>
                    </Link>
                </div>
                <hr className="border border-gray-200 w-full" />
                <form onSubmit={update} className="py-5 px-8">
                    <div className="w-full flex justify-between">

                        <section className="flex flex-col justify-center ">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nombre Rol</label>
                            <input value={rol} onChange={(e) => setRol(e.target.value)} type="text" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </section>
                    </div>

                    <section className="flex flex-col justify-center">
                        <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Fecha Creacion</label>
                        <input value={fechacreacion} onChange={(e) => setFechacreacion(e.target.value)} type="text" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                    </section>

                    <div className="w-full flex justify-between">
                        <section className="flex flex-col justify-center">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Fecha Modificacion</label>
                            <input value={fechamodificacion} onChange={(e) => setFechamodificacion(e.target.value)} type="date" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </section>

                        <section className="flex flex-col justify-center">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Usuario Creacion</label>
                            <input value={usuariocreacion} onChange={(e) => setUsuariocreacion(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </section>
                    </div>

                    <div className="w-full flex justify-between">
                        <section className="flex flex-col justify-center">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Usuario Modificacion</label>
                            <input value={usuariomodificacion} onChange={(e) => setUsuariomodificacion(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </section>

                    </div>

                    <button className="bg-blue-500 hover:bg-blue-600 py-2 px-5 rounded-md text-white my-5" type="submit">Save</button>
                </form>
                {editSuccess && (
                    <div className="alert alert-success">Datos editados con éxito.</div>
                )}
                {editError && (
                    <div className="alert alert-error">Error al editar los datos.</div>
                )}
            </main>
        </div>
    )

}


export const CreateRoles = () => {



    const [rol, setRol] = useState('');
    const [fechacreacion, setFechacreacion] = useState('');
    const [fechamodificacion, setFechamodificacion] = useState('');
    const [usuariocreacion, setUsuariocreacion] = useState('');
    const [usuariomodificacion, setUsuariomodificacion] = useState('');
    const navigate = useNavigate();
    const createRol = async (e) => {
        e.preventDefault();

        await axios.post(`${endpoint}`, {
            rol: rol,
            fechacreacion: fechacreacion,
            fechamodificacion: fechamodificacion,
            usuariocreacion: usuariocreacion,
            usuariomodificacion: usuariomodificacion
        });
        navigate("/roles");
    }

    return (
        <div className="px-10 flex flex-col items-center gap-10 pb-10">
            <Nav />

            <main className="border border-gray-300 rounded-2xl w-[600px]">
                <div className="flex py-5 justify-between items-center px-8">
                    <h2 className=" text-2xl font-normal">Create Rol</h2>
                    <Link to={"/roles"}>
                        <button className="flex items-center duration-200 hover:scale-125 active:scale-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300">
                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                            </svg>
                            Back
                        </button>
                    </Link>
                </div>
                <hr className="border border-gray-200 w-full" />
                <form onSubmit={createRol} className="py-5 px-8">

                    <div className="w-full flex justify-between">


                        <section className="flex flex-col justify-center ">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Rol</label>
                            <input onChange={(e) => setRol(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </section>

                    </div>

                    <div className="w-full flex justify-between">
                        <section className="flex flex-col justify-center">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Fecha creacion</label>
                            <input onChange={(e) => setFechacreacion(e.target.value)} type="date" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </section>

                        <section className="flex flex-col justify-center">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">fecha modificacion</label>
                            <input onChange={(e) => setFechamodificacion(e.target.value)} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </section>
                    </div>

                    <div className="w-full flex justify-between">
                        <section className="flex flex-col justify-center">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Usuario creacion</label>
                            <input onChange={(e) => setUsuariocreacion(e.target.value)} type="text" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </section>

                        <section className="flex flex-col justify-center">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Usuario modificacion</label>
                            <input onChange={(e) => setUsuariomodificacion(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </section>
                    </div>
                    <button type='submit' className="mt-5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">Create</button>

                </form>
            </main>
        </div>
    )
}



