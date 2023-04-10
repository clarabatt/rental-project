const express = require("express");
const router = express.Router();
const rent = require("../models/rental-db");
const rentals = require("../models/rentalModel");
const path = require('path');

async function updatePic(houseId, imageUrl) {
  let uniqueName = `house${houseId}${path.parse(imageUrl.name).ext}`;

  return await imageUrl.mv(`assets/img/houses/${uniqueName}`)
  .then(() => {
    console.log(houseId);
      rentals.updateOne({ _id: houseId }, { "imageUrl": `/img/houses/${uniqueName}`})
      .then(() => {
        // Success
        console.log("Updated the profile pic.");
      })
      .catch(err => {
        console.log(`Error updating the user's profile picture ... ${err}`);
      });
  })
}

router.get("/", async (req, res) => {

  const rentalsList = await rentals.find().lean();
  const rentalsByCityAndProvince = rent.getRentalsByCityAndProvince(rentalsList);

  res.render("rentals/rentals", {
    rentals: rentalsByCityAndProvince,
  });
});

router.get("/list", async (req, res) => {
  if (req.session && req.session.user && !req.session.isCustomer) {
    const data = await rentals.find().sort({ headline: "asc" }).lean();
    res.render("rentals/list", {
      rentals: data
    });
  } else {
    res.status(401).render("general/401");
  }
});

router.get('/add', (req, res) => {
  res.render('rentals/add-rental');
});

router.post('/add', async (req, res) => {

  const { headline, numSleeps, numBedrooms, numBathrooms, pricePerNight, city, province, featuredRental } = req.body;

  try {
    const resp = await rentals.create({
      headline: headline,
      numSleeps: numSleeps,
      numBedrooms: numBedrooms,
      numBathrooms: numBathrooms,
      pricePerNight: pricePerNight,
      city: city,
      province: province,
      featuredRental: featuredRental === 'on' ? true : false
    });

    await updatePic(resp._id, req.files.imageUrl);

    if (resp) {
      res.redirect('/rentals/list');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error adding rental to database!');
  }
});

router.post('/edit/:id', async (req, res) => {

  const { headline, numSleeps, numBedrooms, numBathrooms, pricePerNight, city, province, featuredRental } = req.body;

  try {
    const rent = await rentals.findOneAndUpdate({ _id: req.params.id }, {
      id: rent._id,
      headline: headline,
      numSleeps: numSleeps,
      numBedrooms: numBedrooms,
      numBathrooms: numBathrooms,
      pricePerNight: pricePerNight,
      city: city,
      province: province,
      featuredRental: featuredRental === 'on' ? true : false
    });

    await updatePic(rent._id, req.files.imageUrl);

    if (rent) {
      res.redirect('/rentals/list');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error adding rental to database!');
  }
});

router.get('/edit/:id', async (req, res) => {

  try {
    const rent = await rentals.findOne({ _id: req.params.id }).lean();
    if (rent) {
      res.render('rentals/edit-rental', {
        values: {
          id: rent._id,
          headline: rent.headline,
          numSleeps: rent.numSleeps,
          numBedrooms: rent.numBedrooms,
          numBathrooms: rent.numBathrooms,
          pricePerNight: rent.pricePerNight,
          city: rent.city,
          province: rent.province,
          imageUrl: req.file ? `/img/houses/${req.file.filename}` : req.body.imageUrl,
          featuredRental: rent.featuredRental
        }
      });

      await updatePic(rent._id, req.files.imageUrl);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving rental from database!');
  }
});


router.get('/remove/:id', async (req, res) => {
  if (req.session && req.session.user && !req.session.isCustomer) {
    const data = await rentals.find().sort({ headline: "asc" }).lean();
    res.render("rentals/list", {
      rentals: data,
      message: "Success, rental removed!"
    });
  } else {
    res.status(401).render("general/401");
  }
});


router.post('/remove/:id', async (req, res) => {
  try {
    const rental = await rentals.findOneAndRemove({ _id: req.params.id }).lean();
    if (rental) {
      res.redirect(`/rentals/list?message=success`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving rental from database!');
  }
});


module.exports = router;