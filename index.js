const responses = require("./helper/responses").responses;
module.exports.paginate = async ( model, res, currentpage, perpage, criteria, populateField ) => {
    try {
      if (!model) return responses.error(400, 'Model name is required');
      if(!res) return responses.error(400, 'Response parameter is required');
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
      if (data.length) {
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
        return res.send(
          responses.output(200, "Records retrieved successfully", data, meta)
        );
      } else {
        return res.status(200).send({ message: "No result found.", data: [] });
      }
    } catch (err) {
      return res.send(
        responses.error(500, `Error getting data ${err.message}`)
      );
    }
};