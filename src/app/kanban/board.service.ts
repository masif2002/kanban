import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { switchMap, map } from 'rxjs/operators';
import { Board, Task } from './board.model';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  // Injecting dependency
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  // Creates a board for the current user
  async createBoard(data: any) {
    const user = await this.afAuth.currentUser;

    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'Task1', label: 'yellow' }] // default values for the board
    })
  }

  // Delete Board
  deleteBoard(boardId: string) {
    return this.db.collection('boards')
      .doc(boardId)
      .delete()
  }

  // Update tasks on board
  updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards')
      .doc(boardId)
      .update({ tasks })
  }

  // Remove a specific task on board
  removeTask(boardId: string, task: Task) {
    return this.db.collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task) // Only removes the task that is missing
      })
  }

  // Get all boards owned by the current user
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.db
          .collection<Board>
            ('boards', ref => ref.where('uid', '==', user.uid).orderBy('priority'))
          .valueChanges({ idField: 'id' })
        } else {
          return []
        }
      })
    )
  }

  // Sort the boards after moving
  sortBoards(boards: Board[]) {
      const db = firebase.firestore()
      const batch = db.batch()
      const refs = boards.map(b => db.collection('boards').doc(b.id))
      refs.forEach((ref, idx) => batch.update(ref, { priority: idx }))
      batch.commit()

      // When writing to DB in batches, all the writes in a batch must succeed
      // Else, the DB is rolled back to the previous state (ie- before writing the batch of changes)
  }


}
