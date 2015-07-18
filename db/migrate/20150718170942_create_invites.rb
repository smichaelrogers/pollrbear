class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :poll_id, null: false
      t.integer :user_id, null: false
      t.integer :invitee_id, null: false

      t.timestamps
    end
    add_index :invites, :poll_id
    add_index :invites, :user_id
    add_index :invites, :invitee_id
  end
end
