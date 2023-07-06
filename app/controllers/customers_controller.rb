class CustomersController < ApplicationController
    skip_before_action :authenticate_customer, only: [:index, :create]

    def index 
        render json: Customer.all, status: :ok
    end

    def show
        render json: current_customer, status: :ok
    end

    def create
        customer = Customer.create!(customer_params)
        session[:customer_id] = customer.id
        render json: customer, status: :ok
    end

    private 

    def customer_params
        params.permit(:name, :username, :email, :password)
    end 

end