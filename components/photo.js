import React from "react";
import PropTypes from "prop-types";

class PhotosA extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const e = this.props.photo.Exif
    return (
      <div className={`photo-container align-${this.props.align}`}>
        <div className="photo">
          <img src={this.props.src} className="tmb"/>
        </div>
        <div className="exif">
          <span>{e.Make} {e.Model}</span>
          <span>{e.DateTime}</span>
          <span>{e.FocalLength}mm ({e.FocalLengthIn35mmFilm}mm) ／ F{e.FNumber} ／ {e.ExposureTime}S</span>
          <span>ISO {e.ISOSpeedRatings}</span>
        </div>
        <style jsx>{`
      div.photo-container {
        margin: 60px 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 400px;
      }
      .align-0 .exif {
        grid-column: 2;
        grid-row: 1;
        text-align: left;
      }
      .align-0 .photo {
        grid-column: 1;
        grid-row: 1;
        position: relative;
      }
      .align-0 img {
        position: absolute;
        right: 0;
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
        margin: 0px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 10vh;
        color: #ccc;
        font-size: 1.5rem;
        font-weight: 300;
      }
      @media (max-width: 600px){
        div.photo-container {
          margin: 20px 0;
          grid-template-columns: 1fr;
          grid-template-rows: auto;
          height: 100%;
        }
        .align-0 .photo, .align-0 .exif,
        .align-1 .photo, .align-1 .exif {
          grid-column: 1;
          grid-row: auto;
        }
        img.tmb {
          width: 100%;
        }
        .align-0 img {
          position: static;
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
