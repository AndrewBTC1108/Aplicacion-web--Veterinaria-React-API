import {Outlet} from 'react-router-dom'
import ReactModal from "react-modal"
import { useAuth } from "../hooks/useAuth"
import AdminSidebar from '../components/Admin/AdminSidebar'
import { ToastContainer } from "react-toastify"
import useAmorPorTi from "../hooks/useAmorPorTi"
import { customStylesModal } from "../helpers/index"
import ModalCita from '../components/Modals/ModalCita'
//hojas de estilo css
import "react-toastify/dist/ReactToastify.css"

export default function AdminLayout() {
    useAuth({middleware: 'admin'})

    const {ModalAppointment} = useAmorPorTi()
    const {customStyles} = customStylesModal()
    return (
        <>
            <div className='md:flex'>
                <AdminSidebar />
                
                <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
                    <Outlet />
                </main>
            </div>

            <ReactModal isOpen={ModalAppointment.isOpen} style={customStyles}>
                <ModalCita
                    isEditing={ModalAppointment.isEditing}
                />
            </ReactModal>

            <ToastContainer />
        </>
    )
}
