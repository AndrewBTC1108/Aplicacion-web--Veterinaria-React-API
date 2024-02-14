import { createContext, useState, useEffect } from "react"
import {toast} from 'react-toastify' //contiene el evento y tipo de toast que se quiere usar
import clienteAxios from '../lib/axios'
import useSWR, { mutate } from "swr";

const AmorPorTiContext = createContext();

const AmorPorTiProvider = ({children}) => {
    // //hooks
    const [mascota, setMascota] = useState({})//empieza como un objeto vacio
    const [appointment, setAppointment] = useState({})
    //para modals
    const [modalPet, setModalPet] = useState({ isOpen: false, isEditing: false});
    const [ModalAppointment, setModalAppointment] = useState({isOpen: false, isEditing: false});
    /***********************************************Area Mascotas*********************************************************************/
    //Crear Mascotas
    const createPet = async ({setErrors, ...props}) => {
        //token
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.post('api/pets', props, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                //vaciar el arreglo de errores
                setErrors([])
                //recargar
                await mutate('api/pets')
                //cerrar el modal
                handleCloseModalPet()
                //añadimos la notificacion de exito
                toast.success(data.message)
            } catch (error) {
                setErrors(error.response.data.errors)
            }
        }
    }
    //Actualizar Mascotas
    const updatePet = async  (id, setErrors, name, birthDate, species, breed, color, sex) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) {
            try {
                const {data} = await clienteAxios.patch(`api/pets/${id}`, {
                    name,
                    birth_date: birthDate,
                    species,
                    breed,
                    color,
                    sex,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setErrors([]);
                await mutate('api/pets')
                //cerrar el modal
                handleCloseModalPet()
                toast.success(data.message);
            } catch (error) {
                if(error.response.data.errors.error){
                    handleCloseModalAppointment();
                    toast.error(error.response.data.errors.error[0])
                }else {
                    setErrors(error.response.data.errors);
                }
            }
        }
    };
    //Eliminar Mascotas
    const deletePet = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token) {
            try {
                const {data} = await clienteAxios.delete(`api/pets/${id}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                await mutate('api/pets')
                await mutate('api/appointments')
                toast.success(data.message);
            } catch (error) {
                console.log(error)
            }
        }
    }
    /*********************************************************************************************************************************/
    /***********************************************Area Consultas*********************************************************************/
    const createAppointment = async ({setErrors, ...props}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.post('api/appointments', props,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setErrors([])
                await mutate('api/appointments')
                handleCloseModalAppointment()
                toast.success(data.message)
            } catch (error) {
                if(error.response.data.errors.error){
                    handleCloseModalAppointment();
                    toast.error(error.response.data.errors.error[0])
                }else {
                    setErrors(error.response.data.errors);
                }
            }
        }
    }
    const updateAppointment = async (id, setErrors, date, hour, reason) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.patch(`api/appointments/${id}`,
                {
                    date,
                    hour_id: hour,
                    reason
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setErrors([])
                await mutate('api/appointments')
                //cerrar el modal
                handleCloseModalAppointment()
                toast.success(data.message)
            } catch (error) {
                if(error.response.data.errors.error){
                    handleCloseModalAppointment();
                    toast.error(error.response.data.errors.error[0])
                }else {
                    setErrors(error.response.data.errors);
                }
            }
        }
    }
    const deleteAppointment = async id => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token) {
            try {
                const {data} = await clienteAxios.delete(`api/appointments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                await mutate('api/appointments')
                toast.success(data.message)
            } catch (error) {
                console.log(error)
            }
        }
    } 
    /**********************************************************************************************************************************/
    //arrow function para la edicion de mascotas
    const handleSetPet = mascota => {
        setMascota(mascota)
    }
    //arrow function para la edicion de mascotas
    const handleSetAppointment = appointment => {
        setAppointment(appointment)
    }
    // // //tomar el id de la categoria a la que se da click
    // const handleClickCategory = id => {/***********************/
    //     const categoria = categorias.filter(categoria => categoria.id === id)[0]
    //     setCategoriaActual(categoria)
    // }
    //Para abrir el modal de mascotas
    const handleClickModalPet = (isEditing) => {
        setModalPet({ isOpen: true, isEditing });
    };
    //para cerrar el Modal de Mascotas
    const handleCloseModalPet = () => {
        setModalPet({ isOpen: false, isEditing: false});
    };
    //Para abrir el modal de citas
    const handleClickModalAppointment = (isEditing) => {
        setModalAppointment({ isOpen: true, isEditing });
    };
    //para cerrar el Modal de citas
    const handleCloseModalAppointment = () => {
        setModalAppointment({ isOpen: false, isEditing: false});
    };
    
    return (
        <AmorPorTiContext.Provider
            value={{
                mascota,
                modalPet,
                handleClickModalPet,
                handleCloseModalPet,
                createPet,
                updatePet,
                deletePet,
                handleSetPet,
                createAppointment,
                updateAppointment,
                deleteAppointment,
                appointment,
                handleSetAppointment,
                handleClickModalAppointment,
                handleCloseModalAppointment,
                ModalAppointment
            }}
        >{children}</AmorPorTiContext.Provider>
    )
}
export {
    AmorPorTiProvider
}
export default AmorPorTiContext