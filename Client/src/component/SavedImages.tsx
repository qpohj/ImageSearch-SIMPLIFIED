import ImageGallery from "./ImageGallery";

interface savedImagesProps {
    savedImages: string[];
    saveImage(url: string): () => void;
}
const SavedImages = (props: savedImagesProps) => {
    const { savedImages, saveImage } = props;


    return (
        <div>
            {savedImages.map((image, index)=> (
                <div
                key={index}
                >
                 <ImageGallery url={image} saveImage={saveImage} saved={true}/>   
                </div>
            ))}
        </div>
    )
}

export default SavedImages