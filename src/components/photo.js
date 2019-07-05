import React from "react";
import PropTypes from "prop-types";

class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const e = this.props.photo.Exif;
    return (
      <div className={`Photo ${this.props.align == 1 ? "Photo-right": null}`}>
          <img src={this.props.src} />
        <div className={`exif ${this.props.align == 1 ? "exif-right": null}`}>
          <span className="Place">{this.props.photo.place}</span>
          <span>{e.Make} {e.Model}</span>
          <span>{e.DateTimeOriginal}</span>
          <span>{e.FocalLength.Numerator / e.FocalLength.Denominator}mm ({e.FocalLengthIn35mmFilm}mm) ／ F{e.FNumber.Numerator / e.FNumber.Denominator} ／ {e.ExposureTime.Numerator} / {e.ExposureTime.Denominator}S</span>
          <span>ISO {e.ISOSpeedRatings}</span>
          <span>{e.LensMake} {e.LensModel}</span>
        </div>
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
