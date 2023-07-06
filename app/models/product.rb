class Product < ApplicationRecord
    has_many :product_orders
    has_many :orders, through: :product_orders

    validates :jewelry, presence: true
    validates :price, numericality: { greater_than: 0 }
    validates :stripe_key, presence: true
end