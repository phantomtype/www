import React from 'react'

class PhotosA extends React.Component {
  render () {
    return (
      this.props.photos.photos.map((p, i) =>
        <div key={i} className={`photo-container align-${i % 2}`}>
          <div className="photo">
            <img className="tmb" src={"https://storage.googleapis.com/phantomtype-180814.appspot.com/" + p.name}/>
          </div>
          <div className="exif">
            <p>X-Pro2</p>
          </div>
          <style jsx>{`
      div.photo-container {
        display: flex;
        margin: 90px 0px;
      }
      .align-0 {
        justify-content: flex-start;
      }
      .align-1 {
        justify-content: flex-end;
      }
      .align-1 .photo {
        order: 1;
      }
      .exif {
        margin: 0 15px;
      }
      img.tmb {
        width: 100%;
      }
    `}</style>
        </div>
      )
    )
  }
}

export default PhotosA
