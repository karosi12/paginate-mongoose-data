# Paginate-mongoose-data

This package is use to paginate mongodb data.

[![NPM](https://nodei.co/npm/paginate-mongoose-data.png)](https://nodei.co/npm/paginate-mongoose-data/)

## Installation
First install [Node.js](http://nodejs.org/) and [MongoDB](https://www.mongodb.org/downloads). Then:

Use the package manager [npm](https://www.npmjs.com/package/paginate-mongoose-data) to install paginate-mongoose-data.

```bash
npm install mongoose --save
npm install paginate-mongoose-data --save
```

## Usage
```javascript
import { paginate } from 'paginate-mongoose-data';
import { Users } from '../models/user';

const limit: number; // limit number of data to fetch
const currentpage: number; // current page of data to fetch
const criteria: object = {field: value};
const populateField = [
  {
    path: "userId",
    select: "userName"
  },
  {
    path: "categoryId",
    select: "name",
  }
];

paginate(Users); // Model is required, second parameter of object is optional

// Model and query object
paginate(Users, {
    limit,
    currentpage,
    criteria
}); // parameters => Model, Paginate object

// Model and query object
paginate(Users, {
    limit,
    currentpage,
    criteria,
    populateField
}); // parameters => Model, Paginate object with populated fields
```


```javascript
// How to populate nested object
const populateField = [
  {
    path: "userId",
    select: "userName"
  },
  {
    path: "categoryId",
    select: "name",
    populate: {
        path: 'userId'
      }
  }
];

paginate(Users, { populateField }); // parameters => Model, Paginate object with populated fields
```

```javascript
// Using ES6 imports
import { Users } from '../models/user'
import { Response, Request } from 'express';
import { paginate } from 'paginate-mongoose-data';

class UserController {
    async list(req: Request, res: Response) {
        try {
           const {message , data, meta } =  await paginate(Users);
           logger.info(`${message} ${JSON.stringify(data)}`);
           return res.status(200).send({ message, data, meta  });
          } catch (error) {
           logger.error(`error occured unable to list users ${JSON.stringify(error)}`);
          return res.status(500).send(responsesHelper.error(500, `${error}`));
        }
  };
}
```

```javascript
// Using Nodejs require()
const Users = require('../models/user');
const Paginate = require('paginate-mongoose-data').paginate;
const list = async(req, res) => {
    try {
        const {message , data, meta } =  await Paginate(Users);
        logger.info(`${message} ${JSON.stringify(data)}`);
        return res.status(200).send({ message, data, meta  });
    } catch (error) {
      logger.error(`error occured unable to list users ${JSON.stringify(error)}`);
      return res.status(500).send(responsesHelper.error(500, `${error}`));
    }
}
module.exports = list;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to run test.

```bash
npm test
```


## Authors

**Adeyemi Kayode** - *Initial work* - [paginate-mongoose-data](https://github.com/karosi12/paginate-mongoose-data)

See also the list of [contributors](https://github.com/karosi12/paginate-mongoose-data/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
