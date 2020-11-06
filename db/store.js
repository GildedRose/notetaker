const util = require("util");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage{
    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read()
            .then(notes => {
                let parsedNotes;

                try {
                    parsedNotes = [].concat(JSON.parse(notes));
                } catch (err) {
                    parsedNotes = [];
                }
                return parsedNotes;
            });
    
    }
    addNotes() {
        const { title, text } = note;
    
        if (!title || !text) {
            throw new Error("'Title' and 'Text' cannot be blank. Please try again.");
        }
    
        const newNote = { title, text, id: uuidv4() };
    
        return this.getNotes() 
            .then(notes => {
                [...notes, newNote]
            })
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => { newNote });
    }
}

module.exports = new Storage();
