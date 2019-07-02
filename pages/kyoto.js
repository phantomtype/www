import React from "react";
import PropTypes from "prop-types";

import City from "../components/city";

class Kyoto extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (<City city={`kyoto`} description={`The History of Japan`} />);
  }
}

Kyoto.propTypes = {
  photos: PropTypes.object
};

export default Kyoto;
