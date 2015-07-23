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
  has_many :responses, through: :answers, source: :responses
  has_many :users, through: :responses, source: :user
  belongs_to :poll



end
