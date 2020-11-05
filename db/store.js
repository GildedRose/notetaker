const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

class Storage{
    read() {
        return fs.readFile("db/db.json", "utf8");
    }

    write(note) {
        return fs.writeFile("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read()
            .then(notes => {
                const parsedNotes = [].concat(JSON.parse(notes));
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