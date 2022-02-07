import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

import {
  FavouritePlace,
  User as UserModel,
} from '../adapters/sequelize/models';
import { Gender } from '../adapters/sequelize/models/user';
import {
  Category,
  Comment,
  User,
  Page,
  Article,
} from '../adapters/mongoose/models';

const categories = Object.keys(
  [...Array(100).keys()].reduce(
    (m) => ({ [faker.commerce.department()]: 1, ...m }),
    {},
  ),
);

const emails = Object.keys(
  [...Array(100).keys()].reduce(
    (m) => ({ [faker.internet.email()]: 1, ...m }),
    {},
  ),
);

const pages = Object.keys(
  [...Array(100).keys()].reduce(
    (m) => ({ [faker.commerce.productName()]: 1, ...m }),
    {},
  ),
);

const articles = Object.keys(
  [...Array(10).keys()].reduce((m) => ({ [faker.lorem.word()]: 1, ...m }), {}),
);

const places = Object.keys(
  [...Array(10).keys()].reduce(
    (m) => ({ [faker.company.companyName()]: 1, ...m }),
    {},
  ),
);

const run = async () => {
  if (process.env?.MONGO_URL !== undefined) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }
  try {
    await Category.deleteMany({});
    await Comment.deleteMany({});
    await User.deleteMany({});
    await Page.deleteMany({});
    await Article.deleteMany({});
    await UserModel.destroy({
      where: {},
    });
    await FavouritePlace.destroy({
      where: {},
    });

    await Promise.all(
      categories.map(async (title) => {
        const category = await Category.create({
          title,
          owner: faker.name.findName(),
          'nested.field': faker.random.uuid(),
          createdAt: new Date(),
        });

        const comments = Object.keys(
          [...Array(30).keys()].reduce(
            (m) => ({ [faker.lorem.paragraph()]: 1, ...m }),
            {},
          ),
        );

        return Promise.all(
          comments.map((content) =>
            Comment.create({
              content,
              category: category._id,
            }),
          ),
        );
      }),
    );
    const users: Array<typeof User> = [];
    const sqlUsers: Array<typeof UserModel> = [];
    await Promise.all(
      emails.map(async (email) => {
        const user = await User.create({
          email,
          'auth.password': faker.random.uuid(),
        });
        const userSql = await UserModel.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          gender: faker.random.boolean() ? Gender.MALE : Gender.FEMALE,
          isMyFavourite: faker.random.boolean(),
          email,
        });
        users.push(user);
        sqlUsers.push(userSql as unknown as typeof UserModel);
      }),
    );

    await Promise.all(
      emails.map(async (email) =>
        User.create({
          email,
          'auth.password': faker.random.uuid(),
        }),
      ),
    );

    await Promise.all(
      articles.map(async (title) => {
        const content = `
        <h3>${title}</h3>
        <p>${faker.lorem.paragraphs(5, '</p><p>')}</p>
      `;
        return Article.create({
          title,
          content,
          published: faker.random.boolean(),
          author: users[Math.floor(Math.random() * users.length)],
        });
      }),
    );

    await Promise.all(
      pages.map(async (title) => {
        const content = `
        <h3>${title}</h3>
        <p>${faker.lorem.paragraphs(5, '</p><p>')}</p>
      `;
        return Page.create({
          title,
          content,
          createdAt: new Date(),
        });
      }),
    );

    await Promise.all(
      places.map(async (place) =>
        FavouritePlace.create({
          name: place,
          description: faker.lorem.words(2),
        }),
      ),
    );
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
  await mongoose.connection.close();
};

run()
  .then(() => {
    console.log('end'); // eslint-disable-line no-console
  })
  .catch((e) => {
    console.log(e); // eslint-disable-line no-console
  });
