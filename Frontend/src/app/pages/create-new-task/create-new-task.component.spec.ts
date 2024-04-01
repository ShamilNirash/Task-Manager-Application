import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTaskComponent } from './create-new-task.component';

describe('CreateNewTaskComponent', () => {
  let component: CreateNewTaskComponent;
  let fixture: ComponentFixture<CreateNewTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewTaskComponent],
    });
    fixture = TestBed.createComponent(CreateNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
