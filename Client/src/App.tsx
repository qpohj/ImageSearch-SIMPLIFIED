import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import './App.css';
import SavedImages from './component/SavedImages';
import SearchForm from './component/SearchForm';
import UserData from './component/UserData';
import LoginButton from './component/buttons/LoginButton';
import LogoutButton from './component/buttons/LogoutButton';
import { deleteImageFromServer, loadImages, saveImageToServer } from './services';

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [savedImages, setSavedImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await loadImages(user?.nickname ?? "");
        setSavedImages(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (isAuthenticated) {
      fetchImages();
    }
  }, [isAuthenticated]);

  const saveImage = (url: string): (() => void) => {
    try {
      if (savedImages.includes(url)) {
        console.log(user?.profile)
        deleteImageFromServer(user?.nickname ?? "", url)
          .then((response) => {
            if (response) {
              setSavedImages(
                savedImages.filter((imageURL) => imageURL !== url)
              );
            }
          })
          .catch((error) => console.error("Error:", error));
      } else {
        saveImageToServer(user?.nickname ?? "", url)
          .then((response) => {
            if (response) {
              setSavedImages([...savedImages, url]);
            }
          })
          .catch((error) => console.error("Error:", error));
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return () => { };
  };




  return isAuthenticated ? (
    <>
      <div>
        <div>
          <h1>Google Search</h1>
          <div>
            <UserData user={user} />
            <LogoutButton/>
          </div>
        </div>
        <div>
          <div>
            <h2>Search</h2>
            <hr />
            <SearchForm saveImage={saveImage} savedImages={savedImages} />
          </div>
          <div>
            <h2>Favorited</h2>
            <hr />
            <SavedImages saveImage={saveImage} savedImages={savedImages} />
          </div>
        </div>
      </div>
    </>
  ) : isLoading ? (
    <>Loading status</>
  ) : (
    <>
      <LoginButton />
    </>
  );
}

export default App
