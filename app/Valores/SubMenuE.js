
export default function SubMenuE() {
    return (
        <div className="Conteiner">
        {/*Menú 1 */}
        <div className=" bg-orange-500 md:p-10 flex flex-col mx-auto m-10 rounded-tr-3xl rounded-bl-3xl p-5">
            <div className="flex flex-wrap">
            <div className="Description w-full">
                {/*Titulo */}
                {/* <h2 className="title text-3xl text-center font-semibold text-white mb-4">
                Valores
                </h2> */}
                {/* <hr className="bg-white h-0.5" /> */}
                <div className=" m-20"></div>
                {/*Grid of buttons*/}
                <div className="  grid rid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6 px-10">
                <a href="./Valores/Componentes/Neurografia">
                    <button className="bg-black text-white text-center py-7 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Neurografía
                    </button>
                </a>
                <a href="./Valores/Componentes/Elementos">
                    <button className="bg-black text-white text-center py-7 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Miografía
                    </button>
                </a>
                <a href="./Reporte/Tipos/Neuronopatia">
                    <button className="bg-black text-white text-center py-7 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Potenciales Provocados
                    </button>
                </a>
                <a href="./Componentes/Elementos">
                    <button className="bg-black text-white text-center py-7 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Pruebas Especiales
                    </button>
                </a>
                </div>
                <div className=" m-20"></div>
            </div>
            </div>
        </div>
        </div>
    );
}
