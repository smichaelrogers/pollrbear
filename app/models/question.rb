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
  validates  :content, presence: true

  has_one :chart, dependent: :destroy
  has_many :answers, dependent: :destroy
  belongs_to :poll
end
