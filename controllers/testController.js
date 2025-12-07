const TestModel = require('../models/testModel');

const TestController = {
    async getByTestId(req, res) {
        const { testId } = req.params;
        try {
            const rows = await TestModel.getByTestId(testId);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'DB error' });
        }
    }
};

module.exports = TestController;
