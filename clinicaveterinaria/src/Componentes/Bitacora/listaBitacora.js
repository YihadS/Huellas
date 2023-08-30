import React, { Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

class ListaBitacora extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientesData: [],
            startDate: null,
            endDate: null,
            filteredClients: [],
            searchText: '',
            currentPage: 1,
            itemsPerPage: 10
        };
    }

    componentDidMount() {
        this.fetchClientesData();
    }

 
    fetchClientesData = async () => {
        try {
            const response = await fetch('http://localhost:81/huellas/backend/traerBitacora.php');
            if (response.status === 200) {
                const clientesData = await response.json();
                this.setState({ clientesData });
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    handleExportToExcel = () => {
        const { clientesData, filteredClients  } = this.state;
        const dataToExport = filteredClients.length > 0 ? filteredClients : clientesData;

        const filteredData = dataToExport.map(client => ({
            ID: client.idBitacora,
            Fecha: client.fecha,
            Usuario: client.usuario,
            Descripción: client.accion,
        }));

        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Bitácora');

        const fileName = 'bitacora.xlsx';
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

    handleSearchTextChange = (e) => {
        this.setState({ searchText: e.target.value, currentPage: 1 });
    };


    render() {
        const {
            clientesData,
            startDate,
            endDate,
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
                <h2>Bitácora de Eventos</h2>
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
                            <th>Usuario</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredClients
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((client) => (
                            <tr key={client.idBitacora}>
                                <td>{client.idBitacora}</td>
                                <td>{client.fecha}</td>
                                <td>{client.usuario}</td>
                                <td>{client.accion}</td>
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
            </div>
        );
    }
}

export default ListaBitacora;
