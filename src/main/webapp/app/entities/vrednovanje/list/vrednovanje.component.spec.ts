import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { VrednovanjeService } from '../service/vrednovanje.service';

import { VrednovanjeComponent } from './vrednovanje.component';

describe('Vrednovanje Management Component', () => {
  let comp: VrednovanjeComponent;
  let fixture: ComponentFixture<VrednovanjeComponent>;
  let service: VrednovanjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VrednovanjeComponent],
    })
      .overrideTemplate(VrednovanjeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VrednovanjeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VrednovanjeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.vrednovanjes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
