json.partial! "api/polls/poll", collection: @polls, as: :poll

json.extract! @polls, :page, :total_pages
