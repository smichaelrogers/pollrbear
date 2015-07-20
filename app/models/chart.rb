# == Schema Information
#
# Table name: charts
#
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  format      :integer          default(1)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Chart < ActiveRecord::Base
  validates :question, :format, presence: true

  belongs_to :question
end
