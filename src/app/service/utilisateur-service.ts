import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AbstractRestService} from "./abstract.rest.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService extends AbstractRestService<any, any> {

  constructor(protected override _http: HttpClient) {
    super(
      _http,
      `${environment.backendProtocol}${environment.backendServer}/api/utilisateur`
    );
  }

  findByUid(uid: string): Observable<any> {
    return this._http.get(`${this._base}/by-uid/${uid}`);
  }
}
