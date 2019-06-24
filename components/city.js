import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Photo from "../components/photo";


export default class City extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
    const self = this;
    // const host = "http://localhost:8080";
    const host = "https://phantomtype.com";
    axios.get(host + '/hello', {
      params: {
        c: props.city,
      }
    }).then(function (response) {
      self.setState({
        photos: response.data.photos
      });
    }).catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <section className={`City`}>
        <h2>{this.props.city}</h2>
        <p className="desc">{this.props.description}</p>
          {
            this.state.photos.map((p, i) => {
              // const src = "https://storage.googleapis.com/phantomtype-180814.appspot.com/" + p.name;
              const src = p.url;
              return <Photo key={i} photo={p} src={src} align={i % 2} />;
            })
          }
        <style jsx>{`
          .City {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 60px;
            margin: 50px 20px;
          }
          h2 {
            color: #fff;
            text-align: center;
            font-size: 2.5rem;
            font-weight: 200;
            margin: 60px 0 0 0;
            text-transform: uppercase;
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
  photos: PropTypes.object,
  description: PropTypes.string,
  children: PropTypes.objectOf(City)
};
