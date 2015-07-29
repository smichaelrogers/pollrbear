json.(answer, :id, :text, :poll_id, :created_at)
json.answer do
  json.responses answer.responses do |response|
    json.extract! response, :id, :user_id, :created_at, :updated_at
    json.respondents response.respondents do |respondent|
      json.extract! respondent, :id, :first_name, :last_name, :email, :created_at
    end
  end
end
