class ProductOrderSerializer < ActiveModel::Serializer
  attributes :id, :personalization, :quantity, :order_id, :product_id

  belongs_to :order
  belongs_to :product
end
