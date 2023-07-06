class Address < ApplicationRecord
    belongs_to :customer
    has_many :orders

    validates :name, presence: true
    validates :street, presence: true
    validates :city, presence: true
    validates :state, presence: true, length: { is: 2 }
    validates :zip, presence: true, length: { is: 5 }
end
