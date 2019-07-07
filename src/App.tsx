import React from 'react'
import {Root, Routes} from 'react-static'
import { Router } from '@reach/router'
import Dynamic from 'containers/Dynamic'
import './app.scss'

// Any routes that start with 'dynamic' will be treated as non-static routes
// addPrefetchExcludes(['dynamic'])

function App() {
  return (
    <Root>
      <div className="content">
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Dynamic path="dynamic" />
              <Routes path="*" />
            </Router>
          </React.Suspense>
      </div>
    </Root>
  )
}

export default App
