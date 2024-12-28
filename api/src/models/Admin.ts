import { DataTypes, Model } from 'sequelize';
import sequelize from '@/config/database';

interface AdminAttributes {
    id?: number;
    email: string;
    password: string;
}

class Admin extends Model<AdminAttributes> implements AdminAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
}

Admin.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Admin',
    }
);

export default Admin

