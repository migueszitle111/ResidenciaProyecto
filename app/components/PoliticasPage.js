'use client';
import { POLITICA_PRIVACIDAD_MEDXPRO } from './PoliticasP/Politicas';

export default function PoliticasPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{POLITICA_PRIVACIDAD_MEDXPRO.titulo}</h1>
      <p className="text-sm text-gray-600 mb-8">{POLITICA_PRIVACIDAD_MEDXPRO.version}</p>
      
      {POLITICA_PRIVACIDAD_MEDXPRO.secciones.map((seccion) => (
        <div key={seccion.numero} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            {seccion.numero}. {seccion.titulo}
          </h2>
          {seccion.contenido && (
            <p className="text-gray-700 mb-4">{seccion.contenido}</p>
          )}
          {seccion.descripcion && (
            <p className="text-gray-700 mb-2">{seccion.descripcion}</p>
          )}
          {seccion.datosRecopilados && (
            <ul className="list-disc pl-5 mb-4">
              {seccion.datosRecopilados.map((dato, index) => (
                <li key={index} className="text-gray-700">{dato}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}