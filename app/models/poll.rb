# == Schema Information
#
# Table name: polls
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  text       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Poll < ActiveRecord::Base
  validates :user, :title, presence: true

  belongs_to :creator
  has_many :questions

  has_many :follows, inverse_of: :follower
  has_many :comments, inverse_of: :commenter
end
