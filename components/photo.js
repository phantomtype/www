import React from "react";
import PropTypes from "prop-types";

class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const e = this.props.photo.Exif;
    return (
      <div className={`Photo align-${this.props.align}`}>
        <div className="photo">
          <img src={this.props.src} className="tmb"/>
        </div>
        <div className="exif">
          <span className="Place">{this.props.place}</span>
          <span>{e.Make} {e.Model}</span>
          <span>{e.DateTime}</span>
          <span>{e.FocalLength}mm ({e.FocalLengthIn35mmFilm}mm) ／ F{e.FNumber} ／ {e.ExposureTime}S</span>
          <span>ISO {e.ISOSpeedRatings}</span>
        </div>
        <style jsx>{`
      .Photo {
        margin: 40px 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 370px;
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
      .Place {
        font-weight: 300;
        font-size: 1.2rem;
        margin-bottom: 10px;
      }
      .exif {
        margin: 0px 15px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        color: #ccc;
        font-size: 1.0rem;
        font-weight: 200;
      }
      @media (max-width: 600px){
        .Photo {
          margin: 40px 0;
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

Photo.propTypes = {
  src: PropTypes.string,
  align: PropTypes.number,
  photo: PropTypes.object
};

export default Photo;
