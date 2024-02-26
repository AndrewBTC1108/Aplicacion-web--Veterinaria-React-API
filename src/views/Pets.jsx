import useAmorPorTi from "../hooks/useAmorPorTi"
import Button from "../components/Button"
import Pet from "../components/Pet";
import useSWR from "swr";
import clienteAxios from "../lib/axios";
import Spinner from "../components/Spinner";

export default function Pets() {
    let Pets;
    const {handleSetPet, deletePet, handleClickModalPet} = useAmorPorTi()
    //obtener mascotas
    const { data: availablePetsData, error: availablePetsError, isLoading } = useSWR(
        'api/pets',
        async (url) => {
            try {
                const response = await clienteAxios(url, {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
                    }
                });
                return response.data.data;
            } catch (error) {
                throw error("Error al obtener las mascotas:", error);
                // throw error;
            }
        }
    );
    Pets = availablePetsData || [];
    // Verificar si el objeto pets está vacío
    // asegurarnos de que mascotas esté definido antes de intentar acceder a sus propiedades.agregamos una verificación de nulidad antes de la línea
    const hasPets = Object.values(Pets).length > 0;
    if(isLoading) return(<Spinner />)
    return (
        <div className="pt-10">
            {hasPets ? (
            // Renderizar el contenido del div si hay mascotas
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
