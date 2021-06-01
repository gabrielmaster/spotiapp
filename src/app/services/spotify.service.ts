import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log('Spotify service listo');
    
  }

  getNewReleases(){

    const headers = new HttpHeaders({
      'Authorization':'Bearer BQA88kW4fYNoCMlXYxhAeRQlt2DtwUBJLdkNiX3zJACwb5JGmOxnz--Lsp9yIf7QagrrVLG7ff9BYwh9W-c'
    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers})
                  .pipe( map(  (data: any) => data['albums'].items));       
    
  }

  getArtista( termino: string ){
    

    const headers = new HttpHeaders({
      'Authorization':'Bearer BQA88kW4fYNoCMlXYxhAeRQlt2DtwUBJLdkNiX3zJACwb5JGmOxnz--Lsp9yIf7QagrrVLG7ff9BYwh9W-c'
    });

    return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, {headers})
                .pipe( map( (data:any) => data['artists'].items));

  }


}
