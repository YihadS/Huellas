import './listaHabitaciones.css';
import React, { Component, createRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

class ListaHabitaciones extends Component {
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
                { targets: [1], searchable: true } // Specify columns 4, 5, and 7 as searchable
            ]
        });
    };

    componentWillUnmount() {
        const table = $(this.tableRef.current).DataTable();
        table.destroy();
    }

    fetchClientesData = async () => {
        try {
            const response = await fetch('http://localhost:81/huellas/backend/traerHabitacion.php');
            if (response.status === 200) {
                const clientesData = await response.json();
                console.log(clientesData); // Log the fetched client data
                this.setState({ clientesData });
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    deleteHabitacion= async (idHabitacion) => {
        const shouldDelete = window.confirm("¿Estás seguro de que deseas eliminar esta habitación?");
        if (shouldDelete) {
            try {
                const response = await axios.post('http://localhost:81/huellas/backend/eliminarHabitacion.php', {
                    idHabitacion: idHabitacion,
                    userName: this.props.username
                });
                if (response.status === 200) {
                    this.setState({
                        clientesData: this.state.clientesData.filter(client => client.idHabitacion!== idHabitacion)
                    });
                    Swal.fire('Habitación Eliminada', 'La habitación ha sido eliminada correctamente', 'success');
                }
            } catch (error) {
                console.error('Error deleting client:', error);
                Swal.fire('Error', 'No se pudo eliminar la habitación', 'error');
            }
        }
    };

    openEditModal = (client) => {
        this.setState({ editingClient: client });
    };

    updateHabitacion = async (updatedClient) => {
        try {
            const response = await axios.post('http://localhost:81/huellas/backend/editarHabitacion.php', updatedClient);
            if (response.status === 200) {
                this.setState(prevState => ({
                    clientesData: prevState.clientesData.map(client =>
                        client.idHabitacion === updatedClient.idHabitacion ? updatedClient : client
                    ),
                    editingClient: null // Clear the editing state
                }));
                Swal.fire('Habitación actualizada', 'La habitación ha sido actualizada correctamente', 'success');
            }
        } catch (error) {
            console.error('Error updating client:', error);
            Swal.fire('Error', 'No se pudo actualizar la habitación', 'error');
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
    
    saveEditedHabitacion = () => {
        const { editingClient } = this.state;
        this.updateHabitacion(editingClient);
    };
    
    cancelEdit = () => {
        this.setState({ editingClient: null });
    };

    handleExportToExcel = () => {
        const { clientesData } = this.state;
        
        const filteredData = clientesData.map(client => ({
            ID: client.idHabitacion,
            Nombre: client.nombre,
            Costo: `${client.costo} Bs`,
            Capacidad: `${client.capacidad} Mascotas`,
        }));
    
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Habitaciones');
    
        const fileName = 'habitaciones.xlsx';
        XLSX.writeFile(wb, fileName);
    };

    render() {
        const { clientesData, editingClient } = this.state;
        const capacidadTypes = ['2', '3', '4', '5', '6', '7']; 
        return (
            <div id='root'>
                <h2>Listado de Habitaciones</h2>
                <button className="btn btn-success" onClick={this.handleExportToExcel}>Exportar a Excel</button>
                <hr/>
                <table ref={this.tableRef}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Costo</th>
                            <th>Capacidad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesData.map((client) => (
                            <tr key={client.idHabitacion}>
                                <td>{client.idHabitacion}</td>
                                <td>{client.nombre}</td>
                                <td>{client.costo} Bs</td>
                                <td>{client.capacidad} Mascotas</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.deleteHabitacion(client.idHabitacion)}>Eliminar</button>
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
                     <label htmlFor="costo">Costo</label>
                     <input
                         type="number"
                         className="form-control"
                         id="costo"
                         min= "0"
                         value={editingClient.costo}
                         onChange={(e) => this.handleEditChange("costo", e.target.value)}
                     />
                 </div> 
                 <div className="form-group">
                <label htmlFor="capacidad">Capacidad</label>
                <select
                    className="form-control"
                    id="capacidad"
                    value={editingClient.capacidad}
                    onChange={(e) => this.handleEditChange("capacidad", e.target.value)}>
                    {capacidadTypes.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                </div>    
             </div>
             <div className="modal-footer">
                 <button className="btn btn-primary" onClick={this.saveEditedHabitacion}>
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

export default ListaHabitaciones;
