//en este componente pasamos dos funciones, una para editar las mascotas y la otra para borrarlas
export default function Pet({pets, modalPet, setPet, deletePets}) {
    // console.log(mascota)
    const {name, sex} = pets
    const { handleClickModalPet } = modalPet;
    const {handleSetPet} = setPet
    const {deletePet} = deletePets
    return (
        <>
            <tr>
                <td className="py-2 px-4 border-b">{name}</td>
                <td className="py-2 px-4 border-b">{sex}</td>
                <td className="py-2 px-4 border-b">
                    <button 
                        onClick={() => {
                            handleSetPet(pets)
                            handleClickModalPet(true)
                        }} 
                        className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                    >Editar</button>
                    <button 
                        onClick={() => deletePet(pets.id)} 
                        className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
                    >Eliminar</button>
                    <button 
                        className="bg-yellow-500 hover:bg-yellow-800 text-white px-2 py-1 rounded ml-2"
                    >Mas Info..</button>
                </td>
            </tr>
        </>
    )
}
