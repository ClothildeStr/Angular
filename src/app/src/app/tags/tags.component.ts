import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';
import { TagComponent } from '../tag/tag.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-tags',
  imports: [TagComponent, FormsModule, CommonModule,],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  constructor(private storage:StorageService) {}
  // Propriété qui indique si les tags sont chargés
  loaded: boolean = false;
  newTagName: string = '';

  // Tableau des tags, initialisé vide
  tags: Tag[] = [];

  editing: Tag | null = null;  // Tag en cours d'édition

  // Méthode pour charger les tags
  loadTags(): void {
    if (!this.loaded) {
      // Charge les tags à partir du service
      this.tags = this.storage.getTags();
      this.loaded = true; // Une fois les tags chargés, définir loaded à true
    }
  }

  // Appel de loadTags lorsque le composant est initialisé
  //ngOnInit(): void {
    //this.loadTags();
  //}

  // Méthode pour initialiser l'édition d'un nouveau tag
  startEditingNewTag(): void {
    this.editing = { id: 0, name: '', color: '#000000' };  // Crée un nouveau tag vide
  }

  // Méthode pour ajouter ou modifier un tag
  dialogAddTag(): boolean {
    if (!this.editing) return false;
  
    if (this.editing.id === 0) {
      // Création d’un nouveau tag
      const newTag: Tag = {
        id: this.storage.getNextId(),
        name: this.editing.name,
        color: this.editing.color || '#cccccc'
      };
  
      this.tags.push(newTag);
      this.storage.addTag(newTag);
    } else {
      // Modification d’un tag existant
      const index = this.tags.findIndex(tag => tag.id === this.editing?.id);
      if (index !== -1) {
        this.tags[index] = { ...this.editing };
        this.storage.updateTag(this.editing); // Si ton service a une méthode update
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

  editTag(tag: Tag): void {
    this.editing = { ...tag };
  }

  dialogDeleteTag(t: Tag): void {
    // Supprime le tag dans la liste
    this.tags = this.tags.filter(tag => tag.id !== t.id);
  
    // Supprime le tag dans le localStorage
    this.storage.deleteTag(t.id);
  }

}


