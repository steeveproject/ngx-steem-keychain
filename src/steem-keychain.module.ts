import { NgModule, ModuleWithProviders } from '@angular/core';

import { SteemKeychainService } from './steem-keychain.service';


@NgModule()
// Consider registering providers using a forRoot() method
// when the module exports components, directives or pipes that require sharing the same providers instances.
// Consider registering providers also using a forChild() method
// when they requires new providers instances or different providers in child modules.
export class SteemKeychainModule {

  /**
   * Use in AppModule: new instance of SteemKeychainService.
   */
  public static forRoot(): ModuleWithProviders<SteemKeychainModule> {
      return {
          ngModule: SteemKeychainModule,
          providers: [SteemKeychainService]
      };
  }

  /**
   * Use in features modules with lazy loading: new instance of SteemKeychainService.
   */
  public static forChild(): ModuleWithProviders<SteemKeychainModule> {
      return {
          ngModule: SteemKeychainModule,
          providers: [SteemKeychainService]
      };
  }
}
