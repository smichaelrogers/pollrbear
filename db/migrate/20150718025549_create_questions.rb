class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :poll_id, null: false
      t.string :text, null: false
      t.integer :chart, default: 1, null: false
      t.integer :format, default: 1, null: false

      t.timestamps null: false
    end
    add_index :questions, :poll_id
    add_index :questions, :chart
  end
end
