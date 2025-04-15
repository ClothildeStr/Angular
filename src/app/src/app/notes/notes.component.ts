import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';
import { Note } from '../note'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  imports: [FormsModule, CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  constructor(private storage:StorageService) {}
  // Propriété qui indique si les tags sont chargés
  loaded: boolean = false;
  newNoteContenu: string = '';

  // Tableau des tags, initialisé vide
  notes: Note[] = [];

  editing: Note | null = null;  // Tag en cours d'édition

  // Méthode pour charger les tags
  loadNotes(): void {
    if (!this.loaded) {
      // Charge les tags à partir du service
      this.notes = this.storage.getNotes();
      this.loaded = true; // Une fois les tags chargés, définir loaded à true
    }
  }

  // Méthode pour ajouter ou modifier un tag
  dialogAddNote(): boolean {
    if (!this.editing) return false;
  
    if (this.editing.id === 0) {
      // Création d’un nouveau tag
      const newNote: Note = {
        id: this.storage.getNextIdNote(),
        tag: null,//qqch ds les tag
        contenu: this.editing.contenu
      };
  
      this.notes.push(newNote);
      this.storage.addNote(newNote);
    } else {
      // Modification d’une note existante
      const index = this.notes.findIndex(note => note.id === this.editing?.id);
      if (index !== -1) {
        this.notes[index] = { ...this.editing };
        this.storage.updateNote(this.editing); // update, ajout de la nouvelle note
      }
    }
  
    // Réinitialisation
    this.editing = null;
    return false;
  }

  // Méthode pour annuler l'édition
  cancelEdit(): void {
    this.editing = null;
  }

  editNote(note: Note): void {
    this.editing = { ...note };
  }

  dialogDeleteNote(n: Note): void {
    // Supprime le tag dans la liste
    this.notes = this.notes.filter(note => note.id !== n.id);
  
    // Supprime le tag dans le localStorage
    this.storage.deleteNote(n.id);
  }

}
