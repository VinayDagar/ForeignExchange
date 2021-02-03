const { Router } = require("express");
// Controllers
const { getCurrencyList } = require("../../controllers/common");
// middlewares
const { canAccess } = require("../../application/middlewares/access");

const router = Router();

router.get(
    "/currency-list",
    canAccess(["anonymous"]),
    getCurrencyList
);

module.exports = router;