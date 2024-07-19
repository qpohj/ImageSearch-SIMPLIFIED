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
        const images = await loadImages(user?.email ?? "");
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
        deleteImageFromServer(user?.email ?? "", url)
          .then((response) => {
            if (response) {
              setSavedImages(
                savedImages.filter((imageURL) => imageURL !== url)
              );
            }
          })
          .catch((error) => console.error("Error:", error));
      } else {
        saveImageToServer(user?.email ?? "", url)
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
          <span>Google Search</span>
          <div>
            <UserData user={user} />
            <LogoutButton />
          </div>
        </div>
        <div>
          <div>
            <span>Search</span>
            <hr />
            <SearchForm saveImage={saveImage} savedImages={savedImages} />
          </div>
          <div className="col-md-4">
            <span className="h5">Favorites</span>
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
