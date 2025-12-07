/**
 * Transform flat SQL rows into nested JSON structure
 * @param {Array} rows - Flat array from SQL query
 * @returns {Object|null} Nested test object
 */
function transformToNested(rows) {
    if (rows.length === 0) return null;

    const first = rows[0];
    const result = {
        testId: first.test_id,
        testName: first.test_name,
        testDescription: first.test_description,
        testAdmin: first.test_admin,
        testDate: first.test_date,
        testData: []
    };

    const pairsMap = new Map();

    for (const row of rows) {
        // Get or create pair
        if (!pairsMap.has(row.pair_code)) {
            pairsMap.set(row.pair_code, {
                pairId: row.pair_code,
                variants: new Map()
            });
        }
        const pair = pairsMap.get(row.pair_code);

        // Get or create variant
        if (!pair.variants.has(row.variant_code)) {
            pair.variants.set(row.variant_code, {
                variantId: row.variant_code,
                label: row.variant_label,
                img: row.img_url,
                options: []
            });
        }
        const variant = pair.variants.get(row.variant_code);

        // Add option
        if (row.option_code) {
            variant.options.push({
                optionId: row.option_code,
                text: row.option_text
            });
        }
    }

    // Convert maps to arrays
    for (const [, pair] of pairsMap) {
        result.testData.push({
            pairId: pair.pairId,
            variants: Array.from(pair.variants.values())
        });
    }

    return result;
}

module.exports = { transformToNested };
