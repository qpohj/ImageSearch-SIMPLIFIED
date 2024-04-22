

const ImageGallery = ({ images = [] }) => {
    return (
        <div>
            {images.map((image) => (
                <div>
                    <h4>{image.title}</h4>
                    <img src={image.link} width={200} alt={image.htmlSnippet} />
                    <p>{image.byteSize}</p>
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;