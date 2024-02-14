import React, { useState } from 'react';
import clienteAxios from "../../lib/axios"
import AdminUsers from '../../components/Admin/AdminUsers';
import useSWR from 'swr';
import Spinner from '../../components/Spinner';

export default function AdminUsuarios() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const fetcher = url => clienteAxios(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
        }
    }).then(res => res.data);

    const { data: usersData, error: usersDataError } = useSWR(
        `/api/users?page=${page}&search=${searchTerm}`, fetcher
    )

    const handlePageChange = newPage => {
        if (newPage >= 1 && newPage <= usersData.last_page) {
            //cambia el valor de page a newPage, lo que a su vez causa que el componente se vuelva a renderizar con la nueva página de datos
            setPage(newPage);
        }
    };

    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
        setPage(1); // Reinicia la página a 1 cuando se realiza una nueva búsqueda
    };

    if (usersDataError) return <div>Error al cargar los datos</div>

    return (
        <div className="pt-10">
            <h1 className="mb-4 text-center text-4xl font-black">Ver Usuarios</h1>
            
            <div className='mb-4 flex flex-col text-center'>
                <label
                    className="text-slate-800 text-xl font-normal"
                    htmlFor="search"
                >Busca por nombre o cedula</label>
                <input 
                    id='search'
                    className="m-auto mt-2 w-96 p-3 bg-gray-50" 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    placeholder="Buscar usuarios..." 
                />
            </div>
            <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
                <thead>
                    <tr>
                        <th className="text-left py-2 px-4 border-b">Cedula</th>
                        <th className="text-left py-2 px-4 border-b">Nombre</th>
                        <th className="text-left py-2 px-4 border-b">Apellido</th>
                        <th className="text-left py-2 px-4 border-b">Email</th>
                        <th className="text-left py-2 px-4 border-b">Telefono</th>
                        <th className="text-left py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                {!usersData ? (
                    <tbody>
                        <tr>
                            <td colSpan={6} className='text-center'>
                                <Spinner/>
                            </td>
                        </tr>
                    </tbody>
                ): (
                    <tbody>
                        {usersData.data.map(user => (
                            <AdminUsers
                                key={user.id}
                                user={user}
                            />
                        ))}
                    </tbody>
                )}
            </table>
            {usersData && (
                <div className="my-1 flex justify-center space-x-2">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2 border rounded ${page === 1 ? 'bg-gray-300 text-white' : 'bg-white text-blue-500'}`}
                    >
                        Anterior
                    </button>
                    {/* Esto crea un array de números de página desde 1 hasta usersData.last_page y luego mapea cada número de página a un botón*/}
                    {Array.from({ length: usersData.last_page }, (_, i) => i + 1).map(pageNumber => {
                        // Solo muestra los números de página si están cerca del número de página actual, o si son el primer o último número de página
                        if (pageNumber === 1 || pageNumber === usersData.last_page || (pageNumber >= page - 1 && pageNumber <= page + 1)) {
                            //al ser una iteracion el pageNumber representa los numeros de las paginas a las que se puede dar click
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    disabled={pageNumber === page}
                                    className={`px-4 py-2 border rounded ${pageNumber === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        }
                    })}
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === usersData.last_page}
                        className={`px-4 py-2 border rounded ${page === usersData.last_page ? 'bg-gray-300 text-white' : 'bg-white text-blue-500'}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    )
}
