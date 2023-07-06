class Addorderidtoproducts < ActiveRecord::Migration[6.1]
  def change
    add_reference :product_orders, :order, null: false, foreign_key: true
  end
end
