class Customer < ApplicationRecord
    has_many :orders
    has_many :addresses

    validates :name, presence: true
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true

    has_secure_password
end