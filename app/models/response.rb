# == Schema Information
#
# Table name: responses
#
#  id         :integer          not null, primary key
#  answer_id  :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Response < ActiveRecord::Base
  validates :user, :answer, presence: true

  belongs_to :answer
  belongs_to :user, inverse_of: :responses
end
