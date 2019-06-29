import React from "react";
import PropTypes from "prop-types";
import Scroll from "react-scroll";

import Head from "next/head";
import Logomark from "../resouces/images/logomark-white.svg";

import City from "../components/city";


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cities: ["kyoto"]};
    this.handleScroll = this.handleScroll.bind(this);
  }

  scroll() {
    const scroll = Scroll.animateScroll;
    scroll.scrollTo(screen.height - 100, {duration: 400, delay: 500, smooth: true});
  }

  clickCity(city) {
    this.setState({cities: [city]});
    this.scroll();
  }

  handleScroll() {
    this.setState({scroll: window.scrollY});
  }

  componentDidMount() {
    const el = document.querySelector('.Top');
    this.setState({top: el.offsetTop, height: el.offsetHeight});
    window.addEventListener('scroll', this.handleScroll);
  }

  SelectCity() {
    return <section className={`SelectCity Top ${this.state.scroll > this.state.top ? "fixed-nav" : ""}`}>
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
      .Top.fixed-nav {
        top: 5%;
        position: fixed;
        bottom: initial;
        background-color: rgb(0, 0, 0, 0.4);
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
        .Top.fixed-nav {
          top: 0%;
          position: fixed;
          bottom: initial;
          background-color: rgb(0, 0, 0, 0.4);
        }
        .fixed-nav button {
          padding: 5px 0;
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
            <City city={`kanazawa`} description={`The Jewel of Japan`} /> : null
        }
        {
          this.state.cities.indexOf('kyoto') != -1 ?
            <City city={`kyoto`} description={`The History of Japan`} /> : null
        }
        {
          this.state.cities.indexOf('nagoya') != -1 ?
            <City city={`nagoya`} description={`The Center of Japan`} /> : null
        }
        {
          this.state.cities.indexOf('matsushima') != -1 ?
            <City city={`matsushima`} description={`A Spot of the NIHON SANKEI`} /> : null
        }
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