# == Schema Information
#
# Table name: answers
#
#  id         :integer          not null, primary key
#  poll_id    :integer          not null
#  text       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Answer < ActiveRecord::Base
  validates :text, presence: true
  belongs_to :poll
  has_many :responses, dependent: :destroy
  has_many :respondents, through: :responses, source: :respondent
end
