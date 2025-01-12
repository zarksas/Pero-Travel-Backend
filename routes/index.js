const { Router } = require("express");

const router = Router();

router.use(require("./users.route"));
router.use(require("./optionals.route"));
router.use(require("./tours.route"));
router.use(require("./reviews.route"));
router.use(require("./bookings.route"));

module.exports = router;
