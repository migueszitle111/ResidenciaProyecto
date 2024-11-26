
export default function MenuNeuro() {
    return (
        <div className="Conteiner">
        {/*Menú 1 */}
        <div className=" bg-orange-500 md:p-10 flex flex-col mx-auto m-10 rounded-tr-3xl rounded-bl-3xl p-5">
            <div className="flex flex-wrap">
            <div className="Description w-full">
                {/*Titulo */}
                <p className=" text-center text-4xl font-bold text-white ">NEUROGRAFÍA</p>
                <hr className="bg-white h-0.5 m-2" />
                {/*Grid of buttons*/}
                <div className="  grid rid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4 my-20">
                <a href="./Neurografia/Mediano">
                    <button className="bg-black text-white text-center py-2 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Mediano 1
                    </button>
                </a>
                <a href="./Reporte/Tipos/Neuronopatia">
                    <button className="bg-black text-white text-center py-2 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Mediano 2
                    </button>
                </a>
                <a href="./Componentes/Elementos">
                    <button className="bg-black text-white text-center py-2 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Mediano
                    </button>
                </a>
                <a href="./Componentes/Elementos">
                    <button className="bg-black text-white text-center py-2 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Mediano
                    </button>
                </a>
                <a href="./Componentes/Elementos">
                    <button className="bg-black text-white text-center py-2 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Mediano
                    </button>
                </a>
                <a href="./Componentes/Elementos">
                    <button className="bg-black text-white text-center py-2 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Mediano
                    </button>
                </a>
                <a href="./Componentes/Elementos">
                    <button className="bg-black text-white text-center py-2 rounded-md hover:bg-gray-900 w-full text-xl overflow-hidden">
                    Mediano
                    </button>
                </a>
            </div>
            </div>
            </div>
        </div>
        </div>
    );
}
