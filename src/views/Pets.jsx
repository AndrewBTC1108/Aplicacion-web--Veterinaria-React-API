import useAmorPorTi from "../hooks/useAmorPorTi"
import Button from "../components/Button"
import Pet from "../components/Pet";
import useSWR from "swr";
import clienteAxios from "../lib/axios";
import Spinner from "../components/Spinner";

export default function Pets() {
    let Pets;
    const {handleSetPet, deletePet, handleClickModalPet} = useAmorPorTi()
    const fetcher = url => clienteAxios(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
        }
    }).then(res=>res.data);
    //Get pets
    const { data: availablePetsData, error: availablePetsError, isLoading } = useSWR(
        'api/pets', fetcher
    );
    Pets = availablePetsData ? availablePetsData.data : [];
    // check if the pets object is empty
    // make sure pets is defined before trying to access its properties.we add a null check before the line
    const hasPets = Object.values(Pets).length > 0;
    if(isLoading) return(<Spinner />)
    return (
        <div className="pt-10">
            {hasPets ? (
            // Render the content of the div if there are mascots
            <div>
                <h1 className="mb-4 text-center text-4xl font-black">Tus Mascotas</h1>
                <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
                    <thead>
                        <tr>
                        <th className="text-left py-2 px-4 border-b">Nombre</th>
                        <th className="text-left py-2 px-4 border-b">Sexo</th>
                        <th className="text-left py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Pets.map(pet => (
                            <Pet
                                key={pet.id}
                                pets={pet}
                                modalPet={{handleClickModalPet}}
                                deletePets={{deletePet}}
                                setPet={{handleSetPet}}
                            />
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 text-center">
                    <Button onClick={() => handleClickModalPet(false)}>
                        Nueva Mascota
                    </Button>
                </div>
            </div>
            ) : (
            <div>
                <h1 className="mb-4 text-center text-4xl font-black">Mascotas</h1>
                <p className="mb-4 text-center font-medium">No tienes mascotas registradas aún. Comienza creando una.</p>
                <div className="text-center">
                <Button onClick={() => handleClickModalPet(false)}>
                    Crear Mascota
                </Button>
                </div>
            </div>
            )}
        </div>
    );   
}
