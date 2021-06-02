import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService{

  TOKEN: any; //"Bearer BQDVjL6RLM87MY8n2-LgtPzwXskYcx7oj6rS1goHNy9xxqvFspuKdH8savJ2Sy4OA7g7KjTgHHHUQ5KGC9Q";

  constructor(private http: HttpClient) { 
    console.log('Spotify service listo'); 
    
    this.getToken();
    this.TOKEN = localStorage.getItem('spotify-token');
    //this.TOKEN = 'Bearer BQBSdGRGqb3KKo1XLIC8Vn6dBpCkko3cnvrY2zuJCgEjqcVuc4keVeDyj67iqpBsKatRV5mfn5n9eUCzPwU';
    
  }
 
  
 getToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', '7145183d43d04739a73527532bf77fef')
      .set('client_secret', '4efdc6bf3cc24f3fb2532cd6a65815e5');
   
    return this.http.post(url, body.toString(), headers)
                .subscribe( (tokepResp:any) => {
                  //this.TOKEN = `Bearer ${ tokepResp['access_token'] }`;
                  localStorage.setItem('spotify-token', `Bearer ${ tokepResp['access_token'] }`);  
                  //console.log(tokepResp);
                                  
                });
              /*.toPromise()
              .then( (token:any) => {
                this.TOKEN = `Bearer ${ token['access_token'] }`;
                // console.log('estoy en el getToken');
                // console.log(token);
              }, (err: any) => {
               console.log(err);
              });*/
   
  }

  getQuery ( query: string ){
    
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': `${this.TOKEN}` 
    });

    // console.log(this.TOKEN, headers);
    

    return this.http.get(url, {headers});


  }


  getNewReleases(){
    
    return this.getQuery('browse/new-releases')
                        .pipe( map(  (data: any) => data['albums'].items));
    
  }

  getArtistas( termino: string ){    

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                        .pipe( map( (data:any) => data['artists'].items));

  }

  getArtista( id: string ){    

    return this.getQuery(`artists/${ id }`);
                        //.pipe( map( (data:any) => data['artists'].items));

  }

  getTopTracks( id: string ){    

    return this.getQuery(`artists/${ id }/top-tracks?market=us`)
                        .pipe( map( (data:any) => data['tracks']));

  }


}
