const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/database')

class Member extends Model {}

Member.init({
    // Id
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    // name of the member
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // email of the member
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true}
    },

    // Hashed password
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'Member',
    tableName: 'members',
    timestamps: true
})

module.exports = Member