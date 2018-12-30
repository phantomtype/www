import React from "react";
import PropTypes from "prop-types";
import Scroll from "react-scroll";
// import "isomorphic-fetch";

import Head from "next/head";
import Logomark from "../resouces/images/logomark-white.svg";

import Place from "../components/place";
import City from "../components/city";

class Index extends React.Component {
  scroll() {
    const scroll = Scroll.animateScroll;
    scroll.scrollTo(screen.height, {duration: 500, delay: 100, smooth: true});
  }

  render () {
    return (
      <div>
        <Head>
          <title>PHANTOM TYPE</title>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
          <link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/notosansjp.css"/>
        </Head>

        <section className="splash">
          <img className="splash"
               src="https://storage.googleapis.com/phantomtype-180814.appspot.com/splash/splash-1.jpg"/>
          <div className="title">
            <Logomark className="logo" />
            <h1>PHANTOM TYPE </h1>
          </div>
          <button onClick={this.scroll} className="arrow">▽</button>
        </section>
        <City city={`KANAZAWA 金沢`} description={`The Jewel of Japan`}>
          <Place name="21st Century Museum" c="kanazawa" p="21stCenturyMuseum" />
          <Place name="HIGASHIYAMA 東山" c="kanazawa" p="higashiyama" />
          <Place name="KANAZAWA STATION 金沢駅" c="kanazawa" p="kanazawa-station" />
          <Place name="KANAZAWA-JO 金沢城" c="kanazawa" p="kanazawajo" />
        </City>
        <City city={`KYOTO 京都`} description={`The History of Japan`}>
          <Place name="KIBUNE 貴船" c="kyoto" p="kibune" />
          <Place name="KURAMA 蔵馬" c="kyoto" p="kurama" />
          <Place name="NIJO-JO 二条城" c="kyoto" p="nijojo" />
          <Place name="SHIMOGAMO 下鴨" c="kyoto" p="shimogamo" />
          <Place name="KAMIGAMO 上賀茂" c="kyoto" p="kamigamo" />
          <Place name="KAMOGAWA 鴨川" c="kyoto" p="kamogawa" />
          <Place name="YOSHIDA-JINJA 吉田神社" c="kyoto" p="yoshida" />
        </City>
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
        <footer>(C) PHANTOM TYPE.   <a href="https://twitter.com/phantomtype" rel="noopener noreferrer" target="_blank">Contact us</a></footer>
        <style jsx global>{`
      body {
        font-family: 'Noto Sans JP', Helvetica, sans-serif;
        font-size: 100%;
        background: #000;
      }
      svg.logo {
        width: 25vw;
      }
      footer {
        text-align: center;
        margin: 50px 0;
      }
    `}
        </style>
      </div>
    );
  }
}

Index.propTypes = {
  photos: PropTypes.object
};

export default Index;