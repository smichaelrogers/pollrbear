@password = BCrypt::Password.create("asdfasdf");
@users = []
@polls = []
@answers = []
@responses = []
@polls = []
@questions = []
u1 = User.create!(first_name: "Tom", last_name: "Hanks", email: "wilson@tom.hanks", password_digest: @password, session_token: SecureRandom.urlsafe_base64)

u2 = User.create!(first_name: (Faker::Name.first_name), last_name: (Faker::Name.last_name), email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
u3 = User.create!(first_name: (Faker::Name.first_name), last_name: (Faker::Name.last_name), email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
[u1, u2, u3].each do |user|
  @uid = []
  @polls = []
  if user.id == 1
    @uid = [2,3]
  elsif user.id == 2
    @uid = [1,3]
  else
    @uid = [1,2]
  end
  10.times do
    @polls << Poll.create!(user_id: user.id, title: Faker::Lorem.sentence, text: Faker::Lorem.paragraph, privacy: [1,1,1,2].sample, duration: (3600 * rand(24)))
  end
  @polls.each do |poll|
    Invite.create!(poll_id: poll.id, user_id: @uid.sample)

    @questions = []
    20.times do
      @questions << Question.create!(poll_id: poll.id, text: Faker::Lorem.sentence + "?", chart: [1,2,3,4,5].sample, format: [1,2,3].sample)
    end
    @questions.each do |question|
      @answers = []
      [3,4,5].sample.times do
        @answers << Answer.create!(question_id: question.id, text: Faker::Team.creature)
      end
      @answers.each do |answer|

        @responses << Response.create!(answer_id: answer.id, respondent_id: @uid.sample)
      end
    end
  end
end
