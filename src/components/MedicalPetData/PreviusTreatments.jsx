import { useAuth } from "../../hooks/useAuth";
export default function PreviusTreatments({treatmentPet}) {
    const {name, date} = treatmentPet;
    const {user} = useAuth({})
    return (
        <>
            <tr>
                <td className="py-2 px-4 border-b">{name}</td>
                <td className="py-2 px-4 border-b">{date}</td>
                {user && user.admin ?
                <td className="py-2 px-4 border-b">
                    <button
                        className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
                    >Eliminar</button>
                </td> : ""}
            </tr>  
        </>
    )
}
