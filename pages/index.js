import React from "react";
import PropTypes from "prop-types";
import Scroll from "react-scroll";
import "isomorphic-fetch";

import Layout from "../components/layout";
import Logomark from "../resouces/images/logomark-white.svg";

import PhotosA from "../components/photo";

class Photos extends React.Component {
  render() {
    return (
      <section className="photo-container">
        <h3>{this.props.name}</h3>
        {
          this.props.photos.photos.map((p, i) => {
            const src = "https://storage.googleapis.com/phantomtype-180814.appspot.com/" + p.name;
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
  photos: PropTypes.object
};

class Index extends React.Component {
  static async getInitialProps () {
    const kibune = await Index.getPhotos("kyoto/kibune");
    const kurama = await Index.getPhotos("kyoto/kurama");
    const nijojo = await Index.getPhotos("kyoto/nijojo");
    const shimogamo = await Index.getPhotos("kyoto/shimogamo");
    const kamigamo = await Index.getPhotos("kyoto/kamigamo");
    const kamogawa = await Index.getPhotos("kyoto/kamogawa");

    return {photos: {kibune, kurama, nijojo, shimogamo, kamigamo, kamogawa}};
  }

  static async getPhotos(src: string) {
    // const baseUrl = "https://phantomtype.com";
    const baseUrl = "http://localhost:8080"
    const res = await fetch(baseUrl + "/hello?d=" + src);
    const json = await res.json();
    console.log(baseUrl);
    console.log(json);
    return json;
  }

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
        <section className="photo-container">
          <h2>KYOTO 京都</h2>
          <p className="desc">THE HISTORY OF JAPAN.</p>
          <Photos name="KIBUNE 貴船" photos={this.props.photos.kibune} />
          <Photos name="KURAMA 蔵馬" photos={this.props.photos.kurama} />
          <Photos name="NIJO-JO 二条城" photos={this.props.photos.nijojo} />
          <Photos name="SHIMOGAMO 下鴨" photos={this.props.photos.shimogamo} />
          <Photos name="KAMIGAMO 上賀茂" photos={this.props.photos.kamigamo} />
          <Photos name="KAMOGAWA 鴨川" photos={this.props.photos.kamogawa} />
        </section>
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
      .photo-container {
        margin: 150px 20px;
      }
      h2 {
        text-align: center;
        font-size: 5vw;
        margin: 30px 0;
      }
      .desc {
        text-align: center;
        font-size: 2.5vw;
        font-weight: 300;
        color: #999;
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