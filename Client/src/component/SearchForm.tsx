import axios from "axios";
import { useEffect, useState } from "react"
import ImageGallery from "./ImageGallery";

function SearchForm() {


    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [searchResult, setSearchResult] = useState([])


    useEffect(() => {


        // search()
    }, [])

    const search = async () => {
        // const query = "spase ship"
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API}&cx=${import.meta.env.VITE_SEARCH_ENGINE}&num=10&searchType=image&q=${query}`)
        const data = await response.json()



    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API}&cx=${import.meta.env.VITE_SEARCH_ENGINE}&num=10&searchType=image&q=${query}`)
            const data = await response.json()
            //     params: {
            //         q: query,
            //     },
            // });

            setImages(data.items);
            setSearchResult(data.searchInformation)

            console.log(data)
            console.log("searchInfo", data.searchInformation)
            console.log(data.items)
            console.log(data.spelling.htmlCorrectedQuery)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
            />
            <button type="submit">Search</button>
            <ImageGallery images={images} />
            {/* <div>{searchResult.map((result) => (
                <div>
                    <p>{result.formatted}</p>
                </div>
            ))}</div> */}
        </form>
    );
}

export default SearchForm