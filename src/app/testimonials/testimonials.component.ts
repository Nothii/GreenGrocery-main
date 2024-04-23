import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Testimonials, TestimonialsService } from '../testimonials.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialComponent implements OnInit, OnDestroy {
  testimonialsSubscription!: Subscription;
  testimonials: Testimonials[] = [];
  langChangeSubscription: Subscription;
  isDarkTheme: boolean = false; // Flag to track the theme state

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<div class="nav-btn prev-slide"></div>', '<div class="nav-btn next-slide"></div>'],
    items: 1,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      }
    },
    nav: false
  };

  constructor(private testimonialService: TestimonialsService, public translate: TranslateService, private renderer: Renderer2) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      // Check theme after language change
      this.checkDarkTheme();
      this.isDarkTheme = localStorage.getItem('theme') === "Dark";
    });
  }
  
  ngAfterViewInit(): void {
    // Check theme after view initialization
    this.checkDarkTheme();
  }

  ngOnInit() {
    this.loadInitialTheme(); // Check local storage and set the initial theme
    this.testimonialsSubscription = this.testimonialService.getTestimonials().subscribe((testimonials: Testimonials[]) => {
      this.testimonials = testimonials;
    });
  }

  ngOnDestroy() {
    if (this.testimonialsSubscription) {
      this.testimonialsSubscription.unsubscribe();
    }
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  toggleDarkMode() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.testimonialBackground();
  }

  private loadInitialTheme() {
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark'; // Initialize theme from local storage
    this.testimonialBackground(); // Apply initial background based on theme
  }

  private testimonialBackground() {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    testimonialContents.forEach(content => {
      this.renderer.setStyle(content, 'background-color', backgroundColor);
    });
  }

  private checkDarkTheme() {
    // Check if dark theme is enabled in localStorage
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark';
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
  }

  private applyThemeStyles() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    document.documentElement.style.setProperty('--background-color', backgroundColor);
  }
}
