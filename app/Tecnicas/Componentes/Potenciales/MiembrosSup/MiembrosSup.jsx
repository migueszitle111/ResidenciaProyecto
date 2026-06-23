import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../MiembrosSup/MiembrosSup.css";

const MiembrosSup = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxMieSup');

    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });

    const [multiImageBoxVisible, setMultiImageBoxVisible] = useState(false);
    const [multiImageBoxContent, setMultiImageBoxContent] = useState([]);
    const [multiImageBoxPosition, setMultiImageBoxPosition] = useState({ top: '50%', left: '50%' });

    const [modalText, setModalText] = useState('');
    const [modalTextPosition, setModalTextPosition] = useState({ top: '80%', left: '50%' });
    const [modalTextColor, setModalTextColor] = useState('#fff');
    const [modalTextSize, setModalTextSize] = useState('1.2rem');

    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIcon, setModalIcon] = useState('');
    const [activeBtn, setActiveBtn] = useState(null);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Motores/MenSupBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Motores/MenSupBs.png",
        },
    ];

    useEffect(() => {
        const handleOrientationChange = () => {
            if (window.innerHeight < window.innerWidth) {
                setIsLandscape(true);
            } else {
                setIsLandscape(false);
            }
        };

        window.addEventListener('resize', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
        setImageBoxVisible(false); // Ocultar el cuadro de imagen al cambiar de imagen
        setMultiImageBoxVisible(false); // Ocultar el nuevo cuadro de múltiples imágenes
    };

    const handleButtonClick = (content, position, customClass = 'text-boxMieSup') => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTextBoxClass(customClass);
            setTextBoxVisible(true);
        }   
        // Asegurarse de ocultar los imageBoxes cuando se muestra un text-box
        setImageBoxVisible(false);
        setMultiImageBoxVisible(false);
    };

    const handleImageBoxClick = (image, position) => {
        if (imageBoxVisible && imageBoxContent === image) {
            setImageBoxVisible(false);
        } else {
            setImageBoxContent(image);
            setImageBoxPosition(position);
            setImageBoxVisible(true);
        }
        // Asegurarse de ocultar otros elementos cuando se muestra este imageBox
        
        setMultiImageBoxVisible(false);
    };

    // FUNCIÓN para manejar el nuevo imageBox con múltiples imágenes
    const handleMultiImageBoxClick = (imagesArray, position) => {
        if (multiImageBoxVisible && JSON.stringify(multiImageBoxContent) === JSON.stringify(imagesArray)) {
            setMultiImageBoxVisible(false);
        } else {
            setMultiImageBoxContent(imagesArray);
            setMultiImageBoxPosition(position); // Esta posición puede ser para el contenedor principal
            setMultiImageBoxVisible(true);
        }
        // Asegurarse de ocultar otros elementos cuando se muestra este multiImageBox
        setTextBoxVisible(false);
        setImageBoxVisible(false);
    };


    // Funciones para abrir y cerrar el modal
    const openModal = (
        image,
        text = '',
        options = { position: { top: '80%', left: '50%' }, color: '#fff', size: '1.2rem' },
        icon = ''
    ) => {
        setExtraImage(image);
        setModalText(text);
        setModalTextPosition(options.position || { top: '80%', left: '50%' });
        setModalTextColor(options.color || '#fff');
        setModalTextSize(options.size || '1.2rem');
        setModalIcon(icon);
        setModalVisible(true);
        setTextBoxVisible(false);
        setImageBoxVisible(false);
    };

    const closeModal = () => {
        setModalVisible(false);
        setExtraImage('');
        setModalIcon('');
        setActiveBtn(null);
    };

    const renderGalleryItem = (item) => (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
                src={item.original}
                alt=""
                onContextMenu={e => e.preventDefault()}
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {imageBoxVisible && (
                <img
                    src={imageBoxContent}
                    alt="Overlay"
                    style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'contain', pointerEvents: 'none',
                    }}
                    onContextMenu={e => e.preventDefault()}
                    draggable={false}
                />
            )}
            {multiImageBoxVisible && multiImageBoxContent.map((path, idx) => (
                <img
                    key={idx}
                    src={path}
                    alt=""
                    style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'contain', pointerEvents: 'none',
                    }}
                    onContextMenu={e => e.preventDefault()}
                    draggable={false}
                />
            ))}
        </div>
    );

    return (
        <div  className=" py-20 gallery-container">

             {/* Si no está en modo horizontal, mostramos el mensaje con el GIF */}
            {!isLandscape && (
                <div className="orientation-message">
                    <img src="/assets/giracel.gif" alt="Gira tu dispositivo" className="rotate-gif" />
                    <h2> Por favor, gira tu dispositivo a modo horizontal para continuar.</h2>
                </div>
            )}
                <ImageGallery
                    items={images}
                    onSlide={handleSlide}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showBullets={false}
                    showNav={false}
                    showThumbnails={true}
                    thumbnailPosition="bottom"
                    renderItem={renderGalleryItem}
                />

            {/* Botones que abren imágenes en el modal */}
            {currentImageIndex === 0 && (
                <>
                    <button
                        className={`btnMie1 ${activeBtn === 'mie1' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'mie1' ? null : 'mie1'); openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png"); }}
                    ></button>
                    <button
                        className={`btnMie2 ${activeBtn === 'mie2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'mie2' ? null : 'mie2'); openModal("/assets/ImgTecnicas/Potenciales/Motores/MieSup1-T01.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ValoresImg/I_Tabla_Gris.png'); }}
                    ></button>
                    {/* <span className="labelMieSup">Miembros Superiores</span> */}
                    <button
                        className={`btnMiem3 ${activeBtn === 'miem3' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'miem3' ? null : 'miem3');
                            openModal(
                                "/assets/ImgTecnicas/Potenciales/Motores/Registr.png",
                                "ESTIMULO CORTICAL \n\n Bobina circular o en doble cono de estimulación magnética transcraneal. Colocar el centro de la bobina tangencialmente sobre el Vertex (Cz) o 1 cm por delante siguiendo la línea media. Solo para bobina circular, dirigir la corriente en orientación de las manecillas del reloj para lado derecho, en invertir para lado izquierdo en contra de las manecillas del reloj." +
                                "\n\n Bobina en forma de 8 (mariposa) de estimulación magnética transcraneal. Colocar el centro de la unión de ambos circuitos en C1 o C2, orientándolo de forma tangencial en dirección a Fpz; C1 para el registro contralateral derecho y C2 para el registro contralateral izquierdo. En mEDXprolab obtenemos nuestras respuestas al estimulo de C3-C4." +
                                "\n\n Intensidad. Se recomienda iniciar en 30-50% con incrementos progresivos de 10% hasta obtener una contracción mínima en el dominio muscular distal.",
                                { position: { top: '20%', left: '50%' }, size: '0.8rem' }
                            );
                        }}
                    ></button>

                    <button
                        className={`btnMiem5 ${activeBtn === 'miem5' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'miem5' ? null : 'miem5');
                            openModal(
                                "/assets/ImgTecnicas/Potenciales/Motores/Registr.png",
                                "ESTIMULO CERVICAL \n\n Bobina circular o en forma de 8 de estimulación magnética transcraneal. Colocar el centro de la bobina en orientación tangencial u horizontal sobre C7 con flexión de cuello de 45% y descender 1-2 cm hasta la unión C8-T1 con el 120% de intensidad prefijado en la estimulación cortical y únicamente en fase de reposo muscular.",
                                { position: { top: '25%', left: '50%' }, size: '0.8rem' }
                            );
                        }}
                    ></button>

                    <button
                        className={`btnRegistroInf33 ${activeBtn === 'registro' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'registro' ? null : 'registro');
                            openModal(
                                "/assets/ImgTecnicas/Potenciales/Motores/RegidtroMiSup.png",
                                "Abductor corto del pulgar  \n\n Activo. Vientre muscular en eminencia tenar lateral. \n Referencia. Primera articulación metacarpofalángica. \n Tierra. dorso de la mano o antebrazo.",
                                { position: { top: '55%', left: '50%' }, size: '0.8rem' }, '/assets/ImgTecnicas/Potenciales/Registro.png'
                            );
                        }}
                    ></button>

                    <button
                        className={`btnMie4 ${activeBtn === 'mie4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'mie4' ? null : 'mie4'); openModal("/assets/ImgTecnicas/Potenciales/Motores/MieSup-10-20.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ImgTecnicas/Potenciales/Sistema.png'); }}
                    ></button>

                    <button
                        className={`btnMieSup ${activeBtn === 'reposo' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'reposo' ? null : 'reposo');
                            handleButtonClick('Determinar el umbral de estimulación magnética cortical mínimo al generar una pequeña contracción involuntaria en la mano. Esto se logra con incrementos progresivos del 5 al 10% de la intensidad. De no lograrlo, se reposicionará la bobina 1 cm en dirección anterior, lateral o posterior (en caso de no obtención con esta maniobra, pasar a la facilitación).', { top: '9%', left: '28%' });
                            handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/ReposoSup.png", { top: "50%", left: "50%" });
                        }}
                    >
                        Reposo
                    </button>

                    <button
                        className={`btnMieSup3 ${activeBtn === 'facilitacion' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'facilitacion' ? null : 'facilitacion');
                            handleButtonClick('Solicitar al paciente una contracción voluntaria con abducción del pulgar entre 10-20% de la fuerza (medida subjetiva). Este registro incrementa la amplitud y reducide la latencia del potencial en reposo. ', { top: '7%', left: '28%' });
                            handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/FacilitacionSup.png", { top: "50%", left: "50%" });
                        }}
                    >
                        Facilitación
                    </button>

                    <button
                        className={`btnMieSup4 ${activeBtn === 'cervical' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'cervical' ? null : 'cervical');
                            handleButtonClick('Estimulación cervical/radicular localizando el proceso espinoso de la vertebra C7 y descender 1 a 2 cm hasta la unión C8-T1. ', { top: '7%', left: '28%' });
                            handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/Cervical2.png", { top: "50%", left: "50%" });
                        }}
                    >
                        Cervical
                    </button>

                    <button
                        className={`btnMieSup5 ${activeBtn === 'periferico' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'periferico' ? null : 'periferico');
                            handleButtonClick('Estimulación en Punto de Erb ipsilateral al registro, se puede realizar tanto por estimulación magnética, como con estimulación eléctrica convencional.', { top: '7%', left: '28%' });
                            handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/ERB.png", { top: "50%", left: "50%" });
                        }}
                    >
                        Periférico
                    </button>

                    <button
                        className={`btnMieSup6 ${activeBtn === 'ondaF' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'ondaF' ? null : 'ondaF');
                            handleButtonClick('Registro convencional de latencia mínima de la onda F mediante técnica de estimulación ortodrómica continua a nivel de la muñeca.', { top: '7%', left: '28%' });
                            handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/OndaFSup.png", { top: "50%", left: "50%" });
                        }}
                    >
                        Onda F
                    </button>

                    <button
                        className={`btnOndasS ${activeBtn === 'ondas' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'ondas' ? null : 'ondas');
                            handleMultiImageBoxClick([
                                "/assets/ImgTecnicas/Potenciales/Motores/ReposoSup.png",
                                "/assets/ImgTecnicas/Potenciales/Motores/FacilitacionSup.png",
                                "/assets/ImgTecnicas/Potenciales/Motores/Cervical2.png",
                                "/assets/ImgTecnicas/Potenciales/Motores/ERB.png",
                                "/assets/ImgTecnicas/Potenciales/Motores/OndaFSup.png",
                            ], { top: "50%", left: "50%" });
                        }}
                    ></button>
                </>
            )}

            {textBoxVisible && (
                <div
                    className={`text-boxMieSup ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {modalVisible && (
                <div className="modal-gallerySup">
                    <button className={`print-button`} onClick={closeModal}>
                        <img
                            src="/I_X.webp"
                            style={{ filter: 'invert(1)' }}
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    </button>
                    <div className="modal-image-wrapper">
                        {modalIcon && (
                            <img
                                src={modalIcon}
                                className="modal-top-icon"
                                onContextMenu={e => e.preventDefault()}
                                draggable={false}
                            />
                        )}
                        <img
                            src={extraImage}
                            alt=""
                            className="modal-imageSup"
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    </div>
                    <div
                        className="modal-text-box"
                        style={{
                            position: 'absolute',
                            top: modalTextPosition.top,
                            left: modalTextPosition.left,
                            transform: 'translate(-50%, 0)',
                            background: 'rgba(0, 0, 0)',
                            color: modalTextColor,
                            fontSize: modalTextSize,
                            padding: '12px 20px',
                            borderRadius: '10px',
                            minWidth: '180px',
                            maxWidth: '100%',
                            width: '690px',
                            textAlign: 'justify',
                            zIndex: 20,
                        }}
                    >
                        {modalText.split('\n').map((line, idx) => (
                            <span key={idx}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MiembrosSup;
