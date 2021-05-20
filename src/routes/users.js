const router = require('express').Router();
const userRepo = require('../repos/users-repo');
const asyncHandler = require('./../middlewares/async');

// get all the users in the users table
router.get(
  '/users',
  asyncHandler(async (req, res) => {
    const users = await userRepo.find();
    res.send(users);
  })
);

//  get user by paticular id
router.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await userRepo.findById(id);

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  })
);

//  create a new user
router.post(
  '/users',
  asyncHandler(async (req, res) => {
    const { bio, username } = req.body;
    const user = await userRepo.insert(bio, username);
    res.send(user);
  })
);

// edit a user
router.put(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, bio } = req.body;
    const user = await userRepo.update(id, bio, username);
    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  })
);

// delete a user
router.delete(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await userRepo.delete(id);
    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
