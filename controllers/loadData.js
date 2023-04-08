const express = require("express");
const router = express.Router();
const Rental = require("../models/rentalModel");

router.get('/rentals', async (req, res) => {

    if (!req.session || !req.session.user || req.session.isCustomer){
        res.status(401).send("You are not authorized to add rentals");
        return;
    }

    try {
      const rentals = await Rental.find();
  
      if (rentals.length > 0) {
        return res.render('loadData/load-data', {
          message: 'Rentals have already been added to the database'
        });
      }
  
      const rentalData = [
        {
            headline: "Old Town",
            numSleeps: 8,
            numBedrooms: 4,
            numBathrooms: 3,
            pricePerNight: 445.00,
            city: "Ottawa",
            province: "Ontario",
            imageUrl: "/img/houses/house05.jpg",
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/RU5PO_E76bA",
                author: "Nataliia Kvitovska"
            },
            featuredRental: false,
        },
        {
            headline: "CentreTown",
            numSleeps: 7,
            numBedrooms: 3,
            numBathrooms: 2,
            pricePerNight: 327.00,
            city: "Ottawa",
            province: "Ontario",
            imageUrl: "/img/houses/house09.jpg",
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/QOQxKCDG9fg",
                author: "Marvin Zettl"
            },
            featuredRental: true,
        },
        {
            headline: "Kanata",
            numSleeps: 18,
            numBedrooms: 6,
            numBathrooms: 4,
            pricePerNight: 672.00,
            city: "Ottawa",
            province: "Ontario",
            imageUrl: "/img/houses/house10.jpg",
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/f6eWKcd8_dA",
                author: "Andy Holmes"
            },
            featuredRental: true,
        },
        {
            headline: "Arbour Lake",
            numSleeps: 5,
            numBedrooms: 2,
            numBathrooms: 1,
            pricePerNight: 198.00,
            city: "Calgary",
            province: "Alberta",
            imageUrl: "/img/houses/house06.jpg",
            featuredRental: false,
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/1ddol8rgUH8",
                author: "Scott Webb"
            },
        },
        {
            headline: "Oakridge",
            numSleeps: 8,
            numBedrooms: 3,
            numBathrooms: 1,
            pricePerNight: 243.00,
            city: "Calgary",
            province: "Alberta",
            imageUrl: "/img/houses/house07.jpg",
            featuredRental: true,
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/CORQ1PmkDWw",
                author: "Erin Minuskin"
            },
        },
        {
            headline: "Millrise",
            numSleeps: 3,
            numBedrooms: 1,
            numBathrooms: 1,
            pricePerNight: 298.00,
            city: "Calgary",
            province: "Alberta",
            imageUrl: "/img/houses/house02.jpg",
            featuredRental: true,
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/1HaWrVg3SYE",
                author: "Sal Karaguli"
            },
        },
        {
            headline: "Brampton",
            numSleeps: 7,
            numBedrooms: 3,
            numBathrooms: 2,
            pricePerNight: 394.00,
            city: "Toronto",
            province: "Ontario",
            imageUrl: "/img/houses/house03.jpg",
            featuredRental: true,
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/2HKJACExHeo",
                author: "Nataliia Kvitovska"
            },
        },
        {
            headline: "Mississauga",
            numSleeps: 10,
            numBedrooms: 3,
            numBathrooms: 3,
            pricePerNight: 459.00,
            city: "Toronto",
            province: "Ontario",
            imageUrl: "/img/houses/house04.jpg",
            featuredRental: true,
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/irPnI56IwRo",
                author: "Paul Kansonkho"
            },
        },
        {
            headline: "Markham",
            numSleeps: 15,
            numBedrooms: 6,
            numBathrooms: 4,
            pricePerNight: 783.00,
            city: "Toronto",
            province: "Ontario",
            imageUrl: "/img/houses/house01.jpg",
            featuredRental: false,
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/1HaWrVg3SYE",
                author: "Sal Karaguli"
            },
        },
        {
            headline: "North York",
            numSleeps: 12,
            numBedrooms: 5,
            numBathrooms: 4,
            pricePerNight: 675.00,
            city: "Toronto",
            province: "Ontario",
            imageUrl: "/img/houses/house08.jpg",
            featuredRental: false,
            picture: {
                site: "Unsplash",
                url: "https://unsplash.com/photos/Hyn-ujrF43E",
                author: "Elton Luz"
            },
        },
        
      ];
  
      await Rental.insertMany(rentalData);
  
      return res.render('loadData/add-rental', {
        message: 'Added rentals to the database'
      });
    } catch (err) {
      console.error(err);
    //   res.status(500).send('Server Error');
    }
  });

module.exports = router;