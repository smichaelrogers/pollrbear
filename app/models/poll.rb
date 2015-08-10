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
  validates :text, :duration, :chart, :format, presence: true
  belongs_to :user
  has_many :answers
  has_many :responses, through: :answers, source: :responses
  has_many :respondents, through: :responses, source: :respondent

  def num_responses
    rslt = 0
    self.answers.each do |answer|
      rslt += answer.responses.count
    end
    rslt
  end

  def self.trending
    self.find_by_sql(<<-SQL)
      SELECT
        polls.*
      FROM
        polls
      JOIN
        answers ON polls.id = answers.poll_id
      JOIN
        responses ON answers.id = responses.answer_id
      GROUP BY
        polls.id
      ORDER BY
        COUNT(responses.*) DESC
    SQL
  end
end
