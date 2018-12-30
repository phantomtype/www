import React from "react";
import PropTypes from "prop-types";
import Scroll from "react-scroll";
// import "isomorphic-fetch";
import axios from "axios";

import Layout from "../components/layout";
import Logomark from "../resouces/images/logomark-white.svg";

import PhotosA from "../components/photo";

class Photos extends React.Component {

  constructor(props) {
    super(props)
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
            return <PhotosA key={i} photo={p} src={src} align={i % 2} />;
          })
        }
        <style jsx>{`
        section.photo-container {
          margin: 120px 0;
        }
        h3 {
          font-size: 3vw;
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

Photos.propTypes = {
  photos: PropTypes.object,
  c: PropTypes.string,
  p: PropTypes.string,
  name: PropTypes.string
};

class PhotoContainer extends React.Component {
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
            font-size: 5rem;
            margin: 60px 0 0 0;
          }
          .desc {
            text-align: center;
            font-size: 2.5vw;
            font-weight: 300;
            color: #ddd;
          }
          `}</style>
      </section>
    );
  }
}

PhotoContainer.propTypes = {
  city: PropTypes.string,
  description: PropTypes.string
}

class Index extends React.Component {
  scroll() {
    var scroll = Scroll.animateScroll;
    scroll.scrollTo(screen.height, {duration: 500, delay: 100, smooth: true});
  }

  render () {
    return (
      <Layout title="PHANTOM TYPE">
        <section className="splash">
          <img className="splash"
               src="https://storage.googleapis.com/phantomtype-180814.appspot.com/splash/splash-1.jpg"/>
          <div className="title">
            <Logomark className="logo" />
            <h1>PHANTOM TYPE </h1>
          </div>
          <button onClick={this.scroll} className="arrow">▽</button>
        </section>
        <PhotoContainer city={`KANAZAWA 金沢`} description={`The Jewel of Japan`}>
          <Photos name="21st Century Museum" c="kanazawa" p="21stCenturyMuseum" />
          <Photos name="HIGASHIYAMA 東山" c="kanazawa" p="higashiyama" />
          <Photos name="KANAZAWA STATION 金沢駅" c="kanazawa" p="kanazawa-station" />
          <Photos name="KANAZAWA-JO 金沢城" c="kanazawa" p="kanazawajo" />
        </PhotoContainer>
        <PhotoContainer city={`KYOTO 京都`} description={`The History of Japan`}>
          <Photos name="KIBUNE 貴船" c="kyoto" p="kibune" />
          <Photos name="KURAMA 蔵馬" c="kyoto" p="kurama" />
          <Photos name="NIJO-JO 二条城" c="kyoto" p="nijojo" />
          <Photos name="SHIMOGAMO 下鴨" c="kyoto" p="shimogamo" />
          <Photos name="KAMIGAMO 上賀茂" c="kyoto" p="kamigamo" />
          <Photos name="KAMOGAWA 鴨川" c="kyoto" p="kamogawa" />
          <Photos name="YOSHIDA-JINJA 吉田神社" c="kyoto" p="yoshida" />
        </PhotoContainer>
        <style jsx>{`
      section.splash {
        width: 100%;
        height: 100vh;
      }
      img.splash {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .title {
        display: inline-flex;
        flex-direction: column;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -60%, 0);
        justify-content: center;
        align-items: center;
      }
      h1 {
        margin: 1vh 0;
        color: #fff;
        font-size: 5.52768vw;
        font-weight: 200;
      }
      .arrow {
        position: absolute;
        font-size: 4vw;
        bottom: 10vh;
        left: 50%;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        transform: translate3d(-50%, 0, 0);
      }
      button {
        background-color: initial;
        cursor: pointer;
        border: none;
      }
    `}</style>
      </Layout>
    );
  }
}

Index.propTypes = {
  photos: PropTypes.object
};

export default Index;