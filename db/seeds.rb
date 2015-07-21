
@users = []
@polls = []
@questions = []
@answers = []
@invites = []
@responses =[]


3.times do
  @users << User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email)
end
20.times do
  @polls << Poll.create!(user_id:  [1,2,3].sample, title: Faker::Company.catch_phrase, text: Faker::Lorem.sentence)
end
50.times do
  @questions << Question.create!(poll_id: (1..19).to_a.sample, text: "#{Faker::Lorem.sentence}?")
end
100.times do
  @answers << Answer.create!(question_id: (1..19).to_a.sample, text: Faker::Lorem.sentence)
end





# p1 = Poll.create!(user_id: 1, title: "p1 title", text: "p1 text")
# p2 = Poll.create!(user_id: 1, title: "p2 title", text: "p2 text")
# p3 = Poll.create!(user_id: 1, title: "p3 title", text: "p3 text")
# p4 = Poll.create!(user_id: 1, title: "p4 title", text: "p4 text")
# p5 = Poll.create!(user_id: 1, title: "p5 title", text: "p5 text")
#
# q1 = Question.create!(poll_id: 1, text: "q1 text")
# q2 = Question.create!(poll_id: 1, text: "q2 text")
# q3 = Question.create!(poll_id: 1, text: "q3 text")
# q4 = Question.create!(poll_id: 1, text: "q4 text")
# q5 = Question.create!(poll_id: 2, text: "q5 text")
# q6 = Question.create!(poll_id: 2, text: "q6 text")
# q7 = Question.create!(poll_id: 2, text: "q7 text")
# q8 = Question.create!(poll_id: 3, text: "q8 text")
# q9 = Question.create!(poll_id: 3, text: "q9 text")
# q10 = Question.create!(poll_id: 3, text: "q10 text")
# q11 = Question.create!(poll_id: 1, text: "q11 text")
# q12 = Question.create!(poll_id: 1, text: "q12 text")
# q13 = Question.create!(poll_id: 4, text: "q13 text")
# q14 = Question.create!(poll_id: 5, text: "q14 text")
#
# a1 = Answer.create!(question_id: 1, text: "a1 text")
# a2 = Answer.create!(question_id: 1, text: "a2 text")
# a3 = Answer.create!(question_id: 1, text: "a3 text")
# a4 = Answer.create!(question_id: 1, text: "a4 text")
# a5 = Answer.create!(question_id: 2, text: "a5 text")
# a6 = Answer.create!(question_id: 2, text: "a6 text")
# a7 = Answer.create!(question_id: 2, text: "a7 text")
# a8 = Answer.create!(question_id: 3, text: "a8 text")
#
# r1 = Response.create!(answer_id: 1, user_id: 1)
# r2 = Response.create!(answer_id: 2, user_id: 1)
# r3 = Response.create!(answer_id: 3, user_id: 1)
# r4 = Response.create!(answer_id: 4, user_id: 1)
# r5 = Response.create!(answer_id: 5, user_id: 1)
# r6 = Response.create!(answer_id: 6, user_id: 1)
# r7 = Response.create!(answer_id: 7, user_id: 1)
# r8 = Response.create!(answer_id: 8, user_id: 1)
