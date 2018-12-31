import React from "react";
import PropTypes from "prop-types";

class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const e = this.props.photo.Exif;
    return (
      <div className={`Photo`}>
          <img src={this.props.src} />
        <div className="exif">
          <span className="Place">{this.props.place}</span>
          <span>{e.Make} {e.Model}</span>
          <span>{e.DateTime}</span>
          <span>{e.FocalLength}mm ({e.FocalLengthIn35mmFilm}mm) ／ F{e.FNumber} ／ {e.ExposureTime}S</span>
          <span>ISO {e.ISOSpeedRatings}</span>
        </div>
        <style jsx>{`
      .Photo {
        display: flex;
        flex-direction: ${this.props.align == 0 ? "row": "row-reverse"};
        justify-content: flex-start;
        margin: 0 5vw;
      }
      .Place {
        font-weight: 300;
        font-size: 1.2rem;
        margin-bottom: 10px;
      }
      .exif {
        margin: 0 15px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        text-align: ${this.props.align == 0 ? "left": "right"};
        color: #ccc;
        font-size: 1.0rem;
        font-weight: 200;
      }
      @media (max-width: 600px){
        .Photo {
          flex-direction: column;
          margin: 0;
        }
        img {
          width: 100%;
        }
        .exif {
          margin: 5px 0;
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
