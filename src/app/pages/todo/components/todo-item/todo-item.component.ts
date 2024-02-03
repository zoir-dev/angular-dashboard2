import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Todo } from '../../types';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NzCheckboxModule, NzIconModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Output() editTodoEvent = new EventEmitter<Todo>();
  @Output() readyToEditEvent = new EventEmitter<{ todo: Todo; input: any }>();
  @Output() deleteTodoEvent = new EventEmitter<Todo>();
  @Output() changeTodoCheckedEvent = new EventEmitter<{
    todo: Todo;
    checked: boolean;
  }>();

  @Input() newTodo!: any;
  @Input() todo!: Todo;

  readyToEdit() {
    this.readyToEditEvent.emit({ todo: this.todo, input: this.newTodo });
  }

  editTodo() {
    this.editTodoEvent.emit(this.todo);
  }

  deleteTodo() {
    this.deleteTodoEvent.emit(this.todo);
  }

  changeTodoChecked() {
    this.changeTodoCheckedEvent.emit({
      todo: this.todo,
      checked: !this.todo.isDone,
    });
  }
}
