import { Injectable } from '@angular/core';
import { Tag } from './tag';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Récupérer les tags depuis le localStorage
  getTags(): Tag[] {
    const json = localStorage.getItem('tags');
    return json ? JSON.parse(json) : []; // Si les tags sont trouvés, les analyser en objets MyTag, sinon retour d'un tableau vide
  }

  // Ajouter un nouveau tag
  addTag(tag: Tag): void {
    const tags = this.getTags();  // Récupère la liste actuelle des tags
    localStorage.setItem('tags', JSON.stringify(tags));  // Sauvegarde les tags dans le localStorage
  }

  // Supprimer un tag basé sur l'ID
  deleteTag(id: number): void {
    const tags = this.getTags().filter((tag: Tag) => tag.id !== id);  // Filtrer les tags qui ne sont pas celui à supprimer
    localStorage.setItem('tags', JSON.stringify(tags));  // Sauvegarde la liste mise à jour des tags
  }

  getNextId(): number {
    const tags = this.getTags();
    let maxId = 0;
  
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id > maxId) {
        maxId = tags[i].id;
      }
    }
    return maxId + 1;
  }

  updateTag(updatedTag: Tag): void {
    const tags = this.getTags();
    const index = tags.findIndex(tag => tag.id === updatedTag.id);
  
    if (index !== -1) {
      tags[index] = { ...updatedTag };
      localStorage.setItem('tags', JSON.stringify(tags));
    }
  }

  // Récupérer les notes depuis le localStorage
  getNotes(): Note[] {
    const json = localStorage.getItem('notes');
    return json ? JSON.parse(json) : []; // Si les tags sont trouvés, les analyser en objets MyTag, sinon retour d'un tableau vide
  }

  // Ajouter une nouvelle note
  addNote(tag: Note): void {
    const notes = this.getNotes();  // Récupère la liste actuelle des tags
    localStorage.setItem('notes', JSON.stringify(notes));  // Sauvegarde les tags dans le localStorage
  }

  // Supprimer un tag basé sur l'ID
  deleteNote(id: number): void {
    const notes = this.getNotes().filter((note: Note) => note.id !== id);  // Filtrer les tags qui ne sont pas celui à supprimer
    localStorage.setItem('notes', JSON.stringify(notes));  // Sauvegarde la liste mise à jour des tags
  }

  getNextIdNote(): number {
    const notes = this.getNotes();
    let maxId = 0;
  
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id > maxId) {
        maxId = notes[i].id;
      }
    }
    return maxId + 1;
  }

  updateNote(updatedNote: Note): void {
    const notes = this.getNotes();
    const index = notes.findIndex(notes => notes.id === updatedNote.id);
  
    if (index !== -1) { // si la note existe bien
      notes[index] = { ...updatedNote };//crée une copie pour ne pas modifier l'objet d’origine
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }

}


