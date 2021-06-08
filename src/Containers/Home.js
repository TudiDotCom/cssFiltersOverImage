import React, { Component } from "react";
import HomeComponent from "../Components/Home/HomeComponent";
// import "lena.js/dist/browser";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageToUpload: [],
      imageFiltered: [],
      imageSrc: "",
      filterDone: false,
      filterIntensity: 50,
      filterToApply: "",
      theFilters: [
        "blur",
        "brightness",
        "contrast",
        "grayscale",
        "huerotate",
        "invert",
        "opacity",
        "saturate",
        "sepia",
        "shadow",
      ],
    };
    // console.log();
  }

  render() {
    return (
      <HomeComponent
        onImageToUpload={this.onImageToUpload}
        theFilters={this.state.theFilters}
        imageFiltered={this.state.imageFiltered}
        imageSrc={this.state.imageSrc}
        filterToApply={this.state.filterToApply}
        onFilterInputChange={this.onFilterInputChange}
        onIntensityInputChange={this.onIntensityInputChange}
        filterIntensity={this.state.filterIntensity}
        filteringIsDone={this.filteringIsDone}
        filterDone={this.state.filterDone}
      ></HomeComponent>
    );
  }

  filteringIsDone = () => {
    this.setState({ filterDone: true });
  };
  onIntensityInputChange = (e) => {
    //console.log(e.target.value);
    this.setState({ filterIntensity: e.target.value });
  };

  onFilterInputChange = (e) => {
    this.setState({ filterToApply: e.target.value });
    if (e.target.value === "") {
      this.setState({ filterDone: false });
    }
  };

  onImageToUpload = (e) => {
    // this.setState({ imageToUpload: e.target.files[0] });
    this.setState({ imageSrc: URL.createObjectURL(e.target.files[0]) });
    console.log(e.target.files[0]);
  };
}

export default Home;
