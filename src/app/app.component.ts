import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { TranslateService } from '@ngx-translate/core';
import { Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, ViewChild, AfterViewInit {
  @ViewChild('owlCarousel', { static: false })
  owlCarousel!: ElementRef;
  title = 'GreenGrocery';
  products: Product[] = [];
  fruit: any;
  fruit_title: any;
  isDarkTheme: boolean = false;

  // Initialize dark_mode and light_mode with translation keys
  dark_mode: string = 'assets/img/crescent-moon.png';
  light_mode: string = 'assets/img/sunny.png';

  constructor(private productService: ProductService, public translate: TranslateService, private renderer: Renderer2) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Set initial language if needed
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  
  descendants!: boolean;
  emitDistinctChangesOnly!: boolean;
  first!: boolean;
  read: any;
  isViewQuery!: boolean;
  selector: any;
  static?: boolean | undefined;

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    setTimeout(() => {
      this.owlCarousel.nativeElement.owl.refresh();
    }, 100);
    this.isDarkTheme = localStorage.getItem('theme') === "Dark";
    this.translate.get('assets/img/crescent-moon.png').subscribe((res: string) => {
      this.dark_mode = res;
    });
    this.translate.get('assets/img/sunny.png').subscribe((res: string) => {
      this.light_mode = res;
    });
    this.setBodyBackground();
    this.productText();
    this.testimonialBackground();
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ChangeLang(event: any) {
    const lang = event.target.value;
    this.switchLanguage(lang);
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.languageBackground();
    this.testimonialBackground();
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.setBodyBackground();
    this.productText();
    this.footerBackground();
    this.cardBackground();
    this.buyButtonBackground();
    this.cardText();
    this.testimonialBackground();
  }

  private setBodyBackground() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    this.renderer.setStyle(document.body, 'background-color', backgroundColor);
  }

  private productText() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }

  private footerBackground() {
    const footerBackgroundColor = this.isDarkTheme ? '#4d4d4d' : '#ffffff';
    this.renderer.setStyle(document.querySelector('.footer'), 'background-color', footerBackgroundColor);
  }
 
  private languageBackground() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }

  private cardBackground() {
    const cardBackground = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const cardContents = document.querySelectorAll('.card-content');
    cardContents.forEach(cardContent => {
        this.renderer.setStyle(cardContent, 'background-color', cardBackground);
    });
  }

  private testimonialBackground() {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    testimonialContents.forEach(content => {
      this.renderer.setStyle(content, 'background-color', backgroundColor);
    });
  }
  
  private cardText() {
    const color = this.isDarkTheme ? '#000000' : '#ffffff';
    const productTitles = document.querySelectorAll('.product-title');
    productTitles.forEach((title) => {
      this.renderer.setStyle(title, 'color', color);
    });
  }  

  private buyButtonBackground() {
    const buyButtonBackground = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    const cardContents = document.querySelectorAll('.buy-now');
    cardContents.forEach(cardContent => {
        this.renderer.setStyle(cardContent, 'background-color', buyButtonBackground);
    });
  }

 customOptions: OwlOptions = {
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
};

customOptions2:OwlOptions={
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
};
  
}
