# == Schema Information
#
# Table name: votes
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  poll_id    :integer          not null
#  value      :integer          default(0)
#  created_at :datetime
#  updated_at :datetime
#

class Vote < ActiveRecord::Base
  validates :user, presence: true
  validates :user_id, uniqueness: { scope: [:votable_id, :votable_type] }

  belongs_to :votable, polymorphic: true
  belongs_to :user, inverse_of: :votes
end
