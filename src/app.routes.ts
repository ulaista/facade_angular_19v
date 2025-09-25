
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'introduction',
    loadComponent: () => import('./components/introduction/introduction.component').then(c => c.IntroductionComponent),
    data: { slide: 0, title: 'Introduction' }
  },
  {
    path: 'problem',
    loadComponent: () => import('./components/problem/problem.component').then(c => c.ProblemComponent),
    data: { slide: 1, title: 'The Problem' }
  },
  {
    path: 'solution',
    loadComponent: () => import('./components/solution/solution.component').then(c => c.SolutionComponent),
    data: { slide: 2, title: 'The Solution: Facade' }
  },
  {
    path: 'implementation',
    loadComponent: () => import('./components/implementation/implementation.component').then(c => c.ImplementationComponent),
    data: { slide: 3, title: 'Implementation' }
  },
  {
    path: 'benefits',
    loadComponent: () => import('./components/benefits/benefits.component').then(c => c.BenefitsComponent),
    data: { slide: 4, title: 'Benefits' }
  },
  {
    path: 'quiz',
    loadComponent: () => import('./components/quiz/quiz.component').then(c => c.QuizComponent),
    data: { slide: 5, title: 'Pop Quiz' }
  },
  {
    path: 'conclusion',
    loadComponent: () => import('./components/conclusion/conclusion.component').then(c => c.ConclusionComponent),
    data: { slide: 6, title: 'Conclusion' }
  },
  {
    path: 'resources',
    loadComponent: () => import('./components/resources/resources.component').then(c => c.ResourcesComponent),
    data: { slide: 7, title: 'Further Reading' }
  },
  {
    path: '**',
    redirectTo: 'introduction',
    pathMatch: 'full'
  }
];
