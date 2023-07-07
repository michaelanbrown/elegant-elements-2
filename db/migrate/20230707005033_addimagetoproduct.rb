class Addimagetoproduct < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :image, :string, default: false
  end
end
