class OrderSerializer < ActiveModel::Serializer
  attributes :id, :customer_id, :total, :shipping, :status, :address_id
end
