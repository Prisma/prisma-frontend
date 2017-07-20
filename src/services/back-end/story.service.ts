import {PrismaService} from "./prisma-api.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {UserStory} from "../../dto/user-story";
import {Album} from "../../dto/album";
import {env} from "../../app/environment";
import {Patient} from "../../dto/patient";

@Injectable()
export class StoryService extends PrismaService {

  getUserStory(userId:string,storyId: string): Observable<UserStory> {
    let url: string = env.api.getPatient;
    let storyUrl:string = env.api.getStory;
    return this._http.get(`${this._urlToApi}/${url}/${userId}/${storyUrl}/${storyId}`, {
      headers: this._head
    })
      .map(res => {
        return new UserStory(res.json().response);
      })
      .catch(err => this.handleError(err));
  }

  getUserStories(): Observable<UserStory[]> {
    return this._http.get("assets/json/stories.json").map(res => {
      let userStories: UserStory[] = [];
      res.json().forEach(story => userStories.push(new UserStory(story)));
      return userStories;
    })
      .catch(error => this.handleError(error));
  }

  getAlbums(patientId: string | number): Observable<Album[]> {

    let url: string = env.api.getPatient;
    let albumUrl: string = env.api.getAlbum;
    return this._http.get(`${this._urlToApi}/${url}/${patientId}/${albumUrl}`, {
      headers: this._head
    })
      .map(res => {
        let albums: Album[] = [];
        res.json().response.forEach(album => albums.push(new Album(album)));
        return albums;
      })
      .catch(err => this.handleError(err));


    /*
    return this._http.get("assets/json/albums.json").map(res => {
      let albums: Album[];
      let hasAlbums: boolean = false;
      albums = JSON.parse(localStorage.getItem(env.temp.albums)) as Album[];
      if (albums)
        hasAlbums = true;
      if (!hasAlbums) {
        albums = res.json() ? res.json() as Album[] : [];
        let temp: Album[] = []
        albums.forEach(album => {
          album.stories = [];
          temp.push(album);
        });
        localStorage.setItem(env.temp.albums, JSON.stringify(albums));
      }
      return albums;
    });
    */

  }


  oldAddStory(selectedAlbum: Album, newStory: UserStory): Observable<any> {
    let currentAlbums: Album[] = JSON.parse(localStorage.getItem(env.temp.albums)) as Album[] || [];

    console.log("Before \n" + JSON.stringify(JSON.parse(localStorage.getItem(env.temp.albums)) as Album[]));
    let isANewAlbum: boolean = true;
    currentAlbums.forEach(album => {
      if (album.id === selectedAlbum.id) {
        isANewAlbum = false;
        if (album.stories.length === 0) {
          album.stories = [];
          newStory.id = "1";
        }
        else {
          newStory.id = album.stories[album.stories.length - 1].id + 1;
        }
        album.stories.push(newStory);
      }
    });
    if (isANewAlbum) {
      newStory.id = "1";
      selectedAlbum = new Album();
      selectedAlbum.title = "Random";
      selectedAlbum.id = "RandomId";
      selectedAlbum.stories.push(newStory);
      currentAlbums.push(selectedAlbum);
    }
    localStorage.setItem(env.temp.albums, JSON.stringify(currentAlbums as Album[]));
    console.log("After \n" + JSON.stringify(JSON.parse(localStorage.getItem(env.temp.albums)) as Album[]));
    return Observable.of(true);
  }

  addStory(userId:number, newStory: UserStory): Observable<any> {
    let url: string = env.api.getPatient;
    let storyUrl:string = env.api.getStory;
    return this._http.post(`${this._urlToApi}/${url}/${userId}/${storyUrl}`, newStory)
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          return null;
        }
        return new UserStory(res.json().response) as UserStory;
      }).catch(err => this.handleError(err));
  }

  postImage(image:File,userStory: UserStory): Observable<any> {
    let url: string = env.api.getPatient;
    return this._http.post(`${this._urlToApi}/${url}`, userStory)
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          return null;
        }
        return new UserStory(res.json().response) as UserStory;
      }).catch(err => this.handleError(err));
  }
  generateBasicAlbums(patientId: string): Observable<Album[]> {
    let url: string = env.api.getPatient;
    let albumUrl: string = env.api.getAlbum;
    return this._http.get("assets/json/albums.json").map(res => {
      let albums: Album[] = res.json();
      let returnedAlbums: Album[] = [];
      if (!albums)
        return;
      albums.forEach(album => {
        this._http.post(`${this._urlToApi}/${url}/${patientId}/${albumUrl}`, album)
          .map(res => {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
              return null;
            }
            return new Album(res.json().response) as Album;
          }).toPromise().then(res2 => returnedAlbums.push(res2)).catch(err => this.handleError(err));
      });
      return returnedAlbums;
    }).catch(err => this.handleError(err));
  }

  /** Get historical themes (just albums for now) */
  getThemes(): Observable<Album[]> {
    return this._http.get("assets/json/themes.json").map(res => {
      /*let albums: Album[] = [];
       res.json().forEach(album => albums.push(new Album(album)));
       return albums;*/
      return res.json() ? res.json() as Album[] : new Array<Album>();
    })
      .catch(error => this.handleError(error));
  }

  /** Get historical themes (just albums for now) */
  getLOLBUMS(): Observable<Album[]> {
    return this._http.get("assets/json/albums.json").map(res => {
      /*let albums: Album[] = [];
       res.json().forEach(album => albums.push(new Album(album)));
       return albums;*/
      return res.json() ? res.json() as Album[] : new Array<Album>();
    })
      .catch(error => this.handleError(error));
  }

}
