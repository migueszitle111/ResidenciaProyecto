// En tu nuevo archivo: app/aviso-de-privacidad/page.js

import React from 'react';
// IMPORTANTE: Ajusta esta ruta si el archivo 'Politicas.js' está en otra ubicación
import { POLITICA_PRIVACIDAD_MEDXPRO } from '@/app/components/PoliticasP/Politicas'; 

const AvisoDePrivacidadPage = () => {
    // Desestructuración para facilitar el acceso a los datos
    const { titulo, version, secciones } = POLITICA_PRIVACIDAD_MEDXPRO;

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen bg-white">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">{titulo}</h1>
                <p className="text-sm text-gray-500 mt-2">Versión: {version}</p>
            </header>

            <section>
                {/* Iterar sobre cada sección de la política */}
                {secciones.map((seccion) => (
                    <div key={seccion.numero} className="mb-6 p-4 border-l-4 border-orange-500 bg-gray-50 rounded-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {seccion.numero}. {seccion.titulo}
                        </h2>

                        {/* Contenido General */}
                        {seccion.contenido && (
                            <p className="text-gray-700 mb-3">{seccion.contenido}</p>
                        )}

                        {/* Descripción (si existe) */}
                        {seccion.descripcion && (
                            <p className="text-gray-600 italic mb-2">{seccion.descripcion}</p>
                        )}
                        
                        {/* Listas (Datos Recopilados, Finalidades, Compartición) */}
                        {[seccion.datosRecopilados, seccion.finalidades, seccion.comparticion].map((list, listIndex) => (
                            list && (
                                <ul key={listIndex} className="list-disc list-inside ml-6 text-gray-600 mb-2">
                                    {list.map((item, itemIndex) => (
                                        <li key={itemIndex} className="mt-1">{item}</li>
                                    ))}
                                </ul>
                            )
                        ))}
                        
                        {/* Información de Contacto */}
                        {seccion.contacto && (
                            <div className="mt-3 p-3 bg-white border rounded-md text-sm text-gray-800">
                                <p><strong>Correo(s):</strong> {seccion.contacto.correo.join(', ')}</p>
                                <p><strong>Teléfono:</strong> {seccion.contacto.telefono}</p>
                            </div>
                        )}
                         
                        {/* Plazo de Respuesta (Derechos ARCO) */}
                        {seccion.plazoRespuesta && (
                            <p className="mt-3 text-sm text-blue-700 font-medium p-2 bg-blue-50 rounded">
                                **Plazo de respuesta:** {seccion.plazoRespuesta}
                            </p>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default AvisoDePrivacidadPage;