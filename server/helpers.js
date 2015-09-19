 var Q  = require('q'),
    jwt   = require('jwt-simple'),
    Moderator = require('./moderatorsModel'),
    Room = require('./roomsModel');

var controllers = {

  signin: function (req, res) {
    var email = req.body.email,
        password = req.body.password;

    var findUser = Q.nbind(Moderator.findOne, Moderator);

    findUser({email: email})
      .then(function (user) {
        if (!user) {
          res.json({token: 'null'});
          console.log('* * * user not found')
        } else {
          if (password === user.password) {
            var token = jwt.encode(user, 'secret');
            res.json({token: token});
          } else {
            console.log('* * * password incorrect');
          }
        }
      })

  },

  signup: function (req, res) {
    var email  = req.body.email,
        password  = req.body.password,
        create,
        newUser;

    var findUser = Q.nbind(Moderator.findOne, Moderator);

    findUser({email: email})
      .then(function(user) {
        if (user) {
          res.json({token: 'null'});
          console.log('* * * username taken')
        } else {
          newUser = {
            email: email,
            password: password
          };
          create = Q.nbind(Moderator.create, Moderator);
          var token = jwt.encode(newUser, 'secret');
          create(newUser);
          res.json({ token: token });
        }
      })
  },

  createRoom: function (req, res) {
    var email = req.body.email,
        roomname = req.body.roomname,
        create,
        newRoom,
        id;

    var createRandomID = function () {
      var characters = 'abcdefghijklmnopqrstuvwxyz1234567890',
          id = '';
      for (var i = 0; i < 8; i++) {
        id += characters[Math.floor(Math.random() * 36)];
      }
      return id;
    };

    var findRoom = Q.nbind(Room.findOne, Room);

    findRoom({
      email: email,
      name: roomname
    })
      .then(function (room) {
        if (!room) {
          id = createRandomID();
          newRoom = {
            email: email,
            name: roomname,
            messages: [],
            users: [],
            id: id
          };
          console.log('new room:', newRoom);
          create = Q.nbind(Room.create, Room);
          create(newRoom);
          res.json({ success: true , id: id });
        } else {
          var token = jwt.encode(room, 'secret');
          res.json({ success: false });
          console.log('* * * moderator already created room with this name');
        }
      })
  },

  checkRoomExists: function (req, res) {

    var id = req.body.id,
        token = req.body.token,
        roomData,
        update

    var createRandomID = function () {
      var characters = 'abcdefghijklmnopqrstuvwxyz1234567890',
          id = '';
      for (var i = 0; i < 5; i++) {
        id += characters[Math.floor(Math.random() * 36)];
      }
      return id;
    };

    console.log('id:', id)
    var findRoom = Q.nbind(Room.findOne, Room);

    findRoom({
      id: id
    })
      .then(function (room) {
        console.log('checkroom');
        if (!room) {

          res.json({ success: false });
        } else {
          roomData = room;
          if (!token) {
            console.log('no token');
            var uid = createRandomID();
            update = Q.nbind(Room.update, Room);
            update(
              { id: id },
              { $addToSet: { users: [ uid, [] ] } }
            )
          }
          res.json({ success: true, roomData: roomData, token: uid });
              // .then(function () {
              //    res.json({ success: true, roomData: roomData, token: uid });
              // }) 
        }
      })
  },

  addMessage: function (req, res) {
    var id = req.body.id,
        message = req.body.message,
        uid = req.body.uid;

    var createRandomID = function () {
      var characters = 'abcdefghijklmnopqrstuvwxyz1234567890',
          id = '';
      for (var i = 0; i < 3; i++) {
        id += characters[Math.floor(Math.random() * 36)];
      }
      return id;
    };

    var update = Q.nbind(Room.update, Room),
        messageID = createRandomID();
        time = new Date();
  
    var pack = [ message, time, messageID, 0, uid, [] ];
    console.log('inserting: ', pack);
    update(
      { id: id },
      { $addToSet: { messages: pack }}
    )
      .then(function () {
        res.json({ success: true, messageID: messageID });
      })

    // var findRoom = Q.nbind(Room.findOne, Room);

    // findRoom({
    //   id: id
    // })
    // .then(function (room) {
    //   console.log('*** room status ***', room);
    // })
  }
}



module.exports = controllers;
