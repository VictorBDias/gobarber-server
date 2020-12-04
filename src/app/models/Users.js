import { Model, DataType } from 'sequelize';

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataType.STRING,
        email: DataType.STRING,
        password_hash: DataType.STRING,
        provider: DataType.BOOLEAN,
      },
      {
        sequelize,
      },
    );
  }
}
export default Users;
