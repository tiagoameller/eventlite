# == Schema Information
#
# Table name: events
#
#  id             :bigint           not null, primary key
#  title          :string
#  start_datetime :datetime
#  location       :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_id        :bigint           not null
#  description    :text
#  image_url      :string
#
# Indexes
#
#  index_events_on_user_id  (user_id)
#
class Event < ApplicationRecord
  validates :title, presence: true, length: { minimum: 3 }
  validates :start_datetime, presence: true
  validate :start_datetime_cannot_be_in_the_past
  validates :location, presence: true

  belongs_to :user

  private

  def start_datetime_cannot_be_in_the_past
    errors.add(:start_datetime, "can't be in the past") if start_datetime.present? && start_datetime < Time.zone.now
  end
end
