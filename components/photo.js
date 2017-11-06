import React from "react"

import EXIF from "exif-js"

class PhotosA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Model: "",
      Make: "",
      DateTime: "",
      FNumber: "",
      ISOSpeedRatings: "",
      FocalLength: "",
      FocalLengthIn35mmFilm: "",
      ExposureTime: ""
    }
  }

  imageOnLoad(...args) {
    const [event, ...otherArgs] = args;
    const imageElement: HTMLImageElement = event.target;

    const windowImage = window.Image;
    window.Image = null;

    if (!EXIF.getData(imageElement, () => {
        console.log(EXIF.getAllTags(imageElement));
        this.setState({
          Make: EXIF.getTag(imageElement, "Make"),
          Model: EXIF.getTag(imageElement, "Model"),
          DateTime: EXIF.getTag(imageElement, "DateTimeOriginal"),
          FNumber: EXIF.getTag(imageElement, "FNumber").toString(),
          ISOSpeedRatings: EXIF.getTag(imageElement, "ISOSpeedRatings"),
          FocalLength: EXIF.getTag(imageElement, "FocalLength").toString(),
          FocalLengthIn35mmFilm: EXIF.getTag(imageElement, "FocalLengthIn35mmFilm").toString(),
          ExposureTime: EXIF.getTag(imageElement, "ExposureTime"),
        })
      })) {
    }

    window.Image = windowImage;
  }

  render() {
    return (
      <div key={this.props.key} className={`photo-container align-${this.props.align}`}>
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
        display: flex;
        margin: 90px 0px;
      }
      .align-0 {
        justify-content: flex-start;
      }
      .align-1 {
        justify-content: flex-end;
      }
      .align-1 .photo {
        order: 1;
      }
      .exif {
        margin: 0 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 10vh;
        color: #999;
        font-size: 85%;

      }
      img.tmb {
        width: 100%;
      }
    `}</style>
      </div>
    )
  }
}

export default PhotosA
