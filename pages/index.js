import React from "react";
import PropTypes from "prop-types";
import Scroll from "react-scroll";
// import "isomorphic-fetch";

import Head from "next/head";
import Logomark from "../resouces/images/logomark-white.svg";

import Place from "../components/place";
import City from "../components/city";


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cities: ['kyoto', 'kanazawa', 'nagoya']};
  }

  scroll() {
    const scroll = Scroll.animateScroll;
    scroll.scrollTo(screen.height - 100, {duration: 400, delay: 200, smooth: true});
  }

  clickCity(city) {
    this.setState({cities: [city]});
    this.scroll();
  }

  SelectCity(top=false) {
    return <section className={`SelectCity ${top ? 'Top': ''}`}>
      <button type="button" onClick={this.clickCity.bind(this, 'kyoto')}>KYOTO</button>
      <button type="button" onClick={this.clickCity.bind(this, 'kanazawa')}>KANAZAWA</button>
      <button type="button" onClick={this.clickCity.bind(this, 'nagoya')}>NAGOYA</button>
      <button type="button" onClick={this.clickCity.bind(this, 'matsushima')}>MATSUSHIMA</button>
      <style jsx>{`
      .SelectCity {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .Top {
        position: absolute;
        left: 50%;
        bottom: 10vh;
        transform: translate3d(-50%, -60%, 0);
      }
      .SelectCity button {
        background-color: transparent;
        color: #fff;
        padding: 15px 3vw;

        cursor: pointer;
      }
      .SelectCity button:hover {
        background-color: #000;
      }
      @media (max-width: 600px){
        .SelectCity {
          width: 100%;
          bottom: 0;
          left: 0;
          transform: none;
          flex-direction: column;
        }
      }
`}</style>
    </section>;
  }

  render () {
    return (
      <div>
        <Head>
          <title>PHANTOM TYPE</title>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
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
        </section>
        {this.SelectCity(true)}
        {
          this.state.cities.indexOf('kanazawa') != -1 ?
            <City city={`KANAZAWA 金沢`} description={`The Jewel of Japan`}>
              <Place name="21st Century Museum" c="kanazawa" p="21stCenturyMuseum" />
              <Place name="HIGASHIYAMA 東山" c="kanazawa" p="higashiyama" />
              <Place name="KANAZAWA STATION 金沢駅" c="kanazawa" p="kanazawa-station" />
              <Place name="KANAZAWA-JO 金沢城" c="kanazawa" p="kanazawajo" />
            </City>
            : null
        }
        {
          this.state.cities.indexOf('kyoto') != -1 ?
            <City city={`KYOTO 京都`} description={`The History of Japan`}>
              <Place name="fushimiinari 伏見稲荷" c="kyoto" p="fushimiinari" />
              <Place name="gosyo 御所" c="kyoto" p="gosyo" />
              <Place name="ryoanji 龍安寺" c="kyoto" p="ryoanji" />
              <Place name="KIBUNE 貴船" c="kyoto" p="kibune" />
              <Place name="KURAMA 蔵馬" c="kyoto" p="kurama" />
              <Place name="byodoin 平等院" c="kyoto" p="byodoin" />
              <Place name="higashihonganji 東本願寺" c="kyoto" p="higashihonganji" />
              <Place name="syoseien 渉成園" c="kyoto" p="syoseien" />
              <Place name="NIJO-JO 二条城" c="kyoto" p="nijojo" />
              <Place name="kiyomizu 清水" c="kyoto" p="kiyomizu" />
              <Place name="SHIMOGAMO 下鴨" c="kyoto" p="shimogamo" />
              <Place name="KAMIGAMO 上賀茂" c="kyoto" p="kamigamo" />
              <Place name="KAMOGAWA 鴨川" c="kyoto" p="kamogawa" />
              <Place name="YOSHIDA-JINJA 吉田神社" c="kyoto" p="yoshida" />
            </City>
            : null
        }
        {
          this.state.cities.indexOf('nagoya') != -1 ?
            <City city={`NAGOYA 名古屋`} description={`The Center of Japan`}>
              <Place name="SAKAE 栄" c="nagoya" p="sakae" />
              <Place name="HOSHIGAOKA 星ヶ丘" c="nagoya" p="hoshigaoka" />
            </City>
            : null
        }
        {
          this.state.cities.indexOf('matsushima') != -1 ?
            <City city={`MATSUHIMA 松島`} description={`A Spot of the NIHON SANKEI`}>
              <Place name="FUKUURAJIMA 福浦島" c="matsushima" p="fukuurajima" />
              <Place name="entuuin 円通院" c="matsushima" p="entuuin" />
            </City>
            : null
        }
        {this.SelectCity()}
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
        color: #fff;
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