class CreateCustomers < ActiveRecord::Migration[6.1]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :email
      t.string :username
      t.string :password_digest
      t.boolean :admin, default: false

      t.timestamps
    end
  end
end
