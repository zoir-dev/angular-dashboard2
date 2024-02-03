import { Component, OnDestroy } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Subject, takeUntil } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

import { TodoModule } from './todo.module';
import { capitalizeWord } from '../../shared/functions/capitalize';
import { CurrentTodo, Todo } from './types';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoModule, TodoItemComponent],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnDestroy {
  currentTodo: CurrentTodo = { name: '' };
  todos: Todo[] = [];
  loading: boolean = false;
  Loading: boolean = false;
  unSubscribe$ = new Subject();

  firestoreCollection!: AngularFirestoreCollection;

  constructor(
    private firestore: AngularFirestore,
    private msg: NzMessageService
  ) {
    this.firestoreCollection = this.firestore.collection('todos');
    this.Loading = true;
    this.firestoreCollection
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((val: any) => {
        (this.todos = val.sort()), (this.Loading = false);
      });
  }

  getInputValue(val: KeyboardEvent, newTodo: string) {
    val.code === 'Enter'
      ? this.currentTodo.id
        ? this.editTodoName()
        : this.addTodo()
      : (this.currentTodo.name = capitalizeWord(newTodo));
  }

  readyToEdit(event: any) {
    this.currentTodo = {
      ...event.todo,
    };
    event.input.focus();
  }

  async addTodo() {
    const todoName = this.currentTodo.name;
    if (
      !this.todos.find(
        (t) => t.name.toLowerCase() === todoName.toLowerCase()
      ) &&
      todoName.length
    ) {
      try {
        this.loading = true;
        await this.firestoreCollection.add({
          name: capitalizeWord(todoName),
          isDone: false,
        });
        this.msg.success(`${todoName} added successfully`);
        this.currentTodo = { name: '' };
      } catch (error: any) {
        this.msg.error(error.message);
      } finally {
        this.loading = false;
      }
    } else {
      this.msg.warning(
        todoName ? 'You have this todo!' : 'Todo name cannot be empty!'
      );
    }
  }

  async deleteTodo(todo: Todo) {
    try {
      this.loading = true;
      await this.firestoreCollection.doc(todo.id).delete();
      this.msg.success(`${todo.name} deleted successfully`);
    } catch (error: any) {
      this.msg.error(error.message);
    } finally {
      this.loading = false;
    }
  }

  async changeTodoChecked(event: any) {
    try {
      this.loading = true;
      await this.firestoreCollection
        .doc(event.todo.id)
        .update({ isDone: !event.todo.isDone });
      this.msg.success(`${event.todo.name} updated successfully`);
    } catch (error: any) {
      this.msg.error(error.message);
    } finally {
      this.loading = false;
    }
  }

  async editTodoName() {
    const todoName = this.currentTodo.name;
    try {
      if (
        !this.todos.find(
          (t) => t.name.toLowerCase() === todoName.toLowerCase()
        ) &&
        todoName
      ) {
        this.loading = true;
        await this.firestoreCollection
          .doc(this.currentTodo.id)
          .update({ name: todoName });
        this.currentTodo = { name: '' };
        this.msg.success(`${todoName} updated successfully`);
      } else {
        this.msg.warning(
          todoName ? 'You have this todo!' : 'Todo name cannot be empty!'
        );
      }
    } catch (error: any) {
      this.msg.error(error.message);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.unsubscribe();
  }
}
