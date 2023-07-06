# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

c1 = Customer.create!(name: "Carla Jones", email: "carla.jones@gmail.com", username: "carla.jones", password: "carla1234!", admin: false)
c2 = Customer.create!(name: "Vanessa", email: "ness1234@yahoo.com", username: "nessa", password: "nessaabcd", admin: false)
c3 = Customer.create!(name: "Jack Crane", email: "jc@gmail.com", username: "jcraneee", password: "crane", admin: false)
c4 = Customer.create!(name: "Michaela Brown", email: "m_brownbrown@yahoo.com", username: "michaelanbrown", password: "mnb", admin: true)

a1 = Address.create!(name: "Carla Jones", street: "1234 Main St", unit: nil, city: "Sacramento", state: "CA", zip: "93642", customer_id: c1.id)
a2 = Address.create!(name: "Vanessa Atkins", street: "589 Real Dr", unit: "4A", city: "New York City", state: "NY", zip: "00512", customer_id: c2.id)
a3 = Address.create!(name: "Jack Crane", street: "654 Beach Cir", unit: nil, city: "Myrtle Beach", state: "SC", zip: "36542", customer_id: c3.id)
a4 = Address.create!(name: "Michaela Brown", street: "567 Wimberly Ave", unit: nil, city: "Huntsville", state: "AL", zip: "35762", customer_id: c4.id)

p1 = Product.create!(jewelry: "Necklace with a Phrase", price: 14.00, stripe_key: "price_1NMeklK92FCM7B9EdlbTp7Cs")
p2 = Product.create!(jewelry: "Necklace with a Word", price: 12.00, stripe_key: "price_1NMelRK92FCM7B9EWIZECJV3")
p3 = Product.create!(jewelry: "Necklace with a Date", price: 12.00, stripe_key: "price_1NMelzK92FCM7B9ESclbtm6w")
p4 = Product.create!(jewelry: "Bracelet with a Phrase", price: 13.00, stripe_key: "price_1NMemOK92FCM7B9Ebm7PmymW")
p5 = Product.create!(jewelry: "Bracelet with a Word", price: 11.00, stripe_key: "price_1NMemiK92FCM7B9EF5BKE0ge")
p6 = Product.create!(jewelry: "Bracelet with a Date", price: 11.00, stripe_key: "price_1NMen0K92FCM7B9EKmpf3Gfj")
p7 = Product.create!(jewelry: "Keychain with a Phrase", price: 12.00, stripe_key: "price_1NMenLK92FCM7B9Evqz9gwyi")
p8 = Product.create!(jewelry: "Keychain with a Word", price: 10.00, stripe_key: "price_1NMeneK92FCM7B9Eh0250qlD")
p9 = Product.create!(jewelry: "Keychain with a Date", price: 10.00, stripe_key: "price_1NMenxK92FCM7B9EDMnruaBL")
