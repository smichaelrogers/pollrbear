# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150718170942) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer  "question_id", null: false
    t.integer  "chart_id",    null: false
    t.string   "text",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "answers", ["chart_id"], name: "index_answers_on_chart_id", using: :btree
  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree

  create_table "charts", force: :cascade do |t|
    t.integer  "question_id",             null: false
    t.integer  "format",      default: 1
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "charts", ["question_id"], name: "index_charts_on_question_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "commenter_id", null: false
    t.integer  "poll_id",      null: false
    t.integer  "parent_id"
    t.text     "text",         null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "comments", ["commenter_id"], name: "index_comments_on_commenter_id", using: :btree
  add_index "comments", ["poll_id"], name: "index_comments_on_poll_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "follower_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "follows", ["follower_id"], name: "index_follows_on_follower_id", using: :btree
  add_index "follows", ["user_id", "follower_id"], name: "index_follows_on_user_id_and_follower_id", unique: true, using: :btree
  add_index "follows", ["user_id"], name: "index_follows_on_user_id", using: :btree

  create_table "invites", force: :cascade do |t|
    t.integer  "poll_id",    null: false
    t.integer  "user_id",    null: false
    t.integer  "invitee_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "invites", ["invitee_id"], name: "index_invites_on_invitee_id", using: :btree
  add_index "invites", ["poll_id"], name: "index_invites_on_poll_id", using: :btree
  add_index "invites", ["user_id"], name: "index_invites_on_user_id", using: :btree

  create_table "polls", force: :cascade do |t|
    t.integer  "user_id",                null: false
    t.string   "title",                  null: false
    t.string   "text"
    t.integer  "privacy",    default: 1, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "polls", ["user_id"], name: "index_polls_on_user_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.integer  "poll_id",    null: false
    t.string   "text",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "questions", ["poll_id"], name: "index_questions_on_poll_id", using: :btree

  create_table "responses", force: :cascade do |t|
    t.integer  "answer_id",  null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "responses", ["answer_id"], name: "index_responses_on_answer_id", using: :btree
  add_index "responses", ["user_id"], name: "index_responses_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "session_token",   null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
