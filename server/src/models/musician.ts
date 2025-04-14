import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class Musician extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

export function UserFactory (sequelize: Sequelize): typeof Musician {
    Musician.init(
        {
            id: {
                type: DataTypes.INTEGER, 
                allowNull: false,
                autoIncrement:true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    len: [5, 10], // only allow values with length between 5 and 10
                    msg: 'Your password values need a lenght between 5 and 10'
                },
            }
        },
        {
            tableName: 'musician',
            sequelize,
            timestamps: false,
        }
    );

    return Musician;
}