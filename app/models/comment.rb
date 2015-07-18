# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  poll_id    :integer          not null
#  parent_id  :integer
#  text       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :user, :poll, :text, presence: true

  belongs_to :commenter, inverse_of: :poll

  belongs_to :parent_comment,
    class_name: "Comment",
    foreign_key: :parent_id,
    primary_key: :id

  has_many :child_comments,
    class_name: "Comment",
    foreign_key: :parent_id,
    primary_key: :id


end
