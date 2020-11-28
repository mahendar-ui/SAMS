import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { Error1Component } from './error1/error1.component';
import { Error2Component } from './error2/error2.component';
import { Error3Component } from './error3/error3.component';
import { Error4Component } from './error4/error4.component';
import { Error5Component } from './error5/error5.component';
import { Error500Component } from './error-500/error.500.component';

@NgModule({
  declarations: [
    ErrorComponent,
    Error1Component,
    Error2Component,
    Error3Component,
    Error4Component,
    Error5Component,
    Error500Component,
  ],
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorComponent,
        children: [
          {
            path: 'error-1',
            component: Error1Component,
          },
          {
            path: 'error-2',
            component: Error2Component,
          },
          {
            path: 'error-3',
            component: Error3Component,
          },
          {
            path: 'error-4',
            component: Error4Component,
          },
          {
            path: 'error-5',
            component: Error5Component,
          },
          {
            path: '500',
            component: Error500Component,
          },
        ],
      },
    ]),
  ],
})
export class ErrorModule {}
