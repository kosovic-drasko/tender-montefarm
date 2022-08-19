import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPostupci, Postupci } from '../postupci.model';
import { PostupciService } from '../service/postupci.service';

@Component({
  selector: 'jhi-postupci-update',
  templateUrl: './postupci-update.component.html',
})
export class PostupciUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    sifraPostupka: [null, [Validators.required]],
    brojTendera: [],
    opisPostupka: [null, [Validators.required]],
    vrstaPostupka: [null, [Validators.required]],
    datumObjave: [],
    datumOtvaranja: [],
    kriterijumCijena: [null, [Validators.required]],
    drugiKriterijum: [null, [Validators.required]],
  });

  constructor(protected postupciService: PostupciService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ postupci }) => {
      this.updateForm(postupci);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const postupci = this.createFromForm();
    if (postupci.id !== undefined) {
      this.subscribeToSaveResponse(this.postupciService.update(postupci));
    } else {
      this.subscribeToSaveResponse(this.postupciService.create(postupci));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPostupci>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(postupci: IPostupci): void {
    this.editForm.patchValue({
      id: postupci.id,
      sifraPostupka: postupci.sifraPostupka,
      brojTendera: postupci.brojTendera,
      opisPostupka: postupci.opisPostupka,
      vrstaPostupka: postupci.vrstaPostupka,
      datumObjave: postupci.datumObjave,
      datumOtvaranja: postupci.datumOtvaranja,
      kriterijumCijena: postupci.kriterijumCijena,
      drugiKriterijum: postupci.drugiKriterijum,
    });
  }

  protected createFromForm(): IPostupci {
    return {
      ...new Postupci(),
      id: this.editForm.get(['id'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      brojTendera: this.editForm.get(['brojTendera'])!.value,
      opisPostupka: this.editForm.get(['opisPostupka'])!.value,
      vrstaPostupka: this.editForm.get(['vrstaPostupka'])!.value,
      datumObjave: this.editForm.get(['datumObjave'])!.value,
      datumOtvaranja: this.editForm.get(['datumOtvaranja'])!.value,
      kriterijumCijena: this.editForm.get(['kriterijumCijena'])!.value,
      drugiKriterijum: this.editForm.get(['drugiKriterijum'])!.value,
    };
  }
}
