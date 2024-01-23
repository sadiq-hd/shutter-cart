import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'service_mnj4ynm'; // استبدل بمعرّف الخدمة الخاص بك
  private templateId = 'template_bc1sbds'; // استبدل بمعرّف القالب الخاص بك
  private userId = 'VL_qY4ZilSfgOrGhl'; // استبدل بمعرّف المستخدم الخاص بك

  constructor() { }

  sendActivationEmail(to_email: string, user_name: string, activation_code: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_email,
      user_name,
      activation_code // يجب أن يكون لديك {{activation_code}} في قالب البريد الإلكتروني الخاص بك
    };

    return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
  }
  generateActivationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // كود من ستة أرقام
  }
  
  activationCode(){

  }
  
}