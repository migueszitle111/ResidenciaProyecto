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

    // Estado existente para un solo imageBox
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });

    // NUEVOS ESTADOS para el segundo imageBox que acepta múltiples imágenes
    const [multiImageBoxVisible, setMultiImageBoxVisible] = useState(false);
    const [multiImageBoxContent, setMultiImageBoxContent] = useState([]); // Ahora es un arreglo de rutas
    const [multiImageBoxPosition, setMultiImageBoxPosition] = useState({ top: '50%', left: '50%' });


    const [modalText, setModalText] = useState('');
    const [modalTextPosition, setModalTextPosition] = useState({ top: '80%', left: '50%' });
    const [modalTextColor, setModalTextColor] = useState('#fff');
    const [modalTextSize, setModalTextSize] = useState('1.2rem');

    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Motores/MenSupBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Motores/MenSupBs.png",
        },
    ];

    // Detecta el cambio de orientación
    useEffect(() => {
        const handleOrientationChange = () => {
            if (window.innerHeight < window.innerWidth) {
                setIsLandscape(true);  // En modo horizontal
            } else {
                setIsLandscape(false);  // En modo vertical
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


    const openModal = (
        image,
        text = '',
        options = { position: { top: '80%', left: '50%' }, color: '#fff', size: '1.2rem' }
    ) => {
        setExtraImage(image);
        setModalText(text);
        setModalTextPosition(options.position || { top: '80%', left: '50%' });
        setModalTextColor(options.color || '#fff');
        setModalTextSize(options.size || '1.2rem');
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setExtraImage('');
    };

    const renderGalleryItem = (item) => (
    <img
        src={item.original}
        alt=""
        onContextMenu={e => e.preventDefault()}
        draggable={false}
        style={{ width: '100%' }}
    />
    );
    const renderThumbInner = (item) => (
        <img
            src={item.thumbnail}
            alt=""
            onContextMenu={e => e.preventDefault()}
            draggable={false}
            style={{ width: '100%' }}
        />
    );

    return (
        <div className=" py-20 gallery-container">

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
                />

                {/* Botones que abren imágenes en el modal */}
                {currentImageIndex === 0 && (
                    <>
                        <button className="btnMie1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className="btnMie2" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Motores/MieSup1-T01.png")}></button>
                        <button
                            className="btnMie3"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/RegistroI.png",
                                    "ESTIMULO \n\n CORTICAL. Bobina en forma de 8 (mariposa) de estimulación magnética transcraneal. Colocar el centro de la unión de ambos circuitos en C3 o C4, orientándolo de forma tangencial en dirección a Fpz; C3 para el registro contralateral derecho y C4 para el registro contralateral izquierdo. También se obtienen buenas respuestas en C1-C2." + 
                                    "\n\n CERVICAL. Bobina circular o en forma de 8 de estimulación magnética transcraneal. Colocar el centro de la bobina en orientación tangencial u horizontal sobre C7 con flexión de cuello de 45% y descender 1-2 cm hasta la unión C8-T1 con el 120% de intensidad prefijado en la estimulación cortical y únicamente en fase de reposo muscular.",
                                    
                                    { position: { top: '25%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>

                        <button
                            className="btnRegistroInf"
                            onClick={() =>
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/RegidtroMiSup.png",
                                    "Abductor corto del pulgar  \n\n Activo. Vientre muscular en eminencia tenar lateral. \n Referencia. Primera articulación metacarpofalángica. \n Tierra. dorso de la mano o antebrazo." ,
                                    { position: { top: '62%', left: '50%' }, size: '0.8rem', }
                                )
                            }
                        ></button>
                        <button className="btnMie4" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Motores/MieSup-10-20.png")}></button>

                        {currentImageIndex === 0 && (
                            <button className="btnMieSup" onClick={() => {
                                        handleButtonClick('Determinar el umbral de estimulación magnética cortical mínimo al generar una pequeña contracción involuntaria en la mano. Esto se logra con incrementos progresivos del 5 al 10% de la intensidad. De no lograrlo, se reposicionará la bobina 1 cm en dirección anterior, lateral o posterior (en caso de no obtención con esta maniobra, pasar a la facilitación).', { top: '9%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/ReposoSup.png", { top: "50%", left: "50%" });   }}
                            >
                                Reposo     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnMieSup3" onClick={() => {
                                        handleButtonClick('Solicitar al paciente una contracción voluntaria con abducción del pulgar entre 10-20% de la fuerza (medida subjetiva). Este registro incrementa la amplitud y reducide la latencia del potencial en reposo. ', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/FacilitacionSup.png", { top: "50%", left: "50%" });   }}
                            >
                                Facilitación     
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className="btnMieSup4" onClick={() => {
                                        handleButtonClick('Estimulación cervical/radicular localizando el proceso espinoso de la vertebra C7 y descender 1 a 2 cm hasta la unión C8-T1. ', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/Cervical2.png", { top: "50%", left: "50%" });   }}
                            >
                                Cervical     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnMieSup5" onClick={() => {
                                        handleButtonClick('Estimulación en Punto de Erb ipsilateral al registro, se puede realizar tanto por estimulación magnética, como con estimulación eléctrica convencional.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/ERB.png", { top: "50%", left: "50%" });   }}
                            >
                                Periférico     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className="btnMieSup6" onClick={() => {
                                        handleButtonClick('Registro convencional de latencia mínima de la onda F mediante técnica de estimulación ortodrómica continua a nivel de la muñeca.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/OndaFSup.png", { top: "50%", left: "50%" });}}
                            >
                                Onda F     
                            </button>
                        )}

                        {/* Este botón ahora usará el nuevo handleMultiImageBoxClick con un arreglo de rutas */}
                        {currentImageIndex === 0 && (
                            <button className="btnOndasS" onClick={() => {
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Motores/ReposoSup.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/FacilitacionSup.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/Cervical2.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/ERB.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/OndaFSup.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

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
            {imageBoxVisible && (
            <div
                className="image-boxMiSup"
                style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
                }}
            >
                <img
                src={imageBoxContent}
                alt="Cuadro dinámico"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    position: "relative",
                }}
                className="zoomable-image"
                />
            </div>
            )}

            {/* NUEVO: Contenedor para múltiples imágenes que se enciman */}
            {multiImageBoxVisible && (
                <div
                    className="image-boxMiSup" // Reutilizamos la misma clase para los estilos
                    style={{
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}
                >
                    {multiImageBoxContent.map((imagePath, index) => (
                        <img
                            key={index}
                            src={imagePath}
                            alt={`Cuadro dinámico ${index + 1}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                position: "absolute", // Mantiene las imágenes dentro del contenedor
                                // Opcional: Puedes ajustar el zIndex si quieres un orden específico
                                // zIndex: 10 + index,
                            }}
                            className="zoomable-image"
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    ))}
                    {/* Botón para cerrar el multiImageBox */}

                </div>
            )}


            {modalVisible && (
                <div className="modal-gallery">
                    <button className={`print-button`} onClick={closeModal}>
                        <img
                            src="/I_X.webp"
                            style={{ filter: 'invert(1)' }}
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    </button>
                    <img
                        src={extraImage}
                        alt="Imagen Extra"
                        className="modal-image"
                        onContextMenu={e => e.preventDefault()}
                        draggable={false}
                    />
                    {/* Cuadro de texto flotante y personalizable */}
                    <div
                        className="modal-text-box"
                        style={{
                            position: 'absolute',
                            top: modalTextPosition.top,
                            left: modalTextPosition.left,
                            transform: 'translate(-50%, 0)',
                            background: 'rgba(69, 69, 69)',
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