import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerBoxComponent } from './task-manager-box.component';

describe('TaskManagerBoxComponent', () => {
  let component: TaskManagerBoxComponent;
  let fixture: ComponentFixture<TaskManagerBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskManagerBoxComponent]
    });
    fixture = TestBed.createComponent(TaskManagerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
