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

  belongs_to :user
  has_many :comments
  has_many :questions
  has_many :answers, through: :questions, source: :answers
  has_many :charts, through: :questions, source: :charts
  has_many :invited_users,
    class_name: "Invite",
    foreign_key: :poll_id,
    primary_key: :id
end
