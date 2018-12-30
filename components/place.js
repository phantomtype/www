import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Photo from "../components/photo";

export default class Place extends React.Component {

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
        c: props.c,
        p: props.p
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
      <section className="photo-container">
        <h3>{this.props.name}</h3>
        {
          this.state.photos.map((p, i) => {
            // const src = "https://storage.googleapis.com/phantomtype-180814.appspot.com/" + p.name;
            const src = p.url;
            return <Photo key={i} photo={p} src={src} align={i % 2} />;
          })
        }
        <style jsx>{`
        section.photo-container {
          margin: 120px 0;
        }
        h3 {
          font-size: 4vw;
          font-weight: 200;
          text-transform: uppercase;
          margin: 0 10vw;
          color: #fff;
        }
        @media (max-width: 600px){
          section.photo-container {
            margin: 20px 0;
          }
        }
        `}</style>
      </section>
    );
  }
}

Place.propTypes = {
  photos: PropTypes.object,
  c: PropTypes.string,
  p: PropTypes.string,
  name: PropTypes.string
};

