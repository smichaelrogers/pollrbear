class CreateCharts < ActiveRecord::Migration
  def change
    create_table :charts do |t|
      t.integer :question_id, null: false
      t.integer :format, default: 1

      t.timestamps null: false
    end
    add_index :charts, :question_id
  end
end
