import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Trigemino/Trigemino.css";



const Trigemino = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });
    const [imageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageBoxContent, setImageBoxContent] = useState('');
    const [imageBoxPosition, setImageBoxPosition] = useState({ top: '50%', left: '50%' });
    const [textBoxClass, setTextBoxClass] = useState('text-boxTri');
    
    
    const [modalText, setModalText] = useState(''); // NUEVO
    const [modalTextPosition, setModalTextPosition] = useState({ top: '80%', left: '50%' }); // posición inicial
    const [modalTextColor, setModalTextColor] = useState('#fff');
    const [modalTextSize, setModalTextSize] = useState('1.2rem');

    // NUEVOS ESTADOS para el segundo imageBox que acepta múltiples imágenes
    const [multiImageBoxVisible, setMultiImageBoxVisible] = useState(false);
    const [multiImageBoxContent, setMultiImageBoxContent] = useState([]); // Ahora es un arreglo de rutas
    const [multiImageBoxPosition, setMultiImageBoxPosition] = useState({ top: '50%', left: '50%' });


    const [extraImage, setExtraImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIcon, setModalIcon] = useState('');
    const [activeBtn, setActiveBtn] = useState(null);

    const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);/*NUEVO, Para Horizontal*/

    const images = [
        {
            original: "/assets/ImgTecnicas/Potenciales/Somt/TrigeBs.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Somt/TrigeBs.png",
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
        
        // Limpiar el evento al desmontar el componente
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

    const handleButtonClick = (content, position, customClass = 'text-boxTri') => {
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
                        <button className="btnTri1" onClick={() => openModal("/assets/ImgTecnicas/Potenciales/Mediano-G01.png")}></button>
                        <button className={`btnTri2 ${activeBtn === 'btnTri2' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnTri2' ? null : 'btnTri2'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Trigem-T01.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ValoresImg/I_Tabla_Gris.png'); }}></button>

                        <button className={`btnTri4 ${activeBtn === 'btnTri4' ? 'active' : ''}`}
                        onClick={() => { setActiveBtn(p => p === 'btnTri4' ? null : 'btnTri4'); openModal("/assets/ImgTecnicas/Potenciales/Somt/Trigem10-20.png","", {position: { top: '120%', left: '50%' }, size: '0rem', }, '/assets/ImgTecnicas/Potenciales/Sistema.png'); }}></button>

                        {currentImageIndex === 0 && (
                            <button className={`btnTrig ${activeBtn === 'btnTrig' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnTrig' ? null : 'btnTrig');
                                    handleButtonClick('Sobre cráneo, electrodo activo en C5’ al estimular lado derecho (2cm posterior a C5), referenciado a Fpz (línea media frontal). Invertir registro activo a C6’ al estimular lado izquierdo.', { top: '7%', left: '29%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/TrigeCanal1.png", { top: "50%", left: "50%" });  }}
                            >
                                C5’-Fpz    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnTrig2 ${activeBtn === 'btnTrig2' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnTrig2' ? null : 'btnTrig2');
                                    handleButtonClick('Registro bipolar C6’ activo con su referencia longitudinal contralateral C5’, invertir registro para el siguiente lado.', { top: '7%', left: '29%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/TrigeCanal2.png", { top: "50%", left: "50%" });  }}
                            >
                                C5’-C4’    
                            </button>
                        )}
                        {currentImageIndex === 0 && (
                            <button className={`btnTrig3 ${activeBtn === 'btnTrig3' ? 'active' : ''}`}
                                        onClick={() => {
                                        setActiveBtn(p => p === 'btnTrig3' ? null : 'btnTrig3');
                                    handleButtonClick('Nervio Trigémino (contralateral a registro cortical), colocar el cátodo en la comisura labial y el ánodo paramedial entre ambos labios, esto estimula las divisiones maxilar y mandibular al unísono. Se puede optar por estimular cada labio de forma independiente colocando el cátodo 1 cm arriba o 1 cm debajo de la comisura en cada caso, ánodo paramedial.' +
                                        "\n\n Intensidad. 2 a 3 veces el umbral sensitivo, es posible la poca tolerancia a la estimulación y un artefacto de estímulo por arriba de los 10 mA.", { top: '35%', left: '29%' });
                                    handleImageBoxClick("/assets/ImgTecnicas/Potenciales/Somt/TrigeEs1.png", { top: "50%", left: "50%" });  }}
                            >
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnOndasTri ${activeBtn === 'btnOndasTri' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnOndasTri' ? null : 'btnOndasTri');
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/TrigeCanal1.png",
                                            "/assets/ImgTecnicas/Potenciales/Somt/TrigeCanal2.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                        {currentImageIndex === 0 && (
                            <button className={`btnTri3 ${activeBtn === 'btnTri3' ? 'active' : ''}`} onClick={() => {
                                        setActiveBtn(p => p === 'btnTri3' ? null : 'btnTri3');
                                        handleButtonClick('Nervio Trigémino (contralateral a registro cortical), colocar el cátodo en la comisura labial y el ánodo paramedial entre ambos labios, esto estimula las divisiones maxilar y mandibular al unísono. Se puede optar por estimular cada labio de forma independiente colocando el cátodo 1 cm arriba o 1 cm debajo de la comisura en cada caso, ánodo paramedial.' +
                                        "\n\n Intensidad. 2 a 3 veces el umbral sensitivo, es posible la poca tolerancia a la estimulación y un artefacto de estímulo por arriba de los 10 mA.", { top: '12%', left: '29%' });
                                        handleMultiImageBoxClick([
                                            "/assets/ImgTecnicas/Potenciales/Somt/TriEst3.png",

                                        ], { top: "50%", left: "50%" });   }}
                            >
                            </button>
                        )}

                    </>
                )}


            {textBoxVisible && (
                <div
                    className={`text-boxTri ${textBoxClass}`}
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
                            alt="Imagen Extra"
                            className="modal-imageSup"
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                        />
                    </div>
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
                            zIndex: 999,
                        }}
                    >
                        {/* {modalText} */}
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

export default Trigemino;
