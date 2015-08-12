json.(response, :id, :answer_id, :respondent_id, :created_at, :updated_at)
json.extract! response, :id, :answer_id, :respondent_id, :text, :created_at, :updated_at
json.respondent response.respondent, :id, :email, :first_name, :last_name, :created_at
