class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :poll_id, null: false
      t.string :text

      t.timestamps null: false
    end

    add_index :answers, :poll_id
  end
end
