import { MoneyPipe } from '@/app/pipes/money.pipe';
import { environment } from '@/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, debounceTime } from 'rxjs';

const classes = {
   input: 'placeholder:text-[#808080] py-[5px] px-[10pox] w-full font-[500] outline-none text-[#333]',
   searchItem:
      'flex cursor-pointer border-l-[2px] border-transparent px-[4px] transition-[border_padding] hover:border-[#cd1818] hover:pl-[10px] ',
   searchResultWrapper:
      'bg-white rounded-[6px] shadow-[2px_2px_5px_rgba(0,0,0,0.15)] overflow-hidden border border-black/15 px-[6px] py-[10px]',
   searchResultContainer: 'max-h-[60vh] overflow-auto overflow-x-hidden space-y-[10px]',
};

@Component({
   selector: 'app-search',
   standalone: true,
   imports: [RouterLink, FormsModule, MoneyPipe],
   templateUrl: './search.component.html',
})
export class Search {
   http = inject(HttpClient);
   router = inject(Router);

   searchKey = new BehaviorSubject('');
   focus = false;
   isFetching = false;

   searchResult: ProductSearch[] = [];

   handleSearch(event: any) {
      this.searchKey.next(event.target.value);
   }

   ngOnInit() {
      this.searchKey.pipe(debounceTime(500)).subscribe(searchKey => {
         if (!searchKey) return;

         this.isFetching = true;

         this.http
            .get<{
               data: ProductSearchResponse;
            }>(`${environment.apiEndpoint}/products/search?q=${searchKey}`)
            .subscribe({
               next: res => {
                  this.searchResult = res.data.products;
                  this.isFetching = false;
               },
               error: () => {
                  this.isFetching = false;
               },
            });
      });
   }

   clear() {
      this.searchKey.next('');
      this.searchResult = [];
   }

   handleProductDetail(productAscii: string) {
      this.focus = false;
      this.isFetching = false;

      this.router.navigateByUrl(`/product/${productAscii}`);
   }

   handleSubmit() {
      if (!this.searchKey.getValue()) return;

      this.focus = false;
      this.router.navigateByUrl(`/search/${this.searchKey.getValue()}`);
   }

   classes = classes;
}
