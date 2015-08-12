@password = BCrypt::Password.create("asdfasdf");
@users = []
@polls = []
@answers = []
@responses = []
@polls = []
u1 = User.create!(first_name: "Tom", last_name: "Hanks", email: "wilson@tom.hanks", password_digest: @password, session_token: SecureRandom.urlsafe_base64)

u2 = User.create!(first_name: (Faker::Name.prefix + " " + Faker::Team.creature.capitalize!), last_name: (Faker::Name.last_name), email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u3 = User.create!(first_name: (Faker::Name.prefix + " " + Faker::Team.creature.capitalize!), last_name: (Faker::Name.last_name), email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u4 = User.create!(first_name: (Faker::Name.prefix + " " + Faker::Team.creature.capitalize!), last_name: (Faker::Name.last_name), email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u5 = User.create!(first_name: (Faker::Name.prefix + " " + Faker::Team.creature.capitalize!), last_name: (Faker::Name.last_name), email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u6 = User.create!(first_name: (Faker::Name.prefix + " " + Faker::Team.creature.capitalize!), last_name: (Faker::Name.last_name), email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u7 = User.create!(first_name: (Faker::Name.prefix + " " + Faker::Team.creature.capitalize!), last_name: (Faker::Name.last_name), email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)

[u1, u2, u3, u4, u5, u6, u7].each do |user|
  @uid = [1,2,3,4,5,6,7]
  @polls = []
  @uid.delete(user.id)
  10.times do
    @polls << Poll.create!(user_id: user.id, text: Faker::Hacker.say_something_smart.chop + " ?", chart: [1,2,3,4].sample, format: [1,1,2].sample, duration: (3600 * rand(24)))
  end
  @polls.each do |poll|
    @answers = []
    if poll.format == 1
      [3,3,4,4,4,5].sample.times do
        @answers << Answer.create!(poll_id: poll.id, text: Faker::Company.catch_phrase)
      end
      @answers.each do |answer|
        (0..30).to_a.sample.times do
          @responses << Response.create!(answer_id: answer.id, respondent_id: @uid.sample)
        end
      end
    else
      @answer = Answer.create!(poll_id: poll.id, text: "default")
      (30..60).to_a.sample.times do
        @responses << Response.create!(answer_id: @answer.id, respondent_id: @uid.sample, text: Faker::Lorem.paragraph)
      end
    end
  end
end
