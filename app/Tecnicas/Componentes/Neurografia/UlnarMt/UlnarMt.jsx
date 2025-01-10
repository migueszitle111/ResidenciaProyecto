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
                {currentImageIndex === 0 && <button className="btnUMt1" onClick={() => handleButtonClick('1.	Muñeca: 8 cm en dirección proximal a electrodo activo, medial a tendón cubital anterior. \n2. Codo: 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon. \n3. Arriba de codo. 10 cm distal a punto de estimulación de codo en flexión de 90 grados, a nivel de humero medial entre tendones de Bíceps-Tríceps.', {  top: '25%', left: '25%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUMt2" onClick={() => handleButtonClick('Dorso de la mano.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUMt3" onClick={() => handleButtonClick('1.	Muñeca: 8 cm en dirección proximal a electrodo activo, medial a tendón cubital anterior. \n2. Codo: 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon. \n3. Arriba de codo. 10 cm distal a punto de estimulación de codo en flexión de 90 grados, a nivel de humero medial entre tendones de Bíceps-Tríceps.', {  top: '25%', left: '25%' })}></button>}
                {currentImageIndex === 0 && <button className="btnUMt4" onClick={() => handleButtonClick('Músculo abductor del dedo meñique o quinto dedo (ADM) (eminencia hipotenar medial).', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnUMt5" onClick={() => handleButtonClick('Articulación metacarpofalángica del quinto dedo', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 0 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnar-G-01.png",{ top: '2%', left: '2%' })}></button>}
                {currentImageIndex === 0 && <button className="btnIMs2" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnar-T-01.png",{ top: '2%', left: '2%' })}></button>}
            

                {currentImageIndex === 1 && <button className="btnUMt6" onClick={() => handleButtonClick('1', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt7" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUMt8" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt9" onClick={() => handleButtonClick('4', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUMt10" onClick={() => handleButtonClick('5', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt11" onClick={() => handleButtonClick('6', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnUMt12" onClick={() => handleButtonClick('7', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 1 && <button className="btnUMt13" onClick={() => handleButtonClick('8', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 1 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnar-G-02.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 2 && <button className="btnUMt14" onClick={() => handleButtonClick('Articulación metacarpofalángica del pulgar.', {  top: '10%', left: '32%' })}></button>}
                {currentImageIndex === 2 && <button className="btnUMt15" onClick={() => handleButtonClick('Músculo Primer interóseo dorsal. En aducción de dedos de la mano, palpar vientre muscular entre primer y segundo metacarpianos, o espacio dorsal línea media de membrana cutánea entre dedos pulgar e índice.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 2 && <button className="btnUMt16" onClick={() => handleButtonClick('Dorso de la mano.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 2 && <button className="btnUMt17" onClick={() => handleButtonClick('1. Muñeca: 8-12 cm proximal de electrodo activo (ideal con calibrador obstétrico) o idéntico a técnica convencional ya realizada previamente; medial a tendón cubital anterior. \n2. Codo: 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon. \n3. Arriba de codo. 10 cm distal a punto de estimulación de codo en flexión de 90 grados, a nivel de humero medial entre tendones de Bíceps-Tríceps.', { top: '45%', left: '70%'})}></button>}
                {currentImageIndex === 2 && <button className="btnUMt18" onClick={() => handleButtonClick('1. Muñeca: 8-12 cm proximal de electrodo activo (ideal con calibrador obstétrico) o idéntico a técnica convencional ya realizada previamente; medial a tendón cubital anterior. \n2. Codo: 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon. \n3. Arriba de codo. 10 cm distal a punto de estimulación de codo en flexión de 90 grados, a nivel de humero medial entre tendones de Bíceps-Tríceps.', { top: '45%', left: '70%'})}></button>}
                {currentImageIndex === 2 && <button className="btnUMt19" onClick={() => handleButtonClick('1. Muñeca: 8-12 cm proximal de electrodo activo (ideal con calibrador obstétrico) o idéntico a técnica convencional ya realizada previamente; medial a tendón cubital anterior. \n2. Codo: 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon. \n3. Arriba de codo. 10 cm distal a punto de estimulación de codo en flexión de 90 grados, a nivel de humero medial entre tendones de Bíceps-Tríceps.', { top: '45%', left: '70%'})}></button>}
                {currentImageIndex === 2 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnar-G-03.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 3 && <button className="btnUMt20" onClick={() => handleButtonClick('Muñeca: 8 en dirección proximal a electrodo activo; para nervio Mediano entre tendones flexores del carpo y para nervio Cubital medial al tendón cubital anterior (puntos de estimulación convencionales).', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 3 && <button className="btnUMt21" onClick={() => handleButtonClick('Muñeca: 8 en dirección proximal a electrodo activo; para nervio Mediano entre tendones flexores del carpo y para nervio Cubital medial al tendón cubital anterior (puntos de estimulación convencionales).', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 3 && <button className="btnUMt22" onClick={() => handleButtonClick('Dorso de la mano.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 3 && <button className="btnUMt23" onClick={() => handleButtonClick('Palma, ligeramente lateral al punto medio del tercer metacarpiano.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 3 && <button className="btnUMt24" onClick={() => handleButtonClick('Articulación metacarpofalángica del dedo índice. ', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 3 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnar-G-04.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 4 && <button className="btnUMt25" onClick={() => handleButtonClick('1. Codo: 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon. \n2. Arriba de codo. 10 cm distal a punto de estimulación de codo en flexión de 90 grados, a nivel de humero medial entre tendones de Bíceps-Tríceps.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnUMt26" onClick={() => handleButtonClick('1. Codo: 2-3 cm distal al epicóndilo medial en línea media dibujada con relación al olecranon. \n2. Arriba de codo. 10 cm distal a punto de estimulación de codo en flexión de 90 grados, a nivel de humero medial entre tendones de Bíceps-Tríceps.', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 4 && <button className="btnUMt27" onClick={() => handleButtonClick('Musculo Cubital anterior o Flexor cubital del carpo. Punto motor a cuatro dedos de distancia, distal de epicóndilo medial sobre borde cubital entre línea imaginaria de tercio medio y proximal de antebrazo.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnUMt28" onClick={() => handleButtonClick('Dorso de la mano.', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnUMt29" onClick={() => handleButtonClick('En dirección a carpo sobre borde cubital, recorrido distal del tendón del Cubital anterior', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 4 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnar-G-05.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 5 && <button className="btnUMt30" onClick={() => handleButtonClick('1', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 5 && <button className="btnUMt31" onClick={() => handleButtonClick('2', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 5 && <button className="btnUMt32" onClick={() => handleButtonClick('3', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 5 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnar-G-06.png",{ top: '2%', left: '2%' })}></button>}

                {currentImageIndex === 6 && <button className="btnUMt33" onClick={() => handleButtonClick('1', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 6 && <button className="btnUMt34" onClick={() => handleButtonClick('2', {  top: '12%', left: '32%' })}></button>}
                {currentImageIndex === 6 && <button className="btnUMt35" onClick={() => handleButtonClick('3', { top: '12%', left: '32%'})}></button>}
                {currentImageIndex === 6 && <button className="btnIMs1" onClick={() => handleImageBoxClick("/assets/ValoresImg/MiembrosSp/ulnar-G-07.png",{ top: '2%', left: '2%' })}></button>}

            </div>
            {textBoxVisible && (
                <div
                    className={`text-boxUlM ${textBoxClass}`}
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
                    className="zoomable-imageUlMt"
                    />
                </div>
            )}
        </div>
    );
};

export default UlnarMt