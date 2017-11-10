import Dom from "react-dom"

import Logomark from "../resouces/images/logomark.svg"

class HelloPT extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ""
    }
  }

  click() {
    this.setState({message: this.state.message + "< hello!"})
  }

  render() {
    return (
      <section>
        <fieldset>
          <div className="hello">
            <button className="mdc-button mdc-button--raised" onClick={this.click.bind(this)}>PRESS ME!</button>
          </div>
          <div className="hello">
            <Logomark/>
            <span className="mdc-typography--headline">{this.state.message}</span>
          </div>
        </fieldset>
        <style jsx>{`
      .hello {
        display: flex;
        justify-content: center;
      }
    `}</style>
      </section>
    )
  }
}

export default HelloPT;