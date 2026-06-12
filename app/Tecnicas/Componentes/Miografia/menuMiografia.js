import Image from "next/image";
import { useState } from "react";
import Frontalisis from "./Cara/Frontalis";
import Oris from "./Cara/Oris";
import Orbitalis from "./Cara/Orbitalis";
import Palpebralis from "./Cara/Palpebralis"
import Lacrimalis from "./Cara/Lacrimalis"
import MasseterSp from "./Cara/MasseterSp"
import MasseterPf from "./Cara/MasseterPf"
import Genioglossus from "./Cara/Genioglossus"
import Hyoglossus from "./Cara/Hyoglossus"
import Styloglossus from "./Cara/Styloglossus"
import LevatorS from "./Cuello/LevatorS"
import Sternocleidomastoideus from "./Cuello/Sternocleidomastoideus"
import Trapezius from "./Cuello/Trapezius"
import Infraspinatus from "./Hombro/Infraspinatus"
import Supraspinatus from "./Hombro/Supraspinatus"
import TeresMj from "./Hombro/TeresMj"
import TeresMn from "./Hombro/TeresMn"
import DeltoideusC from "./Hombro/DeltoideusC"
import DeltoideusA from "./Hombro/DeltoideusA"
import DeltoideusS from "./Hombro/DeltoideusS"
import PronatorQ from "./Antebrazo/PronatorQ"
import DigitorumSp from "./Antebrazo/DigitorumSp"
import DigitorumPrR from "./Antebrazo/DigitorumPrR"
import DigitorumPrU from "./Antebrazo/DigitorumPrU"
import FlxPollicisLon from "./Antebrazo/FlxPollicisLon"
import Palmaris from "./Antebrazo/Palmaris"
import FlxCarpiBr from "./Antebrazo/FlxCarpiBr"
import FlxCarpiUl from "./Antebrazo/FlxCarpiUl"
import PronatorT from "./Antebrazo/PronatorT"
import ExtIndicis from "./Antebrazo/ExtIndicis"
import ExtPollicisBr from "./Antebrazo/ExtPollicisBr"
import ExtPollicisLo from "./Antebrazo/ExtPollicisLo"
import ExtCarpiUl from "./Antebrazo/ExtCarpiUl"
import AbdPollicisLo from "./Antebrazo/AbdPollicisLo"
import Brachioradialis from "./Antebrazo/Brachioradialis"
import Anconeus from "./Brazo/Anconeus"
import Brachialis from "./Brazo/Brachialis"
import BrachiiLon from "./Brazo/BrachiiLon"
import BrachiiLat from "./Brazo/BrachiiLat"
import BrachiiMed from "./Brazo/BrachiiMed"
import BicBrachiiLon from "./Brazo/BicBrachiiLon"
import BicBchiiBre from "./Brazo/BicBchiiBre"
import Coracobrachialis from "./Brazo/Coracobrachialis"
import AbdPollicisBr from "./Mano/AbdPollicisBr"
import FlxpollicisBr from "./Mano/FlxpollicisBr"
import OpponensP from "./Mano/OpponensP"
import LumbricalesI from "./Mano/LumbricalesI"
import LumbricalesIII from "./Mano/LumbricalesIII"
import OpponensD from "./Mano/OpponensD"
import FlxDigitiM from "./Mano/FlxDigitiM"
import Serratus from "./Torax/Serratus"
import PectoralisCl from "./Torax/PectoralisCl"
import PectoralisSt from "./Torax/PectoralisSt"
import PectoralisM from "./Torax/PectoralisM"
import MultifidiC from "./Torax/MultifidiC"
import MultifidiT from "./Torax/MultifidiT"
import MultifidiL from "./Torax/MultifidiL"
import Diaphragma from "./Torax/Diaphragma"
import RhomboideusMa from "./Torax/RhomboideusMa"
import RhomboideusMi from "./Torax/RhomboideusMi"
import Latissimus from "./Torax/Latissimus"
import GluteusMa from "./Cadera/GluteusMa"
import GluteusMe from "./Cadera/GluteusMe"
import GluteusMi from "./Cadera/GluteusMi"
import TensorF from "./Cadera/TensorF"
import Iliopsoas from "./Cadera/Iliopsoas"
import Pectineus from "./Cadera/Pectineus"
import Sartorius from "./Cadera/Sartorius"
import AddLongus from "./Cadera/AddLongus"
import AddBrevis from "./Cadera/AddBrevis"
import AddMagnusA from "./Cadera/AddMagnusA"
import AddMagnusH from "./Cadera/AddMagnusH"
import Gracilis from "./Cadera/Gracilis"
import Semitendinosus from "./Muslo/Semitendinosus"
import Semimembranosus from "./Muslo/Semimembranosus"
import BicepsFemorisL from "./Muslo/BicepsFemorisL"
import BicepsFemorisB from "./Muslo/BicepsFemorisB"
import Rectus from "./Muslo/Rectus"
import VastusL from "./Muslo/VastusL"
import VastusM from "./Muslo/VastusM"
import Gastrocnemius from "./Pierna/Gastrocnemius"
import Soleus from "./Pierna/Soleus"
import TibialisA from "./Pierna/TibialisA"
import TibialisP from "./Pierna/TibialisP"
import FlxDigitorumL from "./Pierna/FlxDigitorumL"
import FlxHallucisL from "./Pierna/FlxHallucisL"
import FlxDigitorumB from "./Pierna/FlxDigitorumB"
import FlxHallucisB from "./Pierna/FlxHallucisB"
import AbdDigitiM from "./Pierna/AbdDigitiM"
import ExtDigitorumL from "./Pierna/ExtDigitorumL"
import ExtHallucisL from "./Pierna/ExtHallucisL"
import PeroneusT from "./Pierna/PeroneusT"
import PeroneusL from "./Pierna/PeroneusL"
import PeroneusB from "./Pierna/PeroneusB"
import ExtDigitorumB from "./Pierna/ExtDigitorumB"
import Popliteus from "./Pierna/Popliteus"
import AbdHallucis from "./Pierna/AbdHallucis"

