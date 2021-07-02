import React from "react"
import Event from "./Event"

const EventsList = props => (
  <div>
    {props.events.map((event, i) => {
      return(
        <Event key={event.id} event={event}/>
      )
    })}
  </div>
)

export default EventsList

