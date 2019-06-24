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
          <span className="Place">{this.props.photo.place}</span>
          <span>{e.Make} {e.Model}</span>
          <span>{e.DateTimeOriginal}</span>
          <span>{e.FocalLength.Numerator / e.FocalLength.Denominator} ({e.FocalLengthIn35mmFilm}mm) ／ F{e.FNumber.Numerator / e.FNumber.Denominator} ／ {e.ExposureTime.Numerator} / {e.ExposureTime.Denominator}S</span>
          <span>ISO {e.ISOSpeedRatings}</span>
          <span>{e.LensMake} {e.LensModel}</span>
        </div>
        <style jsx>{`
      .Photo {
        display: flex;
        flex-direction: ${this.props.align == 0 ? "row": "row-reverse"};
        justify-content: flex-start;
        margin: 0 5vw;
      }
      .Photo img {
        max-width: 540px;
        max-height: 540px;
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
          margin: 5px 10px;
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
