import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log('Spotify service listo');
    
  }

  getNewReleases(){

    const headers = new HttpHeaders({
      'Authorization':'Bearer BQBzyyo5zEtX_M6gfmP7pY6DamwaRhLDgMVcz1KdmzoPQHHuZ5nQYuSDeDUxQch2ppLSuYueWySm6tWWJDw'
    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers});         
    
  }


}
