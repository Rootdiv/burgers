import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';

interface IProduct {
  image: string;
  title: string;
  text: string;
  price: number;
  basePrice: number;
  grams: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AppService],
})
export class AppComponent {
  title = 'Бургер чеддер';
  currency = '$';

  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  goodsData: IProduct[] | any;

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.appService.getData().subscribe(data => {
      this.goodsData = data;
    });
  }

  scrollTo(target: HTMLElement, burger?: IProduct) {
    target.scrollIntoView({ behavior: 'smooth' });
    if (burger) {
      this.form.patchValue({ order: `${burger.title} (${burger.price} ${this.currency})` });
    }
  }

  changeCurrency() {
    let newCurrency = '$';
    let coefficient = 1;

    if (this.currency === '$') {
      newCurrency = '₽';
      coefficient = 80;
    } else if (this.currency === '₽') {
      newCurrency = 'BYN';
      coefficient = 3;
    } else if (this.currency === 'BYN') {
      newCurrency = '€';
      coefficient = 0.9;
    } else if (this.currency === '€') {
      newCurrency = '¥';
      coefficient = 6.9;
    }

    this.currency = newCurrency;

    this.goodsData.forEach((item: IProduct) => {
      item.price = +(item.basePrice * coefficient).toFixed(1);
    });
  }

  confirmOrder() {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.form.reset();
        },
        error: response => {
          alert(response.error.message);
        },
      });
    }
  }
}
