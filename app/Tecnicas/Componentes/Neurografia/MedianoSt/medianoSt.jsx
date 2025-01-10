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

    const handleImageBoxClick = (image, position) => {
        if (imageBoxVisible && imageBoxContent === image) {
            setImageBoxVisible(false);
        } else {
            setImageBoxContent(image);
            setImageBoxPosition(position);
            setImageBoxVisible(true);
        }
    };



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
                {currentImageIndex === 0 && <button className="btn1" onClick={() => handleButtonClick('Dedo índice... Ligeramente distal a articulación metacarpofalángica, evitando colocar electrodo sobre el pliegue cutáneo.', {  top: '65%', left: '24%' })}>A</button>}
                {currentImageIndex === 0 && <button className="btn2" onClick={() => handleButtonClick('Dorso de la mano.', { top: '65%', left: '24%'})}>T</button>}
                {currentImageIndex === 0 && <button className="btn3" onClick={() => handleButtonClick('3-4 cm del electrodo de registo, discretamente distal a articulación interfalángica distal.', { top: '65%', left: '24%'})}>R</button>}
                {currentImageIndex === 0 && <button className="btn4" onClick={() => handleButtonClick('Muñeca: 14 cm distal al electrodo de registro, entre los tendones palmar mayor y palmar menor.', { top: '65%', left: '24%'})}>E</button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Mediano-DedoG.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/Mediano-Dedo.png",{ top: '2%', left: '2%' })}></button>}
            {/* Segunda Imagen */}
                {currentImageIndex === 1 && <button className="btn5" onClick={() => handleButtonClick('Ligeramente distal a articulación metacarpofalángica, evitando colocar electrodo sobre el pliegue cutáneo.', { top: '65%', left: '24%' })}>A</button>}
                {currentImageIndex === 1 && <button className="btn6" onClick={() => handleButtonClick('Dorso de la mano.', { top: '65%', left: '24%' })}>T</button>}
                {currentImageIndex === 1 && <button className="btn7" onClick={() => handleButtonClick('Muñeca: 14 cm distal al electrodo de registro, entre los tendones palmar mayor y palmar menor.', { top: '65%', left: '24%' })}>E</button>}
                {currentImageIndex === 1 && <button className="btn8" onClick={() => handleButtonClick('3-4 cm del electrodo de registo, discretamente distal a articulación interfalángica distal.', { top: '65%', left: '24%' })}>R</button>}
                {currentImageIndex === 1 && <button className="btn9" onClick={() => handleButtonClick('Media palma: 7 cm distal al punto de la muñeca en una línea dibujada hasta la palma, entre los dedos índice y medio.', { top: '65%', left: '24%' })}>E</button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Nervio-Mediano.png",{ top: '2%', left: '2%' })}></button>}
            {/* Tercera Imagen */}
                {currentImageIndex === 2 && <button className="btn10" onClick={() => handleButtonClick('Ligeramente distal a articulación metacarpofalángica, evitando colocar electrodo sobre el pliegue cutáneo.', { top: '62%', left: '48%' })}>A</button>}
                {currentImageIndex === 2 && <button className="btn11" onClick={() => handleButtonClick('Dorso de la mano.', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btn12" onClick={() => handleButtonClick('Codo: Fosa antecubital, poco común realizar estimulación proximal para registros sensitivos (no solo para este nervio) debido a la presencia de dispersión temporal y baja fiabilidad por cancelación de fase, pero opcional para el cálculo de velocidad de conducción proximal.', { top: '57%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btn13" onClick={() => handleButtonClick('3-4 cm del electrodo de registo, discretamente distal a articulación interfalángica distal.', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btn14" onClick={() => handleButtonClick('Muñeca: 14 cm distal al electrodo de registro, entre los tendones palmar mayor y palmar menor.', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btn15" onClick={() => handleButtonClick('Media palma: 7 cm distal al punto de la muñeca en una línea dibujada hasta la palma, entre los dedos índice y medio.', { top: '62%', left: '48%' })}></button>}
                {currentImageIndex === 2 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Nervio-Mediano-3.png",{ top: '2%', left: '2%' })}></button>}
            {/* Cuarta Imagen */}
                {currentImageIndex === 3 && <button className="btn16" onClick={() => handleButtonClick('Dedos I, II, III y IV. Al igual que en la técnica convencional, los electrodos activos son colocados ligeramente distal a la articulación metacarpofalángica con su referencia 3-4 cm más distal o discretamente proximal a la articulación; la utilidad de electrodos de barra es reconocida debido a la distancia ideal prestablecida, pero siempre recomendable la utilización de electrodos de anillo ya que presentan una mayor superficie de captación en fibras superficiales cutáneas.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn17" onClick={() => handleButtonClick('Dedos I, II, III y IV. Al igual que en la técnica convencional, los electrodos activos son colocados ligeramente distal a la articulación metacarpofalángica con su referencia 3-4 cm más distal o discretamente proximal a la articulación; la utilidad de electrodos de barra es reconocida debido a la distancia ideal prestablecida, pero siempre recomendable la utilización de electrodos de anillo ya que presentan una mayor superficie de captación en fibras superficiales cutáneas.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn18" onClick={() => handleButtonClick('Dedos I, II, III y IV. Al igual que en la técnica convencional, los electrodos activos son colocados ligeramente distal a la articulación metacarpofalángica con su referencia 3-4 cm más distal o discretamente proximal a la articulación; la utilidad de electrodos de barra es reconocida debido a la distancia ideal prestablecida, pero siempre recomendable la utilización de electrodos de anillo ya que presentan una mayor superficie de captación en fibras superficiales cutáneas.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn19" onClick={() => handleButtonClick('Dedos I, II, III y IV. Al igual que en la técnica convencional, los electrodos activos son colocados ligeramente distal a la articulación metacarpofalángica con su referencia 3-4 cm más distal o discretamente proximal a la articulación; la utilidad de electrodos de barra es reconocida debido a la distancia ideal prestablecida, pero siempre recomendable la utilización de electrodos de anillo ya que presentan una mayor superficie de captación en fibras superficiales cutáneas.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn20" onClick={() => handleButtonClick('Dedos I, II, III y IV. Al igual que en la técnica convencional, los electrodos activos son colocados ligeramente distal a la articulación metacarpofalángica con su referencia 3-4 cm más distal o discretamente proximal a la articulación; la utilidad de electrodos de barra es reconocida debido a la distancia ideal prestablecida, pero siempre recomendable la utilización de electrodos de anillo ya que presentan una mayor superficie de captación en fibras superficiales cutáneas.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn21" onClick={() => handleButtonClick('Dedos I, II, III y IV. Al igual que en la técnica convencional, los electrodos activos son colocados ligeramente distal a la articulación metacarpofalángica con su referencia 3-4 cm más distal o discretamente proximal a la articulación; la utilidad de electrodos de barra es reconocida debido a la distancia ideal prestablecida, pero siempre recomendable la utilización de electrodos de anillo ya que presentan una mayor superficie de captación en fibras superficiales cutáneas.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn22" onClick={() => handleButtonClick('Dedos I, II, III y IV. Al igual que en la técnica convencional, los electrodos activos son colocados ligeramente distal a la articulación metacarpofalángica con su referencia 3-4 cm más distal o discretamente proximal a la articulación; la utilidad de electrodos de barra es reconocida debido a la distancia ideal prestablecida, pero siempre recomendable la utilización de electrodos de anillo ya que presentan una mayor superficie de captación en fibras superficiales cutáneas.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn23" onClick={() => handleButtonClick('Dedos I, II, III y IV. Al igual que en la técnica convencional, los electrodos activos son colocados ligeramente distal a la articulación metacarpofalángica con su referencia 3-4 cm más distal o discretamente proximal a la articulación; la utilidad de electrodos de barra es reconocida debido a la distancia ideal prestablecida, pero siempre recomendable la utilización de electrodos de anillo ya que presentan una mayor superficie de captación en fibras superficiales cutáneas.', { top: '62%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btn24" onClick={() => handleButtonClick('Dorso de la mano.', { top: '65%', left: '64%' })}></button>}
                {currentImageIndex === 3 && <button className="btn25" onClick={() => handleButtonClick('14 cm con dirección proximal a la muñeca desde los electrodos activos (pudiendo tomar como permanente la distancia desde el índice), tomando como referencia punto medio entre tendones palmar mayor y palmar menor. La posibilidad de utilizar 4 canales de registro al unísono para un único estimulo, es posible con equipos de electromiografía que cuenten con al menos 4 canales libres, sin embargo, consideramos que un protocolo creado para realizar un registro a la vez es mayoritariamente reproducible y tolerable en estimulación eléctrica submáxima.', { top: '60%', left: '65%' }, 'custom-text-box')}></button>}
                {currentImageIndex === 3 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Mapeo-Sensorial.png",{ top: '2%', left: '2%' })}></button>}
            {/* Quinta Imagen */}
                {currentImageIndex === 4 && <button className="btn26" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btn27" onClick={() => handleButtonClick('Diferencia de latencia sensorial MEDIANO-RADIAL con registro en el primer dedo (pulgar THUMBDIFF)', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btn28" onClick={() => handleButtonClick('Diferencia de latencia sensorial MEDIANO-RADIAL con registro en el primer dedo (pulgar THUMBDIFF)', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 4 && <button className="btn29" onClick={() => handleButtonClick('La estimulación se realiza de forma antidrómica a través de la muñeca sobre los nervios Mediano entre tendones del palmar mayor y menor; y Radial en el borde lateral radial, respectivamente a 10 cm en dirección proximal del electrodo de registro (obsérvese el PANS doble con un tercer estimulo entre ambos nervios “BACTRIAN”).', { top: '55%', left: '74%' })}></button>}
                {currentImageIndex === 4 && <button className="btn30" onClick={() => handleButtonClick('La estimulación se realiza de forma antidrómica a través de la muñeca sobre los nervios Mediano entre tendones del palmar mayor y menor; y Radial en el borde lateral radial, respectivamente a 10 cm en dirección proximal del electrodo de registro (obsérvese el PANS doble con un tercer estimulo entre ambos nervios “BACTRIAN”).', { top: '55%', left: '74%' })}></button>}
                {currentImageIndex === 4 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Thumbdiff.png",{ top: '2%', left: '2%' })}></button>}
            {/* Sexta Imagen */}
                {currentImageIndex === 5 && <button className="btn31" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btn32" onClick={() => handleButtonClick('La estimulación se realiza de forma antidrómica a través de la muñeca sobre los nervios Mediano entre tendones del palmar mayor y menor; y Cubital medial al tendón cubital anterior, respectivamente a 14 cm en dirección proximal del electrodo de registro.', { top: '59%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btn33" onClick={() => handleButtonClick('La estimulación se realiza de forma antidrómica a través de la muñeca sobre los nervios Mediano entre tendones del palmar mayor y menor; y Cubital medial al tendón cubital anterior, respectivamente a 14 cm en dirección proximal del electrodo de registro.', { top: '59%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btn34" onClick={() => handleButtonClick('Diferencia de latencia sensorial MEDIANO-CUBITAL con registro en el IV dedo (anular RINGDIFF)', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btn35" onClick={() => handleButtonClick('Diferencia de latencia sensorial MEDIANO-CUBITAL con registro en el IV dedo (anular RINGDIFF)', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 5 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Ringdiff.png",{ top: '2%', left: '2%' })}></button>}
            {/* Septima Imagen */}
                {currentImageIndex === 6 && <button className="btn36" onClick={() => handleButtonClick('Texto desde el boton 1', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn37" onClick={() => handleButtonClick('Diferencia de latencia de nervios mixtos en la palma de la mano MEDIANO-CUBITAL (PALMDIFF). ', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn38" onClick={() => handleButtonClick('Diferencia de latencia de nervios mixtos en la palma de la mano MEDIANO-CUBITAL (PALMDIFF).  ', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn39" onClick={() => handleButtonClick('Diferencia de latencia de nervios mixtos en la palma de la mano MEDIANO-CUBITAL (PALMDIFF).   ', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn40" onClick={() => handleButtonClick('Diferencia de latencia de nervios mixtos en la palma de la mano MEDIANO-CUBITAL (PALMDIFF).    ', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn41" onClick={() => handleButtonClick('La estimulación se realiza de forma ortodrómica en la palma de la mano sobre los nervios Mediano en el espacio interdigital III-IV; y Cubital en el espacio interdigital IV-V, respectivamente a 8 cm en dirección distal de los electrodos de registro.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btn42" onClick={() => handleButtonClick('La estimulación se realiza de forma ortodrómica en la palma de la mano sobre los nervios Mediano en el espacio interdigital III-IV; y Cubital en el espacio interdigital IV-V, respectivamente a 8 cm en dirección distal de los electrodos de registro.', { top: '60%', left: '24%' })}></button>}
                {currentImageIndex === 6 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Indice-Sensorial.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 6 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/Indice-Sensorial-T.png",{ top: '2%', left: '2%' })}></button>}
            {/* Octava Imagen */}
                {currentImageIndex === 7 && <button className="btn43" onClick={() => handleButtonClick('Dorso de la mano.', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 7 && <button className="btn44" onClick={() => handleButtonClick('3-4 cm distal al electrodo de registo discretamente distal de articulación interfalangica distal.', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 7 && <button className="btn45" onClick={() => handleButtonClick('Ligeramente distal a la articulación metacarpofalángica, evitando colocar electrodo sobre pliegue cutáneo.', { top: '65%', left: '24%' })}></button>}
                {currentImageIndex === 7 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/Rastreo-Sensitivo.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 7 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/Rastreo-T.png",{ top: '2%', left: '2%' })}></button>}
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
        </div>
    );
};
export default MedianoSt