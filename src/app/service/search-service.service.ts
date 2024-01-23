import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchHistoryItem } from 'models/search-history.model';
import { SearchItem } from 'models/SearchItem.model';
@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  private searchHistory: SearchHistoryItem[] = [];
  private searchItem:SearchItem[]=[];
  private searchHistoryUrl = 'http://localhost:3000/searchHistory';

  constructor(private http: HttpClient) {
    this.loadSearchHistory();
  }

  

 
  


  private loadSearchHistory(): void {
    this.http.get<SearchHistoryItem[]>(this.searchHistoryUrl).subscribe(
      (data: SearchHistoryItem[]) => {
        if (data && Array.isArray(data)) {
          this.searchHistory = data;
        }
      },
      (error) => {
        console.error('Error loading search history:', error);
      }
    );
  }

  private saveSearchHistory(): void {
    this.http.put(this.searchHistoryUrl, this.searchHistory).subscribe(
      () => {
        console.log('Search history saved successfully');
      },
      (error) => {
        console.error('Error saving search history:', error);
      }
    );
  }

  getSearchHistory(): SearchHistoryItem[] {
    return this.searchHistory;
  }

  sendSearchKeywordToServer(keyword: string): void {
    // تحديث الكلمة في قاعدة البيانات على الخادم
    const requestData = { keyword: keyword };

    this.http.post(this.searchHistoryUrl, requestData).subscribe(
      (response) => {
        console.log('Search keyword sent successfully to the server', response);
      },
      (error) => {
        console.error('Error sending search keyword to the server', error);
      }
    );
  }
  // المزيد من الدوال والميثودز هنا...
}

