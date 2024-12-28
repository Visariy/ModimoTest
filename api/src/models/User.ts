import { DataTypes, Model } from 'sequelize';
import sequelize from '@/config/database';

interface UserAttributes {
    id?: number;
    login: string;
    email: string;
    password: string;
    isVerified?: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public login!: string;
    public email!: string;
    public password!: string;
    public isVerified!: boolean;
}

User.init(
    {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
