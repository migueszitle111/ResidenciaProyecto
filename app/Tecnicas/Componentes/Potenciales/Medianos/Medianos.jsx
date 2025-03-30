import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Medianos/Medianos.css";



const Medianos = () => {
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
            original: "/assets/ImgTecnicas/Potenciales/Mediano-01-c.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Mediano-01.png",
        },
        {
            original: "/assets/ImgTecnicas/Potenciales/Mediano-02.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Mediano-02.png"
        },
        {
            original: "/assets/ImgTecnicas/Potenciales/Mediano-03.png",
            thumbnail: "/assets/ImgTecnicas/Potenciales/Mediano-03.png"
        },
    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false);
        setImageBoxVisible(false);
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
        <div className="gallery-wrapper">
            <div className="gallery-container">
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
                        <button className="btnIMds1" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-G-01.png")}></button>
                        <button className="btnIMds2" onClick={() => openModal("/assets/ValoresImg/MiembrosSp/MedianoMt-T-01.png")}></button>
                    </>
                )}

                {/* Modal dentro de la galería */}
                {modalVisible && (
                    <div className="modal-gallery">
                        <button className="close-btn" onClick={closeModal}>×</button>
                        <img src={extraImage} alt="Imagen Extra" className="modal-image" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Medianos;
