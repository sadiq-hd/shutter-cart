import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:3000/addresses';

  constructor(private http: HttpClient) {}

  // الدالة الموجودة للحصول على العناوين
  getAddresses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // يجب إضافة دالة جديدة لإرسال بيانات العنوان
  addAddress(addressData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, addressData);
  }
}
