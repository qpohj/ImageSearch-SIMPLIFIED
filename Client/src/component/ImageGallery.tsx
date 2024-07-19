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
                onClick={() => saveImage(url)}>

            </span>

            <img
                src={url}
                style={{
                    border: "2px solid black",
                    margin: "10px",
                }}
            />
        </>
    )
}

export default ImageGallery