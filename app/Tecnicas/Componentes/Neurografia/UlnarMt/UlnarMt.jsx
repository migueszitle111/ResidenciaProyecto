import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../UlnarMt/UlnarMt.css";


const UlnarMt = () => {
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
            original: "/assets/ValoresImg/MiembrosSp/01-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/01-UlnarMt.png",
            
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/02-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/02-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/03-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/03-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/04-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/04-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/05-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/05-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/06-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/06-UlnarMt.png",
        },
        {
            original: "/assets/ValoresImg/MiembrosSp/07-UlnarMt.png",
            thumbnail: "/assets/ValoresImg/MiembrosSp/07-UlnarMt.png",
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
                {currentImageIndex === 0 && <button className="btnUMt1" onClick={() => handleButtonClick('CODO. 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon.', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUMt2" onClick={() => handleButtonClick('Dorso de la mano  o antebrazo.', {top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUMt3" onClick={() => handleButtonClick('MUÑECA: 8 cm en dirección proximal de electrodo activo, medial a tendón cubital anterior.', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUMt4" onClick={() => handleButtonClick('ABDUCTOR DIGITI MINIMI C8, T1 - (eminencia hipotenar medial).', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUMt5" onClick={() => handleButtonClick('Articulación metacarpofalángica del quinto dedo.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnar-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnar-T-01.png",{ top: '2%', left: '2%' })}></button>}
            

                {currentImageIndex === 1 && <button className="btnUMt6" onClick={() => handleButtonClick('ERB. Fosa supraclavicular lateral al esternocleidomastoideo.', {  top: '10%', left: '55%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt7" onClick={() => handleButtonClick('AXILA. Base del hueco axilar o 1cm distal entre borde lateral de los músculos Pectoral menor y porción corta del Bíceps braquial.', { top: '10%', left: '55%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUMt8" onClick={() => handleButtonClick('ARRIBA DE CODO. 10 cm proximal al punto de estimulación de codo, a nivel de humero medial entre tendones de Bíceps-Tríceps.', {  top: '10%', left: '55%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt9" onClick={() => handleButtonClick('CODO. 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon.', { top: '10%', left: '55%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUMt10" onClick={() => handleButtonClick('Dorso de la mano o antebrazo.', {  top: '10%', left: '55%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt11" onClick={() => handleButtonClick('MUÑECA. 8 cm en dirección proximal de electrodo activo, medial a tendón cubital anterior.', { top: '10%', left: '55%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUMt12" onClick={() => handleButtonClick('ABDUCTOR DIGITI MINIMI C8, T1 - (eminencia hipotenar medial).', {  top: '10%', left: '55%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt13" onClick={() => handleButtonClick('Articulación metacarpofalángica del quinto dedo.', { top: '10%', left: '55%'})}></button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnar-G-02.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 1 && <button className="btnIMs2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnar-T-01.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 2 && <button className="btnUMt14" onClick={() => handleButtonClick('Articulación metacarpofalángica del dedo índice.', {  top: '62%', left: '70%' })}></button>}
                {currentImageIndex === 2 && <button className="btnUMt15" onClick={() => handleButtonClick('INTEROSEUS DORSALIS C8, T1 - Espacio dorsal línea media de membrana cutánea entre dedos pulgar e índice.', { top: '62%', left: '70%'})}></button>}
                {currentImageIndex === 2 && <button className="btnUMt16" onClick={() => handleButtonClick('Dorso de la mano.', {  top: '62%', left: '70%' })}></button>}
                {currentImageIndex === 2 && <button className="btnUMt17" onClick={() => handleButtonClick('MUÑECA. 8 cm en dirección proximal de electrodo activo, medial a tendón cubital anterior.', { top: '62%', left: '70%'})}></button>}
                {currentImageIndex === 2 && <button className="btnUMt18" onClick={() => handleButtonClick('CODO. 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon.', { top: '62%', left: '70%'})}></button>}
                {currentImageIndex === 2 && <button className="btnUMt19" onClick={() => handleButtonClick('ARRIBA DE CODO. 10 cm proximal al punto de estimulación de codo, a nivel de humero medial entre tendones de Bíceps-Tríceps.', { top: '62%', left: '70%'})}></button>}
                {currentImageIndex === 2 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnar-G-03.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 3 && <button className="btnUMt20" onClick={() => handleButtonClick('MUÑECA (N. ULNAR) - 8 cm en dirección proximal de electrodo activo, medial a tendón cubital anterior.', { top: '12%', left: '25%'})}></button>}
                {currentImageIndex === 3 && <button className="btnUMt21" onClick={() => handleButtonClick('MUÑECA (N. MEDIANO) - 8 cm en dirección proximal de electrodo activo, entre los tendones palmar mayor y menor.', {  top: '12%', left: '25%' })}></button>}
                {currentImageIndex === 3 && <button className="btnUMt22" onClick={() => handleButtonClick('Dorso de la mano.', { top: '12%', left: '25%'})}></button>}
                {currentImageIndex === 3 && <button className="btnUMt23" onClick={() => handleButtonClick('PRIMER INTERÓSEO PALMAR (N. ULNAR) / SEGUNDO LUMBRICAL (N. MEDIANO) - Palma ligeramente lateral al punto medio del tercer metacarpiano.', { top: '12%', left: '25%'})}></button>}
                {currentImageIndex === 3 && <button className="btnUMt24" onClick={() => handleButtonClick('Articulación metacarpofalángica del dedo índice.', { top: '12%', left: '25%'})}></button>}
                {currentImageIndex === 3 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnar-G-04.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 4 && <button className="btnUMt25" onClick={() => handleButtonClick('ARRIBA DE CODO. 10 cm proximal al punto de estimulación de codo, a nivel de humero medial entre tendones de Bíceps-Tríceps.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 4 && <button className="btnUMt26" onClick={() => handleButtonClick('CODO: 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon.', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 4 && <button className="btnUMt27" onClick={() => handleButtonClick('FLEXOR CARPI ULNARIS C7, C8, T1 - Punto motor a cuatro dedos de distancia, distal de epicóndilo medial sobre borde cubital entre línea imaginaria de tercio medio y proximal del antebrazo.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 4 && <button className="btnUMt28" onClick={() => handleButtonClick('Dorso de la mano o antebrazo lateral.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 4 && <button className="btnUMt29" onClick={() => handleButtonClick('En dirección aL carpo sobre borde cubital, recorrido distal del tendón.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 4 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnar-G-05.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 5 && <button className="btnUMt30" onClick={() => handleButtonClick('Antebrazo.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 5 && <button className="btnUMt31" onClick={() => handleButtonClick('ABDUCTOR DIGITI MINIMI C8, T1 - (eminencia hipotenar medial).', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 5 && <button className="btnUMt32" onClick={() => handleButtonClick('.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 5 && <button className="btnUMt33" onClick={() => handleButtonClick('Articulación metacarpofalángica del quinto dedo.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 5 && <button className="btnUMt34" onClick={() => handleButtonClick('3', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 5 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnar-G-06.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 6 && <button className="btnUMt35" onClick={() => handleButtonClick('Dorso de la mano.', { top: '10%', left: '25%'})}></button>}
                {currentImageIndex === 6 && <button className="btnUMt36" onClick={() => handleButtonClick('Articulación metacarpofalángica del dedo índice.', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 6 && <button className="btnUMt37" onClick={() => handleButtonClick('INTEROSEUS DORSALIS C8, T1 - Espacio dorsal línea media de membrana cutánea entre dedos pulgar e índice.', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 6 && <button className="btnUMt38" onClick={() => handleButtonClick('MUÑECA. Estimulación a intervalos de 1 cm a lo largo del trayecto del nervio Ulnar a través del carpo. La referencia 0 corresponde al carpo, inmediatamente proximal al pisiforme: Los puntos de estimulación distales, también se designarán con un signo negativo y los puntos proximales con un signo positivo.', {  top: '10%', left: '25%' })}></button>}
                {currentImageIndex === 6 && <button className="btnIMs1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/ulnar-G-07.png",{ top: '2%', left: '2%' })}></button>}

            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxUlM ${textBoxClass}`}
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

export default UlnarMt