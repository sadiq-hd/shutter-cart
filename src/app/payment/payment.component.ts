import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AddressService } from '../service/address.service';
import { Address } from 'models/address.model';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ProductService } from '../service/product.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 4;
  guestForm: FormGroup;
  addressForm: FormGroup;
  showGuestForm: boolean = false;
  isPhoneVerified: boolean = false;
  verificationCodeEntered: string = '';
  showVerificationInput: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  guestName: string = '';
  isGuest: boolean = false;
  isGuestRegistered: boolean = false;
  addresses: Address[] = [];
  selectedAddress: string = '';
  phone: string = '';
  selectedSavedAddress: string = '';
  savedAddresses: Address[] = [];
  paymentMethod: string = '';
  orderNumber: string = '';
  totalAmount: number = 0;
  orderConfirmed: boolean = false;
  shippingAddress: string = '';
  showConfirmButton: boolean = false;
  isStep1Completed: boolean = false;
  isStep2Completed: boolean = false;
  isStep3Completed: boolean = false;

  showBankDetails: boolean = false;
  bankAccountDetails = {
    bankName: 'AlAhli Bank',
    accountNumber: '123456789',
    accountHolder: 'Sadiq Aldubaisi'
  };
  regions = ['الشرقية', 'الوسطى', 'الغربية'];
  cities: { [key: string]: string[] } = {
    'الشرقية': ['القطيف', 'الدمام', 'حفر الباطن', 'الاحساء', 'تاروت', 'سيهات', 'الخبر', 'الظهران'],
    'الوسطى': ['الرياض', 'الخرج', 'القصيم'],
    'الغربية': ['مكة', 'المدينة', 'جدة', 'ينبع']
  };
  selectedCities: string[] = [];
  products: any[] = [];
  shoppingCartItems: any[] = [];
  showNewAddressFields: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private addressService: AddressService,
    public shoppingCartService: ShoppingCartService,
    private productService: ProductService
  ) {
    this.guestForm = this.fb.group({
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.addressForm = this.fb.group({
      region: ['', Validators.required],
      city: ['', Validators.required],
      streetName: ['', Validators.required],
      neighborhood: ['', Validators.required],
      houseNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isloggedin()) {
      this.isPhoneVerified = true;
      this.fetchSavedAddresses();
      this.orderNumber = this.generateOrderNumber();
      this.totalAmount = this.calculateTotal();
      this.shoppingCartItems = this.shoppingCartService.getShoppingCartItems();
      console.log('Current Step:', this.currentStep);
      console.log('Order Number:', this.orderNumber);
      console.log('Total Amount:', this.totalAmount);
      console.log('Payment Method:', this.paymentMethod);
      console.log('Shipping Address:', this.shippingAddress);
      console.log('Shopping Cart Items:', this.shoppingCartService.getShoppingCartItems());
    }
  }

  generateOrderNumber(): string {
    return 'ORD' + Math.floor(Math.random() * 1000000).toString();
  }

  calculateSubtotal(item: any): number {
    return item.price * (item.quantity || 1);
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.shoppingCartItems) {
      let subtotal = this.calculateSubtotal(item);
      console.log(`Subtotal for item: ${subtotal}`);
      total += subtotal;
    }
    console.log(`Total: ${total}`);
    return total;
  }

  fetchSavedAddresses(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.http.get<Address[]>(`http://localhost:3000/addresses?userId=${userId}`).subscribe({
        next: (addresses) => {
          this.savedAddresses = addresses;
        },
        error: (error) => {
          console.error('Error fetching addresses', error);
        }
      });
    }
  }

  onAddressChange() {
    const selectedAddressId = this.addressForm.get('savedAddress')?.value;
    if (selectedAddressId) {
      const selectedAddress = this.savedAddresses.find(address => address.id === +selectedAddressId);
      if (selectedAddress) {
        // تحديث النموذج بالقيم من selectedAddress
      }
    }
  }
  
  

  onSavedAddressChange(event: Event) {
    // تأكد من أن event.target هو فعلاً عنصر HTMLSelectElement
    const selectElement = event.target as HTMLSelectElement;
  
    // تحقق من أن العنصر ليس null
    if (selectElement) {
      // استخرج قيمة العنصر المحدد
      const selectedAddressId = selectElement.value;
  
      // استخدم القيمة للعثور على العنوان المحفوظ المتطابق من المصفوفة
      const selectedAddress = this.savedAddresses.find(address => address.id.toString() === selectedAddressId);
  
      // إذا تم العثور على عنوان مطابق، استخدمه لتحديث نموذج العنوان
      if (selectedAddress) {
        // هنا نتحقق من وجود الخصائص المطلوبة قبل تحديث النموذج
        if ('region' in selectedAddress && 'city' in selectedAddress) {
          this.addressForm.patchValue({
            region: selectedAddress.region,
            city: selectedAddress.city,
            // تأكد من وجود هذه الخصائص في النوع Address
            // إذا لم تكن موجودة، فقد تحتاج إلى إضافتها أو استخدام قيم افتراضية
            streetName: selectedAddress.streetName || '',
            neighborhood: selectedAddress.neighborhood || '',
            houseNumber: selectedAddress.houseNumber || '',
          });
        }
      }
    }
  }
  
  

  private initializeFormWithUserDetails() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(userId).subscribe(userDetails => {
        if (userDetails && userDetails.phone) {
          this.addressForm.patchValue({ phone: userDetails.phone });
        }
      });
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  nextStep() {
    if (this.currentStep < this.totalSteps && this.isPhoneVerified) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1 && this.isStep2Completed) {
      this.showGuestForm = false;
      this.currentStep--;
    }
  }

  Finish() {
    alert('تم مراجعة طلبك. سيتم توجيهك إلى الصفحة الرئيسية.');
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000);
  }
  

  confirmOrder() {
    
    if (confirm('هل أنت متأكد من اتمام العملية؟')) {
      this.orderConfirmed = true;
      this.navigateTo('invoice'); // افترضت أن هناك صفحة تسمى 'invoice'
    } else {
      // هنا يمكنك التعامل مع حالة عدم تأكيد الطلب من قبل المستخدم
      console.log('المستخدم لم يؤكد الطلب');
    }
  }
    

  submitGuestData() {
    console.log('submitGuestData called');
    this.errorMessage = '';
    this.successMessage = '';
    if (this.guestForm.valid) {
      const guestData = this.guestForm.value;
      this.http.get(`http://localhost:3000/guest?phone=${guestData.phone}`).subscribe({
        next: (response: any) => {
          if (response.length > 0) {
            this.showVerificationInput = true;
          } else {
            this.http.post('http://localhost:3000/guest', guestData).subscribe({
              next: (postResponse) => {
                this.successMessage = 'Guest registered successfully.';
                this.showVerificationInput = true;
                this.guestName = guestData.username;
                this.isGuestRegistered = true;
              },
              error: (postError) => {
                this.errorMessage = 'Error adding guest.';
              }
            });
          }
        },
        error: (error) => {
          this.errorMessage = 'Error checking phone number.';
        }
      });
    } else {
      this.errorMessage = 'Form is invalid.';
    }
  }

  initializeForm() {
    const phone = this.getPhoneFromStorageOrInput();
    if (phone) {
      this.addressForm.patchValue({ phone });
    }
  }

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

  selectBankTransfer(): void {
    this.showBankDetails = true;
  }

  getPhoneFromStorageOrInput(): string | null {
    if (this.isGuest) {
      return this.guestForm.get('phone')?.value;
    } else {
      return sessionStorage.getItem('userPhone') || this.guestForm.get('phone')?.value;
    }
  }

  onRegionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const region = selectElement.value;
    this.selectedCities = this.cities[region];
  }

  verifyCode() {
    if (this.verificationCodeEntered === '0000') {
      this.isPhoneVerified = true;
      this.isStep2Completed = true;
      return true;
    } else {
      // ...
      return false;
    }
  }

  submitAddress() {
    if (this.addressForm.valid) {
      const region = this.addressForm.get('region')?.value;
      const city = this.addressForm.get('city')?.value;
      const streetName = this.addressForm.get('streetName')?.value;
      const neighborhood = this.addressForm.get('neighborhood')?.value;
      const houseNumber = this.addressForm.get('houseNumber')?.value;
  
      if (region && city && streetName && neighborhood && houseNumber) {
        this.shippingAddress = `${region}, ${city}, ${streetName}, ${neighborhood}, ${houseNumber}`;
      } else {
        console.log('Form is invalid.');
      }
    } else {
      console.log('Form is invalid.');
    }
  }
  
  toggleNewAddressFields(): void {
    this.showNewAddressFields = !this.showNewAddressFields;
  }


  printInvoice() {
    const doc = new jsPDF();
    doc.text('Your Invoice Details', 10, 10);
    doc.text(`Order Number: ${this.orderNumber || 'N/A'}`, 10, 20);
    doc.text(`Total Amount: ${this.totalAmount.toFixed(2)}`, 10, 30);
    doc.text(`Payment Method: ${this.paymentMethod || 'N/A'}`, 10, 40);
    doc.text(`Shipping Address: ${this.shippingAddress || 'N/A'}`, 10, 50);

    const shoppingCartItems = this.shoppingCartService.getShoppingCartItems();
    let yOffset = 60;
    shoppingCartItems.forEach((item, index) => {
      if (item && item.name && item.price && item.quantity && item.imageUrl) {
        const itemText = `${item.name} - Price: ${item.price} - iamge: ${item.image}`;
        doc.text(itemText, 10, yOffset + index * 10);
        // لإضافة الصورة، قد تحتاج إلى استخدام doc.addImage()
        // وتحميل الصورة بشكل منفصل إذا كانت متاحة عبر URL
      }
    });

    doc.save(`Invoice-${this.orderNumber}.pdf`);
  }
}