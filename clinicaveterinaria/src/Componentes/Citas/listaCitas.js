import React, { Component} from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

class ListaCitas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            clientesData: [],
            filteredClients: [], // Add filteredClients to the state
            editingClient: null,
            clientNames: [],
            currentPage: 1,
            itemsPerPage: 5
        };
    }

    componentDidMount() {
        this.fetchClientesData();
        this.fetchClientNames();
    }

    fetchClientesData = async () => {
        try {
            const response = await axios.get('http://localhost:81/huellas/backend/traerCita.php');
            if (response.status === 200) {
                const clientesData = response.data;
                this.setState({ clientesData });
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    fetchClientNames = async () => {
        try {
            const response = await axios.get('http://localhost:81/huellas/backend/traerCliente.php');
            if (response.status === 200) {
                const clientNames = response.data;
                this.setState({ clientNames });
            }
        } catch (error) {
            console.error('Error fetching client names:', error);
        }
    };

    deleteCita = async (idCita) => {
        const shouldDelete = window.confirm("¿Estás seguro de que deseas eliminar esta cita?");
        if (shouldDelete) {
            try {
                const response = await axios.post('http://localhost:81/huellas/backend/eliminarCita.php', {
                    idCita: idCita,
                    userName: this.props.username
                });
                if (response.status === 200) {
                    this.setState({
                        clientesData: this.state.clientesData.filter(client => client.idCita !== idCita)
                    });
                    Swal.fire('Cita Eliminada', 'La cita ha sido eliminada correctamente', 'success');
                }
            } catch (error) {
                console.error('Error deleting client:', error);
                Swal.fire('Error', 'No se pudo eliminar la cita', 'error');
            }
        }
    };

    openEditModal = (client) => {
        this.setState({ editingClient: client });
    };

    updateCita = async (updatedClient) => {
        try {
            const response = await axios.post('http://localhost:81/huellas/backend/editarCita.php', updatedClient);
            if (response.status === 200) {
                this.setState(prevState => ({
                    clientesData: prevState.clientesData.map(client =>
                        client.idCliente === updatedClient.idCliente ? updatedClient : client
                    ),
                    editingClient: null // Clear the editing state
                }));
                Swal.fire('Cita Actualizada', 'La cita ha sido actualizada correctamente', 'success');
            }
        } catch (error) {
            console.error('Error updating client:', error);
            Swal.fire('Error', 'No se pudo actualizar la cita', 'error');
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
    
    saveEditedCita = () => {
        const { editingClient } = this.state;
        this.updateCita(editingClient);
    };
    
    cancelEdit = () => {
        this.setState({ editingClient: null });
    };

    handleExportToExcel = () => {
        const { clientesData, filteredClients } = this.state;
    
        const dataToExport = filteredClients.length > 0 ? filteredClients : clientesData;
    
        const filteredData = dataToExport.map(client => ({
            ID: client.idCita,
            Fecha: client.fecha,
            Motivo: client.motivo,
            Mascota: client.nombreMascota,
            Cliente: `${client.nombreCliente} ${client.apellidosCliente}`,
            Habitación: client.nombreHabitacion,
            Doctor: `${client.nombreDoctor} ${client.apellidosDoctor}`,
            Costo: `${client.costo} Bs`,
            Estado: client.estado,
        }));
    
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Citas');
    
        const fileName = 'citas.xlsx';
        XLSX.writeFile(wb, fileName);
    };

    handleDateFilterChange = (field, value) => {
        this.setState({ [field]: value }, this.applyDateFilter); // Call applyDateFilter after updating state
    };

    applyDateFilter = () => {
        const { startDate, endDate, clientesData } = this.state;

        if (!startDate && !endDate) {
            this.setState({ filteredClients: clientesData }); // No filters applied, show all data
            return;
        }

        const filteredClients = clientesData.filter(client => {
            const clientDate = new Date(client.fecha);
            clientDate.setHours(0, 0, 0, 0); // Set time to midnight

            const filterStartDate = startDate ? new Date(startDate) : null;
            const filterEndDate = endDate ? new Date(endDate) : null;

            if (filterStartDate && clientDate < filterStartDate) {
                return false;
            }
            if (filterEndDate && clientDate > filterEndDate) {
                return false;
            }

            return true;
        });

        this.setState({ filteredClients }); // Update filteredClients in the state
    };

    handleFilterButtonClick = () => {
        // Perform filtering logic here if needed before rendering
        this.forceUpdate(); // Force a re-render to apply the filtering
    };

    render() {
        const status = ['En Proceso', 'Finalizada'];        
        const {
            clientesData,
            startDate,
            endDate,
            editingClient,
            currentPage,
            itemsPerPage,
        } = this.state;
        const filteredClients = clientesData.filter(client => {
            if (!startDate && !endDate) {
                return true; // No filter applied
            }

            const clientDate = new Date(client.fecha);
            clientDate.setHours(0, 0, 0, 0); // Set time to midnight

            const filterStartDate = startDate ? new Date(startDate) : null;
            const filterEndDate = endDate ? new Date(endDate) : null;

            if (filterStartDate && clientDate < filterStartDate) {
                return false;
            }
            if (filterEndDate && clientDate > filterEndDate) {
                return false;
            }

        
            return true;
        });

        return (
            <div id='root'>
                <h2>Listado de Citas</h2>
                <label htmlFor="startDate">Fecha de Inicio: </label> <span> </span><span> </span>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => this.handleDateFilterChange("startDate", e.target.value)}
                />
<span> </span><span style={{visibility:'hidden'}}>ssss </span><span> </span><span> </span><span> </span>
                <label htmlFor="endDate">Fecha de Fin: </label> <span> </span><span> </span>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => this.handleDateFilterChange("endDate", e.target.value)}
                /><span style={{visibility:'hidden'}}>sss </span>
                <button className="btn btn-primary" onClick={this.handleFilterButtonClick}>
                    Filtrar por Fecha
                </button>
<br/><br/>
                <button className="btn btn-success" onClick={this.handleExportToExcel}>Exportar a Excel</button>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Motivo</th>
                            <th>Mascota</th>
                            <th>Cliente</th>
                            <th>Habitación</th>
                            <th>Doctor</th>
                            <th>Costo</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredClients
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((client) => (
                            <tr key={client.idCita}>
                                <td>{client.idCita}</td>
                                <td>{client.fecha}</td>
                                <td>{client.motivo}</td>
                                <td>{client.nombreMascota}</td>
                                <td>{client.nombreCliente} {client.apellidosCliente}</td>
                                <td>{client.nombreHabitacion}</td>
                                <td>{client.nombreDoctor} {client.apellidosDoctor}</td>
                                <td>{client.costo} Bs</td>
                                <td>{client.estado}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.deleteCita(client.idCita)}>Eliminar</button>
                                    <button className="btn btn-primary" onClick={() => this.openEditModal(client)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
    <ul className="pagination">
        {Array(Math.ceil(filteredClients.length / itemsPerPage))
            .fill()
            .map((_, index) => (
                <li
                    key={index}
                    className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                >
                    <button
                        className="page-link"
                        onClick={() => this.setState({ currentPage: index + 1 })}
                    >
                        {index + 1}
                    </button>
                </li>
            ))}
    </ul>
</div>
                {editingClient && (
     <div className="edit-modal modal fade show" style={{ display: "block" }}>
     <div className="modal-dialog modal-dialog-centered">
         <div className="modal-content">
             <div className="modal-header">
                 <h5 className="modal-title">Editar Cita</h5>
                 <button type="button" className="close" onClick={this.cancelEdit}>
                     <span aria-hidden="true">&times;</span>
                 </button>
             </div>
             <div className="modal-body">
             <div className="form-group">
                     <label htmlFor="fecha">Fecha</label>
                     <input
                         type="datetime-local"
                         className="form-control"
                         id="fecha"
                         value={editingClient.fecha}
                         onChange={(e) => this.handleEditChange("fecha", e.target.value)}
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="motivo">Motivo</label>
                     <input
                         type="text"
                         className="form-control"
                         id="motivo"
                         value={editingClient.motivo}
                         onChange={(e) => this.handleEditChange("motivo", e.target.value)}
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="costo">Costo</label>
                     <input
                         type="number"
                         className="form-control"
                         id="costo"
                         min="0"
                         value={editingClient.costo}
                         onChange={(e) => this.handleEditChange("costo", e.target.value)}
                     />
                 </div>
                 <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                    className="form-control"
                    id="estado"
                    value={editingClient.estado}
                    onChange={(e) => this.handleEditChange("estado", e.target.value)}>
                    {status.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
             </div>
             <div className="modal-footer">
                 <button className="btn btn-primary" onClick={this.saveEditedCita}>
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

export default ListaCitas;
