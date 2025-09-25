
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-implementation',
  templateUrl: './implementation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ImplementationComponent {
  
  beforeCode = `
// profile.component.ts
@Component({...})
export class ProfileComponent {
  // 1. Injecting multiple services
  private auth = inject(AuthService);
  private userProfile = inject(UserProfileService);
  private logger = inject(ErrorLoggingService);

  user = signal(null);

  updateProfile(data: any) {
    try {
      // 2. Complex coordination logic
      if (!this.auth.isAuthenticated()) {
        throw new Error('User not authenticated');
      }
      const userId = this.auth.getCurrentUserId();
      this.userProfile.update(userId, data);
      this.user.set(this.userProfile.get(userId));
    } catch (error) {
      this.logger.log(error);
      // handle UI error state
    }
  }
}
`;

  afterFacadeCode = `
// user-session.facade.ts
@Injectable({ providedIn: 'root' })
export class UserSessionFacade {
  private auth = inject(AuthService);
  private userProfile = inject(UserProfileService);
  private logger = inject(ErrorLoggingService);

  // Expose state via signals or observables
  user = toSignal(this.userProfile.user$);

  updateProfile(data: any): boolean {
    try {
      if (!this.auth.isAuthenticated()) {
        throw new Error('User not authenticated');
      }
      const userId = this.auth.getCurrentUserId();
      this.userProfile.update(userId, data);
      return true;
    } catch (error) {
      this.logger.log(error);
      return false;
    }
  }
}
`;

  afterComponentCode = `
// profile.component.ts
@Component({...})
export class ProfileComponent {
  // 1. Inject ONE facade
  private session = inject(UserSessionFacade);

  // 2. State is directly from the facade
  user = this.session.user;

  updateProfile(data: any) {
    // 3. Simple, declarative method call
    const success = this.session.updateProfile(data);
    if (!success) {
      // handle UI error state
    }
  }
}
`;

}
