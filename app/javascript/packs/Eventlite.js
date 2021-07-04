import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

import EventsList from "./EventsList"
import EventForm from "./EventForm"
import FormErrors from "./FormErrors"

import validations from "../validations"

class Eventlite extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: this.props.events,
      title: {value: "", valid: false},
      start_datetime: {value: "", valid: false},
      location: {value: "", valid: false},
      formErrors: {},
      formValid: false
    }
  }

  static formValidations = {
    title: [
      (value) => { return(validations.checkMinLength(value, 3)) }
    ],
    start_datetime: [
      (value) => { return(validations.checkMinLength(value, 1)) },
      (value) => { return(validations.timeShouldBeInTheFuture(value)) }
    ],
    location: [
      (value) => { return(validations.checkMinLength(value, 1)) }
    ]
  }

  handleInput = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    const newState = {}
    newState[name] = {...this.state[name], value: value}
    // We can pass a validation function as the second optional argument to setState.
    this.setState(newState, () => this.validateField(name, value, Eventlite.formValidations[name]))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newEvent = {
      title: this.state.title.value,
      start_datetime: this.state.start_datetime.value,
      location: this.state.location.value
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

  validateForm () {
    this.setState({
      formValid:
        this.state.title.valid &&
        this.state.start_datetime.valid &&
        this.state.location.valid
    })
  }

  validateField(fieldName, fieldValue, fieldValidations) {
    let fieldValid = true
    let errors = fieldValidations.reduce((errors, validation) => {
      let [valid, fieldError] = validation(fieldValue)
      if (!valid) {
        errors = errors.concat([fieldError])
      }
      return errors
    }, [])
    fieldValid = errors.length === 0

    const newState = {formErrors: {...this.state.formErrors, [fieldName]: errors}}
    newState[fieldName] = {...this.state[fieldName], valid: fieldValid}
    this.setState(newState, this.validateForm)
  }

  render () {
    return(
      <div>
        <FormErrors formErrors = {this.state.formErrors} />
        <EventForm
          handleInput = {this.handleInput}
          handleSubmit = {this.handleSubmit}
          formValid = {this.state.formValid}
          title = {this.state.title.value}
          start_datetime = {this.state.start_datetime.value}
          location = {this.state.location.value}
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
