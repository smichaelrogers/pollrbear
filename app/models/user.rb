# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  provider        :string
#  uid             :string
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :submitted_responses,
    class_name: "Response",
    foreign_key: :respondent_id,
    primary_key: :id
  has_many :polls
  has_many :answers, through: :polls, source: :answers
  has_many :responses, through: :answers, source: :responses
  has_many :respondents, through: :responses, source: :respondent

  attr_reader :password
  after_initialize :ensure_session_token
  before_validation :ensure_session_token
  after_initialize :ensure_email

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

  def ensure_email
    self.email ||= "      "
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

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end
end
