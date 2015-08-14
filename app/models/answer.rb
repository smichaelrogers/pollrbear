# == Schema Information
#
# Table name: answers
#
#  id         :integer          not null, primary key
#  poll_id    :integer          not null
#  text       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Answer < ActiveRecord::Base
  belongs_to :poll
  has_many :responses
  has_many :respondents, through: :responses, source: :respondent


end
