interface ImageProps {
    url: string;
    saved: boolean;
    saveImage(url: string): () => void;
}

const ImageGallery = (props: ImageProps) => {
    const { url, saveImage, saved } = props;
    return (
        <>
            <span
                role="button"
                onClick={() => saveImage(url)}
                
            >
             {saved ? "Click here to unsave" : "Click here to save" }
            </span>

            <img
                src={url}
                style={{
                    width: "400px",
                    border: "2px solid black",
                    margin: "10px",
                }}
            />
        </>
    )
}

export default ImageGallery