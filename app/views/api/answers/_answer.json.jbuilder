json.(answer, :id, :text, :poll_id, :created_at)
json.extract! answer, :id, :text, :poll_id, :created_at
json.poll answer.poll, :id, :user_id, :text, :chart, :format, :created_at
json.responses answer.responses do |response|
  json.extract! response, :id, :respondent_id, :answer_id, :text, :created_at, :updated_at
  json.respondent response.respondent, :id, :email, :first_name, :last_name, :created_at
end
