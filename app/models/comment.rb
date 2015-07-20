# == Schema Information
#
# Table name: comments
#
#  id           :integer          not null, primary key
#  commenter_id :integer          not null
#  poll_id      :integer          not null
#  text         :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :user, :poll, :text, presence: true

  belongs_to :user
  belongs_to :poll
end
