import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerAppComponent } from './task-manager-app.component';

describe('TaskManagerAppComponent', () => {
  let component: TaskManagerAppComponent;
  let fixture: ComponentFixture<TaskManagerAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskManagerAppComponent]
    });
    fixture = TestBed.createComponent(TaskManagerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
