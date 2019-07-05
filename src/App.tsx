import React from 'react'
import { Root, addPrefetchExcludes } from 'react-static'
// import { Link, Router } from '@reach/router'
// import FancyDiv from 'components/FancyDiv'
// import Dynamic from 'containers/Dynamic'
import './app.css'
import City from 'components/City';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {
  return (
    <Root>
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/dynamic">Dynamic</Link>
      </nav> */}
      <section className="splash">
        <img className="splash"
             src="https://storage.googleapis.com/phantomtype-180814.appspot.com/splash/splash-1.jpg"/>
        <div className="title">
          <img src='/logomark-white.svg' className="logo" />
          <h1>PHANTOM TYPE </h1>
          <p>A Japan photo gallery</p>
        </div>
      </section>
      <section className={`SelectCity Top`}>
        <a href="#kanazawa">Kanazawa</a>
        <a href="#kyoto">Kyoto</a>
        <a href="#nagoya">Nagoya</a>
        <a href="#matsushima">Matsushima</a>
      </section>

      <City city={`kanazawa`} description={`The Jewel of Japan`} />
      <City city={`kyoto`} description={`The History of Japan`} />
      <City city={`nagoya`} description={`The Center of Japan`} />
      <City city={`matsushima`} description={`A Spot of the NIHON SANKEI`} />
      {/* <div className="content">
        <FancyDiv>
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Dynamic path="dynamic" />
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </FancyDiv>
      </div> */}
    </Root>
  )
}

export default App
