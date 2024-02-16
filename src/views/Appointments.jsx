import useAmorPorTi from "../hooks/useAmorPorTi"
import Button from "../components/Button"
import Appointment from "../components/Appointment";
import useSWR from "swr";
import clienteAxios from "../lib/axios";
import Spinner from "../components/Spinner";

export default function Appointments() {
    let appointments;
    const {data: appointmentsData, error: appointmentsDataError, isLoading} = useSWR(
        'api/appointments',
        async(url) => {
            try {
                const response = await clienteAxios(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
                    }
                })
                return response.data.data
            } catch (error) {
                throw error("Error al obtener las citas:", error);
            }
        }
    );
    appointments = appointmentsData || [];
    const {handleSetAppointment, handleClickModalAppointment, deleteAppointment} = useAmorPorTi()
    const hasAppointments = Object.values(appointments).length > 0;
    if(isLoading) return(<Spinner />)
    return (
        <div className="pt-10">
            {hasAppointments ? (
                    <div>
                        <h1 className="mb-4 text-center text-4xl font-black">Tus Consultas</h1>
                        <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 px-4 border-b">Mascota</th>
                                    <th className="text-left py-2 px-4 border-b">Fecha</th>
                                    <th className="text-left py-2 px-4 border-b">Hora</th>
                                    <th className="text-left py-2 px-4 border-b">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(appointment => (
                                    <Appointment
                                        key={appointment.id}
                                        appointment={appointment}
                                        modalAppointment={{handleClickModalAppointment}}
                                        deleteApp={{deleteAppointment}}
                                        setAppointment={{handleSetAppointment}}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 text-center">
                            <Button onClick={() => handleClickModalAppointment(false)}>
                                Agendar Consulta
                            </Button>
                        </div>
                    </div>
            ):(
                <div>
                    <h1 className="mb-4 text-center text-4xl font-black">Consultas</h1>
                    <p className="mb-4 text-center font-medium">No tienes consultas registradas aún. Comienza creando una.</p>
                    <div className="text-center">
                    <Button onClick={() => handleClickModalAppointment(false)}>
                        Agendar Consulta
                    </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
