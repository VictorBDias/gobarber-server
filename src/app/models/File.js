const { Model, DataTypes } = require('sequelize');

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        // url sera virtual e nao existira no banco de dados
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
module.exports = File;
