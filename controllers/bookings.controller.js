const Booking = require("../models/Booking.model");

module.exports.bookingsController = {
  getBooking: async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.json(bookings);
    } catch (error) {
      res.status(401).json("Ошибка " + error.toString());
    }
  },
  addBooking: async (req, res) => {
    try {
      const { tour, day } = req.body;
      const booking = await Booking.create({
        user: req.user.id,
        tour,
        day,
      });
      res.json(booking);
    } catch (error) {
      res.status(401).json("Ошибка " + error.toString());
    }
  },
  removeDayFromBooking: async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.bookingsId);
      res.json(booking);
    } catch (error) {
      res.status(401).json("Ошибка " + error.toString());
    }
  },
};
