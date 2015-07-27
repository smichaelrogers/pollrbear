# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  profile_img     :string
#  provider        :string
#  uid             :string
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
  has_many :questions, through: :polls, source: :questions
  has_many :answers, through: :questions, source: :answers
  has_many :responses, through: :answers, source: :responses

  attr_reader :password
  after_initialize :ensure_session_token
  after_initialize :ensure_profile_img
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
        password: SecureRandom.urlsafe_base64)
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
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def ensure_profile_img
    self.profile_img ||= '/default/slice' + (0..9).to_a.sample.to_s + '.png'
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end
end
