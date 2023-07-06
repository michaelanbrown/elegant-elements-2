class ProductOrderSerializer < ActiveModel::Serializer
  attributes :id, :personalization, :quantity, :order_id, :product_id
end
