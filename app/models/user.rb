# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, uniqueness: true

  has_many :responses
  has_many :polls
  has_many :comments
  has_many :sent_invitations,
    class_name: "Invite",
    foreign_key: :user_id,
    primary_key: :id
  has_many :recieved_invitations,
    class_name: "Invite",
    foreign_key: :invitee_id,
    primary_key: :id
  belongs_to :follower,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  has_many :follows,
    class_name: "User",
    foreign_key: :follower_id,
    primary_key: :id

  has_many :followed_comments, through: :follows, source: :comments

  attr_reader :password
  after_initialize :ensure_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  protected
  def ensure_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
