import { async, TestBed } from '@angular/core/testing';
import { SvgModule } from './svg.module';

describe('SvgModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SvgModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SvgModule).toBeDefined();
  });
});
