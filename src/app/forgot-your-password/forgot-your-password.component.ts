import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import intlTelInput from 'intl-tel-input';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  message: string;
  // Add other properties as per the actual API response
}

@Component({
  selector: 'app-forgot-your-password',
  templateUrl: './forgot-your-password.component.html',
  styleUrls: ['./forgot-your-password.component.css']
})
export class ForgotYourPasswordComponent implements OnInit, AfterViewInit {
  @ViewChild('phone') phoneInput!: ElementRef<HTMLInputElement>;
  phoneForm!: FormGroup;
  iti: any;
  submissionError: string = '';

  constructor(
    private fb: FormBuilder, 
    private translate: TranslateService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      code: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });    
  }

  ngAfterViewInit(): void {
    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: 'TR',
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@21.2.5/build/js/utils.js"
    });

    this.translate.onLangChange.subscribe(() => {
      this.updateCountryNames();
    });
  }

  updateCountryNames(): void {
    if (this.iti) {
      const currentCountries = this.iti.getCountryData();
      currentCountries.forEach((country: any) => {
        let langKey = `COUNTRIES.${country.iso2.toUpperCase()}`;
        country.name = this.translate.instant(langKey);
      });
      this.iti.setCountryData(currentCountries);
    }
  }

  onlyNumbersAllowed(event: KeyboardEvent): boolean {
    const nonPrintableKeys = ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace', 'Tab', 'Enter'];

    if (nonPrintableKeys.includes(event.key) || (event.ctrlKey && ['v', 'c', 'x'].includes(event.key))) {
      return true;
    }

    if (!event.key.match(/^[0-9]$/)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  async TelesignSMSVerify() {
    if (this.phoneForm.valid) {
      const phoneNumber = this.iti.getNumber();
      const code = this.phoneForm.get('code')?.value;
      try {
        const result = await this.http.post<ApiResponse>("https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code", { phoneNumber, verifyCode: code }, {
          headers: {
            "x-rapidapi-host": "telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com",
            "x-rapidapi-key": "YOUR_RAPID_API_KEY_GOES_HERE"
          }
        }).toPromise();
  
        console.log(result);
        alert(`API Response: ${result?.message}`);  // Using optional chaining here
      } catch (error: any) {
        this.submissionError = 'Failed to send API request: ' + (error.error?.message || error.message);
        console.error('Failed to send API request:', error);
      }
    } else {
      this.submissionError = 'Invalid input. Please correct your entries.';
    }
  }  
}
