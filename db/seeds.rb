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

p1 = Product.create!(jewelry: "Necklace with a Phrase", price: 14.00, stripe_key: "price_1NMeklK92FCM7B9EdlbTp7Cs", image:"https://i.etsystatic.com/6799259/r/il/32535d/1100965823/il_1588xN.1100965823_l2z2.jpg")
p2 = Product.create!(jewelry: "Necklace with a Word", price: 12.00, stripe_key: "price_1NMelRK92FCM7B9EWIZECJV3", image: "https://cdn.shopify.com/s/files/1/0008/8932/3571/products/DSC_0019_800x800_1200x1200.jpg?v=1541563917")
p3 = Product.create!(jewelry: "Necklace with a Date", price: 12.00, stripe_key: "price_1NMelzK92FCM7B9ESclbtm6w", image: "https://watchmeworld.myshopify.com/cdn/shop/products/il_fullxfull.1333990632_2wgq_740x.jpg?v=1535493891")
p4 = Product.create!(jewelry: "Bracelet with a Phrase", price: 13.00, stripe_key: "price_1NMemOK92FCM7B9Ebm7PmymW", image: "https://www.bloominglotusjewelry.com/cdn/shop/products/Mantra-Bar-Bracelet-silver-inhale-exhale-Blooming-Lotus-Jewelry_384x384.jpg?v=1650650147")
p5 = Product.create!(jewelry: "Bracelet with a Word", price: 11.00, stripe_key: "price_1NMemiK92FCM7B9EF5BKE0ge", image: "https://sayanythingjewelry.com/cdn/shop/products/Woty_4_grande.jpg?v=1598481549")
p6 = Product.create!(jewelry: "Bracelet with a Date", price: 11.00, stripe_key: "price_1NMen0K92FCM7B9EKmpf3Gfj", image: "https://brookandyork.com/cdn/shop/products/BYB1034S_540x.jpg?v=1672167079")
p7 = Product.create!(jewelry: "Keychain with a Phrase", price: 12.00, stripe_key: "price_1NMenLK92FCM7B9Evqz9gwyi", image: "https://cdn.shopify.com/s/files/1/0286/6042/products/il_fullxfull.993577520_n2ym_1024x1024.jpg?v=1466991492")
p8 = Product.create!(jewelry: "Keychain with a Word", price: 10.00, stripe_key: "price_1NMeneK92FCM7B9Eh0250qlD", image: "https://annbijoux.com/img/p/4/5/2/452.jpg")
p9 = Product.create!(jewelry: "Keychain with a Date", price: 10.00, stripe_key: "price_1NMenxK92FCM7B9EDMnruaBL", image: "https://i.etsystatic.com/8618048/r/il/f2088a/2259399342/il_570xN.2259399342_906d.jpg")

o1 = Order.create!(customer_id: c1.id, address_id: a1.id, total: 20.00, shipping: 7.00, status: "fulfilled")
o2 = Order.create!(customer_id: c2.id, address_id: a2.id, total: 19.00, shipping: 7.00, status: "canceled")
o3 = Order.create!(customer_id: c3.id, address_id: a3.id, total: 39.00, shipping: 7.00, status: "fulfilled")

po1 = ProductOrder.create!(personalization: "Brave", quantity: 1, order_id: o1.id, product_id: p2.id)
po2 = ProductOrder.create!(personalization: "You are strong", quantity: 2, order_id: o2.id, product_id: p4.id)
po3 = ProductOrder.create!(personalization: "01.26.2021", quantity: 1, order_id: o3.id, product_id: p3.id)
po4 = ProductOrder.create!(personalization: "01.26.2021", quantity: 1, order_id: o3.id, product_id: p9.id)