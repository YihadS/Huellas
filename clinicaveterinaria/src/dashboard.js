import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faDog, faCashRegister, faUserFriends, faCat } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import RegistrarCliente from './Componentes/Clientes/registrarCliente';
import RegistrarMascota from './Componentes/Mascotas/registrarMascota';
import ListaClientes from './Componentes/Clientes/listaClientes';
import ListaMascotas from './Componentes/Mascotas/listaMascotas';

function Dashboard(props) {
  
  const { username, user } = props.user;
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  function handleLogout() {
    localStorage.removeItem('user');
    window.location.reload();
  }

  return (
    <div id='root'>
      <div className='header'>
        <img src={require('./img/logo.png')} />
        <li>
          <FontAwesomeIcon icon={faUser}  />
          <p>{username}</p>
          <button style={{marginLeft: '10px'}} onClick={handleLogout}>Cerrar Sesión</button>
        </li>
      </div>

      <div className='grid-container'>
        <div className='grid-item sidebar'>
        <ul>
          <li onClick={() => setSelectedMenuItem('citas')}>
            <FontAwesomeIcon icon={faCashRegister}/> Registrar Citas
          </li>
          <li onClick={() => setSelectedMenuItem('clientes')}>
            <FontAwesomeIcon icon={faUserFriends}/> Registrar Clientes
          </li>
          <li onClick={() => setSelectedMenuItem('mascotas')}>
            <FontAwesomeIcon icon={faDog}/> Registrar Mascotas
          </li>
          <li onClick={() => setSelectedMenuItem('listaClientes')}>
            <FontAwesomeIcon icon={faUsers}/> Lista de Clientes
          </li>
          <li onClick={() => setSelectedMenuItem('listaMascotas')}>
            <FontAwesomeIcon icon={faCat}/> Lista de Mascotas
          </li>
        </ul>
        </div>
        <div className='grid-item main-content'>
          <ul>
        {selectedMenuItem === 'citas' && <RegistrarCliente/>}
        {selectedMenuItem === 'clientes' && <RegistrarCliente/>}
        {selectedMenuItem === 'mascotas' && <RegistrarMascota/>}
        {selectedMenuItem === 'listaClientes' && <ListaClientes/>}
        {selectedMenuItem === 'listaMascotas' && <ListaMascotas/>}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
