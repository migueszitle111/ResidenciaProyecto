import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './style2.css';


const MedianoSt = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxMs');

    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const images = [
        {
            original: "/assets/ValoresImg/02_01-2 Indice o Medio (5116) V2.png",
            thumbnail: "/assets/ValoresImg/02_01-2 Indice o Medio (5116) V2.png",
            
        },
        {
            original: "/assets/ValoresImg/02_02  Indice o Medio 2 (5116) V2.png",
            thumbnail: "/assets/ValoresImg/02_02  Indice o Medio 2 (5116) V2.png"
        },
        {
            original: "/assets/ValoresImg/02_03-3 Indice o Medio 3 (5124).png",
            thumbnail: "/assets/ValoresImg/02_03-3 Indice o Medio 3 (5124).png"
        },
        {
            original: "/assets/ValoresImg/02_04-2 Dedos 1-4 (4934).png",
            thumbnail: "/assets/ValoresImg/02_04-2 Dedos 1-4 (4934).png"
        },
        {
            original: "/assets/ValoresImg/02_05-2 Sindrome Tunel de Carpo (5115).png",
            thumbnail: "/assets/ValoresImg/02_05-2 Sindrome Tunel de Carpo (5115).png"
        },
        {
            original: "/assets/ValoresImg/02_06-2 Sindrome Tunel de Carpo 2 (5115) V2.png",
            thumbnail: "/assets/ValoresImg/02_06-2 Sindrome Tunel de Carpo 2 (5115) V2.png"
        },
        {
            original: "/assets/ValoresImg/02_07-2 Base Sindrome Tunel de Carpo 3 (5115) V3.png",
            thumbnail: "/assets/ValoresImg/02_07-2 Base Sindrome Tunel de Carpo 3 (5115) V3.png"
        },
        {
            original: "/assets/ValoresImg/02_08-2 Base Inching (4941) V2.png",
            thumbnail: "/assets/ValoresImg/02_08-2 Base Inching (4941) V2.png"
        },
    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
    };

    const handleButtonClick = (content, position, customClass = 'text-boxMs') => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTextBoxClass(customClass);
            setTextBoxVisible(true);
        }
    };

    const haandleImageBoxClick = (image, position) => {
        if (imageBoxVisible && imageBoxContent === image) {
            setImageBoxVisible(false);
        } else {
            setImageBoxContent(image);
            setImageBoxPosition(position);
            setImageBoxVisible(true);
        }
    };

    // Funciones para abrir y cerrar el modal
    const openModal = (image) => {
        setExtraImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setExtraImage('');
    }



    return (
        
        <div  className=" py-20 gallery-container">
        <ImageGallery items={images}
            onSlide={handleSlide}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={false}
            showNav={false}
            showThumbnails={true}
            thumbnailPosition="bottom"
            bulletclass="bullet"
        />
        <div>
            {/* Primera Imagen */}
                {currentImageIndex === 0 && <button className="btn1" onClick={() => handleButtonClick('DEDO ÍNDICE O MEDIO - Ligeramente distal a la articulación metacarpofalángica, evitando los pliegues cutáneos que restaran amplitud.', {  top: '65%', left: '24%' })}>A</button>}
                {currentImageIndex === 0 && <button className="btn2" onClick={() => handleButtonClick('Dorso de la mano.', { top: '65%', left: '24%'})}>T</button>}
                {currentImageIndex === 0 && <button className="btn3" onClick={() => handleButtonClick('3-4 cm del electrodo de registo, discretamente distal a articulación interfalángica distal.', { top: '65%', left: '24%'})}>R</button>}
                {currentImageIndex === 0 && <button className="btn4" onClick={() => handleButtonClick('MUÑECA. 14 cm distal al electrodo de registro, entre los tendones palmar mayor y palmar menor.', { top: '65%', left: '24%'})}>E</button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/Mediano-Dedo.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/01-MedianoSt-T.png",{ top: '2%', left: '2%' })}></button>}
            {/* Segunda Imagen */}
                {currentImageIndex === 1 && <button className="btn5" onClick={() => handleButtonClick('DEDO ÍNDICE O MEDIO - Ligeramente distal a la articulación metacarpofalángica, evitando los pliegues cutáneos que restaran amplitud.', { top: '65%', left: '24%' })}>A</button>}
                {currentImageIndex === 1 && <button className="btn6" onClick={() => handleButtonClick('Dorso de la mano', { top: '65%', left: '24%' })}>T</button>}
                {currentImageIndex === 1 && <button className="btn7" onClick={() => handleButtonClick('MUÑECA. 14 cm proximal del electrodo de registro, entre los tendones palmar mayor y palmar menor.', { top: '65%', left: '24%' })}>E</button>}
                {currentImageIndex === 1 && <button className="btn8" onClick={() => handleButtonClick('3-4 cm del electrodo de registo, discretamente distal a articulación interfalángica distal.', { top: '65%', left: '24%' })}>R</button>}
                {currentImageIndex === 1 && <button className="btn9" onClick={() => handleButtonClick('MEDIA PALMA. 7 cm distal al punto de la muñeca hasta la palma, entre los dedos índice y medio.', { top: '65%', left: '24%' })}>E</button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/01-MedianoSt-G.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/01-MedianoSt-T.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Tercera Imagen */}
                {currentImageIndex === 2 && <button className="btn10" onClick={() => handleButtonClick('DEDO ÍNDICE O MEDIO - Ligeramente distal a la articulación metacarpofalángica, evitando los pliegues cutáneos que restaran amplitud.', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btn11" onClick={() => handleButtonClick('Dorso de la mano.', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btn12" onClick={() => handleButtonClick('CODO. Fosa antecubital, solo medial al pulso de la arteria braquial.', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btn13" onClick={() => handleButtonClick('3-4 cm del electrodo de registo, discretamente distal a articulación interfalángica distal.', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btn14" onClick={() => handleButtonClick('MUÑECA. 14 cm proximal del electrodo de registro, entre los tendones palmar mayor y palmar menor.', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btn15" onClick={() => handleButtonClick('Media palma. 7 cm distal al punto de la muñeca hasta la palma, entre los dedos índice y medio..', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/02-MedianoSt-G.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 2 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/01-MedianoSt-T.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Cuarta Imagen */}
                {currentImageIndex === 3 && <button className="btn16" onClick={() => handleButtonClick('3-4 cm distal.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn17" onClick={() => handleButtonClick('DEDO IV - Ligeramente distal a la articulación metacarpofalángica.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn18" onClick={() => handleButtonClick('Referencia 3-4 cm distal.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn19" onClick={() => handleButtonClick('DEDO III - Ligeramente distal a la articulación metacarpofalángica.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn20" onClick={() => handleButtonClick('3-4 cm distal.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn21" onClick={() => handleButtonClick('DEDO II - Ligeramente distal a la articulación metacarpofalángica.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn22" onClick={() => handleButtonClick('3-4 cm distal.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn23" onClick={() => handleButtonClick('DEDO I - Ligeramente distal a la articulación metacarpofalángica.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn24" onClick={() => handleButtonClick('Dorso de la mano.', { top: '65%', left: '64%' })}></button>}
                {currentImageIndex === 3 && <button className="btn25" onClick={() => handleButtonClick('MUÑECA. 14 cm con dirección proximal desde los electrodos activos tomando como referencia punto medio entre tendones palmar mayor y palmar menor.', { top: '60%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/03-MedianoSt-G.png",{ top: '2%', left: '2%' })}></button>}
            {/* Quinta Imagen */}
                {currentImageIndex === 4 && <button className="btn26" onClick={() => handleButtonClick('Dorso de la mano.', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btn27" onClick={() => handleButtonClick('NERVIO MEDIANO - (antidrómica) entre tendones de los palmares mayor/menor a 10 cm en dirección proximal del electrodo de registro.', { top: '62%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btn28" onClick={() => handleButtonClick('NERVIO RADIAL - (antidromica) borde lateral del radio a 10 cm en dirección proximal del electrodo de registro.', { top: '62%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btn29" onClick={() => handleButtonClick('DEDO PULGAR (THUMBDIFF) - Diferencia de latencia sensorial MEDIANO-RADIAL con registro en el primer dedo.', { top: '62%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btn30" onClick={() => handleButtonClick('ACTIVO, ligeramente distal a la articulación metacarpofalángica REFERENCIA, 3-4 cm distal.', { top: '62%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/04-MedianoSt-G.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 4 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/02-MedianoSt-T.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Sexta Imagen */}
                {currentImageIndex === 5 && <button className="btn31" onClick={() => handleButtonClick('Dorso de la mano o antebrazo.', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btn32" onClick={() => handleButtonClick('NERVIO CUBITAL - (antidromica) A través de la muñeca 14 cm proximal del electrodo activo, medial al tendón cubital anterior.', { top: '62%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btn33" onClick={() => handleButtonClick('NERVIO MEDIANO - (antidromica) A través de la muñeca 14 cm proximal del electrodo activo, entre los tendones de los palmares mayor/menor.', { top: '62%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btn34" onClick={() => handleButtonClick('DEDO ANULAR (RINGDIFF) - Diferencia de latencia sensorial MEDIANO-CUBITAL con registro en el IV dedo.', { top: '62%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btn35" onClick={() => handleButtonClick('ACTIVO, ligeramente distal a la articulación metacarpofalángica REFERENCIA, 3-4 cm distal.', { top: '62%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/05-MedianoSt-G.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 5 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/02-MedianoSt-T.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Septima Imagen */}
                {currentImageIndex === 6 && <button className="btn36" onClick={() => handleButtonClick('Dorso de la mano.', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn37" onClick={() => handleButtonClick('Diferencia de latencia de nervios mixtos en la palma de la mano (PALMDIFF) NERVIO CUBITAL.', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn38" onClick={() => handleButtonClick('Diferencia de latencia de nervios mixtos en la palma de la mano (PALMDIFF) NERVIO MEDIANO.', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn39" onClick={() => handleButtonClick('ACTIVO, discretamente proximal al pliegue de la muñeca, existiendo una distancia de 8 cm en relación al punto de estimulación, REFERENCIA 3 cm proximal.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn40" onClick={() => handleButtonClick('ACTIVO, discretamente proximal al pliegue de la muñeca, existiendo una distancia de 8 cm en relación al punto de estimulación, REFERENCIA 3 cm proximal.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn41" onClick={() => handleButtonClick('NERVIO CUBITAL - (ortodrómico) Media palma en el espacio interdigital IV-V.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn42" onClick={() => handleButtonClick('NERVIO MEDIANO - (ortodrómico) Media palma en el espacio interdigital III-IV.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/06-MedianoSt-G.png",{ top: '2%', left: '2%' })}></button>}
                {/* {currentImageIndex === 6 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Indice-Sensorial-T.png",{ top: '2%', left: '2%' })}></button>} */}
                {currentImageIndex === 6 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/02-MedianoSt-T.png",{ top: '2%', left: '2%' })}></button>}
            
            {/* Octava Imagen */}
                {currentImageIndex === 7 && <button className="btn43" onClick={() => handleButtonClick('Dorso de la mano.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 7 && <button className="btn44" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo discretamente distal de articulación interfalangica distal.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 7 && <button className="btn45" onClick={() => handleButtonClick('DEDO MEDIO O ÍNDICE - Ligeramente distal a la articulación metacarpofalángica, evitando colocar electrodo sobre pliegue cutáneo.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 7 && <button className="btn46" onClick={() => handleButtonClick('MUÑECA. Comienza 2 o 3 cm proximal al pliegue de la muñeca (+2) y continua segmentaria y progresivamente con incrementos de 1 cm, hasta 6 cm distales (-5) al pliegue cutáneo del carpo catalogado como punto 0.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 7 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/07-MedianoSt-G.png",{ top: '2%', left: '2%' })}></button>}
                {/* {currentImageIndex === 7 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/Rastreo-T.png",{ top: '2%', left: '2%' })}></button>} */}
                {currentImageIndex === 7 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/03-MedianoSt-T.png",{ top: '2%', left: '2%' })}></button>}
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxMs ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
                <div
                    className="image-boxM"
                    style={{
                        top: imageBoxPosition.top,
                        left: imageBoxPosition.left,
                        position: 'absolute',
                    }}
                >
                    <img
                        src={imageBoxContent}
                        alt="Cuadro dinámico"
                        style={{
                            position: 'absolute',
                            maxWidth: '25vw',
                            maxHeight: '20vh',
                            transition: 'transform 0.3s ease',
                        }}
                        className="zoomable-image"
                    />
                </div>
            )}

            {modalVisible && (
                <div className="modal-gallery">
                <button className={`print-button`} onClick={closeModal}>
                    <img src="/I_X.webp" style={{filter: 'invert(1)'}}/>
                </button>
                <img src={extraImage} alt="Imagen Extra" className="modal-image" />
            </div>
            )}
        </div>
    );
};
export default MedianoSt