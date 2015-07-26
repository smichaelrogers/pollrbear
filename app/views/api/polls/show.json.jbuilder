json.extract! @poll, :id, :user_id, :title, :text, :privacy, :duration, :created_at, :updated_at

json.questions @poll.questions do |question|
  json.extract! question, :id, :poll_id, :text, :chart, :format, :created_at, :updated_at
end
