# == Schema Information
#
# Table name: answers
#
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  text        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Answer < ActiveRecord::Base
  validates :question, :text, presence: true


  has_many :responses, dependent: :destroy
  belongs_to :question
  belongs_to :chart
end
