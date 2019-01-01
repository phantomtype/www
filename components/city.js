import React from "react";
import PropTypes from "prop-types";

export default class City extends React.Component {
  render() {
    return (
      <section className="City">
        <h2>{this.props.city}</h2>
        <p className="desc">{this.props.description}</p>
        {this.props.children}
        <style jsx>{`
          .City {
            margin: 50px 20px;
          }
          h2 {
            color: #fff;
            text-align: center;
            font-size: 2.5rem;
            font-weight: 200;
            margin: 60px 0 0 0;
          }
          .desc {
            text-align: center;
            font-size: 1.6rem;
            font-weight: 200;
            color: #ddd;
          }
          @media (max-width: 600px){
            .City {
              margin: 50px 0;
            }
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
