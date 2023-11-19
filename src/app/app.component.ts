import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currency = '$';

  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  goodsData: IProduct[] = [
    {
      image: 'burger01.png',
      title: 'Бургер чеддер & бекон',
      text: 'Котлета из говядины криспи, булочка, томат, сыр Чеддер, грудинка, лук красный, салат айсбер, майонез, кетчуп, сырный соус',
      price: 8,
      basePrice: 8,
      grams: 360,
    },
    {
      image: 'burger02.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка бриошь с кунжутом, куриная котлета, сыр чеддер, томат, огурец маринованный, лук маринованный, салат Ромен, бекон, соус BBQ',
      price: 7,
      basePrice: 7,
      grams: 390,
    },
    {
      image: 'burger03.png',
      title: 'Бургер чеддер & бекон',
      text: 'Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы, свежий томат, бекон, красный лук,соус бургер, горчица',
      price: 10,
      basePrice: 10,
      grams: 420,
    },
    {
      image: 'burger04.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка для бургера, говяжья котлета, красный лук, сыр, охотничья колбаска, соус барбекю, соус сырный, салат айсберг',
      price: 7,
      basePrice: 7,
      grams: 220,
    },
    {
      image: 'burger05.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, сыр, сырный соус, кетчуп, зелень',
      price: 8,
      basePrice: 8,
      grams: 220,
    },
    {
      image: 'burger06.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка для бургера, котлета куриная, грудинка, яйцо, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень',
      price: 9,
      basePrice: 9,
      grams: 220,
    },
    {
      image: 'burger07.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка для бургера, вегетарианская котлета, красный лук, сыр, свежий томат, соус барбекю, соус сырный, салат айсберг',
      price: 8,
      basePrice: 8,
      grams: 280,
    },
    {
      image: 'burger08.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, красный лук, сыр, перец халапеньо, кетчуп, зелень',
      price: 7,
      basePrice: 7,
      grams: 380,
    },
    {
      image: 'burger09.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка для бургера, две говяжьи котлеты, двойной сыр чеддар, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень',
      price: 11,
      basePrice: 11,
      grams: 400,
    },
    {
      image: 'burger10.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка для бургера, говяжья котлета, бекон, сыр чеддар, яйцо, салями, соус барбекю, соус сырный, салат айсберг, свежий томат',
      price: 9,
      basePrice: 9,
      grams: 300,
    },
    {
      image: 'burger11.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка для бургера, вегетарианская котлета из нута, цуккини на гриле, помидор, огурец маринованный, сыр, горчичный соус, кетчуп, зелень',
      price: 8,
      basePrice: 8,
      grams: 320,
    },
    {
      image: 'burger12.png',
      title: 'Бургер чеддер & бекон',
      text: 'Булочка для бургера, котлета говяжья, грудинка, красный лук, огурец маринованный, томат, кетчуп, двойной сыр чеддар, горчица, зелень',
      price: 9,
      basePrice: 9,
      grams: 360,
    },
  ];

  constructor(private fb: FormBuilder) {}

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
      alert('Спасибо за заказ! Мы скоро свяжемся с Вами!');
      this.form.reset();
    }
  }
}
