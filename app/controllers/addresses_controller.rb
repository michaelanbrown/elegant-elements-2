class AddressesController < ApplicationController
    before_action :find_address, only: [:show, :update]
    before_action :authorize_customer_on_address, only: [:update]

    def index 
        render json: Address.all, status: :ok
    end

    def show
        render json: @address, status: :ok
    end

    def create
        order = Address.create!(address_params)
        render json: order, status: :created
    end

    def update
        @address.update!(address_params)
        render json: @address, status: :accepted
    end

    private

    def address_params
        params.permit(:street, :unit, :city, :state, :zip, :name).merge(customer_id: current_customer.id)
    end
end