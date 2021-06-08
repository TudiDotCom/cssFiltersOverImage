import React, { Fragment } from "react";
import { Container, Row, Card, CardBody, Col } from "reactstrap";
import { Form, FormText, Input, Label, FormGroup, Button } from "reactstrap";
import "../../assets/css/mycss.css";
import { Spinner } from "reactstrap";
import { remapInterval } from "../../assets/helpers/remapInterval";

const HomeComponent = (props) => {
  //creare optiuni pentru selectorul de filtre
  let filterOptions = [
    <option value="" key="default0">
      Selectati filtrul
    </option>,
  ];

  for (let i = 0; i < props.theFilters.length; i++) {
    filterOptions.push(
      <option key={"filter" + i} value={props.theFilters[i]}>
        {props.theFilters[i].charAt(0).toUpperCase() +
          props.theFilters[i].slice(1)}
      </option>
    );
  }

  //functia care aplica filtrul imaginii si pregateste link ul pentru descarcare
  const createFilteredImageAndDownloadLink = () => {
    if (!props.imageSrc) {
      alert("Trebuie sa selectezi o imagine !");
      return;
    }

    if (!props.filterToApply) {
      alert("Trebuie sa selectezi un filtru !");
      return;
    }

    //creare canvas si desenam pe ea imaginea filtrata
    let myCanvas = document.getElementById("imageDownload");
    let myContext = myCanvas.getContext("2d");
    let img = document.getElementById("originalImage");

    myCanvas.width = img.width; // Assigns image's width to canvas
    myCanvas.height = img.height; // Assigns image's height to canvas

    myContext.filter = getFilterAndIntesity();
    myContext.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);

    //cream linkul pentru descarcare, transform imaginea in format jpeg
    let data = myCanvas.toDataURL("image/jpeg");

    let downloadFile = document.getElementById("downloadImage");
    downloadFile.setAttribute("href", data);
  };

  const getFilterAndIntesity = () => {
    const f = props.filterToApply;
    let v = props.filterIntensity;
    let theFilter = "";

    switch (f) {
      case "blur":
        v = remapInterval(v, 0, 100, 0, 30);
        theFilter = `blur(${v}px)`;
        break;

      case "brightness":
        v = remapInterval(v, 0, 100, 100, 600);
        theFilter = `brightness(${v}%)`;
        break;

      case "contrast":
        v = remapInterval(v, 0, 100, 100, 450);
        theFilter = `contrast(${v}%)`;
        break;

      case "grayscale":
        theFilter = `grayscale(${v}%)`;

        break;

      case "huerotate":
        v = remapInterval(v, 0, 100, 0, 360);
        theFilter = `hue-rotate(${v}deg)`;
        break;

      case "invert":
        theFilter = `invert(${v}%)`;
        break;

      case "opacity":
        theFilter = `opacity(${v}%)`;
        break;

      case "saturate":
        v = remapInterval(v, 0, 100, 0, 500);
        theFilter = `saturate(${v}%)`;
        break;

      case "sepia":
        theFilter = `sepia(${v}%)`;
        break;

      case "shadow":
        let vx = remapInterval(v, 0, 100, -50, 50);
        let vy = remapInterval(v, 0, 100, -50, 50);
        let vi = remapInterval(v, 0, 100, 0, 30);
        theFilter = `drop-shadow(${vx}px ${vy}px ${vi}px red )`;
        break;

      default:
        return;
    }

    // console.log(theFilter);
    return theFilter;
  };

  return (
    <Fragment>
      <Container fluid>
        <Card className="mt-3">
          <CardBody>
            <Row>
              <Col md="6">
                <Form>
                  <FormGroup>
                    <Label for="imageToUpload">Upload Image</Label>
                    <Input
                      type="file"
                      name="theImage"
                      id="imageToUpload"
                      accept="image/*"
                      // onChange={(e) => props.onImageToUpload(e)}
                      onChange={props.onImageToUpload}
                    />
                    <FormText color="muted">idk majn</FormText>
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="select"
                      name="filter"
                      id="filterToApply"
                      onChange={props.onFilterInputChange}
                    >
                      {filterOptions}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="customRange1">Intensitate</Label>
                    <Input
                      type="range"
                      className="formRange"
                      id="customRange1"
                      min="0"
                      max="100"
                      step="5"
                      onChange={props.onIntensityInputChange}
                      defaultValue={props.filterIntensity}
                    ></Input>
                  </FormGroup>
                  {/* spinner pentru a fi afisat pana se incarca imginea */}
                  <div style={{ display: "none" }}>
                    <Spinner color="primary" />
                  </div>

                  <FormGroup>
                    <Button
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        createFilteredImageAndDownloadLink(e);
                        props.filteringIsDone();
                      }}
                    >
                      Aplica filtru
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                {props.imageSrc ? (
                  <img src={props.imageSrc} id="originalImage" />
                ) : (
                  <span>Waiting File...</span>
                )}
              </Col>
              <Col md="6">
                {props.filterToApply ? (
                  <>
                    <a id="downloadImage" download={`image${Date.now()}.jpeg`}>
                      <canvas id="imageDownload" className="img"></canvas>
                      {props.filterDone ? (
                        <Button color="primary">Descarca</Button>
                      ) : (
                        "Press Apply the filter button"
                      )}
                    </a>
                  </>
                ) : null}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default HomeComponent;
