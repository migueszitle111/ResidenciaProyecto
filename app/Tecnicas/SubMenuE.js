
export default function SubMenuE() {
    return (
        <div className="Conteiner">
        {/*Menú 1 */}
        <div className="lg:w-2/3 bg-orange-500 md:p-10 flex flex-col mx-auto m-5 rounded-tr-3xl rounded-bl-3xl p-5">
            <div className="flex flex-wrap">
            <div className="Description w-full ">
                {/*Titulo */}
                <h2 className="title text-3xl text-left font-semibold text-white mb-4">
                Técnicas
                </h2>
                <hr className="bg-white h-0.5" />
                {/*Grid of buttons*/}
                <div className="grid rid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
                <a href="./Tecnicas/Componentes/Neurografia">
                    <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-base overflow-hidden">
                    Neurografía
                    </button>
                </a>
                {/* <a href="./Valores/Componentes/Elementos"> */}
                <a>

                    <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-base overflow-hidden">
                    Miografía
                    </button>
                </a>
                {/* <a href="./Tecnicas/Componentes/Potenciales"> */}
                <a>

                    <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-base overflow-hidden">
                    Potenciales Evocados
                    </button>
                </a>
                {/* <a href="./Componentes/Elementos"> */}
                <a>

                    <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-base overflow-hidden">
                    Pruebas Especiales
                    </button>
                </a>
                {/* <a href="./Componentes/Elementos"> */}
                <a >

                    <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-base overflow-hidden">
                    Valores - Tablas
                    </button>
                </a>
                {/* <a href="./Componentes/Elementos"> */}
                <a>

                    <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-base overflow-hidden">
                    Protocolos
                    </button>
                </a>
                </div>
            </div>
            {/* <div className="w-full md:w-1/2 flex items-center justify-center relative">
                    <Image
                    src="/mEDX_128_Videos.svg"
                    alt="Tecnicas"
                    width={250}
                    height={300}
                    className="rounded-tr-lg rounded-bl-lg grayscale mt-6"
                    />
                </div> */}
            </div>
        </div>
        </div>
    );
}
