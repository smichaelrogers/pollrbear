
@users = []
@polls = []
@questions = []
@answers = []
@invites = []
@responses =[]


5.times do
  @users << User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email)
end
20.times do
  @polls << Poll.create!(user_id:  [1,2,3,4,5].sample, title: Faker::Company.catch_phrase, text: Faker::Lorem.sentence, privacy: [1,1,1,1,1,2].sample)
end
50.times do
  @questions << Question.create!(poll_id: (1..19).to_a.sample, text: "#{Faker::Lorem.sentence}?", chart_type: [1,2,3,4].sample)
end
100.times do
  @answers << Answer.create!(question_id: (1..19).to_a.sample, text: Faker::Lorem.sentence)
end
200.times do
  @responses << Response.create!(user_id: [1,2,3,4,5].sample, answer_id: (1..99).to_a.sample)
end
10.times do
  @invites << Invite.create!(poll_id: [1,2,3,4,5,6,7,8].sample, user_id: [1,3,5].sample, invitee_id: [2,4].sample)
end
10.times do
  @invites << Invite.create!(poll_id: [1,2,3,4,5,6,7,8].sample, invitee_id: [1,3,5].sample, user_id: [2,4].sample)
end
