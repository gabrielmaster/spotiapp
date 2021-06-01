import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  TOKEN = 'BQB4x0iNfQE662ZMpZ6OYF6jpR47bBDM9oqrwJpRT0trLRF18d3lbuFWFZD-fKetoQ-OPPhzPmdiDgxWsqA'; 

  constructor(private http: HttpClient) { 
    console.log('Spotify service listo');
    
  }

  getQuery ( query: string ){

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization':`Bearer ${ this.TOKEN }`
    });

    return this.http.get(url, {headers});


  }


  getNewReleases(){
    
    return this.getQuery('browse/new-releases')
                        .pipe( map(  (data: any) => data['albums'].items));
    
  }

  getArtista( termino: string ){    

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                        .pipe( map( (data:any) => data['artists'].items));

  }


}
