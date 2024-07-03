
const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    
    image: String,
    name: String,
    description: String,
    price: String

});
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu

