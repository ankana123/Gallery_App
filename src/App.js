import './App.css';
import Header from './mycomponents/Header';
import Register from './mycomponents/Register';
import Login from './mycomponents/Login';
import Images from './mycomponents/Images';
import SearchBar from './mycomponents/SearchBar';
import Pages from './mycomponents/Pages';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { firestore } from './API/Firebase';


function App() {
  let remail, rpassword, lemail, lpassword
  const regdetails = (email, password) => {
    remail = email;
    rpassword = password;
  }
  const logindetails = (email, password) => {
    lemail = email;
    lpassword = password;
  }
  const check = () => {
    if (remail !== lemail || rpassword !== lpassword) {
      return false;
    }
    else {
      return true;
    }
  }

  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(10);


  useEffect(() => {
    firestore
      .collection("images")
      .get()
      .then((images) => {
        const allImages = [];
        images.forEach((img) => {
          allImages.push({ data: img.data(), id: img.id });
        });

        setAllImages(allImages);
        setImages(allImages);
      });
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImage = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers)
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path='/Gallery_App' element={
            <Register regdetails={regdetails} />
          } />
          <Route path='/Gallery_App/login' element={
            <Login logindetails={logindetails} check={check} email={remail} />
          } />
          <Route path='/Gallery_App/mygallery' element={
            <>
              <Header images={allImages}
                setImages={setImages}
                setAllImages={setAllImages} />
              <SearchBar images={allImages} setImages={setImages} />
              <Images images={currentImage}
                allImages={allImages}
                setAllImages={setAllImages}
                setImages={setImages} />
              <Pages imagesPerPage={imagesPerPage} totalImages={images.length} paginate={paginate} />
            </>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
