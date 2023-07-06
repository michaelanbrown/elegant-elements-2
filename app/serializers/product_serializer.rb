class ProductSerializer < ActiveModel::Serializer
  attributes :id, :jewelry, :price, :stripe_key
end
