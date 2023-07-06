class CustomersController < ApplicationController

    def index 
        render json: Customer.all, status: :ok
    end
end
