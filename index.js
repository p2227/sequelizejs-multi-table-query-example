var Sequelize = require('sequelize');

var sequelize = new Sequelize('mydb', 'root', 'root', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './database.sqlite'
});

var User = function(sequelize, DataTypes) {
    var User = sequelize.define('db_user', {
        id: {
            type: DataTypes.INTEGER(9),
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'db_user',
        timestamps: false,
        freezeTableName: true
    });
    return User;
}(sequelize, Sequelize);

var Msg = function(sequelize, DataTypes) {
    var Msg = sequelize.define('tb_msg', {
        id: {
            type: 'CHAR(32)',
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        date: {
            type: 'CHAR(13)',
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isread: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'tb_msg',
        timestamps: false,
        freezeTableName: true
    });
    return Msg;
}(sequelize, Sequelize);

User.hasMany(Msg, { as:'userMsg', foreignKey: 'sender' });  //If you provide an alias when creating the association, you should provide the same alias when eager loading and when getting associated models
User.hasMany(Msg, { as:'userMsg',foreignKey: 'receiver' });


User.sync({ force: true }).then(function() {
    User.create({ id: 1, name: 'user1', password: '1' });
    User.create({ id: 2, name: 'user2', password: '2' });
}).then(function() {
    return Msg.sync({ force: true }).then(function() {
        Msg.create({ id: '111', content: '11111', date: +(new Date) + '', sender: 1, receiver: 2, isread: '0' });
        Msg.create({ id: '222', content: '11112', date: +(new Date) + '', sender: 1, receiver: 2, isread: '0' });
        Msg.create({ id: '112', content: '22222', date: +(new Date) + '', sender: 2, receiver: 1, isread: '0' });
    })
}).then(function() {
    User.findAll({
        include: [{ model: Msg, as:'userMsg'}]
    }).then(function(rows) {
        console.log(JSON.stringify(rows));
    })
});
