// loadPageSifraPonudePostupakNadji(page?: number, dontNavigate?: boolean): void {
//   this.isLoading = true;
//   const pageToLoad: number = page ?? this.page ?? 1;
//
//   this.ponudeService
//     .query({
//       // 'sifraPostupka.in': this.postupak,
//       page: pageToLoad - 1,
//       size: this.itemsPerPage,
//       sort: this.sort(),
//     })
//     .subscribe({
//       next: (res: HttpResponse<IPonude[]>) => {
//         this.isLoading = false;
//         this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
//
//         this.ponudes = res.body?.filter(val => val.sifraPonude ==this.brPonude);
//         this.ukupno = res.body?.reduce((acc, ponude) => acc + ponude.ponudjenaVrijednost!, 0);
//         // const unique = [...new Set(res.body?.map(item => item.ponudjaci?.nazivPonudjaca))];
//         //
//         // const unique1 = [...new Set(res.body?.map(item => item.sifraPonude))];
//         // this.ucesnici = unique;
//         // this.sifraPonnude = unique1;
//         // console.log('====================>', this.sifraPonnude);
//         // console.log('====================>', this.ucesnici);
//         // console.log('====================>', this.postupak);
//         // console.log('Postupak je iz menija ........', this.postupak);
//         // this.ucesnici = res.body?.map(val => val.ponudjaci?.nazivPonudjaca)
//         // console.log('===================>',res.body?.pop()?.ponudjaci?.nazivPonudjaca?.toUpperCase()) ;
//       },
//       error: () => {
//         this.isLoading = false;
//         this.onError();
//       },
//     });
// }



// this.ponudes = res.body?.filter(val => val.sifraPonude === 200);
// const unique = [...new Set(res.body?.map(item => item.ponudjaci?.nazivPonudjaca))];
//
// const unique1 = [...new Set(res.body?.map(item => item.sifraPonude))];
// this.ucesnici = unique;
// this.sifraPonnude = unique1;
// console.log('====================>', this.sifraPonnude);
// console.log('====================>', this.ucesnici);
// console.log('====================>', this.postupak);
// console.log('Postupak je iz menija ........', this.postupak);
// this.ucesnici = res.body?.map(val => val.ponudjaci?.nazivPonudjaca)
// console.log('===================>',res.body?.pop()?.ponudjaci?.nazivPonudjaca?.toUpperCase()) ;
