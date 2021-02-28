var assert = require('chai').assert;
var Bakery = require('../src/Bakery.js')
var BakedGoods = require('../src/BakedGoods.js');

describe('Bakery', function () {
  it('should be a function', function() {
    assert.isFunction(Bakery);
  })
  it('should have a name', function () {
    var bakery = new Bakery({name: "Lola's Bakery"});

    assert.equal(bakery.name, "Lola's Bakery")
  })
  it('should have the owner\'s name', function () {
    var bakery = new Bakery({ name: "Lola's Bakery", owner: "James Brown"})

    assert.equal(bakery.ownerName, "James Brown")
  })
  it('should have a speciality', function () {
    var bakery = new Bakery({name: "Red's", owner: "Joe Smith", specialities: ["donut"]});

    assert.equal(bakery.focus.length, 1);
    assert.equal(bakery.focus[0], "donut");
  })
  it('should be able to have more than one speciality', function () {
    var bakery = new Bakery({name: "Spot's", owner: "Brett Smith", specialities: ["bread", "bagel", "roll"]})

    assert.equal(bakery.focus.length, 3);
    assert.equal(bakery.focus[0], "bread");
    assert.equal(bakery.focus[1], "bagel");
    assert.equal(bakery.focus[2], "roll")
  })
  it('should not serve drinks', function () {
    var bakery = new Bakery({name: "Taryn's", owner: "Taryn Martin", specialities: ["bread", "brownie"]})

    assert.equal(bakery.drinks.length, 0)
  })
  it('should be able to serve specific drinks', function () {
    var bakery = new Bakery({name: "Bean's", owner: "Ian McShane", specialities: ['coffee cake', 'brownie', 'cupcake'], drinks: ['coffee', 'tea']})

    assert.equal(bakery.drinks.length, 2)
    assert.equal(bakery.drinks[0], 'coffee')
    assert.equal(bakery.drinks[1], 'tea')
  })
  it('should be able to take a customer order', function () {
    var bakery = new Bakery({name: "Bean's", owner: "Benedict Cumberbatch", specialities: ["bagel", "muffin"], drinks: ['coffee', 'tea', 'hot chocolate']})

    var order = bakery.takeOrder('bagel')

    assert.equal(order, "Here is your bagel. Have a great day!")
  })
  it('should let customer know if an item is unavailable', function () {
    var bakery = new Bakery({name: "Tom's", owner: "Tom Martin", specialities: ["bread", "cake"], drinks: ['coffee', 'tea']})

    var order = bakery.takeOrder('cupcake')

    assert.equal(order, "Sorry we do not have a cupcake. Is there something else you would like?")
  })
  it('should add a new speciality', function () {
    var bakery = new Bakery({name: "Mary's", owner: "Chris Pratt", specialities: ["cake", "muffin"], drinks: ['steamers', 'hot chocolate']})

    bakery.addSpeciality("cupcake");

    assert.deepEqual(bakery.focus[0], "cupcake")
  })

  // complete BakedGoods test on line 92 before continuing
  it('should create an inventory from focus', function () {
    var bakery = new Bakery({name: "John's", owner: "John Brown", specialities: ["bagel", "sourdough bread"], drinks: ['tea', 'hot chocolate']})

    bakery.createInventory();

    assert.equal(bakery.inventory.length, 2)
    assert.instanceOf(bakery.inventory[0], BakedGoods)
    assert.instanceOf(bakery.inventory[1], BakedGoods)
    assert.equal(bakery.inventory[0].name, "bagel")
    assert.equal(bakery.inventory[1].name, "sourdough bread")
    assert.equal(bakery.inventory[0].amount, 24)
    assert.equal(bakery.inventory[1].amount, 24)
  })
  // below is very hard, feel free to skip
  it.skip('should be able to reduce inventory after customer order', function () {
    var bakery = new Bakery({name: "Liam's", owner: "Liam Neeson", specialities: ["coffee cake", "muffin"], drinks: ['coffee', 'hot chocolate']})

    var order = bakery.takeOrder("coffee cake");

    assert.equal(order, "Here is your coffee cake. Have a great day!");
    assert.equal(bakery.inventory[0].amount, 23)
  })
})

describe("Baked Good", function () {
  it('should be a function', function () {
    assert.isFunction(BakedGoods)
  })
  it('should have a name', function () {
    var brownies = new BakedGoods("brownie");

    assert.equal(brownies.name, "brownie")
  })
  it('should have an amount', function () {
    var cupcakes = new BakedGoods("cupcake")

    assert.equal(cupcakes.amount, 24)
  })
  it('should be able to decrease the amount of baked goods', function () {
    var sourdough = new BakedGoods("sourdough bread");

    sourdough.removeGood();

    assert.equal(sourdough.amount, 23)
  })
  // return to line 68 to finish tests
})
