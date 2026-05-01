export default function SubMenuE() {
  return (
    <div className="Conteiner">
      <div className="lg:w-2/3 bg-orange-500 md:p-10 flex flex-col mx-auto m-5 rounded-tr-3xl rounded-bl-3xl p-5">
        <div className="flex flex-wrap">
          <div className="Description w-full ">
            <h2 className="title text-3xl text-left font-semibold text-white mb-4">
              Tecnicas
            </h2>
            <hr className="bg-white h-0.5" />

            <div className="grid rid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
              <a href="./Tecnicas/Componentes/Neurografia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-base overflow-hidden">
                  Neurografia
                </button>
              </a>

              <a>
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-base overflow-hidden">
                  Miografia
                </button>
              </a>

              <a href="./Tecnicas/Componentes/Potenciales">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-base overflow-hidden">
                  Potenciales Evocados
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
