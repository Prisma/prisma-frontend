import {Component} from "@angular/core";
import {Loading, LoadingController, NavController, NavParams} from "ionic-angular";
import {Camera} from "@ionic-native/camera";
import {Album} from "../../dto/album";
import {StoryService} from "../../providers/back-end/story.service";
import {UserStory} from "../../dto/user-story";
import {UtilService} from "../../providers/util-service";
import {API_URL, env} from "../../app/environment";
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {AlbumsPage} from "../albums/albums";
import {StoryDetailsPage} from "../storydetails/storydetails";
import {StanizerService} from "../../providers/stanizer.service";
import {AuthService} from "../../providers/auth-service/auth-service";
import {AuthGuard} from "../auth-guard";

@Component({
  selector: 'page-new-story',
  templateUrl: 'new-story.html',
})
export class NewStoryPage extends AuthGuard {


  methods: {
    addNewStory: string,
    replaceDescription: string,
    replaceImage: string
  } = env.methods;
  method: string = env.methods.addNewStory;
  dataUrl: string;
  dataUploadTrigger: Promise<any>;
  description: string;
  placeHolder: string = "Schrijf het verhaal.\nHoe meer details hoe beter.";

  selectedAlbum: Album;
  title: string;


  index: number = 0;
  oldStory: UserStory;

//file Transfer
  loading: Loading;

  constructor(protected authService: AuthService, public navCtrl: NavController, private camera: Camera, public navParams: NavParams,
              private storyService: StoryService, private utilService: UtilService,
              private transfer: Transfer, public loadingCtrl: LoadingController,
              public stanizer: StanizerService) {
    super(authService, navCtrl);
    this.method = navParams.get("method") as string;
    this.dataUrl = navParams.get("dataUrl") as string;
    this.selectedAlbum = navParams.get("album") as Album;
    this.index = navParams.get("index") as number;


    this.oldStory = navParams.get("story") as UserStory;
    if (this.method.indexOf(env.methods.replaceDescription) >= 0) {
      this.description = this.oldStory.description;
      if (this.oldStory.source.toLowerCase().indexOf("youtube.com") < 0)
        this.dataUrl = this.oldStory.source;
      else
        this.dataUrl = null;
    }

    if (this.method.indexOf(env.methods.replaceImage) >= 0) {
      this.description = this.oldStory.description;
      this.commit();
    }


    // check if source is a question answer
    if (navParams.get("questionAnswer")) {
      this.description = navParams.get("description");
      this.commit(); // skip to step 2 because we already have the description
    }

  }

  commit() {
    if (this.method.indexOf(env.methods.replaceDescription) >= 0) {
      this.updateDescription();
      return;
    }
    if (this.method.indexOf(env.methods.replaceImage) >= 0) {
      this.updateImage();
      return;
    }
    let newStory: UserStory = new UserStory();
    newStory.albumId = +this.selectedAlbum.id;
    if (this.description)
      newStory.description = this.description;
    else
      newStory.description = "";
    newStory.creatorId = 1;
    this.storyService.addStory(+this.authService.getCurrentPatient().id, newStory).toPromise().then(addedStory => {
      if (this.dataUrl) {
        this.uploadImage(this.authService.getCurrentPatient().id, addedStory.id, this.dataUrl + "").then(res => {
          this.navCtrl.popTo(AlbumsPage, {
            "album": this.selectedAlbum,
          });
        }).catch(err => {
        });
      }
      else {
        this.navCtrl.popTo(AlbumsPage, {
          "album": this.selectedAlbum,
        });
      }
    });
  }


  updateDescription() {
    this.oldStory.description = this.description;
    this.storyService.addStory(+this.authService.getCurrentPatient().id, this.oldStory).toPromise().then(addedStory => {
      this.navCtrl.popTo(StoryDetailsPage, {
        "album": this.selectedAlbum,
        "index": this.index
      });
    });
  }

  updateImage() {
    console.log("trying to update");
    if (this.dataUrl) {
      this.uploadImage(this.authService.getCurrentPatient().id, this.oldStory.id, this.dataUrl + "").then(res => {
        this.navCtrl.popTo(StoryDetailsPage, {
          "album": this.selectedAlbum,
          "index": this.index
        });
      }).catch(err => {
        console.log("Upload eror :" + JSON.stringify(err));
      });
    }
  }

  public uploadImage(patientId: number | string, storyId: number | string, lastImage: string): Promise<any> {
    // Destination URL
    var url = API_URL + '/' + env.api.getPatient + '/' + patientId + '/' + env.api.getStory + '/' + storyId + '/' + env.api.getAsset;
    // File for Upload

    var options = {
      fileKey: "asset",
      fileName: "asset",
      mimeType: "image/jpeg",
      headers: {
        "Connection": "close",
        "Authorization": "Bearer " + localStorage.getItem(env.jwtToken)
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
    var targetPath = this.utilService.pathForImage(lastImage);
    console.log("Path : " + targetPath);
    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll();
      //this.utilService.presentToast('Image succesful uploaded. : ' + targetPath + "\n" + JSON.stringify(data));
    }, err => {
      this.loading.dismissAll()
      // this.utilService.presentToast('Error while uploading file.' + '\n' + JSON.stringify(err));
    });
  }


  sanitizeUrl() {
    if (this.oldStory) {
      return this.stanizer.sanitize(this.dataUrl);
    } else {
      return this.utilService.pathForImage(this.dataUrl);
    }
  }
}
