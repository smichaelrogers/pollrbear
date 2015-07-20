# == Schema Information
#
# Table name: follows
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  follower_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Follow < ActiveRecord::Base
  validates :user, presence: true
  validates :user, uniqueness: { scope: :follower }

  belongs_to :user, inverse_of: :follower
end
