# == Schema Information
#
# Table name: responses
#
#  id            :integer          not null, primary key
#  answer_id     :integer          not null
#  respondent_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Response < ActiveRecord::Base
  belongs_to :answer
  belongs_to :respondent,
    class_name: "User",
    foreign_key: :respondent_id,
    primary_key: :id
end
