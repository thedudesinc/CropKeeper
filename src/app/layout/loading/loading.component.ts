import { Component, OnDestroy, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  iconLoading = faSpinner;
  isLoadingVisible = false;
  loadingSubscription?: Subscription;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.isLoadingVisible$.subscribe(
      (state) => (this.isLoadingVisible = state)
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
