export default function AdminAppointment({appointment, modalAppointment, setAppointment, deleteApp}) {
    const {pet_id, hour_id, user_id} = appointment
    const {handleClickModalAppointment} = modalAppointment
    const {deleteAppointment} = deleteApp
    const {handleSetAppointment} = setAppointment
    return (
        <>
            <tr>
                <td className="text-left py-2 px-4 border-b">{user_id.name}</td>
                <td className="text-left py-2 px-4 border-b">{pet_id.name}</td>
                <td className="text-left py-2 px-4 border-b">{hour_id.hour}</td>
                <td className="text-left py-2 px-4 border-b">
                    <button
                        className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                        onClick={() => {
                            handleSetAppointment(appointment)
                            handleClickModalAppointment(true)
                        }}
                    >Modificar</button>
                    <button
                        onClick={() => deleteAppointment(appointment.id)} 
                        className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
                    >Cancelar</button>
                </td>
            </tr>
        </>
    )
}
