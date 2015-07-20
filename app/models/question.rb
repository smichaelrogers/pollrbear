# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  poll_id    :integer          not null
#  text       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ActiveRecord::Base
  validates  :text, presence: true

  has_many :charts, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :responses, through: :answers, source: :responses
  belongs_to :poll
end
