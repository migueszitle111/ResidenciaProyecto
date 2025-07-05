'use client';

const temas = [
  { id: 1, title: 'Portenciales Evocados',  file:'/pdfs/POTENCIALESEVOCADOSmEDXpro.pdf'},
 { id: 2, title: 'Estudios De Conduccion Nerviosa',  file:'/pdfs/ESTUDIOSDECONDUCCIONNERVIOSAmEDXpro.pdf'},
];

export default function TemaList({ onSelect }) {
  return (
    <ul className="space-y-2">
      {temas.map(({ id, title, file }) => (
        <li key={id}>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => onSelect(file)}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  );
}
