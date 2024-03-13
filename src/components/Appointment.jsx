import {useAuth} from "../hooks/useAuth"
export default function Appointment({appointment, modalAppointment, setAppointment, deleteApp}) {
    const {user} = useAuth({});
    const {pet_id, date, hour_id, user_id} = appointment
    const {handleClickModalAppointment} = modalAppointment
    const {deleteAppointment} = deleteApp
    const {handleSetAppointment} = setAppointment
    let button;

    if (user != user.doctor) {
        button = (
            <button
                className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                onClick={() => {
                    handleSetAppointment(appointment)
                    handleClickModalAppointment(true)
                }}
            >Modificar</button>
        );
    } else if (user && user.doctor) {
        button = (
            <button className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded">
                Iniciar Consulta
            </button>
        );
    }
    
    return (
        <>
            <tr>
                <td className="text-left py-2 px-4 border-b">{(user && user.admin || user.doctor) ? user_id.name : pet_id.name}</td>
                <td className="text-left py-2 px-4 border-b">{(user && user.admin || user.doctor) ? pet_id.name : date }</td>
                <td className="text-left py-2 px-4 border-b">{hour_id.hour}</td>
                <td className="text-left py-2 px-4 border-b">
                    {button}
                    <button
                        onClick={() => deleteAppointment(appointment.id)} 
                        className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
                    >Cancelar</button>
                </td>
            </tr>
        </>
    )
}
