exports.getCurrencyList = async (erq, res, next) => {
    try {
        const currency = await domain.Currency.findAll();
        const response = views.JsonView({ currency });

        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
}