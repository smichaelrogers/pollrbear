@password = BCrypt::Password.create("asdfasdf");
@users = []
@polls = []
@users << User.create!(first_name: "Tom", last_name: "Hanks", email: "wilson@tom.hanks", password_digest: @password, session_token: SecureRandom.urlsafe_base64)


2.times.each do
  @users << User.create!(first_name: (Faker::Team.creature), last_name: (Faker::Name.last_name), email: Faker::Internet.email, password_digest: @password, session_token: SecureRandom.urlsafe_base64)
end

10.times.each do
  @polls << Poll.create!(user_id: (1..3).to_a.sample, title: Faker::Company.catch_phrase, text: Faker::Lorem.sentence, privacy: [1,1,1,1,1,2].sample)
end

30.times.each do
  Question.create!(poll_id: (1...10).to_a.sample, text: "#{Faker::Hacker.say_something_smart}?", chart: [1,2,3,4].sample)
end


100.times.each do
  Answer.create!(question_id: (1...30).to_a.sample, text: Faker::Hacker.noun)
end

100.times.each do
  Response.create!(answer_id: (1...100).to_a.sample, user_id:  (1..4).to_a.sample)
end
