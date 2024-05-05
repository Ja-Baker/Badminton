const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },
      { id: getId('User'), name: 'User', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'orders',
      'products',
      'reviews',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table \`rolesPermissionsPermissions\`
(
    \`createdAt\`           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`updatedAt\`           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`roles_permissionsId\` VARCHAR(36) not null,
    \`permissionId\`        VARCHAR(36) not null,
    primary key (\`roles_permissionsId\`, \`permissionId\`)
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('CREATE_ORDERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('READ_ORDERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('UPDATE_ORDERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('DELETE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('CREATE_PRODUCTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('READ_PRODUCTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('UPDATE_PRODUCTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('DELETE_PRODUCTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('CREATE_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('READ_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('UPDATE_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('DELETE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('User'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ORDERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ORDERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ORDERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ORDERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PRODUCTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PRODUCTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PRODUCTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PRODUCTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    const adminRoleId = getId('Administrator');
    const userRoleId = getId('User');
    await queryInterface.sequelize.query(
      "UPDATE `users` SET `app_roleId`=:roleId WHERE `email`='admin@flatlogic.com'",
      { replacements: { roleId: adminRoleId } },
    );
    await queryInterface.sequelize.query(
      "UPDATE `users` SET `app_roleId`=:roleId WHERE `email`='client@hello.com'",
      { replacements: { roleId: userRoleId } },
    );
    await queryInterface.sequelize.query(
      "UPDATE `users` SET `app_roleId`=:roleId WHERE `email`='john@doe.com'",
      { replacements: { roleId: userRoleId } },
    );
  },
};
