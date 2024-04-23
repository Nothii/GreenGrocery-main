import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  
  products: Product[] = [];
  isDarkTheme: boolean = false;
  langChangeSubscription: Subscription;
  customOptions:OwlOptions={
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: false,
    navText: ['prev', 'next'],
    items: 1, // Set to the maximum number of items you want to show at once
    responsive: {
      0: {
        items: 1 // Show 1 item on smaller screens (e.g., mobile)
      },
      768: {
        items: 2 // Show 2 items on medium-sized screens (e.g., tablets)
      },
      1025: {
        items: 3 // Show 3 items on larger screens (e.g., desktops)
      }
    },
    nav: false // Disable navigation arrows
  }

  constructor(private productService: ProductService, public translate: TranslateService, private renderer: Renderer2) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      // Update products after language change
      this.updateProducts();
      // Check theme after language change
      this.checkDarkTheme();
      this.isDarkTheme = localStorage.getItem('theme') === "Dark";
    });
  }

  ngAfterViewInit(): void {
    // Check theme after view initialization
    this.checkDarkTheme();
  }

  ngOnInit(): void {
    // Check theme on component initialization
    this.checkDarkTheme();
    // Update products on component initialization
    this.updateProducts();
    this.cardTitle();
    this.testimonialBackground();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ChangeLang(event: any) {
    const lang = event.target.value;
    this.switchLanguage(lang);
  }

  private updateProducts() {
    this.products = this.productService.getProducts();
  }

  private checkDarkTheme() {
    // Check if dark theme is enabled in localStorage
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark';
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
  }

  // Method to toggle dark mode
  toggleDarkMode() {
    this.isDarkTheme = !this.isDarkTheme;
    // Update localStorage with the new theme preference
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
    this.buyButtonBackground();
    this.cardTitle();
    this.testimonialBackground();
  }

  private applyThemeStyles() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    document.documentElement.style.setProperty('--background-color', backgroundColor);
  }

  private buyButtonBackground() {
    this.isDarkTheme = !this.isDarkTheme;
    // Update localStorage with the new theme preference
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
    this.buyButtonBackground();
    this.buttonText();
  }
  
  private cardTitle() {
  const color = this.isDarkTheme ? '#000000' : '#ffffff';
  const productTitles = document.querySelectorAll('.product-title');
  productTitles.forEach((title) => {
    this.renderer.setStyle(title, 'color', color);
  });
  const productDescriptions = document.querySelectorAll('.product-description');
  productDescriptions.forEach((description) => {
    this.renderer.setStyle(description, 'color', color);
  });
  const productPrices = document.querySelectorAll('.product-price');
  productPrices.forEach((price) => {
    this.renderer.setStyle(price, 'color', color);
  });
  }

  private testimonialBackground() {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    testimonialContents.forEach(content => {
      this.renderer.setStyle(content, 'background-color', backgroundColor);
    });
  }

  private buttonText() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    const buyButtonText = document.querySelectorAll('.buy-now');
    buyButtonText.forEach((price) => {
    this.renderer.setStyle(price, 'color', color);
  });
  }
}
