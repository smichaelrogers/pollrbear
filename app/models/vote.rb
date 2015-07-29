# == Schema Information
#
# Table name: votes
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  poll_id    :integer          not null
#  value      :integer          default(0)
#  created_at :datetime
#  updated_at :datetime
#

class Vote < ActiveRecord::Base
  validates :user, presence: true
  belongs_to :user
  belongs_to :poll
end
