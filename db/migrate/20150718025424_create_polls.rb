class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.integer :user_id, null: false
      t.string :text, null: false
      t.integer :duration, default: 86400, null: false
      t.integer :privacy, default: 1, null: false
      t.integer :chart, default: 0, null: false
      t.integer :format, default: 1, null: false

      t.timestamps null: false
    end
    add_index :polls, :user_id
  end
end
