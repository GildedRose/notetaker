const router = require('express').Router();
const Storage = require('../db/store');

router.get('/notes', (req, res) => {
    Storage
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

router.post ('/notes', (req, res) => {
    Storage
        .addNotes()
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

module.exports = router;