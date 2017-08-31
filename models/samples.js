var mongoose = require('mongoose')
var shuffle = require('array-shuffle')

var schema = new mongoose.Schema({
  purchaseLocation: String,
  brand: String,
  price: Number,
  pricePer: Number,
  sampleIdentifier: {type: String, index: {unique: true}},
  allergens: Array,
  mayContain: Array,
  description: String
})

var jaffaCakes = [
  {
    purchaseLocation: 'Aldi',
    brand: 'Belmont Biscuits',
    description: 'Sponge base with an orange flavoured filling and a plain chocolate topping',
    price: 0.89,
    pricePer: 24,
    allergens: [ "Soya", "Egg", "Wheat"],
    mayContain: [ "Nuts", "Milk" ]
  },
  {
    purchaseLocation: "Lidl",
    brand: "Sondey",
    description: "Mini sponge cakes with 55% orange flavoured jelly centre, topped with 17% dark chocolate",
    price: 0.89,
    pricePer: 24,
    allergens: [ 'Wheat', 'Egg', 'Soya', 'Milk'],
    mayContain: []
  },
  {
    purchaseLocation: 'Tesco',
    brand: 'Tesco',
    description: 'Golden sponge base with an orange flavoured centre, half coated in plain chocolate',
    price: 0.95,
    pricePer: 24,
    allergens: [ 'Wheat', 'Egg', 'Soya'],
    mayContain: ['Milk']
  },
  {
    purchaseLocation: 'McVitie\'s',
    brand: 'McVitie\'s',
    description: 'Light sponge cakes with dark crackly chocolate and a smashing orangey centre',
    price: 1.00,
    pricePer: 24,
    allergens: ['Milk', 'Soya', 'Wheat', 'Egg'],
    mayContain: []
  },
  {
    purchaseLocation: 'Morrison\'s',
    brand: 'Morrisons',
    description: 'Sponge biscuit with orange fruit filling (55%) and dark chocolate',
    price: 0.96,
    pricePer: 24,
    allergens: ['Soya', 'Wheat', 'Egg'],
    mayContain: ['Milk', 'Nuts']
  },
  {
    purchaseLocation: 'Marks & Spencer',
    brand: 'Marks & Spencer',
    description: 'Sponge cakes topped with orange filling and half coated in dark chocolate',
    price: 1.00,
    pricePer: 11, // eleven(!)
    allergens: ['Milk', 'Wheat', 'Egg', 'Soya'],
    mayContain: ['Nuts']
  },
  {
    purchaseLocation: 'Morrison\'s',
    brand: 'M Savers',
    description: 'Sponge biscuit with orange fruit filling (55%) and dark chocolate',
    allergens: ['Soya', 'Wheat', 'Egg'],
    mayContain: ['Milk', 'Nuts'],
    price: 0.38,
    pricePer: 12
  },
  {
    purchaseLocation: 'Bahlsen',
    brand: 'Messino',
    description: 'Luxury sponge cakes with a tangy orange fruit filling (53%) half-coated in dark chocolate (19%)',
    allergens: ['Wheat', 'Egg', 'Whey', 'Soya', 'Milk'],
    mayContain: ['Hazelnuts'],
    pricePer: 11
  },
  {
    purchaseLocation: 'Aldi',
    brand: 'Everyday Essentials',
    price: 0.31,
    pricePer: 12,
    description: 'Sponge base with an orange flavoured centre half coated in plain chocolate',
    allergens: [ 'Wheat', 'Egg', 'Soya'],
    mayContain: [ 'Milk']
  },
  {
    purchaseLocation: 'Home Bargains',
    brand: 'Tango',
    price:  0.89,
    pricePer: 24,
    description: 'Sponge cakes with a tangy orange filling topped with real chocolate',
    allergens: [ 'Soya', 'Wheat', 'Egg'],
    mayContain: ['Nuts', 'Milk']
  },
  {
    purchaseLocation: 'Asda',
    brand: 'Smart Price',
    pricePer: 12,
    price: 0.31,
    description: 'Sponge cakes with an orange-flavoured filling, topped with dark chocolate',
    allergens: [ 'Soya', 'Wheat', 'Egg'],
    mayContain: [ 'Milk' ]
  },
  {
    purchaseLocation: 'Sainsbury\'s',
    brand: 'by Sainsbury\'s',
    price: 1.55,
    pricePer: 36,
    description: 'Dark chocolate topped sponge cakes with orange flavoured filling',
    allergens: [ 'Soya', 'Wheat', 'Egg'],
    mayContain: [ 'Milk' ]
  },
  {
    purchaseLocation: 'Asda',
    description: 'Sponge cakes with an orange-flavoured filling, topped with dark chocolate',
    price: 0.60,
    pricePer: 12,
    allergens: [ 'Soya', 'Wheat', 'Egg'],
    mayContain: ['Milk'],
    brand: ['Asda']
  },
  {
    purchaseLocation: 'Sainsbury\'s',
    brand: 'Basics',
    pricePer: 12,
    allergens: ['Soya', 'Wheat', 'Egg'],
    mayContain: ['Milk'],
    price: 0.60,
    description: 'Sponge cakes with an orange flavoured centre half coated in dark chocolate'
  },
  {
    purchaseLocation: 'Fultons',
    brand: 'Keepers Choice',
    pricePer: 32, // estimate (marked as 400g)
    allergens: [ 'Milk', 'Soya', 'Gluten', 'Egg', 'Sodium Metabisulphite'],
    mayContain: ['Nuts'],
    price: 1.00,
    description: ''
  }
]

var Sample = module.exports = mongoose.model('Sample', schema)

Sample.find({}, function (err, response) {
  if (err) throw err
  if (response.length < jaffaCakes.length) {
    shuffle(jaffaCakes)
    for (var i = 0; i < jaffaCakes.length; i++) {
      var c = jaffaCakes[i]
      c.sampleIdentifier = String.fromCharCode(65 + i) // 64 == 'A'
      Sample.update({
        purchaseLocation: c.purchaseLocation,
        brand: c.brand
      }, c, {upsert: true}, function (err) {
        if (err) throw err
      })
    }
  }
})