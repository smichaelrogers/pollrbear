# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  poll_id    :integer          not null
#  text       :string           not null
#  chart      :integer          default(1), not null
#  format     :integer          default(1), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ActiveRecord::Base
  validates  :text, :chart, presence: true
  has_many :answers, dependent: :destroy
  belongs_to :poll
  paginates_per 5
end
