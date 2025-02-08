import { ReportContext } from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas';
import SimpleMultiStepForm from './MenuBotones';
import './Style.css';

const DropArea = () => {
    const [droppedItems, setDroppedItems] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/html');
        if (data) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const element = doc.body.firstChild;
        if (element) {
            setDroppedItems([
            ...droppedItems,
            { id: Date.now(), content: element.outerHTML, x: 0, y: 0 }
            ]);
        }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const updatePosition = (id, x, y) => {
        setDroppedItems((items) =>
        items.map((item) =>
            item.id === id ? { ...item, x, y } : item
        )
        );
    };

    return (
        <div
        className="dropArea"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
            //border: '2px dashed #ccc',
            //position: 'relative'
        }}
        >
        {droppedItems.length === 0 ? (
            <p></p>
        ) : (
            droppedItems.map((item) => (
            <Rnd
                key={item.id}
                default={{
                x: item.x,
                y: item.y,
                width: 200,
                height: 200
                }}
                onDragStop={(e, d) => updatePosition(item.id, d.x, d.y)}
                style={{ position: 'absolute' }}
            >
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </Rnd>
            ))
        )}
        </div>
    );
    };

    const Reporte = () => {
    
    // Carga datos de usuario
    const { data: session, status } = useSession();
    const { name, lastname, cedula, especialidad } = session?.user || {};  const { conclusions } = useContext(ReportContext)

    const [copyConclusions, setCopyConclusions] = useState('')  // Estado para la caja de conclusiones
    const [isPageVisible, setPageVisibility] = useState(true) // Estado para la visibilidad de la pagina
    const [selectedImages, setSelectedImages] = useState([]); // Estado para las imagenes seleccionadas
    // Estados para el historial de imagenes
    const [history, setHistory] = useState([]); 
    const [Future,setFuture] = useState([]); 

    // Actualizar las conclusiones
    useEffect(() => {
        setCopyConclusions(conclusions.map(cl => cl.title).join(''))
    }, [conclusions])

    // Funcion para el arrastre de imagenes
    

    //funcion que agreaga comas y conjunciones a las conclusiones
    function formatConclusions(copyConclusions) {
        const keywords2 = ["POSTGANGLIONAR PACIAL A NIVEL DE TROCO"];
        const keywords3 = ["POSTGANGLIONAR PARCIAL A NIVEL DE CORDON"];
        const keywords4 = ["ASIMÉTRICA PROXIMAL.", "ASIMÉTRICA DISTAL.", "ASIMÉTRICA SEGMENTARIA.", "ASIMÉTRICA GENERALIZADA.", "SIMÉTRICA PROXIMAL.", "SIMÉTRICA DISTAL.", "SIMÉTRICA SEGMENTARIA.", "SIMÉTRICA GENERALIZADA.", "MULTIFOCAL PROXIMAL.", "MULTIFOCAL DISTAL.", "MULTIFOCAL SEGMENTARIA.", "MULTIFOCAL GENERALIZADA."];
        const keywords5 = ["PROXIMAL", "DISTAL", "SEGMENTARIA", "GENERALIZADA"]; // Nueva condición específica
        const keywords6 = ["FIBRAS MIXTAS"]; // Nueva condición específica
        const keywords = ["C5", "C6", "C7", "C8", "T1", "SUPERIOR", "MEDIO", "INFERIOR", "LATERAL", "POSTERIOR", "MEDIAL"];
        const specificKeywords = ["C5", "C6", "C7", "C8", "T1"]; // Nueva condición específica
        let words = copyConclusions.split(' ');
    
        // Verificar la palabra clave específica en keywords2 (TROCO)
        for (let i = 0; i < words.length; i++) {
            if (keywords2.includes(words.slice(i, i + 6).join(' '))) {
                let countAfterKeyword = 0;
                for (let j = i + 6; j < words.length; j++) {
                    if (keywords.includes(words[j])) {
                        countAfterKeyword++;
                    }
                }
    
                if (countAfterKeyword > 1) {
                    words[i + 5] += 'S'; // Agregar 'S' al final de 'TROCO' si hay más de dos palabras
                }
    
                break; // Salir del bucle una vez que se ha encontrado y procesado la palabra clave
            }
        }
    
        // Verificar la palabra clave específica en keywords3 (CORDON)
        for (let i = 0; i < words.length; i++) {
            if (keywords3.includes(words.slice(i, i + 6).join(' '))) {
                let countAfterKeyword = 0;
                for (let j = i + 6; j < words.length; j++) {
                    if (keywords.includes(words[j])) {
                        countAfterKeyword++;
                    }
                }
    
                if (countAfterKeyword > 1) {
                    words[i + 5] += 'ES'; // Agregar 'ES' al final de 'CORDON' si hay más de dos palabras
                }
    
                break; // Salir del bucle una vez que se ha encontrado y procesado la palabra clave
            }
        }
    
        // Verificar las palabras clave específicas en keywords4 (INTENSIDAD) y agregar doble salto de línea
        for (let i = 0; i < words.length; i++) {
            if (keywords4.includes(words.slice(i, i + 2).join(' '))) { // Comparar con las palabras clave de 2 palabras
                words[i + 1] += '\n\n'; // Agregar doble salto de línea después de la palabra clave
            }
        }
    
        // Nueva condición para "PREGANGLIONAR PARCIAL"
        let firstKeywordIndex = words.findIndex(word => specificKeywords.includes(word));
        if (firstKeywordIndex !== -1) {
            words.splice(firstKeywordIndex, 0, "PREGANGLIONAR PARCIAL A NIVEL DE");
        }
    
        // Verificar y formatear las palabras clave generales (C5, C6, T1, etc.)
        let keywordPositions = [];
        for (let i = 0; i < words.length; i++) {
            if (keywords.includes(words[i])) {
                keywordPositions.push(i);
            }
        }
    
        if (keywordPositions.length > 1) {
            // Formatear las palabras clave con comas, excepto antes de la conjunción
            for (let i = 0; i < keywordPositions.length - 2; i++) {
                words[keywordPositions[i]] += ',';
            }
    
            // Verificar si la última palabra clave empieza con "I"
            let lastKeywordIndex = keywordPositions[keywordPositions.length - 1];
            let conjunction = 'Y';
    
            if (words[lastKeywordIndex][0].toUpperCase() === 'I') {
                conjunction = 'E';
            }
    
            // Insertar la conjunción antes de la última palabra clave
            words.splice(lastKeywordIndex, 0, conjunction);
        }
    
        // Verificar las palabras clave específicas en keywords5 y agregar punto y doble salto de línea
        for (let i = 0; i < words.length; i++) {
            if (keywords5.includes(words.slice(i, i + 1).join(''))) { // Comparar con las palabras clave de 1 palabra
                words[i] = words[i].trim() + '.'; // Agregar punto y doble salto de línea después de la palabra clave y eliminar espacio en blanco
            }
        }
    
        // Verificar la palabra clave específica en keywords6 (FIBRAS MIXTAS)
        for (let i = 0; i < words.length; i++) {
            if (keywords6.includes(words.slice(i, i + 2).join(' '))) {
                if (!words.slice(i, i + 5).join(' ').includes("PREDOMINIO SENSITIVO") && !words.slice(i, i + 5).join(' ').includes("PREDOMINIO MOTOR")) {
                    words[i + 1] += ','; // Agregar coma al final de 'MIXTAS' si no contiene 'PREDOMINIO SENSITIVO' o 'PREDOMINIO MOTOR'
                }
            }
        }
    
        // Unir las palabras con espacios
        let formattedConclusions = words.join(' ');
    
        // Eliminar espacio en blanco antes de la palabra 'REINERVACIÓN'
        formattedConclusions = formattedConclusions.replace(/\sREINERVACIÓN/g, 'REINERVACIÓN');
    
        return formattedConclusions;
    }
    
    
    const formattedConclusions = formatConclusions(copyConclusions);

    // Para mantener constante la conclusione
    const handleTextareaChange = (event) => {
        setCopyConclusions(event.target.value)
    }

    // Funciones para el historial de imagenes, en caso de usar Undo te regresa a la imagen anterior
    const handleImageChange = useCallback((event) => {
        if (event.target.files && event.target.files[0]) {
        setHistory((prevHistory) => [...prevHistory, selectedImages]);
        setSelectedImages((prevImages) => [...prevImages, { 
            src: URL.createObjectURL(event.target.files[0]), 
            position: { x: Math.random() * 200, y: Math.random() * 200 }, 
            size: { width: 200, height: 200 } 
        }]);
        setFuture([]);
        }
    }, [selectedImages]);
    
    const handleUndo = useCallback(() => {
        if (history.length > 0) {
        setFuture((prevFuture) => [selectedImages, ...prevFuture]);
        setSelectedImages(history[history.length - 1]);
        setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
        }
    }, [history, selectedImages]);
    
    // Funciones para el arrastre y redimension de las imagenes
    const handleDragStop = useCallback((index, e, d) => {
        setSelectedImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index].position = { x: d.x, y: d.y };
        return newImages;
        });
    }, []);
    
    const handleResizeStop = useCallback((index, e, direction, ref, delta, position) => {
        setSelectedImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index].size = { width: ref.style.width, height: ref.style.height };
        return newImages;
        });
    }, []);

    useEffect(() => {
        const newConclusions = conclusions.map(cl => cl.title).join('');
        const formattedConclusions = formatConclusions(newConclusions);
        setCopyConclusions(formattedConclusions);
    }, [conclusions]);


    // Codigo para imprimir en click
    useEffect(() => {
    const printButton = document.getElementById('print');
    const handlePrint = () => {
        window.print();
    };

    printButton.addEventListener('click', handlePrint);

    return () => {
        printButton.removeEventListener('click', handlePrint);
    };
    }, []); 



    return (
        <div >
        {/* Clase que encapzula la información y el titulo de la pagina 
        <div className='head'>
            <div className='report-container dont-print'>
                <h1 className='title'>Polineuropatia</h1>
            </div>
            </div>
        */}
        {/* Wrapper que encapsula la image, conclusión y lista de botones */}
        <div className="wrapper">
            {/* Componente de la caja de conclusión junto con la caja de notas */}
            {/* Se especifica dont-print para no ser incluidos en la vista de impresión */}
            <div className='vertical-orientation dont-print'>
            {/* Lista de botones */}
            <div className='button-bar'>
            <button 
                id='unhide' 
                className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`} 
                onClick={() => {
                setPageVisibility(true);
                setSelectedImages([]);
                }}
            >
            <img src="/I_Out.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
            </button>
            <button id='print' className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}>
            <img src="/I_Print.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
            </button>
            
            <button onClick={handleUndo} className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}>
            <img src="/I_Repeat.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
            </button>
            <label htmlFor="file-upload" className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}>
            <img src="/I_Folder.svg" alt="Subir" style={{filter: 'invert(1)'}} />
            </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`dont-print ${isPageVisible ? 'hidden' : 'visible'}`} style={{display: 'none'}}/>          </div>

            <div className={'vertical-container dont-print'}>
            <div className={`dont-print ${isPageVisible ? 'visible' : 'hidden'}`}>
            
                {/*
            <ConclusionBox />
                */}
            </div>

    {/* Menu de opciones */}

            <div className={`mx-4 dont-print ${isPageVisible ? '' : 'hidden'}`}>
                <SimpleMultiStepForm showStepNumber={true}/>
            </div>
            
            
            </div>
            </div>
            {/* Componente que contiene las imagenes y sus valores que se utilizaran */}
            <div>
            <div className='con-img'> 
            
            {/* Codigo para desplegar las imagenes dentro de un array */}
            {selectedImages.map((image, index) => (
            <Rnd
                className="rnd-image"
                key={index}
                size={image.size}
                position={image.position}
                onDragStop={(e, d) => handleDragStop(index, e, d)}
                onResizeStop={(e, direction, ref, delta, position) => handleResizeStop(index, e, direction, ref, delta, position)}
                lockAspectRatio={true}
                style={{ zIndex: 2 }} 

            >
                <img src={image.src} draggable="false" />
            </Rnd>
            ))}

            {/* Despliego de las imagenes dentro del array */}
            <div className='conclusion-container'>
            <ConclusionCanvas 
            
            img={{
                src: '/assets/PolineuropatiaIMG/BP_Polineuropatia.png',
                alt: 'Modelo',
                useMap: '#image-map',
                width: isPageVisible ? '600' : '800',
                height: isPageVisible ? '600' : '800'
            }}
            
            rules={[
                {
                expectedValue: 'proximal',
                image: {
                    src: 'PolineuropatiaIMG/PO_Proximal.png',
                    alt: 'Modelo',
                }
                },
                {
                expectedValue: 'aximal2',
                image: {
                    src: 'PolineuropatiaIMG/PO2_Aximal.png',
                    alt: 'Modelo',
                }
                },
                {
                expectedValue: 'desmielinizante2',
                image: {
                    src: 'PolineuropatiaIMG/PO2_Desmielinizante.png',
                    alt: 'Modelo',
                }
                },
                {
                expectedValue: 'aximal',
                image: {
                    src: 'PolineuropatiaIMG/PO_Aximal.png',
                    alt: 'Modelo',
                }
                },
                {
                expectedValue: 'desmielinizante',
                image: {
                    src: 'PolineuropatiaIMG/PO_Desmielinizante.png',
                    alt: 'Modelo',
                }
                },
                {
                expectedValue: 'distal',
                image: {
                    src: 'PolineuropatiaIMG/PO_Distal.png',
                    alt: 'Modelo',
                }
                },
                {
                expectedValue: 'sensitiva',
                image: {
                    src: 'PolineuropatiaIMG/PO_Sensitivo.png',
                    alt: 'Modelo',
                }
                },
                {
                expectedValue: 'motora',
                image: {
                    src: 'PolineuropatiaIMG/PO_Motor.png',
                    alt: 'Modelo',
                }
                },
                {
                expectedValue: 'mixta',
                image: {
                    src: 'PolineuropatiaIMG/PO_Sensitivo-Motor.png',
                    alt: 'Modelo',
                }
                },
            ]}
            /><div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}>
            <textarea
            value={copyConclusions}
            onChange={handleTextareaChange}
            />
        </div>
        <div><DropArea /> </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Reporte