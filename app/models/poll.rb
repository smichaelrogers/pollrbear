# == Schema Information
#
# Table name: polls
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  text       :string           not null
#  duration   :integer          default(86400), not null
#  privacy    :integer          default(1), not null
#  chart      :integer          default(1), not null
#  format     :integer          default(1), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Poll < ActiveRecord::Base
  validates :text, :duration, :privacy, :chart, :format, presence: true
  belongs_to :user
  has_many :invites
  has_many :answers
  has_many :responses, through: :answers, source: :responses
  has_many :respondents, through: :responses, source: :respondent

  def response_count
    n = 0
    self.answers.each do |answer|
      n += answer.responses.count
    end
    n
  end
end
