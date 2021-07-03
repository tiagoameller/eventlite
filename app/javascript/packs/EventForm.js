import React from 'react'

class EventForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: "",
      start_datetime: "",
      location: ""
    }
    // this.handleInput = this.handleInput.bind(this)
  }

  /* tip:
     Arrow functions use lexical binding, so this function will automatically bind to the component
     instance, instead of defaulting to an undefined context.
  */
  // handleInput (event) {
  handleInput = (event) => {
    const name = event.target.name
    const newState = {}
    newState[name] = event.target.value
    this.setState(newState)
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <h4>Create an Event:</h4>
        <form>
          <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInput} />
          <input type="text" name="start_datetime" placeholder="Date" value={this.state.start_datetime} onChange={this.handleInput} />
          <input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleInput} />
          <button type="submit">Create Event</button>
        </form>
      </div>
    )
  }
}

export default EventForm
