class ProductSerializer < ActiveModel::Serializer
  attributes :id, :jewelry, :price, :stripe_key

  has_many :orders
  has_many :product_orders
end
