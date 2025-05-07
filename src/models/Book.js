const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Book extends Model {}

Book.init(
  {
    // Primary key: UUID auto-generated
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Book title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Book author
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // ISBN must be unique
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    // Published data
    publishedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    // Status
    status: {
      type: DataTypes.ENUM("available", "borrowed"),
      defaultValue: "available",
    },

    // Number of copies
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize, // our DB connection
    modelName: "Book", // JavaScript name
    tableName: "books", // actual table name in Postgres
    timestamps: true, // adds createdAt / updatedAt
  }
);

module.exports = Book;
