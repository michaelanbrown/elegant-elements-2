# Elegant Elements
## Adding a touch of inspiration and elegance to your every day life

### Description

Elegant Elements started with a passion for mental health. Michaela Brown started this company as a tribute to not only those struggling with every day life, but also to those that promote and pursue a positive lifestyle and good mental health.

The pieces of jewelry behind Elegant Elements are meant to contain postiive words, phrases, and dates of happy memories to encourage each individual as they go about their day.

Once the idea came to life, Michaela decided to expand to all words, phrases, etc. that her clients wanted to put on the jewelry, but she will always hope and strive for positivity and a happy head space for her clients.

### Models

I have incldued five models:
1. Customer
2. Order
3. Product
4. Product Order
5. Address

#### Customers

The Customers model has_many :orders and has_many :addresses.

#### Orders

The Orders model has_many :product_orders, has_many :products through: :product_orders, belongs_to :customer, and belongs_to :address.

#### Products

The Products model has_many :product_orders and has_many :orders through: :product_orders.


#### Product Order

The Customizations model belongs_to :product and belongs_to :order.

#### Addresses

The Addresses model belongs_to :customer and has_many :orders.


### Validations

#### Customers

The Customers model validates:
1. validates :name, presence: true
2. validates :username, presence: true, uniqueness: true
3. validates :email, presence: true, uniqueness: true

#### Orders

The Orders model validates:
1. validates :shipping, presence: true, numericality: { equal_to: 7.00 }
2. validates :status, presence: true
3. validate :order_cannot_update, on: [:update, :destroy]
    - order_cannot_update is a custom validation that will only allow the order to be updated or destroyed if the status is in progress or the status is submitted and the order was created within 24 hours.
    - If the order status is fulfilled, then an error message will be rendered that states "the order has been fulfilled"
    - This validation only runs when an order is updated or destroyed
5. validate :in_progress
    - in_progress is a custom validation that only allows one order to be in the in progress status at a time

#### Products

    validates :jewelry, presence: true
    validates :price, numericality: { greater_than: 0 }
    validates :stripe_key, presence: true

The Products model validates:
1. validates :jewelry, presence: true
2. validates :price, numericality: { greater_than: 0 }
3. validates :stripe_key, presence: true
    - The stripe_key ensures that our Stripe account will grab the accurate product(s) and price(s) when a customer goes to purchase an item.

#### Product Orders

The Customizations model validates:
1. validates :quantity, numericality: { greater_than: 0 }
2. validates :personalization, presence: true
3. validate :word_personalization
    - word_personalization is a custom validation that ensures that if the jewelry contains a word, then the personalization does not include a space
4. validate :phrase_personalization
    - phrase_personalization is a custom validation that ensures that if the jewelry contains a phrase, then the personalization does include a space
5. validate :date_personalization
    - date_personalization is a custom validation that ensures that if the jewelry contains a date, then the personalization does include a dot at the 3rd and 6th characters.

#### Addresses

The Addresses model validates:
1. validates :name, presence: true
2. validates :street, presence: true
3. validates :city, presence: true
4. validates :state, presence: true, length: { is: 2 }
5. validates :zip, presence: true, length: { is: 5 }

### Schemas

#### Customer

The Customer schema contains all pertinent information about each customer including name, email, username, and password.

#### Order


The Order schema contains all pertinent information about each order including the customer, total, shipping, address, and status. They connect to their customer and address via the columns below:

```bash
t.integer "customer_id"
```
```bash
t.index ["customer_id"], name: "index_orders_on_customer_id"
```
```bash
t.bigint "address_id", null: false
```
```bash
t.index ["address_id"], name: "index_orders_on_address_id"
```

#### Product

The Product schema contains all pertinent information about each product including the type of jewelry, price, and stripe key.

#### Product Order

The Product Order schema contains all pertinent information about each product in the order including the personalization, quantity, product_id, and order_id. They connect to their product and order via the columns below:

```bash
t.bigint "product_id", null: false
```
```bash
t.index ["product_id"], name: "index_product_orders_on_product_id"
```
```bash
t.bigint "order_id", null: false
```
```bash
t.index ["order_id"], name: "index_product_orders_on_order_id"
```

#### Address

The Address schema contains all pertinent information about each address including the shipped to's name, street, unit (if applicable), city, state, zip code, amd customer. They connect to their customization and order via the columns below:

```bash
t.integer "customer_id"
```
```bash
t.index ["customer_id"], name: "index_addresses_on_customer_id"
```

### Method Examples

```python
# Index
  def index 
      render json: Customer.all, status: :ok
  end
```

```python
# Show
  def find_address
    @address = Address.find(params[:id])
  end

  def show
      render json: @address, status: :ok
  end
```

```python
# Create Request
  def create
      order = Order.create!(order_params)
      render json: order, status: :created
  end

  private
    
  def order_params
      params.permit(:total).merge(customer_id: @current_customer.id, address_id: Address.where(customer_id: @current_customer.id).first.id)
  end
```

```python
# Update Request
  def find_product_order
    @product_order = ProductOrder.find(params[:id])
  end

  def update
      @product_order.update!(update_product_order_params)
      render json: @product_order, status: :accepted
  end

  private

  def update_product_order_params
      params.permit(:personalization, :quantity)
  end
```

```python
# Delete Request
  def find_order
    @order = Order.find(params[:id])
  end

  def destroy
      @order.destroy
      head :no_content 
  end
```

### Routes

```python
# All Used Routes
  resources :product_orders
  resources :orders
  resources :products, only: [:index, :show]
  resources :addresses, only: [:index, :show, :create, :update]
  resources :customers, only: [:index, :show, :create]

  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/authorized_user", to: "customers#show"
  post "/checkout", to: "charges#create"
```

### Aknowledgements

These images are not mine.