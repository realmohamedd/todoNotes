import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NodesService } from '../../services/nodes.service';
import { Note } from '../../core/interfaces/note';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _NodesService = inject(NodesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  noteList: WritableSignal<Note[]> = signal([]);

  addNotesForm: FormGroup = this._FormBuilder.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });

  updateNotesForm: FormGroup = this._FormBuilder.group({
    _id: [null], // Make sure you are using the correct field name, e.g., "_id" for the note ID
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.getUserNotes();
  }

  addNote() {
    this._NodesService.addNote(this.addNotesForm.value).subscribe({
      next: (res) => {
        this.addNotesForm.reset();
        $('#exampleModal').modal('hide');
        this.getUserNotes();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserNotes() {
    this._NodesService.getUserNotes().subscribe({
      next: (res) => {
        this.noteList.set(res.notes);
        console.log(res);
      },
      error: (err) => {
        if (err.error.msg === 'no notes found') {
          this.noteList.set([]);
        }
        console.log(err);
      },
    });
  }

  deleteNote(id: string) {
    this._NodesService.deleteNote(id).subscribe({
      next: (res) => {
        this.getUserNotes();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setUpdateNote(note: any) {
    $('#updateModal').modal('show');
    this.updateNotesForm.patchValue(note); // Ensure the correct fields are being patched, including the "_id"
  }

  updateNote() {
    const { _id, content, title } = this.updateNotesForm.value;

    // Check if _id is correctly passed
    if (_id) {
      this._NodesService.updateNote(_id, { content, title }).subscribe({
        next: (res) => {
          $('#updateModal').modal('hide');
          this.getUserNotes();
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('Error: ID is missing');
    }
  }
}
