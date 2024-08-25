import React from 'react';

// Componente que muestra los datos del perfil del usuario
const ProfileData = ({ status, session, name, lastname, cedula, especialidad }) => (
  <div className='box'>
    <div className="title">Datos del Perfil</div>
    <div className="data">
      <b>Nombre:</b> {status === 'authenticated' && session ? name + ' ' + lastname : 'Cargando...'}
    </div>
    <div className="data">
      <b>Cedula:</b> {status === 'authenticated' && session ? cedula : 'Cargando...'}
    </div>
    <div className="data">
      <b>Especialidad:</b> {status === 'authenticated' && session ? especialidad : 'Cargando...'}
    </div>
  </div>
);

export default ProfileData;