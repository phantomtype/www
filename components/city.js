import React from "react";
import PropTypes from "prop-types";

export default class City extends React.Component {
  render() {
    return (
      <section className="photo-container">
        <h2>{this.props.city}</h2>
        <p className="desc">{this.props.description}</p>
        {this.props.children}
        <style jsx>{`
          .photo-container {
            margin: 150px 20px;
          }
          h2 {
            color: #fff;
            text-align: center;
            font-size: 6vw;
            font-weight: 200;
            margin: 60px 0 0 0;
          }
          .desc {
            text-align: center;
            font-size: 2.5vw;
            font-weight: 200;
            color: #ddd;
          }
          `}</style>
      </section>
    );
  }
}

City.propTypes = {
  city: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.object
};
