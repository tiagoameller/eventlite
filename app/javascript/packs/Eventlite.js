import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

import EventsList from "./EventsList"
import EventForm from "./EventForm"
import FormErrors from "./FormErrors"

class Eventlite extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: this.props.events,
      title: '',
      start_datetime: '',
      location: '',
      formErrors: {}
    }
  }

  handleInput = (event) => {
    event.preventDefault()
    const name = event.target.name
    const newState = {}
    newState[name] = event.target.value
    this.setState(newState)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newEvent = {
      title: this.state.title,
      start_datetime: this.state.start_datetime,
      location: this.state.location
    }
    axios({
      method: "POST",
      url: "/events",
      data: { event: newEvent },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then(response => {
      this.addNewEvent(response.data)
      this.resetFormErrors()
    })
    .catch(error => {
      console.log(error.response.data)
      this.setState({formErrors: error.response.data})
    })
  }

  addNewEvent = (event) => {
    const events = [event, ...this.state.events].sort((a,b) => {
      return new Date(b.start_datetime) - new Date(a.start_datetime)
    })
    this.setState({events: events})
  }

  resetFormErrors () {
    this.setState({formErrors: {}})
  }

  render () {
    return(
      <div>
        <FormErrors formErrors = {this.state.formErrors} />
        <EventForm
          handleInput = {this.handleInput}
          handleSubmit = {this.handleSubmit}
          title = {this.state.title}
          start_datetime = {this.state.start_datetime}
          location = {this.state.location}
        />
        <EventsList events={this.state.events} />
      </div>
    )
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("events_data")
  const data = JSON.parse(node.getAttribute("data"))
  ReactDOM.render(
    <Eventlite events={data}/>,
    document.body.appendChild(document.createElement("div"))
  )
})
