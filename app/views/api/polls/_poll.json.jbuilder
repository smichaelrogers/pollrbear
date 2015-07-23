json.(poll, :id, :user_id, :title, :text, :privacy, :created_at, :updated_at)

json.questions poll.questions do |question|
  json.extract! question, :id, :poll_id, :text, :chart, :created_at, :updated_at
end
