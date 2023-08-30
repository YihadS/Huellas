import React, { Component, createRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

class ListaUsuario extends Component {
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
            const response = await fetch('http://localhost:81/huellas/backend/traerUsuario.php');
            if (response.status === 200) {
                const clientesData = await response.json();
                console.log(clientesData); // Log the fetched client data
                this.setState({ clientesData });
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    deleteUsuario= async (idUsuario) => {
        const shouldDelete = window.confirm("¿Estás seguro de que deseas eliminar a este usuario?");
        if (shouldDelete) {
            try {
                const response = await axios.post('http://localhost:81/huellas/backend/eliminarUsuario.php', {
                    idUsuario: idUsuario,
                    userName: this.props.username
                });
                if (response.status === 200) {
                    this.setState({
                        clientesData: this.state.clientesData.filter(client => client.idUsuario!== idUsuario)
                    });
                    Swal.fire('Usuario Eliminado', 'El usuario ha sido eliminada correctamente', 'success');
                }
            } catch (error) {
                console.error('Error deleting client:', error);
                Swal.fire('Error', 'No se pudo eliminar al usuario', 'error');
            }
        }
    };

    openEditModal = (client) => {
        this.setState({ editingClient: client });
    };

    updateUsuario = async (updatedClient) => {
        try {
            const response = await axios.post('http://localhost:81/huellas/backend/editarUsuario.php', updatedClient);
            if (response.status === 200) {
                this.setState(prevState => ({
                    clientesData: prevState.clientesData.map(client =>
                        client.idUsuario === updatedClient.idUsuario ? updatedClient : client
                    ),
                    editingClient: null // Clear the editing state
                }));
                Swal.fire('Usuario Actualizado', 'El usuario ha sido actualizado correctamente', 'success');
            }
        } catch (error) {
            console.error('Error updating client:', error);
            Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
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
    
    saveEditedUsuario = () => {
        const { editingClient } = this.state;
        this.updateUsuario(editingClient);
    };
    
    cancelEdit = () => {
        this.setState({ editingClient: null });
    };

    render() {
        const { clientesData, editingClient } = this.state;
        const capacidadTypes = ['Administrador', 'Empleado']; 
        return (
            <div id='root'>
                <h2>Listado de Usuarios</h2>
                <hr/>
                <table ref={this.tableRef}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de usuario</th>
                            <th>Contraseña</th>
                            <th>Rol</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesData.map((client) => (
                            <tr key={client.idUsuario}>
                                <td>{client.idUsuario}</td>
                                <td>{client.username}</td>
                                <td>{client.contrasena}</td>
                                <td>{client.rol} </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.deleteUsuario(client.idUsuario)}>Eliminar</button>
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
                 <h5 className="modal-title">Editar Usuario</h5>
                 <button type="button" className="close" onClick={this.cancelEdit}>
                     <span aria-hidden="true">&times;</span>
                 </button>
             </div>
             <div className="modal-body">
                 <div className="form-group">
                     <label htmlFor="username">Nombre de Usuario</label>
                     <input
                         type="text"
                         className="form-control"
                         id="username"
                         value={editingClient.username}
                         onChange={(e) => this.handleEditChange("username", e.target.value)}
                     />
                 </div>
                 <div className="form-group">
                     <label htmlFor="contrasena">Contraseña</label>
                     <input
                         type="text"
                         className="form-control"
                         id="contrasena"
                         value={editingClient.contrasena}
                         onChange={(e) => this.handleEditChange("contrasena", e.target.value)}
                     />
                 </div> 
                 <div className="form-group">
                <label htmlFor="rol">Rol</label>
                <select
                    className="form-control"
                    id="rol"
                    value={editingClient.rol}
                    onChange={(e) => this.handleEditChange("rol", e.target.value)}>
                    {capacidadTypes.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                </div>    
             </div>
             <div className="modal-footer">
                 <button className="btn btn-primary" onClick={this.saveEditedUsuario}>
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

export default ListaUsuario;
