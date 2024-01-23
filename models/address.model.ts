export interface Address {
    id: number;
    region: string;
    city: string;
    userId: string;
    streetName?: string; // اجعلها اختيارية إذا لم تكن موجودة دائمًا
  neighborhood?: string; // اختياري
  houseNumber?: string; // اختياري
    // أي خصائص أخرى موجودة في العنوان
  }
  