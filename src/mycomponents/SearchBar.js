import React, { useEffect, useState } from "react";
import { Col, Container, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ images,setImages }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setImages(
      images.filter((image) =>
        image.data.name.toLowerCase().includes(text.trim())
      )
    );
  }, [text]);

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto my-5">
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <input
              type="text"
              className="form-control"
              placeholder={"Search.."}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
