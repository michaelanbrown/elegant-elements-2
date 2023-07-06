class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :jewelry
      t.float :price
      t.string :stripe_key
      
      t.timestamps
    end
  end
end
