import React, { useState } from 'react'
import { useRouteData } from 'react-static'
import City from "../components/City";
import Scroll from "react-scroll";

export default () => {
  const { photos } = useRouteData()
  const ps = photos.photos
  const [scroll, setScroll] = useState(0)
  var top = 0
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => { setScroll(window.scrollY) });
    top = window.innerHeight - 200
  }
  const [city, setCity] = useState('kyoto')

  function sc(city) {
    setCity(city)
    const scroll = Scroll.animateScroll;
    scroll.scrollTo(screen.height - 100, {duration: 400, delay: 200, smooth: true});
  }

  return (
    <div>
      <section className="splash">
        <img className="splash-image"
             src="https://storage.googleapis.com/phantomtype-180814.appspot.com/splash/splash-1.jpg"/>
        <div className="title">
          <img src='/logomark-white.svg' className="logo" />
          <h1 className='siteTitle'>PHANTOM TYPE</h1>
          <p className='description'>a Japan photo gallery.</p>
        </div>
      </section>
      <section className={`SelectCity Top ${scroll > top ? 'fixed-nav': ''}`}>
        <button onClick={() => sc('kyoto')}>Kyoto</button>
        <button onClick={() => sc('kanazawa')}>Kanazawa</button>
        <button onClick={() => sc('nagoya')}>nagoya</button>
        <button onClick={() => sc('matsushima')}>matsushima</button>
      </section>
      { city == 'kyoto' ? <City city='kyoto' description='History of Japan' photos={ps.filter(p => p.city === "kyoto")} /> : null}
      { city == 'nagoya' ? <City city='nagoya' description='Center of Japan' photos={ps.filter(p => p.city === "nagoya")} /> : null}
      { city == 'kanazawa' ? <City city='kanazawa' description='Jewel of Japan' photos={ps.filter(p => p.city === "kanazawa")} /> : null}
      { city == 'matsushima' ? <City city='matsushima' description='A spot of NIHON-SANKEI' photos={ps.filter(p => p.city === "matsushima")} /> : null}
    </div>
  )}
