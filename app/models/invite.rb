class Invite< ActiveRecord::Base
  validates :user, :poll, presence: true

  belongs_to :poll
  belongs_to :user, inverse_of: :recieved_invitations
  belongs_to :user, inverse_of: :sent_invitations
end
