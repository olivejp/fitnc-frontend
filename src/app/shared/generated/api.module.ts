import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { DeveoConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { EntrainementControllerServiceGen } from './api/entrainement-controller.gen.service';
import { EtapeControllerServiceGen } from './api/etape-controller.gen.service';
import { ExerciceControllerServiceGen } from './api/exercice-controller.gen.service';
import { UtilisateurControllerServiceGen } from './api/utilisateur-controller.gen.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class DeveoApiModule {
    public static forRoot(configurationFactory: () => DeveoConfiguration): ModuleWithProviders<DeveoApiModule> {
        return {
            ngModule: DeveoApiModule,
            providers: [ { provide: DeveoConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: DeveoApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('DeveoApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