import "/app/Tecnicas/Componentes/Neurografia/StyleM.css"

import mostrarMenuIcon from "/public/assets/IconSVG/I_Crop.svg"; // Reemplaza con la ruta real
import ocultarMenuIcon from "/public/assets/IconSVG/I_Expand.svg"; // Reemplaza con la ruta real


const MenuBotonesMg = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [visibleSubMenu, setVisibleSubMenu] = useState(null);
    const [menuVisible, setMenuVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

const Miografia = [
    {
    Menu: "Cara y Cráneo",
    Submenu: [
        'Frontalis',
        'Orbicularis oculi (pars orbitalis)',
        'Orbicularis oculi (pars palpebralis)',
        'Orbicularis oculi (pars lacrimalis)',
        'Orbicularis oris',
        'Masseter (pars superficialis)',
        'Masseter (pars profunda)',
        'Genioglossus',
        'Hyoglossus',
        'Styloglossus',
        

    ],
    },
    {
    Menu: "Cuello",
    Submenu: [
        'Levator Scapulae',
        'Sternocleidomastoideus',
        'Trapezius (pars descendens)',
    ],
    },
    {
    Menu: "Hombro",
    Submenu: [
        'Infraspinatus',
        'Supraspinatus',
        'Teres Major',
        'Teres Minor',
        'Deltoideus (pars clavicularis)',
        'Deltoideus (pars acromialis)',
        'Deltoideus (pars spinalis)',
    ],
    },
    {
    Menu: "Antebrazo",
    Submenu: [
        'Pronator Quadratus',
        'Flexor digitorum superficialis',
        'Flexor digitorum profundus (radialis part, to digits II–III)',
        'Flexor digitorum profundus (ulnaris part, to digits IV–V)',
        'Flexor Pollicis Longus',
        'Palmaris Longus',
        'Flexor Carpi Radialis',
        'Flexor Carpi Ulnaris',
        'Pronator Teres',
        'Extensor Indicis',
        'Extensor Pollicis Brevis',
        'Extensor Pollicis Longus',
        'Extensor Carpi Ulnaris',
        'Abductor Pollicis Longus',
        'Brachioradialis',
    ],
    },
    {
    Menu: "Brazo",
    Submenu: [
        'Anconeus',
        'Brachialis',
        'Triceps brachii (caput longum)',
        'Triceps brachii (caput laterale)',
        'Triceps brachii (caput mediale)',
        'Biceps brachii (caput longum)',
        'Biceps brachii (caput breve)',
        'Coracobrachialis',
    ],
    },
    {
    Menu: "Mano",
    Submenu: [
        "Abductor Pollicis Brevis",
        "Flexor pollicis Brevis (caput superficiale)",
        "Opponens pollicis",
        'Lumbricales manus (I–II)',
        'Lumbricales manus (III–IV)',
        'Opponens Digiti Minimi',
        'Flexor Digiti Minimi',
    ],
    },
    {
    Menu: "Torax",
    Submenu: [
        'Serratus Anterior',
        'Pectoralis major (pars clavicularis)',
        'Pectoralis major (pars sternocostalis)',
        'Pectoralis Minor',
        'Multifidi cervicis et rotatores',
        'Multifidi thoracis et rotatores',
        'Multifidi lumborum et sacrum',
        'Diaphragma',
        'Rhomboideus Major',
        'Rhomboideus Minor',
        'Latissimus Dorsi',
    ],
    },
    {
    Menu: "Cadera y glúteo",
    Submenu: [
        'Gluteus Maximus',
        'Gluteus Medius',
        'Gluteus Minimus',
        'Tensor Fasciae Latae',
        'Iliopsoas',
        'Pectineus',
        'Sartorius',
        'Adductor Longus',
        'Adductor Brevis',
        'Adductor Magnus (pars adductoria)',
        'Adductor Magnus (pars hamstring)',
        'Gracilis',
    ],
    },
    {
    Menu: "Muslo",
    Submenu: [
        'Semitendinosus',
        'Semimembranosus',
        'Biceps femoris (caput longum)',
        'Biceps femoris (caput breve)',
        'Rectus femoris',
        'Vastus Lateralis',
        'Vastus medialis',
    ],
    },
    {
    Menu: "Pierna y pie",
    Submenu: [
        'Gastrocnemius caput mediale',
        'Soleus',
        'Tibialis Anterior',
        'Tibialis Posterior',
        'Flexor Digitorum Longus',
        'Flexor Hallucis Longus',
        'Flexor Digitorum Brevis',
        'Flexor Hallucis Brevis',
        'Abductor Digiti Minimi Pedis',
        'Abductor Hallucis',
        'Extensor Digitorum Brevis',
        'Extensor Digitorum Longus',
        'Extensor Hallucis Longus',
        'Peroneus Tertius',
        'Peroneus Longus',
        'Peroneus Brevis',
        'Popliteus',
        
    ],
    },

];


    const handleClick = (option) => {
        setSelectedOption(option);
        setMenuVisible(false); // Ocultar el menú al seleccionar una opción
    };

    const toggleSubMenuVisibility = (menuOption) => {
        setVisibleSubMenu((prevMenu) =>
            prevMenu === menuOption ? null : menuOption
        );
    };

    const toggleMenuVisibility = () => {
        setMenuVisible(!menuVisible);
    };

    // Combinar todos los submenús en un solo arreglo
    const allOptions = [
      ...Miografia.flatMap((item) => item.Submenu),
      // ...Miografia.flatMap((item) => item.Submenu),
      // ...PotencialesProvocados.flatMap((item) => item.Submenu),
      // ...PruebasEspeciales.flatMap((item) => item.Submenu),
    ];

    const filteredOptions = allOptions.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="BannerTitlepage">
                <div>Miografía</div>
            </div>

            {/* Botón para ocultar/mostrar menú */}
            <button
                className="bg-black px-4 py-2 m-2 flex items-center  border border-orange-500 round-button"
                style={{ borderRadius: '100%' }}
                onClick={toggleMenuVisibility}
            >
                <Image
                    src={menuVisible ? ocultarMenuIcon : mostrarMenuIcon}
                    alt={menuVisible ? "Ocultar Menú" : "Mostrar Menú"}
                    width={34}
                    height={34}
                    style={{ filter: 'invert(1)' }}
                />
                {menuVisible ? " " : " "}
            </button>

            <div className="flex justify-center">
                <div className={`max-h-full bg-[#3f3c3c] text-white rounded-2xl flex-shrink-0 overflow-hidden transition-all ${menuVisible ? 'w-1/5 p-4' : 'w-0 p-0'}`}>
                        <h2 className="text-lg mb-4">Miografía</h2>

                        {/* Buscador con autocompletado */}
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full mb-4 p-2 text-black rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <ul className="bg-white text-black rounded shadow max-h-48 overflow-y-auto">
                                {filteredOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-orange-200 cursor-pointer"
                                        onClick={() => handleClick(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                                {filteredOptions.length === 0 && (
                                    <li className="p-2 text-gray-500">Sin resultados</li>
                                )}
                            </ul>
                        )}

                        {/* Menú original */}
                        {Miografia.map((menuOption, menuIndex) => (
                            <div key={menuIndex} className="mb-1">
                                <button
                                    className={`w-full text-left py-2 px-2 rounded-lg transition-colors ${
                                        visibleSubMenu === menuOption.Menu
                                            ? 'bg-orange-500 text-white'
                                            : 'hover:text-orange-400'
                                    }`}
                                    onClick={() => toggleSubMenuVisibility(menuOption.Menu)}
                                >
                                    {visibleSubMenu === menuOption.Menu ? '▽' : '▷'} {menuOption.Menu}
                                </button>
                                {visibleSubMenu === menuOption.Menu && (
                                    <div className="ml-4 mt-1">
                                        {menuOption.Submenu.map((submenuOption, submenuIndex) => (
                                            <button
                                                key={submenuIndex}
                                                className={`w-full text-sm text-left py-1 px-1 hover:text-orange-400 transition-colors ${
                                                    selectedOption === submenuOption ? "text-orange-400" : "text-gray-300"
                                                }`}
                                                onClick={() => handleClick(submenuOption)}
                                            >
                                                ● {submenuOption}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                {/* Contenido Principal */}
                <div className="w-4/5 max-h-full">
                    {!selectedOption ? (
                        <div className="flex min-h-screen flex-col items-center p-10">
                            <Image
                                src="/L_B_Blanco.svg"
                                alt="Logo de la empresa"
                                width={120}
                                height={120}
                                className="w-52 h-52"
                            />
                            <h1 className="text-white text-4xl">Técnicas</h1>
                            <p className="pt-16 text-white text-center text-xl italic">
                                Bienvenido a la sección de Técnicas en donde podrá contar a
                                disposición de la información que se encuentran disponibles en
                                nuestra plataforma.
                            </p>
                        </div>
                    ) : (
                        <div className="flex min-h-screen flex-col items-center rounded p-2 m-4">
                            {selectedOption === "Frontalis" && <Frontalisis />}
                            {selectedOption === "Orbicularis oris" && <Oris />}
                            {selectedOption === "Orbicularis oculi (pars orbitalis)" && <Orbitalis />}
                            {selectedOption === "Orbicularis oculi (pars palpebralis)" && <Palpebralis />}
                            {selectedOption === "Orbicularis oculi (pars lacrimalis)" && <Lacrimalis />}
                            {selectedOption === "Masseter (pars superficialis)" && <MasseterSp />}
                            {selectedOption === "Masseter (pars profunda)" && <MasseterPf />}
                            {selectedOption === "Genioglossus" && <Genioglossus />}
                            {selectedOption === "Hyoglossus" && <Hyoglossus />}
                            {selectedOption === "Styloglossus" && <Styloglossus />}
                            {selectedOption === "Levator Scapulae" && <LevatorS />}
                            {selectedOption === "Sternocleidomastoideus" && <Sternocleidomastoideus />}
                            {selectedOption === "Trapezius (pars descendens)" && <Trapezius />}
                            {selectedOption === "Infraspinatus" && <Infraspinatus />} 
                            {selectedOption === "Supraspinatus" && <Supraspinatus />}
                            {selectedOption === "Teres Major" && <TeresMj />}
                            {selectedOption === "Teres Minor" && <TeresMn />}
                            {selectedOption === "Deltoideus (pars clavicularis)" && <DeltoideusC />}
                            {selectedOption === "Deltoideus (pars acromialis)" && <DeltoideusA />}
                            {selectedOption === "Deltoideus (pars spinalis)" && <DeltoideusS />}
                            {selectedOption === "Pronator Quadratus" && <PronatorQ />}
                            {selectedOption === "Flexor digitorum superficialis" && <DigitorumSp />}
                            {selectedOption === "Flexor digitorum profundus (radialis part, to digits II–III)" && <DigitorumPrR />}
                            {selectedOption === "Flexor digitorum profundus (ulnaris part, to digits IV–V)" && <DigitorumPrU />}
                            {selectedOption === "Flexor Pollicis Longus" && <FlxPollicisLon />}
                            {selectedOption === "Palmaris Longus" && <Palmaris />}
                            {selectedOption === "Flexor Carpi Radialis" && <FlxCarpiBr />}
                            {selectedOption === "Flexor Carpi Ulnaris" && <FlxCarpiUl />}
                            {selectedOption === "Pronator Teres" && <PronatorT />}
                            {selectedOption === "Extensor Indicis" && <ExtIndicis />}
                            {selectedOption === "Extensor Pollicis Brevis" && <ExtPollicisBr />}
                            {selectedOption === "Extensor Pollicis Longus" && <ExtPollicisLo />}
                            {selectedOption === "Extensor Carpi Ulnaris" && <ExtCarpiUl />}
                            {selectedOption === "Abductor Pollicis Longus" && <AbdPollicisLo />}
                            {selectedOption === "Brachioradialis" && <Brachioradialis />}
                            {selectedOption === "Anconeus" && <Anconeus />}
                            {selectedOption === "Brachialis" && <Brachialis />}
                            {selectedOption === "Triceps brachii (caput longum)" && <BrachiiLon />}
                            {selectedOption === "Triceps brachii (caput laterale)" && <BrachiiLat />}
                            {selectedOption === "Triceps brachii (caput mediale)" && <BrachiiMed />}
                            {selectedOption === "Biceps brachii (caput longum)" && <BicBrachiiLon />}
                            {selectedOption === "Biceps brachii (caput breve)" && <BicBchiiBre />}
                            {selectedOption === "Coracobrachialis" && <Coracobrachialis />}
                            {selectedOption === "Abductor Pollicis Brevis" && <AbdPollicisBr />}
                            {selectedOption === "Flexor pollicis Brevis (caput superficiale)" && <FlxpollicisBr />}
                            {selectedOption === "Opponens pollicis" && <OpponensP />}
                            {selectedOption === 'Lumbricales manus (I–II)' && <LumbricalesI />}
                            {selectedOption === 'Lumbricales manus (III–IV)' && <LumbricalesIII />}
                            {selectedOption === 'Opponens Digiti Minimi' && <OpponensD />}
                            {selectedOption === 'Flexor Digiti Minimi' && <FlxDigitiM />}
                            {selectedOption === 'Serratus Anterior' && <Serratus />}
                            {selectedOption === 'Pectoralis major (pars clavicularis)' && <PectoralisCl />}
                            {selectedOption === 'Pectoralis major (pars sternocostalis)' && <PectoralisSt />}
                            {selectedOption === 'Pectoralis Minor' && <PectoralisM />}
                            {selectedOption === 'Multifidi cervicis et rotatores' && <MultifidiC />}
                            {selectedOption === 'Multifidi thoracis et rotatores' && <MultifidiT />}
                            {selectedOption === 'Multifidi lumborum et sacrum' && <MultifidiL />}
                            {selectedOption === 'Diaphragma' && <Diaphragma />}
                            {selectedOption === 'Rhomboideus Major' && <RhomboideusMa />}
                            {selectedOption === 'Rhomboideus Minor' && <RhomboideusMi />}
                            {selectedOption === 'Latissimus Dorsi' && <Latissimus />}
                            {selectedOption === 'Gluteus Maximus' && <GluteusMa />}
                            {selectedOption === 'Gluteus Medius' && <GluteusMe />}
                            {selectedOption === 'Gluteus Minimus' && <GluteusMi />}
                            {selectedOption === 'Tensor Fasciae Latae' && <TensorF />}
                            {selectedOption === 'Iliopsoas' && <Iliopsoas />}
                            {selectedOption === 'Pectineus' && <Pectineus />}
                            {selectedOption === 'Sartorius' && <Sartorius />}
                            {selectedOption === 'Adductor Longus' && <AddLongus />}
                            {selectedOption === 'Adductor Brevis' && <AddBrevis />}
                            {selectedOption === 'Adductor Magnus (pars adductoria)' && <AddMagnusA />}
                            {selectedOption === 'Adductor Magnus (pars hamstring)' && <AddMagnusH />}
                            {selectedOption === 'Gracilis' && <Gracilis />}
                            {selectedOption === 'Semitendinosus' && <Semitendinosus />}
                            {selectedOption === 'Semimembranosus' && <Semimembranosus />}
                            {selectedOption === 'Biceps femoris (caput longum)' && <BicepsFemorisL />}
                            {selectedOption === 'Biceps femoris (caput breve)' && <BicepsFemorisB />}
                            {selectedOption === 'Rectus femoris' && <Rectus />}
                            {selectedOption === 'Vastus Lateralis' && <VastusL />}
                            {selectedOption === 'Vastus medialis' && <VastusM />}
                            {selectedOption === 'Gastrocnemius caput mediale' && <Gastrocnemius />}
                            {selectedOption === 'Soleus' && <Soleus />}
                            {selectedOption === 'Tibialis Anterior' && <TibialisA />}
                            {selectedOption === 'Tibialis Posterior' && <TibialisP />}
                            {selectedOption === 'Flexor Digitorum Longus' && <FlxDigitorumL />}
                            {selectedOption === 'Flexor Hallucis Longus' && <FlxHallucisL />}
                            {selectedOption === 'Flexor Digitorum Brevis' && <FlxDigitorumB />}
                            {selectedOption === 'Flexor Hallucis Brevis' && <FlxHallucisB />}
                            {selectedOption === 'Abductor Digiti Minimi Pedis' && <AbdDigitiM />}
                            {selectedOption === 'Extensor Digitorum Longus' && <ExtDigitorumL />}
                            {selectedOption === 'Extensor Hallucis Longus' && <ExtHallucisL />}
                            {selectedOption === 'Peroneus Tertius' && <PeroneusT />}
                            {selectedOption === 'Peroneus Longus' && <PeroneusL />}
                            {selectedOption === 'Peroneus Brevis' && <PeroneusB />}
                            {selectedOption === 'Extensor Digitorum Brevis' && <ExtDigitorumB />}
                            {selectedOption === 'Popliteus' && <Popliteus />}
                            {selectedOption === 'Abductor Hallucis' && <AbdHallucis />}

                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuBotonesMg;
