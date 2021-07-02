class EventsController < ApplicationController
  def index
    @events = Event.order(start_datetime: :asc)
  end
end
