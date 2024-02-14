import useAmorPorTi from "../../hooks/useAmorPorTi";
import Button from "../../components/Button";
import AdminAppointment from "../../components/Admin/AdminAppointment"
import { useState } from "react";
import useSWR from "swr";
import clienteAxios from "../../lib/axios";
import Spinner from "../../components/Spinner";
export default function ConsultasAdmin() {
    let availableAppointments;
    // Obtener la fecha actual en formato ISO (yyyy-mm-dd)
    const today = new Date().toISOString().split('T')[0];
    //hooks
    const [date, setDate] = useState(today) //para las fechas
    //obtnener las citas disponibles segun la fecha seleccionada
    const {data: availableAppointmentsData, error: availableAppointmentsError, isLoading} = useSWR(
       date ? `api/appointments?date=${date}` : null,
       async (url) => {
        const response = await clienteAxios(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
          }
        });
        return response.data.data;
       },
       {
        refreshInterval: 1000
       }
    );
    availableAppointments = availableAppointmentsData || [];
    const {handleSetAppointment, handleClickModalAppointment, deleteAppointment} = useAmorPorTi()
    const tieneCitas = Object.values(availableAppointments).length > 0;
    if(isLoading) return(<Spinner />)
    return (
        <div className="pt-10 text-center">
            <h1 className="mb-4 text-4xl font-black">Consultas Agendadas</h1>
            <div className="mb-4 flex flex-col">
              <label
                className="text-slate-800 text-xl font-normal"
                htmlFor="date"
              >Selecciona una Fecha</label>
              <input 
                type="date"
                id="date" 
                className="m-auto mt-2 w-96 p-3 bg-gray-50"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                }}
                min={today}
              />
            </div>

            <div>
                {tieneCitas ? (
                        <div className="pt-10">
                            <h1 className="mb-4 text-center text-4xl font-black">Tus Consultas</h1>
                            <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2 px-4 border-b">Usario</th>
                                        <th className="text-left py-2 px-4 border-b">Mascota</th>
                                        <th className="text-left py-2 px-4 border-b">Hora</th>
                                        <th className="text-left py-2 px-4 border-b">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availableAppointments.map(appointment => (
                                        <AdminAppointment
                                            key={appointment.id}
                                            appointment={appointment}
                                            modalAppointment={{handleClickModalAppointment}}
                                            deleteApp={{deleteAppointment}}
                                            setAppointment={{handleSetAppointment}}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                ):(
                    <div>
                        <h1 className="mb-4 text-center text-4xl font-black">No hay Consultas</h1>
                    </div>
                )}
            </div>
        </div>
    )
}
