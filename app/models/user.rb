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
  has_many :sent_invites,
    class_name: "Invite",
    foreign_key: :user_id,
    primary_key: :id
  has_many :invites,
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
  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil if user.nil?
    user.password_digest.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    unless user
      user = User.create!(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid],
            first_name: auth_hash[:info][:name].split.first,
            last_name: auth_hash[:info][:name].split.last,
            email: auth_hash[:info][:email],
            password: SecureRandom::urlsafe_base64)
    end

    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def password_digest
    BCrypt::Password.new(super)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
  end
end
