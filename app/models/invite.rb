# == Schema Information
#
# Table name: invites
#
#  id         :integer          not null, primary key
#  poll_id    :integer          not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Invite< ActiveRecord::Base
  validates :user, :poll, presence: true

  belongs_to :poll
  belongs_to :user
end
