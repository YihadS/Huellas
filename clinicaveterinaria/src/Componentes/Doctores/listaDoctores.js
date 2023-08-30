import './listaDoctores.css';
import React, { Component, createRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

class ListaDoctores extends Component {
    constructor(props) {
        super(props);
        this.tableRef = createRef();
        this.state = {
            clientesData: [],
            editingClient: null
        };
    }

    componentDidMount() {
        this.fetchClientesData();
    }

    async componentDidUpdate() {
        if (this.state.clientesData.length > 0) {
            this.initDataTable(); // Initialize DataTables after data is populated
        }
    }

    initDataTable = () => {
        const table = $(this.tableRef.current).DataTable({
            responsive: true,
            bDestroy: true,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
            },
           
            columnDefs: [
                { targets: [1,2,3,4,5], searchable: true } // Specify columns 4, 5, and 7 as searchable
            ]
        });
    };

    componentWillUnmount() {
        const table = $(this.tableRef.current).DataTable();
        table.destroy();
    }

    fetchClientesData = async () => {
        try {
            const response = await fetch('http://localhost:81/huellas/backend/traerDoctor.php');
            if (response.status === 200) {
                const clientesData = await response.json();
                console.log(clientesData); // Log the fetched client data
                this.setState({ clientesData });
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    deleteDoctor = async (idDoctor) => {
        const shouldDelete = window.confirm("¿Estás seguro de que deseas eliminar a este doctor?");
        if (shouldDelete) {
            try {
                const response = await axios.post('http://localhost:81/huellas/backend/eliminarDoctor.php', {
                    idDoctor: idDoctor,
                    userName: this.props.username
                });
                if (response.status === 200) {
                    this.setState({
                        clientesData: this.state.clientesData.filter(client => client.idDoctor!== idDoctor)
                    });
                    Swal.fire('Doctor Eliminado', 'El doctor ha sido eliminado correctamente', 'success');
                }
            } catch (error) {
                console.error('Error deleting client:', error);
                Swal.fire('Error', 'No se pudo eliminar al doctor', 'error');
            }
        }
    };

    openEditModal = (client) => {
        this.setState({ editingClient: client });
    };

    updateDoctor = async (updatedClient) => {
        try {
            const response = await axios.post('http://localhost:81/huellas/backend/editarDoctor.php', updatedClient);
            if (response.status === 200) {
                this.setState(prevState => ({
                    clientesData: prevState.clientesData.map(client =>
                        client.idDoctor === updatedClient.idDoctor ? updatedClient : client
                    ),
                    editingClient: null // Clear the editing state
                }));
                Swal.fire('Doctor actualizado', 'El doctor ha sido actualizado correctamente', 'success');
            }
        } catch (error) {
            console.error('Error updating client:', error);
            Swal.fire('Error', 'No se pudo actualizar al doctor', 'error');
        }
    };


    handleEditChange = (field, value) => {
        const { editingClient } = this.state;
        this.setState({
            editingClient: {
                ...editingClient,
                [field]: value
            }
        });
    };
    
    saveEditedDoctor = () => {
        const { editingClient } = this.state;
        this.updateDoctor(editingClient);
    };
    
    cancelEdit = () => {
        this.setState({ editingClient: null });
    };

    handleExportToExcel = () => {
        const { clientesData } = this.state;
        
        const filteredData = clientesData.map(client => ({
            ID: client.idDoctor,
            Nombre: client.nombre,
            Apellidos: client.apellidos,
            Especialidad: client.especialidad,
            Carnet: client.carnet,
            Teléfono: client.telefono,
            Nacimiento: client.nacimiento,
            Sueldo: `${client.sueldo} Bs`,
        }));
    
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Doctores');
    
        const fileName = 'doctores.xlsx';
        XLSX.writeFile(wb, fileName);
    };
    render() {
        const { clientesData, editingClient } = this.state;

        return (
            <div id='root'>
                <h2>Listado de Doctores</h2>
                <button className="btn btn-success" onClick={this.handleExportToExcel}>Exportar a Excel</button>
                <hr/>
                <table ref={this.tableRef}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Especialidad</th>
                            <th>Carnet</th>
                            <th>Teléfono</th>
                            <th>Nacimiento</th>
                            <th>Sueldo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesData.map((client) => (
                            <tr key={client.idDoctor}>
                                <td>{client.idDoctor}</td>
                                <td>{client.nombre}</td>
                                <td>{client.apellidos}</td>
                                <td>{client.especialidad}</td>
                                <td>{client.carnet}</td>
                                <td>{client.telefono}</td>
                                <td>{client.nacimiento}</td>
                                <td>{client.sueldo} Bs</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.deleteDoctor(client.idDoctor)}>Eliminar</button>
                                    <button className="btn btn-primary" onClick={() => this.openEditModal(client)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editingClient && (
     <div className="edit-modal modal fade show" style={{ display: "block" }}>
     <div className="modal-dialog modal-dialog-centered">
         <div className="modal-content">
             <div className="modal-header">
                 <h5 className="modal-title">Editar Doctor</h5>
                 <button type="button" className="close" onClick={this.cancelEdit}>
                     <span aria-hidden="true">&times;</span>
                 </button>
             </div>
             <div className="modal-body">
                 <div className="form-group">
                     <label htmlFor="nombre">Nombre</label>
                     <input
                         type="text"
                         className="form-control"
                         id="nombre"
                         value={editingClient.nombre}
                         onChange={(e) => this.handleEditChange("nombre", e.target.value)}
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="apellidos">Apellidos</label>
                     <input
                         type="text"
                         className="form-control"
                         id="apellidos"
                         value={editingClient.apellidos}
                         onChange={(e) => this.handleEditChange("apellidos", e.target.value)}
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="especialidad">Especialidad</label>
                     <input
                         type="text"
                         className="form-control"
                         id="especialidad"
                         value={editingClient.especialidad}
                         onChange={(e) => this.handleEditChange("especialidad", e.target.value)}
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="carnet">Carnet</label>
                     <input
                         type="number"
                         className="form-control"
                         id="carnet"
                         min= "0"
                         value={editingClient.carnet}
                         onChange={(e) => this.handleEditChange("carnet", e.target.value)}
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="telefono">Teléfono</label>
                     <input
                         type="number"
                         className="form-control"
                         id="telefono"
                         min= "0"
                         value={editingClient.telefono}
                         onChange={(e) => this.handleEditChange("telefono", e.target.value)}
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="nacimiento">Fecha de Nacimiento</label>
                     <input
                         type="date"
                         className="form-control"
                         id="nacimiento"
                         value={editingClient.nacimiento}
                         onChange={(e) => this.handleEditChange("nacimiento", e.target.value)}
                     />
                 </div>   
                 <div className="form-group">
                     <label htmlFor="sueldo">Sueldo</label>
                     <input
                         type="number"
                         className="form-control"
                         id="sueldo"
                         min= "0"
                         value={editingClient.sueldo}
                         onChange={(e) => this.handleEditChange("sueldo", e.target.value)}
                     />
                 </div>       
             </div>
             <div className="modal-footer">
                 <button className="btn btn-primary" onClick={this.saveEditedDoctor}>
                     Guardar
                 </button>
                 <button className="btn btn-secondary" onClick={this.cancelEdit}>
                     Cancelar
                 </button>
             </div>
         </div>
     </div>
 </div>
)}
            </div>
        );
    }
}

export default ListaDoctores;
