json.extract! answer, :id, :question_id, :chart_id, :text, :created_at, :updated_at
json.responses answer.responses do |response|
  json.extract! response, :id, :answer_id, :user_id, :created_at, :updated_at
end
json.users answer.users do |user|
  json.extract! user, :id, :email, :created_at, :updated_at
end
