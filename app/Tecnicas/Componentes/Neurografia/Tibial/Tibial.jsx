import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Tibial/Tibial.css";


const Tibial = () => {
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
            original: "/assets/ValoresImg/MiembrosInf/01-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/01-Tibial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/02-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/02-Tibial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/03-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/03-Tibial.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosInf/04-Tibial.png",
            thumbnail: "/assets/ValoresImg/MiembrosInf/04-Tibial.png",
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

    const openModal = (image) => {
        setExtraImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setExtraImage('');
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
            {currentImageIndex === 0 && <button className="btnTb1" onClick={() => handleButtonClick('HUECO POPLITEO. Ligeramente lateral del punto medio sobre el pliegue cutáneo poplíteo.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb2" onClick={() => handleButtonClick('TOBILLO. Ligeramente detrás del maléolo medial, línea media entre el borde óseo y el tendón de Aquiles, aproximadamente 8-10 cm del electrodo activo.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb3" onClick={() => handleButtonClick('Dorso del pie.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb4" onClick={() => handleButtonClick('ABDUCTOR HALLUCIS S1, S2 - Colocar electrodo de superficie ligeramente proximal y por debajo de la tuberosidad navicular, aproximadamente 1 cm en ambas direcciones.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnTb5" onClick={() => handleButtonClick('Base del primer metatarsiano, o en la articulación metatarsofalángica.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Tibial-G-01.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Tibial-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 1 && <button className="btnTb6" onClick={() => handleButtonClick('HUECO POPLITEO. Ligeramente lateral del punto medio sobre el pliegue cutáneo poplíteo.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb7" onClick={() => handleButtonClick('TOBILLO. Ligeramente detrás del maléolo medial, línea media entre el borde óseo y el tendón de Aquiles.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb8" onClick={() => handleButtonClick('ABDUCTOR DIGITI MINIMI S2, S3 - Electrodo de superficie colocado debajo del maléolo lateral, dividiendo la distancia hasta la planta del pie.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb9" onClick={() => handleButtonClick('Dorso del pie.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnTb10" onClick={() => handleButtonClick('Articulación metatarsofalángica del quinto ortejo', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Tibial-G-02.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Tibial-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 2 && <button className="btnTb11" onClick={() => handleButtonClick('TOBILLO. Ligeramente detrás del maléolo medial, línea media entre el borde óseo y el tendón de Aquiles.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb12" onClick={() => handleButtonClick('ABDUCTOR HALLUCIS S1, S2 - RAMA MEDIAL, colocar electrodo de superficie ligeramente proximal y por debajo de la tuberosidad navicular, aproximadamente 1 cm en ambas direcciones.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb13" onClick={() => handleButtonClick('Dorso del pie.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb14" onClick={() => handleButtonClick('ABDUCTOR DIGITI MINIMI S2, S3 - RAMA LATERAL, electrodo de superficie colocado debajo del maléolo lateral, dividiendo la distancia hasta la planta del pie.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb15" onClick={() => handleButtonClick('Base del primer metatarsiano, o en la articulación metatarsofalángica.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnTb16" onClick={() => handleButtonClick('Articulación metatarsofalángica del quinto ortejo.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 2 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Tibial-G-03.png",{ top: '2%', left: '2%' })}></button>}
            {currentImageIndex === 2 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Tibial-T-01.png",{ top: '5%', left: '2%' })}></button>}
            
            {currentImageIndex === 3 && <button className="btnTb17" onClick={() => handleButtonClick('HUECO POPLITEO. Ligeramente lateral del punto medio sobre el pliegue cutáneo poplíteo.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb18" onClick={() => handleButtonClick('GASTROCNEMIUS MEDIAL S1, S2 - 8 a 10 cm distal del pliegue de la rodilla con orientación medial, tomando como referencia una línea horizontal desde los tendones isquiotibiales en el hueco poplíteo.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb19" onClick={() => handleButtonClick('GASTROCNEMIUS LATERAL S1, S2 - 8 a 10 cm distal del pliegue de la rodilla con orientación lateral, tomando como referencia una línea horizontal desde los tendones isquiotibiales en el hueco poplíteo.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb20" onClick={() => handleButtonClick('Distal al recorrido del tendón de Aquiles.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb21" onClick={() => handleButtonClick('Justo debajo del borde inferior del gastrocnemio con orientación lateral.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb22" onClick={() => handleButtonClick('Justo debajo del borde inferior del gastrocnemio con orientación medial.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb23" onClick={() => handleButtonClick('SOLEUS S1, S2 - Justo debajo del borde que divide ambos gastrocnemios, se recomienda utilizar aguja de registro.', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnTb24" onClick={() => handleButtonClick('Pierna lateral', { top: '62%', left: '23%' })}></button>}
            {currentImageIndex === 3 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosInf/Tibial-G-04.png",{ top: '2%', left: '2%' })}></button>}
            
            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxMs ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
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

export default Tibial