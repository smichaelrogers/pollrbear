# == Schema Information
#
# Table name: polls
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  text       :string
#  privacy    :integer          default(1), not null
#  duration   :integer          default(86400)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Poll < ActiveRecord::Base
  validates :title, :text, :duration, :privacy, presence: true
  belongs_to :user
  has_many :questions
  has_many :answers, through: :questions, source: :answers
  has_many :responses, through: :answers, source: :responses
end
