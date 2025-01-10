import { useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "../Espinal/Espinal.css"


const Espinal = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState('');
    const [textBoxPosition, setTextBoxPosition] = useState({ top: '50%', left: '50%' });

    const images = [
        {
            original: "/assets/ValoresImg/Cervicales/01-Espinal.png",
            thumbnail: "/assets/ValoresImg/Cervicales/01-Espinal.png",
        },
        {
            original: "/assets/ValoresImg/Cervicales/02-Espinal.png",
            thumbnail: "/assets/ValoresImg/Cervicales/02-Espinal.png",
        },

    ];

    const handleSlide = (currentIndex) => {
        setCurrentImageIndex(currentIndex);
        setTextBoxVisible(false); // Ocultar el cuadro de texto al cambiar de imagen
    };

    const handleButtonClick = (content, position) => {
        if (textBoxVisible && textBoxContent === content) {
            setTextBoxVisible(false);
        } else {
            setTextBoxContent(content);
            setTextBoxPosition(position);
            setTextBoxVisible(true);
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
            {currentImageIndex === 0 && <button className="btnEp1" onClick={() => handleButtonClick('Triangulo posterior del cuello: Borde posterior del esternocleidomastoideo, ligeramente por arriba de su tercio medio.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnEp2" onClick={() => handleButtonClick('Trapecio fibras superiores. Con electrodo de superficie colocado 5-8 cm lateral a la apófisis espinosa C7.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 0 && <button className="btnEp3" onClick={() => handleButtonClick('3 cm distal al electrodo de registro.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 0 && <button className="btnEp4" onClick={() => handleButtonClick('Acromio.', { top: '12%', left: '32%'})}></button>}
            
            {currentImageIndex === 1 && <button className="btnEp5" onClick={() => handleButtonClick('1.	Triangulo posterior del cuello: Borde posterior del esternocleidomastoideo, ligeramente por arriba de su tercio medio.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnEp6" onClick={() => handleButtonClick('2', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 1 && <button className="btnEp7" onClick={() => handleButtonClick('3', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnEp8" onClick={() => handleButtonClick('Trapecio fibras medias. Con electrodo de superficie, colocarlo en el punto medio entre la espina escapular y la apófisis espinosa de T3.', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 1 && <button className="btnEp9" onClick={() => handleButtonClick('Acromio.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnEp10" onClick={() => handleButtonClick('3 cm distal a electrodo de registro', { top: '12%', left: '32%'})}></button>}
            {currentImageIndex === 1 && <button className="btnEp11" onClick={() => handleButtonClick('Trapecio fibras inferiores. Con electrodo de superficie, colocarlo en el punto medio entre el ángulo inferior escapular y la apófisis espinosa de T7.', {  top: '12%', left: '32%' })}></button>}
            {currentImageIndex === 1 && <button className="btnEp12" onClick={() => handleButtonClick('3 cm distal a electrodo de registro', { top: '12%', left: '32%'})}></button>}
            
            
            </div>
            {textBoxVisible && (
                <div className="text-boxEp" style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
                    {textBoxContent}
                </div>
            )}
        </div>
    );
}

export default Espinal