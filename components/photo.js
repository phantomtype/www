import React from "react";
import PropTypes from "prop-types";

import EXIF from "exif-js";

class PhotosA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Model: "",
      Make: "",
      DateTime: "",
      FNumber: "",
      ISOSpeedRatings: "",
      FocalLength: "",
      FocalLengthIn35mmFilm: "",
      ExposureTime: ""
    };
  }

  imageOnLoad(...args) {
    const [event, ..._] = args;
    const imageElement: HTMLImageElement = event.target;

    const windowImage = window.Image;
    window.Image = null;

    if (!EXIF.getData(imageElement, () => {
        this.setState({
          Make: EXIF.getTag(imageElement, "Make"),
          Model: EXIF.getTag(imageElement, "Model"),
          DateTime: EXIF.getTag(imageElement, "DateTimeOriginal"),
          FNumber: EXIF.getTag(imageElement, "FNumber").toString(),
          ISOSpeedRatings: EXIF.getTag(imageElement, "ISOSpeedRatings"),
          FocalLength: EXIF.getTag(imageElement, "FocalLength").toString(),
          FocalLengthIn35mmFilm: EXIF.getTag(imageElement, "FocalLengthIn35mmFilm").toString(),
          ExposureTime: EXIF.getTag(imageElement, "ExposureTime"),
        });
      })) {
    }

    window.Image = windowImage;
  }

  render() {
    return (
      <div className={`photo-container align-${this.props.align}`}>
        <div className="photo">
          <img src={this.props.src} onClick={this.imageOnLoad.bind(this)} onLoad={this.imageOnLoad.bind(this)} className="tmb"/>
        </div>
        <div className="exif">
          <span>{this.state.Make} {this.state.Model}</span>
          <span>{this.state.DateTime}</span>
          <span>{this.state.FocalLength}mm ({this.state.FocalLengthIn35mmFilm}mm) ／ F{this.state.FNumber} ／ {this.state.ExposureTime.numerator}/{this.state.ExposureTime.denominator}S</span>
          <span>ISO {this.state.ISOSpeedRatings}</span>
        </div>
        <style jsx>{`
      div.photo-container {
        margin: 90px 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
      .align-0 .exif {
        grid-column: 2;
        grid-row: 1;
        text-align: left;
      }
      .align-0 .photo {
        grid-column: 1;
        grid-row: 1;
      }
      .align-1 .exif {
        grid-column: 1;
        grid-row: 2;
        text-align: right;
      }
      .align-1 .photo {
        grid-column: 2;
        grid-row: 2;
      }
      .exif {
        margin: 20px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 10vh;
        color: #999;
        font-size: 85%;
      }
      @media (max-width: 600px){
        div.photo-container {
          margin: 20px 3px;
          grid-template-columns: 1fr;
          grid-template-rows: auto;
        }
        .align-0 .photo, .align-0 .exif,
        .align-1 .photo, .align-1 .exif {
          grid-column: 1;
          grid-row: auto;
        }
        img.tmb {
          width: 100%;
        }
        .exif {
          margin: 5px 15px;
        }
      }
    `}</style>
      </div>
    );
  }
}

PhotosA.propTypes = {
  src: PropTypes.string,
  align: PropTypes.number
};

export default PhotosA;
