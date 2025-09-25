// Fix: Update imports for types used in the component.
import { Component, ChangeDetectionStrategy, inject, Signal } from '@angular/core';
// Fix: Import Data for route data typing.
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map, switchMap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { APP_ROUTES } from './app.routes';
// Fix: Import Observable for stream typing.
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, CommonModule]
})
export class AppComponent {
  // Fix: Declare properties to be initialized in the constructor.
  private readonly router: Router;
  private readonly activatedRoute: ActivatedRoute;

  slidePaths = APP_ROUTES
    .filter(route => route.path && route.path !== '**')
    .map(route => route.path!);

  totalSlides = this.slidePaths.length;

  private readonly currentRouteData$: Observable<Data>;
  readonly currentSlideData: Signal<Data | { slide: number; title: string; }>;

  constructor() {
    // Fix: Use inject() inside the constructor to ensure proper injection context, resolving 'unknown' type errors.
    this.router = inject(Router);
    this.activatedRoute = inject(ActivatedRoute);

    this.currentRouteData$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
              route = route.firstChild;
          }
          return route;
      }),
      switchMap(route => route.data)
    );

    this.currentSlideData = toSignal(this.currentRouteData$, { initialValue: { slide: 0, title: 'Introduction' }});
  }

  navigate(direction: 'next' | 'prev'): void {
    // Fix: Use a type assertion to safely access 'slide' property from the route data signal.
    const currentIdx = (this.currentSlideData() as { slide: number }).slide;
    let nextIdx: number;

    if (direction === 'next') {
      nextIdx = Math.min(currentIdx + 1, this.totalSlides - 1);
    } else {
      nextIdx = Math.max(currentIdx - 1, 0);
    }

    if (nextIdx !== currentIdx) {
      const nextPath = this.slidePaths[nextIdx];
      // Fix: this.router is now correctly typed, allowing 'navigate' to be called without errors.
      this.router.navigate([nextPath]);
    }
  }
}
