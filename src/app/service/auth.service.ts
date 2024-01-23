import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { EmailService } from './email.service';
import { User } from 'user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isEmployee(): boolean {
    return sessionStorage.getItem('role') === 'employee';
  }

  isExternalSeller(): boolean {
    return sessionStorage.getItem('role') === 'ExternalSeller';
  }
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string>('');

  private apiurl = 'http://localhost:3000';
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private http: HttpClient, private router: Router , private emailService: EmailService ) { }

  addAddressForUserOrGuest(phone: string, isGuest: boolean, address: any) {
    const endpoint = isGuest ? 'guests' : 'users';
    return this.http.put(`${this.apiurl}/${endpoint}/${phone}/address`, address);
  }
  
  
  getUserPhoneAndName(region: string, city: string): Observable<{ phone: string, name: string }> {
    // استدعاء API لجلب الهاتف والاسم استنادًا إلى المنطقة والمدينة
    return this.http.get<{ phone: string, name: string }>(`${this.apiurl}/getUserPhoneAndName?region=${region}&city=${city}`);
  }
  checkPhoneExists(phone: string) {
    return this.http.get(`${this.apiurl}/users?phone=${phone}`);
  }

  getLoggedInUserPhone(): string | null {
    return sessionStorage.getItem('userPhone');
  }
  getActiveUsersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiurl}/users/active/count`);
  }

  getInactiveUsersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiurl}/users/inactive/count`);
  }
  addNewAddress(address: any) {
    return this.http.post(`${this.apiurl}/addresses`, address);
  }
  saveAddress(address: any) {
    return this.http.post(`${this.apiurl}/addresses`, address);
  }
  getUserDetails(userId: string): Observable<any> {
    // استدعاء الـ API أو الطريقة التي تستخدمها لجلب بيانات المستخدم
    return this.http.get(`http://localhost:3000/users/${userId}`);
  }
  getAddress(userId: string) {
    return this.http.get(`${this.apiurl}/addresses/${userId}`);
  }
  getUsername(): string {
    return sessionStorage.getItem('username') ?? '';
  }
  getLoggedInUser(): Observable<User> {
    const userId = sessionStorage.getItem('userId');
    return this.http.get<User>(`${this.apiurl}/users/${userId}`);
  }
  getUser(): string {
    return sessionStorage.getItem('username') ?? '';
  }

  updateGuestAddress(guestId: number, address: any) {
    return this.http.put(`${this.apiurl}/guest/${guestId}`, { ...address });
  }

  updateUserAddress(userId: number, address: any) {
    return this.http.put(`${this.apiurl}/users/${userId}`, { ...address });
  }

  RegisterUser(inputdata: any) {
    return this.http.post(this.apiurl + '/users', inputdata);
  }

  GetUserbyCode(id: any) {
    return this.http.get(`${this.apiurl}/users/${id}`);
  }

  Getall() {
    return this.http.get(this.apiurl + '/users');
  }

  updateuser(id: any, inputdata: any) {
    return this.http.put(`${this.apiurl}/users/${id}`, inputdata);
  }

  getuserrole() {
    return this.http.get(`${this.apiurl}/role`);
  }

  login(id: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/users?id=${id}&password=${password}`).pipe(
      map(users => {
        const user = users[0];
        if (user) {
          this.setLoginStatus(true, user.id, user.role);
          return user;
        } else {
          throw new Error('User not found');
        }
      })
    );
  }


  private roleStatus = new BehaviorSubject<string>('');

  private setLoginStatus(isLoggedIn: boolean, userId?: string, role?: string): void {
    if (isLoggedIn) {
      // تأكد من عدم وجود قيمة undefined قبل تخزينها
      const safeUserId = userId ?? 'defaultUserId';
      const safeRole = role ?? 'defaultRole';
  
      sessionStorage.setItem('userId', safeUserId);
      sessionStorage.setItem('role', safeRole);
      this.roleStatus.next(safeRole);
    } else {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('role');
      this.roleStatus.next('');
    }
    this.loginStatus.next(isLoggedIn);
  }
  
  


get currentRole(): Observable<string> {
  return this.roleStatus.asObservable();
}

  
  logout(): void {
    sessionStorage.clear();
    this.loginStatus.next(false);
    this.router.navigate(['/home']); // توجيه المستخدم إلى الصفحة الرئيسية عند تسجيل الخروج
  }

  isloggedin() {
    return sessionStorage.getItem('userId') != null;
  }

  isSeller(): boolean {
    return this.getrole() === 'seller';
  }

  isAdmin(): boolean {
    return this.getrole() === 'admin';
  }

  getrole() {
    const role = sessionStorage.getItem('role');
    return role ? role : '';
  }

  GetAllCustomer() {
    return this.http.get(`${this.apiurl}/customer`);
  }

  Getaccessbyrole(role: any, menu: any) {
    return this.http.get(`${this.apiurl}/roleaccess?role=${role}&menu=${menu}`);
  }

  verifyActivationCode(id: string, activationCode: string) {
    return this.http.get(`${this.apiurl}/users/${id}`).pipe(
      map((user: any) => user.activationCode === activationCode)
    );
  }

  checkLoginStatus(): boolean {
    return sessionStorage.getItem('userId') != null;
  }

  getLoggedInUserId(): number | null {
    const userId = sessionStorage.getItem('userId');
    return userId ? +userId : null;
  }

  

  get loginStatusChanged() {
    return this.loginStatus.asObservable();
  }

  activateAccount(id: string, activationCode: string): Observable<any> {
    return this.http.patch(`${this.apiurl}/users/${id}`, { isactive: true, activationCode: activationCode })
      .pipe(
        map(response => {
          if (response) {
            // تحديث حالة تسجيل الدخول
            this.setLoginStatus(true);
            return true;
          }
          return false;
        })
      );
  }


  sendActivationEmail(email: string, username: string): void {
    const activationCode = this.generateActivationCode();
    this.emailService.sendActivationEmail(email, username, activationCode)
      .then(response => {
        console.log('Activation email sent', response);
      })
      .catch(error => {
        console.error('Error sending activation email', error);
      });
  }

  private generateActivationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
 
  generateUniqueActivationCode(): Observable<string> {
    return new Observable<string>((observer) => {
      let activationCode = this.generateActivationCode();
      // التحقق من قاعدة البيانات
      this.checkActivationCodeUnique(activationCode).subscribe((isUnique) => {
        if (isUnique) {
          observer.next(activationCode);
          observer.complete();
        } else {
          // إذا لم يكن الرمز فريدًا، حاول مرة أخرى
          this.generateUniqueActivationCode().subscribe(observer);
        }
      });
    });
  }

  private checkActivationCodeUnique(code: string): Observable<boolean> {
    // استبدل هذا بالتحقق من قاعدة البيانات الخاصة بك
    return this.http.get<boolean>(`${this.apiurl}/checkActivationCodeUnique?code=${code}`);
  }
}
