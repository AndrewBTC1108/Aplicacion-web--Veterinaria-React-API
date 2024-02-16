export default function AdminUser({user, modalAppointmentCreate}) {
    const {cedula, name, last_name, email, phone_number} = user;
    const {handleClickModalAppointment} = modalAppointmentCreate;
    return (
        <>
            <tr>
                <td className="text-left py-2 px-4 border-b">{cedula}</td>
                <td className="text-left py-2 px-4 border-b">{name}</td>
                <td className="text-left py-2 px-4 border-b">{last_name}</td>
                <td className="text-left py-2 px-4 border-b">{email}</td>
                <td className="text-left py-2 px-4 border-b">{phone_number}</td>
                <td className="text-left py-2 px-4 border-b flex">
                    <button
                        className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                    >Mascotas</button>
                    <button
                        className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded ml-2"
                    >Crear Mascota</button>
                    <button
                        className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded ml-2"
                        onClick={() => {
                            handleClickModalAppointment(false)
                        }}
                    >Agendar Consulta</button>
                </td>
            </tr>
        </>
    )
}
