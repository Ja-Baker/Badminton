const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ReviewsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.create(
      {
        id: data.id || undefined,

        rating: data.rating || null,
        comment: data.comment || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await reviews.setProduct(data.product || null, {
      transaction,
    });

    await reviews.setUser(data.user || null, {
      transaction,
    });

    return reviews;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const reviewsData = data.map((item, index) => ({
      id: item.id || undefined,

      rating: item.rating || null,
      comment: item.comment || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const reviews = await db.reviews.bulkCreate(reviewsData, { transaction });

    // For each item created, replace relation files

    return reviews;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findByPk(id, {}, { transaction });

    await reviews.update(
      {
        rating: data.rating || null,
        comment: data.comment || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await reviews.setProduct(data.product || null, {
      transaction,
    });

    await reviews.setUser(data.user || null, {
      transaction,
    });

    return reviews;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findByPk(id, options);

    await reviews.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await reviews.destroy({
      transaction,
    });

    return reviews;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findOne({ where }, { transaction });

    if (!reviews) {
      return reviews;
    }

    const output = reviews.get({ plain: true });

    output.product = await reviews.getProduct({
      transaction,
    });

    output.user = await reviews.getUser({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.products,
        as: 'product',
      },

      {
        model: db.users,
        as: 'user',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.comment) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('reviews', 'comment', filter.comment),
        };
      }

      if (filter.ratingRange) {
        const [start, end] = filter.ratingRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.product) {
        var listItems = filter.product.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          productId: { [Op.or]: listItems },
        };
      }

      if (filter.user) {
        var listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.reviews.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.reviews.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('reviews', 'product', query),
        ],
      };
    }

    const records = await db.reviews.findAll({
      attributes: ['id', 'product'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['product', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.product,
    }));
  }
};
