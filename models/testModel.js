const pool = require('../config/database');
const { transformToNested } = require('../utils/testTransformer');

const TestModel = {
    async getByTestId(testId) {
        const query = `
            SELECT 
                t.test_id,
                t.name AS test_name,
                t.description AS test_description,
                t.admin_username AS test_admin,
                t.test_date,
                p.pair_code,
                v.variant_code,
                v.label AS variant_label,
                v.img_url,
                o.option_code,
                o.text AS option_text
            FROM tests t
            LEFT JOIN test_pairs p ON p.test_id_fk = t.id
            LEFT JOIN variants v ON v.pair_id_fk = p.id
            LEFT JOIN variant_options o ON o.variant_id_fk = v.id
            WHERE t.test_id = $1
            ORDER BY p.sort_order, v.variant_code, o.sort_order;
        `;
        const result = await pool.query(query, [testId]);
        return transformToNested(result.rows);
    }
};

module.exports = TestModel;
