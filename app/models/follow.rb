# == Schema Information
#
# Table name: follows
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  value           :integer          default(0)
#  followable_id   :integer          not null
#  followable_type :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Follow < ActiveRecord::Base
  validates :user, presence: true
  validates :user_id: { scope: [:followable_id, :followable_type]}

  belongs_to :followable, polymorphic: true
  belongs_to :creator, inverse_of: :follows
end
