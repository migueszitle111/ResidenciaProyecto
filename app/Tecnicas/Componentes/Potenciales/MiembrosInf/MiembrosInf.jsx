import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../MiembrosInf/MiembrosInf.css";

const MiembrosInf = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxMie');

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
    const [activeBtn, setActiveBtn] = useState(null);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Motores/MenInfBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Motores/MenInfBs.png",
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

    const handleButtonClick = (content, position, customClass = 'text-boxMie') => {
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
        setActiveBtn(null);
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
                        <button className={`btnMiem1 ${activeBtn === 'mie1' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'mie1' ? null : 'mie1'); openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png"); }}></button>
                        <button className={`btnMiem2 ${activeBtn === 'mie2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'mie2' ? null : 'mie2'); openModal("/assets/ImgTecnicas/Potenciales/Motores/MieInf1-T01.png", "", {position: { top: '120%', left: '50%' }, size: '0rem', }); }}></button>
                        <button
                            className={`btnMiem3 ${activeBtn === 'miem3' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'miem3' ? null : 'miem3');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/Registr.png",
                                    "ESTIMULO CORTICAL \n\n Bobina circular de estimulación magnética transcraneal. Colocar el centro de la bobina tangencialmente 3 cm por delante del Vertex (Cz) siguiendo la línea media." + 
                                    "\n\n Bobina en forma de 8 (mariposa) de estimulación magnética transcraneal. Colocar el centro de la unión de ambos circuitos en el vertex (Cz), orientándolo de forma horizontal en dirección a Fpz; se puede lateralizar discretamente a C1 para el registro periférico izquierdo o a C2 para el derecho (lateralización paradójica)"+
                                    "\n\n Bobina en doble cono. Ideal para la estimulación en miembros inferiores por la profundidad que se genera a nivel cortical y subcortical." +
                                    "\n\n Intensidad. Se recomienda iniciar en 60% con incrementos progresivos de 10% hasta obtener una contracción mínima al reposo.",
                                    { position: { top: '20%', left: '50%' }, size: '0.8rem', }
                                );
                            }}
                        ></button>

                        <button
                            className={`btnMiem5 ${activeBtn === 'miem5' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'miem5' ? null : 'miem5');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/Registr.png",
                                    "ESTIMULO LUMBAR \n\nBobina circular o en forma de 8 de estimulación magnética transcraneal. Colocar el centro de la bobina en orientación tangencial u horizontal sobre los procesos espinosos de las vértebras lumbosacras dependiendo de los niveles a explorar; se observa una respuesta idónea en L1-L2 para Vasto Medial, la unión L4-L5 para Tibial anterior y S1 para Abductor de hallux. La posición del paciente puede variar desde decúbito prono o en sedestación con máxima flexión del tronco." ,
                                    { position: { top: '20%', left: '50%' }, size: '0.8rem', }
                                );
                            }}
                        ></button>

                        <button
                            className={`btnRegistroInf22 ${activeBtn === 'registro' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveBtn(p => p === 'registro' ? null : 'registro');
                                openModal(
                                    "/assets/ImgTecnicas/Potenciales/Motores/RegistroInf.png",
                                    "Tibial anterior  \n\nActivo. Cara lateral de la tibia, el electrodo de superficie se coloca en la unión del tercio proximal y medio de la pierna, al interceptar una línea trazada entre la tuberosidad tibial y el maléolo lateral. \nReferencia: 4 cm distal al electrodo activo sobre el tendón del tibial anterior. \n Tierra: Tibia medial o rodilla." ,
                                    { position: { top: '62%', left: '50%' }, size: '0.8rem', }
                                );
                            }}
                        ></button>
                        <button className={`btnMiem4 ${activeBtn === 'miem4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'miem4' ? null : 'miem4'); openModal("/assets/ImgTecnicas/Potenciales/Motores/MieInf-10-20.png"); }}></button>

                        {currentImageIndex === 0 && (
                            <button className={`btnMiemIn ${activeBtn === 'reposo' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'reposo' ? null : 'reposo');
                                        handleButtonClick('Determinar el umbral de estimulación magnética cortical mínimo al generar un pequeño movimiento en el pie o dedos con incrementos progresivos del 10% de la intensidad. De no lograrlo al 100%, pasar a la facilitación.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/ReposoInf.png", { top: "50%", left: "50%" });   }}
                            >
                                Reposo     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnMiemIn3 ${activeBtn === 'facilitacion' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'facilitacion' ? null : 'facilitacion');
                                        handleButtonClick('Solicitar al paciente una contracción voluntaria del 20% de la fuerza en dorsiflexión del tobillo (medida subjetiva). Este registro incrementa la amplitud y reducide la latencia del potencial en reposo. ', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/FacilitacionInf.png", { top: "50%", left: "50%" });   }}
                            >
                                Facilitación     
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnMiemIn4 ${activeBtn === 'lumbar' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'lumbar' ? null : 'lumbar');
                                        handleButtonClick('Estimulación medular/radicular localizando la unión L4-L5 con referencia a las crestas iliacas o a nivel sacro (S1-S2) un nivel por arriba de las espinas iliacas posteriores. ', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/LumbarInf.png", { top: "50%", left: "50%" });   }}
                            >
                                Lumbar     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnMiemIn5 ${activeBtn === 'periferico' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'periferico' ? null : 'periferico');
                                        handleButtonClick('Estimulación en hueco poplíteo ipsilateral al registro, se puede realizar tanto por estimulación magnética transcraneal, como con estimulación eléctrica convencional. ', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/PerifericoInf.png", { top: "50%", left: "50%" });   }}
                            >
                                Periférico     
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnMiemIn6 ${activeBtn === 'ondaF' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'ondaF' ? null : 'ondaF');
                                        handleButtonClick('Registro convencional de latencia mínima mediante técnica de estimulación ortodrómica continua a nivel de la fíbula.', { top: '7%', left: '28%' });
                                        handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Motores/OndaFInf.png", { top: "50%", left: "50%" });}}
                            >
                                Onda F     
                            </button>
                        )}

                        {/* Este botón ahora usará el nuevo handleMultiImageBoxClick con un arreglo de rutas */}
                        {currentImageIndex === 0 && (
                            <button className={`btnOndas ${activeBtn === 'ondas' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'ondas' ? null : 'ondas');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Motores/ReposoInf.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/FacilitacionInf.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/LumbarInf.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/PerifericoInf.png",
                                            "/assets/ImgTecnicas/Potenciales/Motores/OndaFInf.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxMie ${textBoxClass}`}
                    style={{ top: textBoxPosition.top, left: textBoxPosition.left }}
                >
                    {textBoxContent}
                </div>
            )}
            {imageBoxVisible && (
            <div
                className="image-boxMie"
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
                    className="image-boxMie" // Reutilizamos la misma clase para los estilos
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

export default MiembrosInf;