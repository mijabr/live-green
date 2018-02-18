import { ComponentFixture, TestBed,async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { TopMenuComponent } from './TopMenu';

describe('TopMenuComponent', () => {
  let comp:    TopMenuComponent;
  let fixture: ComponentFixture<TopMenuComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  
  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ TopMenuComponent ]
      }).compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(TopMenuComponent);
      comp = fixture.componentInstance;
      
  });

  it('First menu should be Home', () => {
      de = fixture.debugElement.query(By.css('.wrap li:nth-child(1) a'));
      el = de.nativeElement;
      expect(el.innerHTML).toContain('Home');
  });

  it('Second menu should be Employees', () => {
      de = fixture.debugElement.query(By.css('.wrap li:nth-child(2) a'));
      el = de.nativeElement;
      expect(el.innerHTML).toContain('Employees');
  });

});
