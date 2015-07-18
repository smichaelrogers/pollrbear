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

require 'test_helper'

class ChartTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
