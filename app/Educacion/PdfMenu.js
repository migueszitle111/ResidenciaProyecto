'use client';

const documentos = [
  { id: 1, titulo: 'Potenciales Evocados',            archivo: '/pdfs/POTENCIALESEVOCADOSmEDXpro.pdf' },
  { id: 2, titulo: 'Estudios de Conducción Nerviosa', archivo: '/pdfs/ESTUDIOSDECONDUCCIONNERVIOSAmEDXpro.pdf' },
  // … agrega los que necesites
];

export default function PdfMenu({ onSelect }) {
  return (
    <div className="Conteiner">
      {/* Contenedor naranja  */}
      <div className="lg:w-2/3 bg-orange-500 md:p-10 flex flex-col mx-auto m-5 rounded-tr-3xl rounded-bl-3xl p-5">
        <div className="flex flex-wrap">
          <div className="w-full">
            {/* Título */}
            <h2 className="text-3xl font-semibold text-white mb-4">
              Documentos
            </h2>
            <hr className="bg-white h-0.5" />

            {/* Grid de botones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {documentos.map(({ id, titulo, archivo }) => (
                <button
                  key={id}
                  onClick={() => onSelect(archivo)}
                  className="bg-black text-white py-3 rounded-md hover:bg-gray-900 w-full text-base"
                >
                  {titulo}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
