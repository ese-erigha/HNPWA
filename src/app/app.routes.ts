import { Routes } from '@angular/router';

export const ROUTES: Routes = [

    {
      path: '',
      redirectTo: 'feeds/top',
      pathMatch: 'full'
    },
    {
      path: 'feeds',
      loadChildren: './feed/feed.module#FeedModule'
    },
    {
      path: 'user',
      loadChildren: './users/user.module#UserModule'
    }
  ];
