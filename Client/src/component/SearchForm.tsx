import { useState } from "react";
import ImageGallery from "./ImageGallery";
import { searchImages } from "../services";

interface ImageLink {
    link: string;
}

interface SearchProps {
    saveImage(url: string): () => void;
    savedImages: string[];
}

const SearchForm = (props: SearchProps) => {
    const { saveImage, savedImages } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const [correctedSearchQuery, setCorrectedSearchQuery] = useState('');
    const [searchDuration, setSearchDuration] = useState('');
    const [images, setImages] = useState<ImageLink[]>([]);


    const handleSearch = async (searchQuery: string) => {
        setSearchDuration("");
        setCorrectedSearchQuery("");
        setImages([]);

        try {
            const response = await searchImages(searchQuery);

            if (response) {
                setSearchDuration(response.data.searchInformation.formattedSearchTime);
                setImages(response.data.items);

                if (response.data.spelling?.correctedQuery) {
                    setCorrectedSearchQuery(response.data.spelling.correctedQuery);
                }
            }
        } catch (error) {
            console.error("Error searcing for images", error);
        }
    };

    const handleCorrectedSpelling = () => {
        setSearchQuery(correctedSearchQuery);
        handleSearch(correctedSearchQuery);
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    style={{
                        width: "250px",
                        minHeight: "20px",
                        borderRadius: "5px",
                        height: "20px",
                        padding: "2px 23px 2px 30px",
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button style={{
                    background: "lightBlue"
                }}onClick={() => handleSearch(searchQuery)}>
                    Search
                </button>
            </div>
            <div>
                Did you mean?<br/>
                <span
                    role="button"
                    onClick={handleCorrectedSpelling}
                    style={{color: "blueviolet"}}
                >
                    {correctedSearchQuery}
                </span>
            </div>
            <div>
                Search took <span
                style={{color: "blueviolet"}}>{searchDuration}</span>  seconds
            </div>

            <div>
                {images.map((image, index) => (
                    <div
                        key={index}
                    >
                        <ImageGallery
                            url={image.link}
                            saveImage={saveImage}
                            saved={savedImages.includes(image.link)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default SearchForm