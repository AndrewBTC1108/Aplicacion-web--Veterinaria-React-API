import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button"
import useAmorPorTi from '../hooks/useAmorPorTi'
import Categoria from '../components/Categoria'
import useSWR from "swr"
import clienteAxios from "../lib/axios";
import { useState } from "react";
export default function Sidebar() {
    let categories;
    let token = localStorage.getItem('AUTH_TOKEN');
    const [currentCategory, setcurrentCategory] = useState({id:1})

    // const {categorias} = useAmorPorTi()
    const { user, logout } = useAuth({ middleware: 'auth' });
    //fetcher
    const fetcher = url => clienteAxios(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
        }
    }).then(res => res.data);
    const { data: availableCategoriesData, error: availableCategoriesError } = useSWR(
        token ? 'api/categorias' : null, fetcher
    );
    categories = availableCategoriesData ? availableCategoriesData.data : [];

    //tomar el id de la categoria a la que se da click
    const handleClickCategory = id => {
        const categorie = categories.filter(categoria => categoria.id === id)[0]
        setcurrentCategory(categorie)
    }

    return (
        <aside className="md:w-72">
            <div className="p-4 text-center">
                <img
                    className="w-40 mx-auto"
                    src="img/AmorPorTi.jpg"
                    alt="imagen empresa"
                />
            </div>

            <div className="flex justify-center items-center relative">
                <p className="text-xl">Hola: {user?.name}</p>
            </div>

            <div className="mt-10">
                {categories.map(categorie => (
                    <Categoria 
                        key={categorie.id}
                        categorie={categorie}
                        handleClickCat={{handleClickCategory}}
                        currentCat={{currentCategory}}
                    />
                ))}
            </div>

            <div className="text-center mt-4">
                <Button onClick={logout}>
                    Salir
                </Button>
            </div>
            
        </aside>
    );
}
