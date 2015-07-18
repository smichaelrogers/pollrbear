class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :commenter_id, null: false
      t.integer :poll_id, null: false
      t.integer :parent_id
      t.text :text, null: false

      t.timestamps null: false
    end
    add_index :comments, :user_id
    add_index :comments, :poll_id
  end
end
