import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'', 
        loadComponent: () =>
            import('./features/home/home').then(m => m.Home)
    },
    {
        path:'detector',
        loadComponent: () =>
            import('./features/detector/detector').then(m => m.Detector)
    },
    {
        path:'about',
        loadComponent: () =>
            import('./features/about/about').then(m => m.About)
    }
    
];
