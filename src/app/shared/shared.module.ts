import {ModuleWithProviders, NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {components} from './components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormFactory} from './components/form/form.props.config';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  exports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ...components,
  ],
  providers: [FormFactory],
  declarations: [...components]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
      ]
    };
  }
}
