const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
      },
      numSleeps: {
        type: Number,
        required: true
      },
      numBedrooms: {
        type: Number,
        required: true
      },
      numBathrooms: {
        type: Number,
        required: true
      },
      pricePerNight: {
        type: Number,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      province: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
      picture: {
        site: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        },
        author: {
          type: String,
          required: true
        }
      },
      featuredRental: {
        type: Boolean,
        default: false
      },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const rentalModel = mongoose.model("rentals", rentalSchema);

module.exports = rentalModel;
