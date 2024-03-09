import { Link } from 'react-router-dom'
export default function AdminUser({user, handleUser, modalAppointmentCreate}) {
    const {cedula, name, last_name, email, phone_number} = user;
    const {handlesetIdUser} = handleUser
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
                    <Link
                        to={'/admin/petsUser'}
                    >
                        <button
                            onClick={() => {
                                handlesetIdUser(user.id)
                            }}
                            className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                        >Mascotas</button>
                    </Link>
                    <button
                        className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded ml-2"
                        onClick={() => {
                            handlesetIdUser(user.id)
                            handleClickModalAppointment(false)
                        }}
                    >Agendar Consulta</button>
                </td>
            </tr>
        </>
    )
}
