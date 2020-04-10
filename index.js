const responses = require("./helper/responses").responses;

/**
 * @param {string} param1 - Normal
 * @param {string|number|boolean} param2 - Multiple types
 * @param {null} param3 - (I know this is strange param.)
 * @param {string|number|null} param4 - Multiple types includes `null`
 * @param {Object} param5 - Object type
 * @param {Array} param6 - Array type
 * @param {jQuery} param7 - Another type
 * @param {MyClass} param8 - Another type
 * @param {string|number|Array} param9 - Multiple types includes `Array`
 * @param {?string} param10 - Nullable type
 * @param {string} [param11] - Optional
 * @returns {?string} result
 */

module.exports.paginate = async ( model, currentpage, perpage, criteria, populateField ) => {
    try {
      if (!model) return responses.error(400, 'Model name is required');
      const pagination = {
        page: parseInt(currentpage) || 0,
        limit: parseInt(perpage) || 20
      };
      const search = criteria || {};
      const count = await model.countDocuments(search);
      const data = await model
        .find(search)
        .sort({createdAt: -1})
        .populate(`${populateField}`)
        .limit(pagination.limit)
        .skip(pagination.page * pagination.limit);
      if (data.length > 0) {
        const numberOfPages = Math.ceil(count / pagination.limit);
        const nextPage = parseInt(pagination.page) + 1;
        const meta = {
          page: pagination.page,
          perPage: pagination.limit,
          previousPage:
            pagination.page > 1 ? parseInt(pagination.page) - 1 : false,
          nextPage: numberOfPages >= nextPage ? nextPage : false,
          pageCount: numberOfPages,
          total: count
        };
        return responses.output(200, "Records retrieved successfully", data, meta)
      } else {
        return responses.success(200, data, "No data found");
      }
    } catch (err) {
      return  responses.error(500, `Error getting data ${err.message}`)
    }
};