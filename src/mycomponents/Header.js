import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  Navbar,
  ProgressBar,
} from "react-bootstrap";
import {storage,firestore} from '../API/Firebase';

const Header = ({images,setImages,setAllImages}) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);

  const submit = (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Please add a file");
    }

    const filterImages = images.filter((img) => img.data.name === file.name);
    if (filterImages.length > 0){
      setFile("");
      return alert("This image is already present");
    }

    const uploadFileRef=storage.ref(`images/${file.name}`);
    uploadFileRef.put(file).on("state_change",(snapshot)=>{
      const newProgress=Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(newProgress);
    },(error)=>{
      console.log(error)
    },async()=>{
      const url=await uploadFileRef.getDownloadURL();

      firestore.collection("images").add({
        name: file.name,
        url:url,
        createdAt: new Date()
      }).then(async doc=>{
        const docData=await doc.get();
        setImages(prevImages=>[...prevImages,
          {data:docData.data(), id:docData.id}
        ]);
        setAllImages(prevImages=>[...prevImages,
          {data:docData.data(), id:docData.id}
        ]);
        setProgress(0);
        setFile("");
        setShowModal(false);
      }).catch(err=>{
        console.log(err)
      });
    })
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {progress?"Uploading":"Upload Image"}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            progress? (
              <ProgressBar variant="primary" now={progress} />
            ):(
              <Form onSubmit={submit}>
            <Form.Group controlId="formBasicFile">
              <input
                className="form-control"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/png, image/jpg, image/jpeg, video/mp4, video/mkv"
              />
            </Form.Group>
            <Form.Group controlId="formBasicBtn" className="my-2">
              <Button
                variant="dark"
                bg="dark"
                type="submit"
                className="form-control"
              >
                Save
              </Button>
            </Form.Group>
          </Form>
            )
          }
        </Modal.Body>
      </Modal>
      <Navbar expand={"lg"} bg="dark" variant="dark">
        <Navbar.Brand href="/mygallery" style={{ marginLeft: "50px" }}>
          My Gallery
        </Navbar.Brand>

        <Button
          variant="outline-light"
          bg="light"
          size="sm"
          style={{ marginLeft: "auto", marginRight: "50px" }}
          onClick={()=>setShowModal(true)}
        >
          Upload
        </Button>
      </Navbar>
    </>
  );
};

export default Header;
