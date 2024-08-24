import { Component, OnInit } from '@angular/core';
//import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
//import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any = null;
  quote: string | undefined;
  isLoading = false;

  //constructor(private quoteService: QuoteService) {}
  constructor(private authService: AuthService) {}

  ngOnInit() {
    /* this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      }); */
    this.authService.getUserState().subscribe((user) => {
      this.user = user;
    });
  }
}
