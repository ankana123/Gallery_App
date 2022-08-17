import React from 'react'
import { Button, Card, Col,Container,Row } from 'react-bootstrap';
import { firestore, storage } from '../API/Firebase';


const Images = ({ images, setAllImages, allImages, setImages }) => {
  const deleteImage = (url, docId) => {
    storage
      .refFromURL(url)
      .delete()
      .then(() => {
        firestore
          .collection("images")
          .doc(docId)
          .delete()
          .then(() => {
            setAllImages(allImages.filter((image) => image.data.url !== url));
            setImages(allImages.filter((image) => image.data.url !== url));
            alert("Deleted successfully!!");
          });
      });
  };
  return (
    <Container fluid>
      <Row className='text-center px-5'>
        {
          images.length>0? images.map((image,index)=>(
            <Card className='mb-2 mx-1 mx-auto col-md-3' style={{ width: '17rem'}} key={index}>
              <Card.Img src={image.data.url} alt={image.data.name} style={{height:"180px", width:"250px"}} />
              <Card.Body>
                <Card.Title>{image.data.name}</Card.Title>
              </Card.Body>
              <Card.Footer className='bg-white'>
                <Button type='button' variant="danger" onClick={()=>deleteImage(image.data.url,image.id)} >Delete</Button>
              </Card.Footer>
            </Card>
          )):
        <Col md={12}>
          <h1 className='text-center my-5'>No Images Found</h1>
        </Col>
        }
      </Row>
    </Container>
  )
}

export default Images
