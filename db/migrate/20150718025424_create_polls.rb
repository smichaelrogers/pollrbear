class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :text
      t.integer :privacy, default: 1, null: false
      t.integer :duration, default: 86400 #if time is passed it is no longer active but not deleted
      t.timestamps null: false
    end
    add_index :polls, :user_id
  end
end
