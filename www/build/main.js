webpackJsonp([0],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateOrUpdateStoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_story_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_mixpanel_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_user_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__storyDetail_storyDetail_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_navigation_nav_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_navigation_view_controller__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_transfer__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_toast_toast_controller__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_operators__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};















var CreateOrUpdateStoryComponent = /** @class */ (function () {
    function CreateOrUpdateStoryComponent(constant, navParams, sanitizer, storyService, mixpanel, patientService, userService, navCtrl, viewCtrl, transfer, loadingCtrl, toastCtrl, changeDetect) {
        var _a;
        var _this = this;
        this.constant = constant;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.storyService = storyService;
        this.mixpanel = mixpanel;
        this.patientService = patientService;
        this.userService = userService;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.transfer = transfer;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.changeDetect = changeDetect;
        this.title = 'Vul het verhaal aan';
        this.placeHolder = "Schrijf het verhaal.\n Hoe meer details hoe beter.";
        this.youtubeLinkPlaceHolder = 'https://www.youtube.com/watch?v=ffSnk4v3aeg';
        this.isLoading = false;
        this.methods = (_a = {},
            _a[this.constant.methods.addNewStory] = {
                init: function () {
                    _this.story = _this.initStory({
                        type: 'image'
                    });
                    _this.isLoading = true;
                },
                send: function () {
                    _this.addStory().subscribe(function (addedStory) {
                        _this.uploadImage(_this.currentPatient.patient_id, addedStory.id, _this.dataUrl);
                    });
                }
            },
            _a[this.constant.methods.addFileStory] = {
                init: function () {
                    _this.title = 'Upload een foto';
                    _this.story = _this.initStory({
                        type: 'image'
                    });
                    _this.isLoading = true;
                },
                send: function () {
                    _this.addStory().subscribe(function (addedStory) {
                        var fd = new FormData();
                        fd.append('asset', _this.file);
                        _this.loading = _this.loadingCtrl.create({
                            content: 'Uploading...'
                        });
                        _this.loading.present();
                        _this.storyService
                            .addFile(_this.currentPatient.patient_id, addedStory.id, fd)
                            .subscribe(function () {
                            _this.loading.dismissAll();
                            _this.navCtrl.pop();
                        });
                    });
                }
            },
            _a[this.constant.methods.addYoutubeStory] = {
                init: function () {
                    _this.title = 'Kies video van Youtube';
                    _this.story = _this.initStory({
                        type: 'youtube',
                        description: 'Video van Youtube'
                    });
                },
                send: function () {
                    if (_this.isLoading) {
                        _this.addStory()
                            .pipe(Object(__WEBPACK_IMPORTED_MODULE_14_rxjs_operators__["map"])(function (addedStory) {
                            return _this.storyService.addYoutubeLinkAsset(_this.currentPatient.patient_id, addedStory.id, _this.story.source);
                        }), Object(__WEBPACK_IMPORTED_MODULE_14_rxjs_operators__["switchMap"])(function (x) { return x; }))
                            .subscribe(function () {
                            var truncatedDescription = '';
                            if (_this.story.description) {
                                truncatedDescription = "'" + _this.story.description.substring(0, Math.min(_this.story.description.length, 30)) + "...'";
                            }
                            _this.toastCtrl
                                .create({
                                message: "YouTube-video " + truncatedDescription + " toegevoegd",
                                duration: 3000,
                                position: 'bottom'
                            })
                                .present();
                            _this.navCtrl.pop();
                        });
                    }
                    else {
                        _this.toastCtrl
                            .create({
                            message: 'Ongeldige YouTube link',
                            duration: 3000,
                            position: 'bottom'
                        })
                            .present();
                    }
                }
            },
            _a[this.constant.methods.replaceDescription] = {
                init: function () {
                    _this.isLoading = true;
                },
                send: function () {
                    _this.updateDescription();
                }
            },
            _a);
    }
    CreateOrUpdateStoryComponent.prototype.ngOnInit = function () {
        this.method = this.navParams.get('method');
        this.dataUrl = this.navParams.get('dataUrl');
        this.album = this.navParams.get('album');
        this.story = __assign({}, this.navParams.get('story'));
        this.currentPatient = this.patientService.getCurrentPatient();
        this.currentUser = this.userService.getCurrentUser();
        this.methods[this.method].init();
    };
    CreateOrUpdateStoryComponent.prototype.commit = function () {
        this.methods[this.method].send();
    };
    CreateOrUpdateStoryComponent.prototype.updateDescription = function () {
        var _this = this;
        this.storyService
            .updateStory(this.currentPatient.patient_id, this.story)
            .subscribe(function () {
            _this.mixpanel.track('NewStoryComponent::updateDescription', {
                email: _this.currentUser.email,
                patient_id: _this.currentPatient.patient_id,
                updatedStory: _this.story,
                selectedAlbum: _this.album
            });
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__storyDetail_storyDetail_component__["a" /* StoryDetailsComponent */], {
                album: _this.album,
                story: _this.story
            });
            _this.navCtrl.remove(_this.viewCtrl.index - 1, 2);
        });
    };
    CreateOrUpdateStoryComponent.prototype.initStory = function (params) {
        return __assign({}, this.story, params, { albumId: this.album.id, creatorId: this.currentUser.id });
    };
    CreateOrUpdateStoryComponent.prototype.addStory = function () {
        var _this = this;
        return this.storyService
            .addStory(this.currentPatient.patient_id, this.story)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_14_rxjs_operators__["map"])(function (addedStory) {
            _this.mixpanel.track('NewStoryComponent::saving story', {
                email: _this.currentUser.email,
                patient_id: _this.currentPatient.patient_id,
                newStory: _this.story,
                selectedAlbum: _this.album
            });
            return addedStory;
        }));
    };
    CreateOrUpdateStoryComponent.prototype.checkYoutubeLink = function (value) {
        var _this = this;
        this.storyService
            .checkYoutubeLink(value)
            .subscribe(function (res) {
            if (res) {
                _this.image = _this.sanitizer.bypassSecurityTrustUrl(res.thumbnail);
                _this.story = __assign({}, _this.story, { description: res.title });
                _this.isLoading = true;
            }
            else {
                _this.image = '';
                _this.isLoading = false;
            }
        });
    };
    CreateOrUpdateStoryComponent.prototype.registerFile = function (file) {
        this.file = file;
    };
    CreateOrUpdateStoryComponent.prototype.getAssetEndpoint = function (storyId, patientId) {
        return this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getStory + "/" + storyId + "/" + this.constant.api.getAsset;
    };
    CreateOrUpdateStoryComponent.prototype.uploadImage = function (patientId, storyId, lastImage) {
        var _this = this;
        var url = this.getAssetEndpoint(storyId, patientId);
        var options = {
            fileKey: 'asset',
            fileName: 'asset',
            mimeType: 'image/jpeg',
            headers: {
                Connection: 'close',
                Authorization: 'Bearer ' + localStorage.getItem(this.constant.jwtToken)
            }
        };
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...'
        });
        this.loading.present();
        var targetPath = lastImage;
        fileTransfer.upload(targetPath, url, options).then(function () {
            _this.loading.dismissAll();
            _this.navCtrl.pop();
        }, function () {
            _this.loading.dismissAll();
            _this.navCtrl.pop();
        });
    };
    CreateOrUpdateStoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-create-update-story',
            template: "\n    <ion-header>\n    <ion-navbar>\n        <ion-title>{{title}}</ion-title>\n    </ion-navbar>\n    </ion-header>\n\n    <ion-content padding>\n    <ion-item-group>\n        <br>\n        <!-- Add Youtube story -->\n        <h2 class=\"plak-een-youtube-lin\" *ngIf=\"method===constant.methods.addYoutubeStory\">Plak een Youtube link om de\n        video toe te voegen.</h2>\n        <h2 class=\"plak-een-youtube-lin\" *ngIf=\"method===constant.methods.addFileStory\">Upload een foto van je toestel</h2>\n\n        <!-- Add description story -->\n        <ion-item style=\"padding-left: 0\"></ion-item>\n        <ion-item *ngIf=\"method !== constant.methods.addYoutubeStory\">\n            <ion-textarea autofocus class=\"story-text\" placeholder=\"{{placeHolder}}\" [(ngModel)]=\"story.description\" rows=\"7\"\n                        clearInput></ion-textarea>\n        </ion-item>\n        <!-- Add Youtube Story -->\n        <ion-item *ngIf=\"method===constant.methods.addYoutubeStory\" style=\"padding-left: 0\">\n            <ion-textarea autofocus class=\"story-text\" placeholder=\"{{youtubeLinkPlaceHolder}}\"\n            (ngModelChange)=\"checkYoutubeLink($event)\"\n            [(ngModel)]=\"story.source\"\n            rows=\"3\" style=\"padding-left: 0\"\n            clearInput></ion-textarea>\n        </ion-item>\n        <!-- Add File Story -->\n        <ion-item *ngIf=\"method===constant.methods.addFileStory\" >\n          <input type=\"file\" accept=\".jpg,.jpeg,.png,.gif\" name=\"asset\" #fileselector\n            (change)=\"registerFile(fileselector.files[0])\" style=\"padding-left: 0\" />\n        </ion-item>\n        <ion-item>\n          <ion-thumbnail class=\"thumbnail\" style=\"padding-left: 7%;\" *ngIf=\"method===constant.methods.addYoutubeStory\">\n              <img *ngIf=\"isLoading\" [src]=\"image\">\n              <ion-spinner *ngIf=\"!isLoading\" item-start name=\"dots\" color=\"grey\"></ion-spinner>\n          </ion-thumbnail>\n        </ion-item>\n\n        <button ion-button solid block full large color=\"primary\" (click)=\"commit()\"\n          [disabled]=\"!isLoading\">\n          <ion-icon name=\"checkmark\"></ion-icon>\n        </button>\n\n    </ion-item-group>\n    </ion-content>\n\n  "
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__["a" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_4__core_story_service__["a" /* StoryService */],
            __WEBPACK_IMPORTED_MODULE_5__core_mixpanel_service__["a" /* MixpanelService */],
            __WEBPACK_IMPORTED_MODULE_6__core_patient_service__["a" /* PatientService */],
            __WEBPACK_IMPORTED_MODULE_7__core_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular_navigation_nav_controller__["a" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_10_ionic_angular_navigation_view_controller__["a" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_12_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
    ], CreateOrUpdateStoryComponent);
    return CreateOrUpdateStoryComponent;
}());

//# sourceMappingURL=createOrUpdateStory.component.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_mixpanel_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_storyOptions_component__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_youtube_video_player__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_story_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__createOrUpdateStory_createOrUpdateStory_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_screenfull__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_screenfull___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_screenfull__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













var StoryDetailsComponent = /** @class */ (function () {
    function StoryDetailsComponent(constant, navParams, mixpanel, sanitizer, popoverCtrl, youtube, storyService, patientService, navCtrl, viewCtrl, toastCtrl) {
        this.constant = constant;
        this.navParams = navParams;
        this.mixpanel = mixpanel;
        this.sanitizer = sanitizer;
        this.popoverCtrl = popoverCtrl;
        this.youtube = youtube;
        this.storyService = storyService;
        this.patientService = patientService;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__["Subject"]();
        this.takenUntilPipe = Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__["pipe"])(Object(__WEBPACK_IMPORTED_MODULE_9_rxjs_operators__["takeUntil"])(this.destroy$));
        this.showControls = true;
        this.showDescription = false;
    }
    StoryDetailsComponent_1 = StoryDetailsComponent;
    StoryDetailsComponent.prototype.ngOnInit = function () {
        this.mixpanel.track('StoryDetailsPage::view', {
            story: this.story
        });
        this.album = this.navParams.get('album');
        this.story = this.navParams.get('story');
        this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl(this.story.backgroundImage);
        if (this.story.type === 'youtube') {
            this.source = this.sanitizer.bypassSecurityTrustResourceUrl(this.story.source);
            this.setYoutubeUrl(this.story.source);
            this.showControls = true;
        }
        else {
            this.showControls = false;
        }
        if (__WEBPACK_IMPORTED_MODULE_12_screenfull__["enabled"]) {
            __WEBPACK_IMPORTED_MODULE_12_screenfull__["request"]();
        }
    };
    StoryDetailsComponent.prototype.ngOnDestroy = function () {
        document.removeEventListener('keyup', this.keyEvent.bind(this));
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    StoryDetailsComponent.prototype.ionViewWillEnter = function () {
        this.content.resize();
    };
    StoryDetailsComponent.prototype.ionViewDidEnter = function () {
        this.keyf = this.keyEvent.bind(this);
        document.addEventListener('keyup', this.keyf);
    };
    StoryDetailsComponent.prototype.ionViewWillLeave = function () {
        document.removeEventListener('keyup', this.keyf);
    };
    StoryDetailsComponent.prototype.keyEvent = function (e) {
        if (e.keyCode === 37) {
            this.previous();
        }
        else if (e.keyCode === 39) {
            this.next();
        }
    };
    StoryDetailsComponent.prototype.swipeEvent = function (e) {
        if (this.album.stories.length > 1) {
            var options = {
                direction: 'up',
                duration: 500,
                slowdownfactor: 3,
                slidePixels: 20,
                iosdelay: 100,
                androiddelay: 150
            };
            // swipes left
            if (e.direction === 4) {
                options.direction = 'right';
                this.previous();
            }
            // swipes right
            if (e.direction === 2) {
                options.direction = 'left';
                this.next();
            }
        }
    };
    StoryDetailsComponent.prototype.next = function () {
        var _this = this;
        var nextStory = this.album.stories[(this.album.stories.findIndex(function (story) { return _this.story.id === story.id; }) + 1) %
            this.album.stories.length];
        this.storyService
            .getBackground(nextStory)
            .let(this.takenUntilPipe)
            .subscribe(function (imageUrl) {
            _this.navCtrl.push(StoryDetailsComponent_1, {
                album: _this.album,
                story: __assign({}, nextStory, { backgroundImage: imageUrl })
            });
            _this.navCtrl.remove(_this.viewCtrl.index);
        });
    };
    StoryDetailsComponent.prototype.previous = function () {
        var _this = this;
        var index = this.album.stories.findIndex(function (story) { return _this.story.id === story.id; }) === 0
            ? this.album.stories.length - 1
            : this.album.stories.findIndex(function (story) { return _this.story.id === story.id; }) - 1;
        var previousStory = this.album.stories[index];
        this.storyService
            .getBackground(previousStory)
            .let(this.takenUntilPipe)
            .subscribe(function (imageUrl) {
            _this.navCtrl.push(StoryDetailsComponent_1, {
                album: _this.album,
                story: __assign({}, previousStory, { backgroundImage: imageUrl })
            });
            _this.navCtrl.remove(_this.viewCtrl.index);
        });
    };
    StoryDetailsComponent.prototype.toggleFavorite = function () {
        this.story.favorited = !this.story.favorited;
        this.storyService
            .updateStory(this.patientService.getCurrentPatient().patient_id, this.story)
            .let(this.takenUntilPipe)
            .subscribe();
    };
    StoryDetailsComponent.prototype.toggleControls = function () {
        if (this.showDescription) {
            this.toggleDescription();
        }
        else if (!(this.story.type === 'youtube')) {
            // only hide controls when it is not a YouTube video
            this.showControls = !this.showControls;
        }
    };
    StoryDetailsComponent.prototype.toggleDescription = function () {
        this.showDescription = !this.showDescription;
    };
    StoryDetailsComponent.prototype.openYoutubeVideo = function (url) {
        this.youtube.openVideo(this.storyService.getYoutubeId(url));
    };
    StoryDetailsComponent.prototype.setYoutubeUrl = function (url) {
        var resourceUrl = "https://www.youtube.com/embed/" + this.storyService.getYoutubeId(url) + "?fs=0&autoplay=1&rel=0&showinfo=0&disablekb=1";
        this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resourceUrl);
    };
    StoryDetailsComponent.prototype.editDescription = function (story) {
        this.mixpanel.track('StoryDetailsPage::editDescription', {
            story: story
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */], {
            album: this.album,
            story: story,
            method: this.constant.methods.replaceDescription,
            dataUrl: story.backgroundImage
        });
    };
    StoryDetailsComponent.prototype.showMore = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__component_storyOptions_component__["a" /* StoryOptionsComponent */], {
            story: this.story,
            navCtrl: this.navCtrl
        }, { cssClass: 'storyDetail-popover' });
        var toast = function (message) {
            return _this.toastCtrl
                .create({
                message: message,
                duration: 3000,
                position: 'bottom'
            })
                .present();
        };
        popover.onDidDismiss(function (dismissData) {
            if (dismissData === 'deleteSuccess') {
                toast('Het verhaal is verwijderd.');
                _this.navCtrl.pop();
            }
            if (dismissData === 'deleteError') {
                toast('Het verhaal kon niet verwijderd worden.');
            }
        });
        popover.present({
            ev: event
        });
    };
    var StoryDetailsComponent_1;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('content'),
        __metadata("design:type", Object)
    ], StoryDetailsComponent.prototype, "content", void 0);
    StoryDetailsComponent = StoryDetailsComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-story-detail',template:/*ion-inline-start:"/Users/thor/Webdev/mobile-app/src/app/storyList/component/storyDetail/storyDetail.component.html"*/'<ion-content #content class="no-scroll dark-content" (keydown)="keyEvent($event)" >\n    <ion-navbar class="detail-nav controls" [class.show]="showControls">\n      <ion-buttons end>\n        <button ion-button icon-only (click)="showMore($event)">\n          <ion-icon name="more"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n    <div (swipe)="swipeEvent($event)">\n        <div (click)="toggleControls()" class="image-container expanded"\n             *ngIf="story.type !== \'youtube\'">\n            <img [src]="backgroundImage" class="bg-img">\n            <img id="{{story.id}}" [src]="backgroundImage" class="detail-img">\n        </div>\n        <div (click)="toggleControls()" class="image-container"\n             *ngIf="story.type === \'youtube\'">\n             <iframe *prismaIfPlatform="\'notCordova\'" width="560" height="315" [src]="safeYoutubeUrl" \n             frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="width:100%;height:100vh"\n             (keydown)="keyEvent($e)">\n            </iframe>\n            <img *prismaIfPlatform="\'cordova\'" [src]="backgroundImage" class="bg-img">\n            <div style="position: relative">\n              <img *prismaIfPlatform="\'cordova\'" id="{{\'video-\'+story.id}}" [src]="backgroundImage"\n              (click)="openYoutubeVideo(story.source)"\n              class="detail-img">\n              <div *prismaIfPlatform="\'cordova\'" (click)="openYoutubeVideo(story.source)"\n              class="youtube-icon circle-icon movie-indicator"></div>\n            </div>\n        </div>\n        <ion-toolbar style="pointer-events: none;" class="bottom overlay-nav controls" [class.show]="showControls">\n          <ion-buttons left class="detail-controls">\n            <button *ngIf="!showDescription && story.description" ion-button icon-only (click)="toggleDescription()" class="disable-hover">\n              <ion-icon name="information-circle"></ion-icon>\n            </button>\n            <!-- Show story edit when there is no description, or when the description is being viewed -->\n            <button *ngIf="!story.description || showDescription" ion-button icon-only (click)="editDescription(story)" class="disable-hover">\n              <ion-icon name="md-create"></ion-icon>\n              <span class="edit-story-label">Vul het verhaal aan</span>\n            </button>\n          </ion-buttons>\n          <ion-buttons end>\n            <button ion-button icon-only class="detail-controls" (click)="toggleFavorite()">\n              <ion-icon class="star" name="{{story.favorited ? \'star\' : \'star-outline\'}}"\n              [class.favorited]="story.favorited" ></ion-icon>\n            </button>\n           </ion-buttons>\n        </ion-toolbar>\n        <div class="description bottom" color="general" *ngIf="story.description" [class.show]=\'showDescription\'>\n          <p class="description-text">{{story.description}}</p>\n          <button ion-button basic color="white" round class="description-close" (click)="toggleDescription()">\n            <ion-icon name="close" color="primary"></ion-icon>\n          </button>\n        </div>\n        <!--\n        <div class="row">\n          <div class="detail-button">\n            <div class="story-action" (click)="editDescription(story)">\n              <ion-icon name="md-create" color="general"></ion-icon>\n              <p>Vul het verhaal aan</p>\n            </div>\n          </div>\n        </div>-->\n    </div>\n  </ion-content>'/*ion-inline-end:"/Users/thor/Webdev/mobile-app/src/app/storyList/component/storyDetail/storyDetail.component.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_10__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__core_mixpanel_service__["a" /* MixpanelService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */],
            __WEBPACK_IMPORTED_MODULE_6__core_story_service__["a" /* StoryService */],
            __WEBPACK_IMPORTED_MODULE_7__core_patient_service__["a" /* PatientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], StoryDetailsComponent);
    return StoryDetailsComponent;
}());

//# sourceMappingURL=storyDetail.component.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopicService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_question__ = __webpack_require__(846);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TopicService = /** @class */ (function () {
    function TopicService() {
        this.questions = __WEBPACK_IMPORTED_MODULE_1__shared_question__["a" /* QUESTIONS */];
    }
    TopicService.prototype.getQuestions = function (query) {
        var _this = this;
        var matchingCategories = this.questions.filter(function (category) {
            return _this.containsQuery(query, category.keywords);
        });
        if (matchingCategories.length > 0) {
            return [].concat.apply([], matchingCategories.map(function (mc) { return mc.questions; }));
        }
        else {
            return [];
        }
    };
    TopicService.prototype.hasQuestions = function (query) {
        return this.getQuestions(query).length > 0;
    };
    TopicService.prototype.containsQuery = function (query, keywords) {
        return Boolean(keywords.find(function (kw) {
            var reg = new RegExp(kw.toLowerCase());
            return reg.test(query.toLowerCase());
        }));
    };
    TopicService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], TopicService);
    return TopicService;
}());

//# sourceMappingURL=topic.service.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_new_lovedone_new_lovedone__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__albumList_albumList_component__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_params__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthenticationComponent = /** @class */ (function () {
    function AuthenticationComponent(navCtrl, menuCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.isLogging = false;
        this.toggleForm = this.toggleForm.bind(this);
        this.onLoginComplete = this.onLoginComplete.bind(this);
        this.onRegisterComplete = this.onRegisterComplete.bind(this);
    }
    AuthenticationComponent.prototype.ngOnInit = function () {
        this.isLogging = this.navParams.get('isLogging');
        this.isLogging ? (this.title = 'Registreer') : (this.title = 'Meld je aan');
    };
    AuthenticationComponent.prototype.ionViewDidEnter = function () {
        var error = this.navParams.get('error');
        if (error) {
            this.alertCtrl
                .create({
                title: error,
                buttons: ['Ok']
            })
                .present();
        }
    };
    AuthenticationComponent.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
    };
    AuthenticationComponent.prototype.ionViewDidLeave = function () {
        this.menuCtrl.enable(true);
    };
    AuthenticationComponent.prototype.toggleForm = function () {
        this.isLogging = !this.isLogging;
        this.isLogging ? (this.title = 'Registreer') : (this.title = 'Meld je aan');
    };
    AuthenticationComponent.prototype.onLoginComplete = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__albumList_albumList_component__["a" /* AlbumListComponent */]);
    };
    AuthenticationComponent.prototype.onRegisterComplete = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__components_new_lovedone_new_lovedone__["a" /* NewLovedoneComponent */]);
    };
    AuthenticationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-authentication',
            template: "\n    <ion-header>\n      <prisma-authentication-header [title]=\"title\"></prisma-authentication-header>\n    </ion-header>\n    <ion-content no-bounce>\n      <!--  Login case -->\n      <prisma-authentication-login\n        *ngIf=\"!isLogging\"\n        [onRegisterClick]=\"toggleForm\"\n        [onComplete]=\"onLoginComplete\"\n      ></prisma-authentication-login>\n      <prisma-authentication-register\n        *ngIf=\"isLogging\"\n        [onLoginClick]=\"toggleForm\"\n        [onComplete]=\"onRegisterComplete\"\n      ></prisma-authentication-register>\n    </ion-content>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_params__["a" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], AuthenticationComponent);
    return AuthenticationComponent;
}());

//# sourceMappingURL=authentication.component.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_albumOrStory_component__ = __webpack_require__(862);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directive_toggleFullscreen_directive__ = __webpack_require__(863);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directive_ifFullscreen_directive__ = __webpack_require__(864);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directive_ifPlatform_directive__ = __webpack_require__(865);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_fullscreenButton_component__ = __webpack_require__(866);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__provider_util_service__ = __webpack_require__(416);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var imports = [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */]];
var declarations = [
    __WEBPACK_IMPORTED_MODULE_3__component_albumOrStory_component__["a" /* AlbumOrStoryComponent */],
    __WEBPACK_IMPORTED_MODULE_4__directive_toggleFullscreen_directive__["a" /* ToggleFullscreenDirective */],
    __WEBPACK_IMPORTED_MODULE_5__directive_ifFullscreen_directive__["a" /* IfFullscreenDirective */],
    __WEBPACK_IMPORTED_MODULE_7__component_fullscreenButton_component__["a" /* FullscreenButtonComponent */],
    __WEBPACK_IMPORTED_MODULE_6__directive_ifPlatform_directive__["a" /* IfPlatformDirective */]
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: declarations,
            imports: imports,
            providers: [__WEBPACK_IMPORTED_MODULE_8__provider_util_service__["a" /* UtilService */]],
            exports: imports.concat(declarations)
        })
    ], SharedModule);
    return SharedModule;
}());

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    // These statements are preprocessed by gulp
    // eg. run 'gulp develop' to export this part as the environment.
    currentEnv: 'production',
    tracking: true,
    // insert email addresses you want to exclude from
    // mixpanel tracking in your build here
    trackingExcluded: [],
    // insert a valid Prisma API URL
    apiUrl: 'https://api.prisma.care/v1',
    // insert a valid YouTube API key
    youtubeApiKey: 'AIzaSyBM2EOi6BBvWiam_jWfiQCM6pKWo8cnTIM',
    defaultUsername: 'open@prisma.care',
    defaultPassword: 'iedereen'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ConstantToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstantProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_constant__ = __webpack_require__(473);


var ConstantToken = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* InjectionToken */]('constant');
var ConstantProvider = {
    provide: ConstantToken,
    useValue: __WEBPACK_IMPORTED_MODULE_1__shared_constant__["a" /* constant */]
};
//# sourceMappingURL=di.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryListOptionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_view_controller__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_album_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_alert_alert_controller__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__root_component__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_user_service__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var StoryListOptionsComponent = /** @class */ (function () {
    function StoryListOptionsComponent(navParams, viewCtrl, albumService, patientService, alertCtrl, authService, userService) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.albumService = albumService;
        this.patientService = patientService;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.userService = userService;
        this.navCtrl = null;
        this.navCtrl = this.navParams.get('navCtrl');
    }
    StoryListOptionsComponent.prototype.actionSheet = function () {
        this.navParams.get('actionSheet')();
        this.viewCtrl.dismiss();
    };
    StoryListOptionsComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    StoryListOptionsComponent.prototype.deleteAlbum = function () {
        var _this = this;
        this.albumService
            .deleteAlbum(this.patientService.getCurrentPatient().patient_id, this.navParams.get('album').id)
            .subscribe(function () {
            _this.viewCtrl.dismiss('deleteSuccess');
        }, function () {
            _this.viewCtrl.dismiss('deleteError');
        });
    };
    StoryListOptionsComponent.prototype.showRegisterPrompt = function (intentionText) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Meld je aan',
            subTitle: "Meld je aan om " + intentionText + ". Zo kan je je bewerkingen bijhouden.",
            buttons: [
                {
                    text: 'Ga terug'
                },
                {
                    text: 'Meld je aan',
                    handler: function () {
                        _this.authService.logout();
                        _this.viewCtrl.dismiss();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__root_component__["a" /* RootComponent */], { isLogging: true });
                    }
                }
            ]
        });
        alert.present();
    };
    StoryListOptionsComponent.prototype.confirmDeletion = function () {
        var _this = this;
        this.alertCtrl
            .create({
            title: 'Album verwijderen',
            subTitle: "Ben je zeker dat je het album '" + this.navParams.get('album').title + "' wilt verwijderen?",
            buttons: [
                {
                    text: 'Ja',
                    handler: function (data) {
                        _this.deleteAlbum();
                    }
                },
                'Annuleer'
            ]
        })
            .present();
    };
    StoryListOptionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-story-list-options',
            template: "\n    <ion-list class=\"list\">\n      <ion-item\n        padding\n        (click)=\"this.userService.registrationGuard(this.actionSheet.bind(this),\n      this.showRegisterPrompt.bind(this, 'een verhaal toe te voegen'))\"\n      >\n        <ion-icon class=\"bar-icon\" name=\"md-add\"></ion-icon>\n        <p class=\"contenu\">Voeg verhaal toe</p>\n      </ion-item>\n      <ion-item\n        padding\n        (click)=\"this.userService.registrationGuard(this.confirmDeletion.bind(this),\n        this.showRegisterPrompt.bind(this, 'een album te verwijderen'))\"\n      >\n        <ion-icon class=\"trash-icon\" name=\"md-trash\"></ion-icon>\n        <p class=\"contenu\">Verwijder album</p>\n      </ion-item>\n      <ion-item\n        padding\n        *prismaIfPlatform=\"'notCordova'\"\n        prismaToggleFullscreen\n        (click)=\"dismiss()\"\n      >\n        <ion-icon\n          *prismaIfFullscreen=\"false\"\n          class=\"trash-icon\"\n          name=\"md-expand\"\n        ></ion-icon>\n        <ion-icon\n          *prismaIfFullscreen=\"true\"\n          class=\"trash-icon\"\n          name=\"md-contract\"\n        ></ion-icon>\n        <p *prismaIfFullscreen=\"false\" class=\"contenu\">Volledig scherm</p>\n        <p *prismaIfFullscreen=\"true\" class=\"contenu\">Terug klein scherm</p>\n      </ion-item>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__["a" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_view_controller__["a" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__core_album_service__["a" /* AlbumService */],
            __WEBPACK_IMPORTED_MODULE_4__core_patient_service__["a" /* PatientService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_alert_alert_controller__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__core_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_8__core_user_service__["a" /* UserService */]])
    ], StoryListOptionsComponent);
    return StoryListOptionsComponent;
}());

//# sourceMappingURL=storyListOptions.component.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopicPopoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TopicPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var TopicPopoverComponent = /** @class */ (function () {
    function TopicPopoverComponent(params) {
        this.params = params;
        this.topicQuery = this.params.get('topicQuery');
    }
    TopicPopoverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-topic-popover',template:/*ion-inline-start:"/Users/thor/Webdev/mobile-app/src/app/storyList/component/topic-popover/topic-popover.component.html"*/'<!-- Generated template for the TopicPopoverComponent component -->\n<prisma-question #questions [query]="topicQuery"></prisma-question>\n\n'/*ion-inline-end:"/Users/thor/Webdev/mobile-app/src/app/storyList/component/topic-popover/topic-popover.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__["a" /* NavParams */]])
    ], TopicPopoverComponent);
    return TopicPopoverComponent;
}());

//# sourceMappingURL=topic-popover.component.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullstoryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/*
  Generated class for the FullstoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FullstoryService = /** @class */ (function () {
    function FullstoryService() {
    }
    FullstoryService.prototype.identify = function (user) {
        // This is an example script - don't forget to change it!
        if ('FS' in window) {
            window['FS'].identify(String(user.id), {
                displayName: user.firstName + " " + user.lastName,
                email: user.email
            });
        }
    };
    FullstoryService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], FullstoryService);
    return FullstoryService;
}());

//# sourceMappingURL=fullstory.service.js.map

/***/ }),

/***/ 214:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 214;

/***/ }),

/***/ 256:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 256;

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_utils__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var PatientService = /** @class */ (function () {
    function PatientService(constant, http) {
        this.constant = constant;
        this.http = http;
        this.patientPipe = Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["pipe"])(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["catchError"])(this.handleError));
        this._patientExists = new __WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.handleError = this.handleError.bind(this);
    }
    PatientService.prototype.getPatient = function (id) {
        return this.http
            .get(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + id)
            .let(this.patientPipe);
    };
    PatientService.prototype.addPatient = function (firstName, lastName) {
        return this.http
            .post(this.constant.apiUrl + "/" + this.constant.api.getPatient, {
            firstName: firstName,
            lastName: lastName
        })
            .let(this.patientPipe);
    };
    PatientService.prototype.patientExistsSync = function () {
        // return Boolean(this.constant.temp.currentPatient);
        return Boolean(localStorage.getItem(this.constant.temp.currentPatient));
    };
    PatientService.prototype.patientExists = function () {
        return this._patientExists.asObservable();
    };
    PatientService.prototype.setPatientExists = function (bool) {
        this._patientExists.next(bool);
    };
    PatientService.prototype.getCurrentPatient = function () {
        return JSON.parse(localStorage.getItem(this.constant.temp.currentPatient));
    };
    PatientService.prototype.setPatient = function (patient) {
        localStorage.setItem(this.constant.temp.currentPatient, JSON.stringify(patient));
        if (patient) {
            this.setPatientExists(true);
        }
    };
    PatientService.prototype.handleError = function (err) {
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].of(new Error(Object(__WEBPACK_IMPORTED_MODULE_5__shared_utils__["b" /* getMessageFromBackendError */])(err.error && err.error.meta && err.error.meta.message) + "\n      "));
    };
    PatientService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], PatientService);
    return PatientService;
}());

//# sourceMappingURL=patient.service.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_utils__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__patient_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(constant, http, userService, patientService) {
        this.constant = constant;
        this.http = http;
        this.userService = userService;
        this.patientService = patientService;
        this._isAuthenticated = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["BehaviorSubject"](false);
        this.handleError = this.handleError.bind(this);
    }
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        var url = this.constant.apiUrl + "/" + this.constant.api.getUser + "/" + this.constant.api.getSignIn;
        return this.http.post(url, { email: email, password: password }).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["switchMap"])(function (_a) {
            var _b = _a.response, token = _b.token, patients = _b.patients, id = _b.id;
            _this.setAuthenticationInfoInStorage({
                token: token,
                currentPatient: patients[0],
                userId: id
            });
            _this._isAuthenticated.next(true);
            return _this._isAuthenticated.asObservable();
        }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["switchMap"])(function (isAuthenticated) {
            return _this.userService.getUser().pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["map"])(function (user) {
                localStorage.setItem(_this.constant.temp.currentUser, JSON.stringify(user));
                _this.userService.setRegistered();
            }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["map"])(function () { return isAuthenticated; }));
        }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["catchError"])(this.handleError));
    };
    AuthenticationService.prototype.signUp = function (user) {
        var _this = this;
        return this.http
            .post(this.constant.apiUrl + "/" + this.constant.api.getUser, user)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["switchMap"])(function (res) { return _this.login(user.email, user.password); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["catchError"])(this.handleError));
    };
    AuthenticationService.prototype.resetPassword = function (email) {
        return this.http
            .post(this.constant.apiUrl + "/reset", { email: email })
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["catchError"])(this.handleError));
    };
    AuthenticationService.prototype.setAuthenticationInfoInStorage = function (_a) {
        var token = _a.token, currentPatient = _a.currentPatient, userId = _a.userId;
        localStorage.setItem(this.constant.jwtToken, token);
        localStorage.setItem(this.constant.temp.currentPatient, JSON.stringify(currentPatient || ''));
        if (currentPatient) {
            this.patientService.setPatientExists(true);
        }
        localStorage.setItem(this.constant.temp.currentUser, JSON.stringify({ id: userId }));
    };
    AuthenticationService.prototype.handleError = function (err) {
        this._isAuthenticated.next(false);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].of(new Error(Object(__WEBPACK_IMPORTED_MODULE_5__shared_utils__["b" /* getMessageFromBackendError */])(err.error && err.error.meta && err.error.meta.message) + "\n      "));
    };
    Object.defineProperty(AuthenticationService.prototype, "isAuthenticated", {
        get: function () {
            return this._isAuthenticated.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.autoLoad = function () {
        if (localStorage.getItem(this.constant.jwtToken)) {
            this._isAuthenticated.next(true);
        }
    };
    AuthenticationService.prototype.logout = function () {
        this.clearTokens();
        this._isAuthenticated.next(false);
    };
    AuthenticationService.prototype.clearTokens = function () {
        localStorage.clear();
        this.patientService.setPatientExists(false);
    };
    AuthenticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_6__user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_7__patient_service__["a" /* PatientService */]])
    ], AuthenticationService);
    return AuthenticationService;
}());

//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_utils__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var UserService = /** @class */ (function () {
    function UserService(constant, http) {
        var _this = this;
        this.constant = constant;
        this.http = http;
        this.userPipe = Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["pipe"])(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["catchError"])(this.handleError));
        this._isRegistered = new __WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.handleError = this.handleError.bind(this);
        this._isRegistered.subscribe(function (reg) { return (_this.registered = reg); });
    }
    Object.defineProperty(UserService.prototype, "isRegistered", {
        get: function () {
            return this._isRegistered.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "isRegisteredSync", {
        get: function () {
            return this._isRegistered.getValue();
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.getUser = function () {
        return this.http
            .get(this.constant.apiUrl + "/" + this.constant.api.getUser + "/")
            .let(this.userPipe);
    };
    UserService.prototype.addUser = function (user) {
        var url = this.constant.api.getUser;
        return this.http
            .post(this.constant.apiUrl + "/" + url, user)
            .let(this.userPipe);
    };
    UserService.prototype.inviteUser = function (invitationData) {
        var url = this.constant.api.invite;
        var copyInvitationData = __assign({}, invitationData, { patientId: invitationData.patientId });
        return this.http
            .post(this.constant.apiUrl + "/" + url, copyInvitationData)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["catchError"])(this.handleError));
    };
    UserService.prototype.getCurrentUser = function () {
        return JSON.parse(localStorage.getItem(this.constant.temp.currentUser));
    };
    UserService.prototype.setRegistered = function () {
        var user = this.getCurrentUser();
        if (user) {
            if (user.email === this.constant.defaultUsername) {
                this._isRegistered.next(false);
            }
            else {
                this._isRegistered.next(true);
            }
        }
    };
    UserService.prototype.registrationGuard = function (intendedAction, redirectAction) {
        if (this.isRegisteredSync) {
            intendedAction();
        }
        else {
            redirectAction();
        }
    };
    UserService.prototype.handleError = function (err) {
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].of(new Error(Object(__WEBPACK_IMPORTED_MODULE_5__shared_utils__["b" /* getMessageFromBackendError */])(err.error && err.error.meta && err.error.meta.message) + "\n      "));
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RootComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_mixpanel_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_album_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__albumList_albumList_component__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_network__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth_components_intro_intro_component__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_types__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__core_user_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__core_fullstory_service__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic_angular_navigation_nav_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ionic_angular_navigation_nav_params__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


















var RootComponent = /** @class */ (function () {
    function RootComponent(platform, splashScreen, patientService, userService, authService, albumService, mixpanel, fullstory, network, navCtrl, navParams, constants) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.patientService = patientService;
        this.userService = userService;
        this.authService = authService;
        this.albumService = albumService;
        this.mixpanel = mixpanel;
        this.fullstory = fullstory;
        this.network = network;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.constants = constants;
        this.authObs = this.authService.isAuthenticated;
    }
    RootComponent.prototype.ionViewWillEnter = function () {
        var _this = this;
        // this.navCtrl.setRoot(IntroComponent);
        if (!this.navParams.get('isLogging') && this.userService.isRegisteredSync) {
            this.authService.autoLoad();
        }
        this.authSub = this.authObs.subscribe(function (isAuthenticated) {
            if (_this.network.type !== 'none' &&
                !_this.navParams.get('isLogging') &&
                _this.patientService.patientExistsSync() &&
                _this.patientService._patientExists.getValue()) {
                _this.albumService.getAlbums(_this.patientService.getCurrentPatient().patient_id);
                if (_this.patientService.getCurrentPatient()) {
                    // this.navCtrl.setRoot(AlbumListComponent);
                }
                // : this.navCtrl.setRoot(NewLovedoneComponent); // logged in, but no Loved One yet? then above would fail...
            }
            else if (!_this.navParams.get('isLogging')) {
                // not authenticated, use default account
                var subAuth_1 = _this.authService
                    .login(_this.constants.defaultUsername, _this.constants.defaultPassword)
                    .pipe(Object(__WEBPACK_IMPORTED_MODULE_13_rxjs_operators__["switchMap"])(function (res) {
                    if (res instanceof Error) {
                        _this.mixpanel.track('LoginComponent::Login error', _this.constants.defaultUsername);
                        // this.showError(res.message);
                        return __WEBPACK_IMPORTED_MODULE_12_rxjs_Rx__["Observable"].empty();
                    }
                    return __WEBPACK_IMPORTED_MODULE_12_rxjs_Rx__["Observable"].of(res);
                }), 
                // timeout(10000),
                Object(__WEBPACK_IMPORTED_MODULE_13_rxjs_operators__["tap"])(function () {
                    _this.mixpanel.identify(_this.userService.getCurrentUser());
                    _this.fullstory.identify(_this.userService.getCurrentUser());
                    _this.mixpanel.track('LoginComponent::Login success', _this.userService.getCurrentUser().email);
                    _this.patientService.getCurrentPatient();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__albumList_albumList_component__["a" /* AlbumListComponent */]);
                }))
                    .subscribe(function () {
                    subAuth_1.unsubscribe();
                });
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__auth_components_intro_intro_component__["a" /* IntroComponent */]);
            }
            _this.platform.ready().then(function () {
                _this.splashScreen.hide();
            });
        });
        this.mixpanel.track('AppComponent::Prisma launched');
    };
    RootComponent.prototype.ionViewWillLeave = function () {
        this.authSub.unsubscribe();
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    RootComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-root',
            template: ""
        }),
        __param(11, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_10__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__core_patient_service__["a" /* PatientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_patient_service__["a" /* PatientService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_14__core_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__core_user_service__["a" /* UserService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__core_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_authentication_service__["a" /* AuthenticationService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__core_album_service__["a" /* AlbumService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_album_service__["a" /* AlbumService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__core_mixpanel_service__["a" /* MixpanelService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_mixpanel_service__["a" /* MixpanelService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_15__core_fullstory_service__["a" /* FullstoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__core_fullstory_service__["a" /* FullstoryService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_network__["a" /* Network */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_16_ionic_angular_navigation_nav_controller__["a" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_16_ionic_angular_navigation_nav_controller__["a" /* NavController */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_17_ionic_angular_navigation_nav_params__["a" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_17_ionic_angular_navigation_nav_params__["a" /* NavParams */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_11__shared_types__["Constant"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__shared_types__["Constant"]) === "function" && _m || Object])
    ], RootComponent);
    return RootComponent;
}());

//# sourceMappingURL=root.component.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* unused harmony export UserRegister */
/* unused harmony export Patient */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Story; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Album; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());

var UserRegister = /** @class */ (function (_super) {
    __extends(UserRegister, _super);
    function UserRegister() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserRegister;
}(User));

var Patient = /** @class */ (function () {
    function Patient() {
    }
    return Patient;
}());

var Story = /** @class */ (function () {
    function Story() {
    }
    return Story;
}());

var Album = /** @class */ (function () {
    function Album() {
        this.stories = [];
    }
    return Album;
}());

//# sourceMappingURL=types.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_album_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_storyListOptions_component__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_popover_popover_controller__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toast_toast_controller__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_story_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__component_storyDetail_storyDetail_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__component_topic_popover_topic_popover_component__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_lodash_sortBy__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_lodash_sortBy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_lodash_sortBy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_angular_platform_platform__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__core_topic_service__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__printList_component__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ionic_angular_components_alert_alert_controller__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__root_component__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__core_user_service__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};























var StoryListComponent = /** @class */ (function () {
    function StoryListComponent(constant, navParams, albumService, patientService, authService, topicService, navCtrl, actionsheetCtrl, popoverCtrl, toastCtrl, storyService, plt, alertCtrl, userService) {
        this.constant = constant;
        this.navParams = navParams;
        this.albumService = albumService;
        this.patientService = patientService;
        this.authService = authService;
        this.topicService = topicService;
        this.navCtrl = navCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.popoverCtrl = popoverCtrl;
        this.toastCtrl = toastCtrl;
        this.storyService = storyService;
        this.plt = plt;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Subject"]();
        this.takenUntilPipe = Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["pipe"])(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["takeUntil"])(this.destroy$));
        this.hasTopics = true;
        this.getBackground = this.getBackground.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }
    StoryListComponent.prototype.ngOnInit = function () {
        this.album = this.navParams.get('album');
        this.openActionSheet = this.openActionSheet.bind(this);
        this.hasTopics = this.topicService.hasQuestions(this.album.title);
    };
    StoryListComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    StoryListComponent.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.albumService
            .getAlbum(this.patientService.getCurrentPatient().patient_id, this.album.id)
            .let(this.takenUntilPipe)
            .subscribe(function (album) {
            _this.album = album;
            _this.stories = __WEBPACK_IMPORTED_MODULE_14_lodash_sortBy___default()(_this.album.stories, [
                function (item) { return !item.favorited; },
                function (item) { return -new Date(item.updatedAt.date).getTime(); }
            ]);
        });
        this.content.resize();
    };
    StoryListComponent.prototype.ionViewDidEnter = function () {
        this.content.scrollToTop();
    };
    StoryListComponent.prototype.getBackground = function (story) {
        return this.storyService.getBackground(story);
    };
    StoryListComponent.prototype.showDetails = function (album, story) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__component_storyDetail_storyDetail_component__["a" /* StoryDetailsComponent */], {
            album: album,
            story: story
        });
    };
    StoryListComponent.prototype.showPrint = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_17__printList_component__["a" /* PrintListComponent */], {
            album: this.album
        });
    };
    StoryListComponent.prototype.openTopics = function () {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_13__component_topic_popover_topic_popover_component__["a" /* TopicPopoverComponent */], {
            topicQuery: this.album.title
        });
        popover.present();
    };
    StoryListComponent.prototype.openActionSheet = function () {
        var _this = this;
        var text2 = 'Maak foto';
        var text3 = 'Kies foto van camerarol';
        var text4 = 'Kies video van Youtube';
        var text5 = 'Annuleer';
        var btns = [
            {
                text: text4,
                role: 'destructive',
                icon: 'play',
                handler: function () {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */], {
                        album: _this.album,
                        method: _this.constant.methods.addYoutubeStory
                    });
                }
            },
            {
                text: text5,
                role: 'cancel',
                icon: 'md-arrow-back',
                handler: function () { }
            }
        ];
        // if on mobile, allow taking a picture (cordova) or camera roll
        if (this.plt.is('cordova')) {
            btns = [
                {
                    text: text2,
                    role: 'destructive',
                    icon: 'camera',
                    handler: function () {
                        _this.storyService
                            .takeAPicture()
                            .let(_this.takenUntilPipe)
                            .subscribe(function (dataUrl) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */], {
                                dataUrl: dataUrl,
                                album: _this.album,
                                method: _this.constant.methods.addNewStory
                            });
                        });
                    }
                },
                {
                    text: text3,
                    role: 'destructive',
                    icon: 'image',
                    handler: function () {
                        _this.storyService
                            .chooseAFile()
                            .let(_this.takenUntilPipe)
                            .subscribe(function (dataUrl) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */], {
                                dataUrl: dataUrl,
                                album: _this.album,
                                method: _this.constant.methods.addNewStory
                            });
                        });
                    }
                }
            ].concat(btns);
        }
        else {
            btns = [
                {
                    text: 'Upload een foto',
                    role: 'destructive',
                    icon: 'cloud-upload',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */], {
                            album: _this.album,
                            method: _this.constant.methods.addFileStory
                        });
                    }
                }
            ].concat(btns);
        }
        var actionSheet = this.actionsheetCtrl.create({
            title: 'Voeg verhaal toe',
            cssClass: 'action-sheets-basic-page',
            buttons: btns
        });
        actionSheet.present();
    };
    StoryListComponent.prototype.showMore = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__component_storyListOptions_component__["a" /* StoryListOptionsComponent */], {
            album: this.album,
            actionSheet: this.openActionSheet,
            navCtrl: this.navCtrl
        }, { cssClass: 'storyList-popover' });
        var toast = function (message) {
            return _this.toastCtrl
                .create({
                message: message,
                duration: 3000,
                position: 'bottom'
            })
                .present();
        };
        popover.onDidDismiss(function (dismissData) {
            if (dismissData === 'deleteSuccess') {
                toast('Het album is verwijderd.');
                _this.navCtrl.pop();
            }
            if (dismissData === 'deleteError') {
                toast('Het album kon niet verwijderd worden.');
            }
        });
        popover.present({
            ev: event
        });
    };
    StoryListComponent.prototype.showRegisterPrompt = function (intentionText) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Meld je aan',
            subTitle: "Meld je aan om " + intentionText + ". Zo kan je je bewerkingen bijhouden.",
            buttons: [
                {
                    text: 'Ga terug'
                },
                {
                    text: 'Meld je aan',
                    handler: function () {
                        _this.authService.logout();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_20__root_component__["a" /* RootComponent */], { isLogging: true });
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], StoryListComponent.prototype, "content", void 0);
    StoryListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-story-list',
            template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>{{album.title}}</ion-title>\n        <ion-buttons end>\n          <button ion-button icon-only (click)=\"showPrint()\">\n            <ion-icon name=\"print\"></ion-icon>\n          </button>\n          <button ion-button icon-only (click)=\"showMore($event)\">\n            <ion-icon name=\"more\"></ion-icon>\n          </button>\n        </ion-buttons>\n      </ion-navbar>\n    </ion-header>\n    <ion-content #content no-bounce>\n      <ion-scroll scrollY=\"true\" class=\"full-height\">\n        <ion-grid>\n          <ion-row>\n            <ion-col col-6 col-md-4 col-lg-3 *ngFor=\"let story of stories\">\n              <prisma-album-story\n                [getBackground]=\"getBackground\"\n                [album]=\"album\"\n                [story]=\"story\"\n                [showDetails]=\"showDetails\"\n                [emptyAlbum]=\"constant.emptyAlbum\"\n                [isAlbum]=\"false\">\n              </prisma-album-story>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <div class=\"add-new-container\"\n          (click)=\"this.userService.registrationGuard(this.openActionSheet.bind(this),\n          this.showRegisterPrompt.bind(this, 'een verhaal toe te voegen'))\">\n          <div class=\"add-new\">\n            <ion-icon class=\"add-icon\" name=\"md-add\"></ion-icon>\n            <span>Voeg verhaal toe</span>\n          </div>\n        </div>\n      </ion-scroll>\n      <ion-fab left bottom (click)=\"openTopics()\" *ngIf=\"hasTopics\">\n        <button ion-fab class=\"topic-icon\"><img src=\"assets/icon/icon-bulb.svg\" style=\"width:70%;\"/></button>\n      </ion-fab>\n    </ion-content>\n  "
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__core_album_service__["a" /* AlbumService */],
            __WEBPACK_IMPORTED_MODULE_3__core_patient_service__["a" /* PatientService */],
            __WEBPACK_IMPORTED_MODULE_19__core_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_16__core_topic_service__["a" /* TopicService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_popover_popover_controller__["a" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_10__core_story_service__["a" /* StoryService */],
            __WEBPACK_IMPORTED_MODULE_15_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_18_ionic_angular_components_alert_alert_controller__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_21__core_user_service__["a" /* UserService */]])
    ], StoryListComponent);
    return StoryListComponent;
}());

//# sourceMappingURL=storyList.component.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryOptionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_story_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_user_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_alert_alert_controller__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__root_component__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var StoryOptionsComponent = /** @class */ (function () {
    function StoryOptionsComponent(viewCtrl, storyService, navParams, patientService, authService, userService, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.storyService = storyService;
        this.navParams = navParams;
        this.patientService = patientService;
        this.authService = authService;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
        this.navCtrl = undefined;
        this.navCtrl = this.navParams.get('navCtrl');
    }
    StoryOptionsComponent.prototype.deleteStory = function () {
        var _this = this;
        this.storyService
            .deleteStory(this.patientService.getCurrentPatient().patient_id, this.navParams.data.story.id)
            .subscribe(function () {
            _this.viewCtrl.dismiss('deleteSuccess');
        }, function () {
            _this.viewCtrl.dismiss('deleteError');
        });
    };
    StoryOptionsComponent.prototype.showRegisterPrompt = function (intentionText) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Meld je aan',
            subTitle: "Meld je aan om " + intentionText + ". Zo kan je je bewerkingen bijhouden.",
            buttons: [
                {
                    text: 'Ga terug'
                },
                {
                    text: 'Meld je aan',
                    handler: function () {
                        _this.authService.logout();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__root_component__["a" /* RootComponent */], { isLogging: true });
                    }
                }
            ]
        });
        alert.present();
    };
    StoryOptionsComponent.prototype.confirmDeletion = function () {
        var _this = this;
        this.alertCtrl
            .create({
            title: 'Verhaal verwijderen',
            subTitle: "Ben je zeker dat je dit verhaal wilt verwijderen?",
            buttons: [
                {
                    text: 'Ja',
                    handler: function (data) {
                        _this.deleteStory();
                    }
                },
                'Annuleer'
            ]
        })
            .present();
    };
    StoryOptionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'prisma-story-options',
            template: "\n    <ion-list class=\"list\">\n      <ion-item\n        (click)=\"this.userService.registrationGuard(this.confirmDeletion.bind(this),\n        this.showRegisterPrompt.bind(this, 'een verhaal te verwijderen'))\"\n      >\n        <ion-icon class=\"trash-icon\" name=\"md-trash\"></ion-icon>\n        <p class=\"contenu\">Verwijder dit verhaal</p>\n      </ion-item>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__core_story_service__["a" /* StoryService */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__core_patient_service__["a" /* PatientService */],
            __WEBPACK_IMPORTED_MODULE_6__core_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_4__core_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], StoryOptionsComponent);
    return StoryOptionsComponent;
}());

//# sourceMappingURL=storyOptions.component.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_album_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_storyListOptions_component__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_popover_popover_controller__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toast_toast_controller__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_story_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__component_storyDetail_storyDetail_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__component_topic_popover_topic_popover_component__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_lodash_sortBy__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_lodash_sortBy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_lodash_sortBy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_angular_platform_platform__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__core_topic_service__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


















var PrintListComponent = /** @class */ (function () {
    // @ViewChild(Content) content: Content;
    function PrintListComponent(constant, navParams, albumService, patientService, topicService, navCtrl, actionsheetCtrl, popoverCtrl, toastCtrl, storyService, plt) {
        this.constant = constant;
        this.navParams = navParams;
        this.albumService = albumService;
        this.patientService = patientService;
        this.topicService = topicService;
        this.navCtrl = navCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.popoverCtrl = popoverCtrl;
        this.toastCtrl = toastCtrl;
        this.storyService = storyService;
        this.plt = plt;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Subject"]();
        this.takenUntilPipe = Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["pipe"])(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["takeUntil"])(this.destroy$));
        this.hasTopics = true;
        this.getBackground = this.getBackground.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }
    PrintListComponent_1 = PrintListComponent;
    PrintListComponent.prototype.ngOnInit = function () {
        this.album = this.navParams.get('album');
        this.openActionSheet = this.openActionSheet.bind(this);
        this.hasTopics = this.topicService.hasQuestions(this.album.title);
    };
    PrintListComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    PrintListComponent.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.albumService
            .getAlbum(this.patientService.getCurrentPatient().patient_id, this.album.id)
            .let(this.takenUntilPipe)
            .subscribe(function (album) {
            _this.album = album;
            _this.stories = __WEBPACK_IMPORTED_MODULE_14_lodash_sortBy___default()(_this.album.stories, [
                function (item) { return !item.favorited; },
                function (item) { return -new Date(item.updatedAt.date).getTime(); }
            ]);
        });
        // this.content.resize();
    };
    PrintListComponent.prototype.ionViewDidEnter = function () {
        // this.content.scrollToTop();
    };
    PrintListComponent.prototype.getBackground = function (story) {
        return this.storyService.getBackground(story);
    };
    PrintListComponent.prototype.showDetails = function (album, story) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__component_storyDetail_storyDetail_component__["a" /* StoryDetailsComponent */], {
            album: album,
            story: story
        });
    };
    PrintListComponent.prototype.showPrint = function () {
        this.navCtrl.push(PrintListComponent_1, {
            album: this.album
        });
    };
    PrintListComponent.prototype.openTopics = function () {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_13__component_topic_popover_topic_popover_component__["a" /* TopicPopoverComponent */], {
            topicQuery: this.album.title
        });
        popover.present();
    };
    PrintListComponent.prototype.openActionSheet = function () {
        var _this = this;
        var text2 = 'Maak foto';
        var text3 = 'Kies foto van camerarol';
        var text4 = 'Kies video van Youtube';
        var text5 = 'Annuleer';
        var btns = [
            {
                text: text4,
                role: 'destructive',
                icon: 'play',
                handler: function () {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */], {
                        album: _this.album,
                        method: _this.constant.methods.addYoutubeStory
                    });
                }
            },
            {
                text: text5,
                role: 'cancel',
                icon: 'md-arrow-back',
                handler: function () { }
            }
        ];
        // if on mobile, allow taking a picture (cordova) or camera roll
        if (this.plt.is('cordova')) {
            btns = [
                {
                    text: text2,
                    role: 'destructive',
                    icon: 'camera',
                    handler: function () {
                        _this.storyService
                            .takeAPicture()
                            .let(_this.takenUntilPipe)
                            .subscribe(function (dataUrl) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */], {
                                dataUrl: dataUrl,
                                album: _this.album,
                                method: _this.constant.methods.addNewStory
                            });
                        });
                    }
                },
                {
                    text: text3,
                    role: 'destructive',
                    icon: 'image',
                    handler: function () {
                        _this.storyService
                            .chooseAFile()
                            .let(_this.takenUntilPipe)
                            .subscribe(function (dataUrl) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */], {
                                dataUrl: dataUrl,
                                album: _this.album,
                                method: _this.constant.methods.addNewStory
                            });
                        });
                    }
                }
            ].concat(btns);
        }
        else {
            btns = [
                {
                    text: 'Upload een foto',
                    role: 'destructive',
                    icon: 'cloud-upload',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */], {
                            album: _this.album,
                            method: _this.constant.methods.addFileStory
                        });
                    }
                }
            ].concat(btns);
        }
        var actionSheet = this.actionsheetCtrl.create({
            title: 'Voeg verhaal toe',
            cssClass: 'action-sheets-basic-page',
            buttons: btns
        });
        actionSheet.present();
    };
    PrintListComponent.prototype.showMore = function (event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__component_storyListOptions_component__["a" /* StoryListOptionsComponent */], {
            album: this.album,
            actionSheet: this.openActionSheet,
            navCtrl: this.navCtrl
        }, { cssClass: 'storyList-popover' });
        var toast = function (message) {
            return _this.toastCtrl
                .create({
                message: message,
                duration: 3000,
                position: 'bottom'
            })
                .present();
        };
        popover.onDidDismiss(function (dismissData) {
            if (dismissData === 'deleteSuccess') {
                toast('Het album is verwijderd.');
                _this.navCtrl.pop();
            }
            if (dismissData === 'deleteError') {
                toast('Het album kon niet verwijderd worden.');
            }
        });
        popover.present({
            ev: event
        });
    };
    var PrintListComponent_1;
    PrintListComponent = PrintListComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-print-list',
            template: "\n    <div class=\"print-info\">\n      <h1>Print het album {{album ? album.title : ''}}</h1>\n      <p>Druk op Ctrl+P om het printdialoog te openen.\n    </div>\n    <div class=\"print-tile\" *ngFor=\"let story of stories\">\n        <prisma-album-story\n            [getBackground]=\"getBackground\"\n            [album]=\"album\"\n            [story]=\"story\"\n            [showDetails]=\"showDetails\"\n            [emptyAlbum]=\"constant.emptyAlbum\"\n            [isAlbum]=\"false\">\n        </prisma-album-story>\n        <p class=\"print-description\" *ngIf=\"story.description\"\n          >{{story.description | slice:0:200}}{{story.description.length > 200 ? '...' : ''}}</p>\n    </div>\n    ",
            styles: [
                "\n      prisma-print-list > div:not(.print-info) {\n        float: left;\n        width: 50%;\n        padding: 1em 1em 0 0;\n      }\n\n      .print-info {\n        padding-top: 20%;\n        text-align: center;\n      }\n\n      @media print {\n        .print-info {\n          display: none;\n        }\n        .print-description {\n          padding: 0 1em;\n        }\n      }\n\n      @media screen {\n        .print-tile {\n          display: none;\n         }\n      }\n      "
            ],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewEncapsulation */].None
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__core_album_service__["a" /* AlbumService */],
            __WEBPACK_IMPORTED_MODULE_3__core_patient_service__["a" /* PatientService */],
            __WEBPACK_IMPORTED_MODULE_16__core_topic_service__["a" /* TopicService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_popover_popover_controller__["a" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_10__core_story_service__["a" /* StoryService */],
            __WEBPACK_IMPORTED_MODULE_15_ionic_angular_platform_platform__["a" /* Platform */]])
    ], PrintListComponent);
    return PrintListComponent;
}());

//# sourceMappingURL=printList.component.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__root_component__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UtilService = /** @class */ (function () {
    function UtilService() {
    }
    UtilService.prototype.getRegistrationAlert = function (navCtrl, alertCtrl, authService) {
        var alert = alertCtrl.create({
            title: 'Meld je aan',
            subTitle: 'Meld je aan om deze actie uit te voeren. Zo kunnen we je bewerkingen bijhouden.',
            buttons: [
                {
                    text: 'Ga terug',
                    handler: function () {
                        alert.dismiss();
                    }
                },
                {
                    text: 'Meld je aan',
                    handler: function () {
                        authService.logout();
                        navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__root_component__["a" /* RootComponent */], { isLogging: true });
                    }
                }
            ]
        });
        return alert;
    };
    UtilService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], UtilService);
    return UtilService;
}());

//# sourceMappingURL=util.service.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentication_component__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__root_component__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IntroComponent = /** @class */ (function () {
    function IntroComponent(navCtrl) {
        this.navCtrl = navCtrl;
    }
    IntroComponent.prototype.onRegister = function (value) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__authentication_component__["a" /* AuthenticationComponent */], {
            isLogging: value
        });
    };
    IntroComponent.prototype.toRoot = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__root_component__["a" /* RootComponent */], { isLogging: false });
    };
    IntroComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-intro',
            template: "\n    <ion-content>\n        <img class=\"intro-img\" src=\"assets/img/introPage/intro.jpg\"/>\n        <h1>Kleur jullie herinneringen</h1>\n        <button class=\"intro-btn\" ion-button large (click)=\"onRegister(true)\">Registreer</button>\n        <p class=\"alternate-option\" (click)=\"onRegister(false)\">\n         Al een account?\n        <a color=\"general\">\n          Meld je aan.\n        </a>\n      </p>\n      <p class=\"alternate-option\" (click)=\"toRoot()\">Of <a>ga terug naar de versie zonder aanmelden.</a></p>\n    </ion-content>\n\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_controller__["a" /* NavController */]])
    ], IntroComponent);
    return IntroComponent;
}());

//# sourceMappingURL=intro.component.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewLovedoneComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__albumList_albumList_component__ = __webpack_require__(81);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NewLovedoneComponent = /** @class */ (function () {
    function NewLovedoneComponent(fb, lovedOnes, navCtrl, alertCtrl, patientService) {
        this.fb = fb;
        this.lovedOnes = lovedOnes;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.patientService = patientService;
        this.loading = false;
    }
    NewLovedoneComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            firstName: [null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(2)]],
            lastName: [null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(2)]]
        });
        // Prisma TV: use a default patient
        this.start({ firstName: 'Default', lastName: 'Patient' });
    };
    NewLovedoneComponent.prototype.start = function (_a) {
        var _this = this;
        var firstName = _a.firstName, lastName = _a.lastName;
        this.loading = true;
        this.lovedOnes.addPatient(firstName.trim(), lastName.trim()).subscribe(function (patient) {
            _this.patientService.setPatient(__assign({}, patient, { patient_id: patient.id }));
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__albumList_albumList_component__["a" /* AlbumListComponent */]);
        }, function () {
            _this.loading = false;
            _this.creationError();
        });
    };
    NewLovedoneComponent.prototype.creationError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'Oei!',
            subTitle: errorMessage ||
                'Er was een probleem bij het maken van je geliefde. Probeer het nog eens opnieuw.',
            buttons: ['Ok']
        });
        return alert.present();
    };
    NewLovedoneComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-new-lovedone',
            template: "\n  <ion-header>\n    <ion-navbar>\n      <ion-title>\n        <!-- Kies persoon -->\n        Account wordt aangemaakt...\n      </ion-title>\n    </ion-navbar>\n  </ion-header>\n  <ion-content no-bounce>\n    <form *ngIf=\"false\" [formGroup]=\"form\">\n      <h1 class=\"prisma-title\">Voor welke persoon verzamel<br/> je verhalen?</h1>\n      <ion-list class=\"list\">\n        <ion-item padding>\n          <ion-input\n            type=\"text\"\n            value=\"\"\n            placeholder=\"Voornaam\"\n            formControlName=\"firstName\"\n          >\n          </ion-input>\n        </ion-item>\n        <ion-item padding>\n          <ion-input\n            type=\"text\"\n            value=\"\"\n            placeholder=\"Naam\"\n            formControlName=\"lastName\"\n          >\n          </ion-input>\n        </ion-item>\n      </ion-list>\n      <button ion-button solid block full large color=\"general\" (click)=\"start(form.getRawValue())\" [disabled]=\"form.invalid\">\n        <div *ngIf=\"!loading\">Start</div>\n        <div *ngIf=\"loading\">\n          <ion-spinner item-start name=\"dots\" color=\"white\"></ion-spinner>\n        </div>\n      </button>\n    </form>\n  </ion-content>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__core_patient_service__["a" /* PatientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__core_patient_service__["a" /* PatientService */]])
    ], NewLovedoneComponent);
    return NewLovedoneComponent;
}());

//# sourceMappingURL=new-lovedone.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordResetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_input_input__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PasswordResetComponent = /** @class */ (function () {
    function PasswordResetComponent(fb, toastCtrl, navParams, authService, navCtrl) {
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.loading = false;
    }
    PasswordResetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            email: [
                this.navParams.get('email'),
                [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].email],
                []
            ]
        });
        setTimeout(function () {
            _this.inputEmail.setFocus();
        }, 400);
    };
    PasswordResetComponent.prototype.resetPassword = function (_a) {
        var _this = this;
        var email = _a.email;
        this.loading = true;
        this.authService.resetPassword(email).subscribe(function (data) {
            if (data instanceof Error) {
                _this.showMessage(data.message);
                _this.loading = false;
            }
            else {
                _this.showMessage('Check je email inbox om een nieuw wachtwoord in te stellen.');
                _this.navCtrl.pop();
            }
        });
    };
    PasswordResetComponent.prototype.showMessage = function (message) {
        this.loading = false;
        this.toastCtrl
            .create({
            message: message,
            duration: 5000,
            position: 'bottom'
        })
            .present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('inputEmail'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_input_input__["a" /* TextInput */])
    ], PasswordResetComponent.prototype, "inputEmail", void 0);
    PasswordResetComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-password-reset',
            template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>\n          Nieuw wachtwoord\n        </ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content no-bounce>\n      <p class=\"text-password-reset\">\n        Geef je email adres in, en je ontvangt een link om een nieuw wachtwoord in te stellen.\n      </p>\n      <form [formGroup]=\"form\">\n        <ion-list class=\"list\">\n          <ion-item padding>\n            <ion-input\n              type=\"email\"\n              formControlName=\"email\"\n              placeholder=\"E-mail\"\n              clearOnEdit=\"false\"\n              clearInput\n              #inputEmail>\n            </ion-input>\n          </ion-item>\n        </ion-list>\n        <button ion-button solid block full large color=\"general\"\n                (click)=\"resetPassword(form.getRawValue())\"\n                [disabled]=\"form.invalid || loading\">\n          <div *ngIf=\"!loading\">Verzenden</div>\n          <div *ngIf=\"loading\">\n            <ion-spinner item-start name=\"dots\" color=\"white\"></ion-spinner>\n          </div>\n        </button>\n      </form>\n    </ion-content>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__["a" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__core_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */]])
    ], PasswordResetComponent);
    return PasswordResetComponent;
}());

//# sourceMappingURL=password-reset.component.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InviteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_user_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__albumList_albumList_component__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_mixpanel_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var InviteComponent = /** @class */ (function () {
    function InviteComponent(authService, navCtrl, alertCtrl, userService, navParams, mixpanel, fb) {
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.navParams = navParams;
        this.mixpanel = mixpanel;
        this.fb = fb;
        this.loading = false;
    }
    InviteComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            firstName: [null, [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required], []],
            lastName: [null, [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required], []],
            email: [null, [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].email], []]
        });
    };
    InviteComponent.prototype.ionViewDidLoad = function () {
        this.patientId = this.navParams.get('patientId');
        this.inviterId = this.userService.getCurrentUser().id;
    };
    InviteComponent.prototype.invite = function (_a) {
        var _this = this;
        var firstName = _a.firstName, lastName = _a.lastName, email = _a.email;
        this.loading = true;
        this.mixpanel.track('InviteComponent::invite started');
        var data = {
            inviterId: this.inviterId,
            patientId: this.patientId,
            lastName: lastName,
            firstName: firstName,
            email: email
        };
        this.userService.inviteUser(data).subscribe(function (res) {
            if (res instanceof Error) {
                _this.mixpanel.track('InviteComponent::invite error', data);
                _this.invitePopup(firstName, res.message);
                _this.loading = false;
            }
            else {
                _this.mixpanel.track('InviteComponent::invite success', data);
                _this.invitePopup(firstName);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__albumList_albumList_component__["a" /* AlbumListComponent */]);
            }
        });
    };
    InviteComponent.prototype.invitePopup = function (firstName, message) {
        var messageToSend = message
            ? firstName + " kon niet uitgenodigd worden." + message
            : firstName + " ontvangt een e-mail met je uitnodiging.";
        this.alertCtrl
            .create({
            title: messageToSend,
            buttons: ['Ok']
        })
            .present();
    };
    InviteComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-invite',
            template: "\n    <ion-header>\n    <ion-navbar>\n      <ion-title>Nodig iemand uit</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content padding>\n    <form [formGroup]=\"form\">\n      <ion-list inset>\n        <ion-item>\n          <ion-input\n            type=\"text\"\n            formControlName=\"firstName\"\n            placeholder=\"Voornaam\"\n            clearOnEdit=\"false\"\n            clearInput>\n          </ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-input\n            type=\"text\"\n            formControlName=\"lastName\"\n            placeholder=\"Name\"\n            clearOnEdit=\"false\"\n            clearInput>\n          </ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-input\n            type=\"email\"\n            formControlName=\"email\"\n            placeholder=\"E-mail\"\n            clearOnEdit=\"false\"\n            clearInput>\n          </ion-input>\n        </ion-item>\n      </ion-list>\n      <button ion-button solid block full large color=\"general\"\n              (click)=\"invite(form.getRawValue())\"\n              [disabled]=\"loading || form.invalid\">\n        <div *ngIf=\"!loading\">Uitnodigen</div>\n        <div *ngIf=\"loading\">\n          <ion-spinner item-start name=\"dots\" color=\"white\"></ion-spinner>\n        </div>\n      </button>\n    </form>\n  </ion-content>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__core_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__core_mixpanel_service__["a" /* MixpanelService */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */]])
    ], InviteComponent);
    return InviteComponent;
}());

//# sourceMappingURL=invite.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GiveFeedbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var GiveFeedbackComponent = /** @class */ (function () {
    function GiveFeedbackComponent(constant) {
        this.constant = constant;
    }
    GiveFeedbackComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-give-feedback',
            template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title class=\"detail-title\">\n          Geef feedback\n        </ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content>\n        <div>\n          <p class=\"text-give-feedback\">\n            Een team van vrijwilligers met <br/>\n            een hart voor warme zorg <br/>\n            maakt de Prisma app. <br/>\n          </p>\n          <p class=\"text-give-feedback\">\n            Heb je tips? <br/>\n            Loopt er iets fout? <br/>\n            Of wil je het team helpen? <br/>\n          </p>\n          <p class=\"text-give-feedback\">\n            We horen graag van jou.\n          </p>\n        </div>\n      <hr>\n      <a href=\"mailto:{{constant.supportMailAddress}}?subject=Bericht uit Prisma applicatie\" ion-item no-lines detail-none\n        class=\"send-email\">\n        <ion-icon name=\"mail\" color=\"general\" class=\"send-mail-icon\"></ion-icon>\n        Stuur email\n      </a>\n\n    </ion-content>\n\n  "
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object])
    ], GiveFeedbackComponent);
    return GiveFeedbackComponent;
}());

//# sourceMappingURL=giveFeedback.component.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_module__ = __webpack_require__(427);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].currentEnv === 'production') {
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_youtube_video_player__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_transfer__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_path__ = __webpack_require__(849);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_native_page_transitions__ = __webpack_require__(850);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__core_core_module__ = __webpack_require__(851);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__auth_auth_module__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__albumList_album_module__ = __webpack_require__(867);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__storyList_story_module__ = __webpack_require__(868);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__sidebar_sidebar_module__ = __webpack_require__(870);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__root_component__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_20__root_component__["a" /* RootComponent */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */], { statusbarPadding: false }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_14__core_core_module__["a" /* CoreModule */],
                __WEBPACK_IMPORTED_MODULE_15__auth_auth_module__["a" /* AuthModule */],
                __WEBPACK_IMPORTED_MODULE_19__sidebar_sidebar_module__["a" /* SidebarModule */],
                __WEBPACK_IMPORTED_MODULE_17__albumList_album_module__["a" /* AlbumModule */],
                __WEBPACK_IMPORTED_MODULE_18__storyList_story_module__["a" /* StoryModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_20__root_component__["a" /* RootComponent */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__di__["a" /* ConstantProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_native_page_transitions__["a" /* NativePageTransitions */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__root_component__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.rootParams = { isLogging: false };
        this.rootPage = __WEBPACK_IMPORTED_MODULE_1__root_component__["a" /* RootComponent */];
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/thor/Webdev/mobile-app/src/app/app.html"*/'<prisma-sidebar [nav]="rootNavController" [content]="content">\n</prisma-sidebar>\n<ion-nav id="nav" #content #rootNavController [root]="rootPage" [rootParams]="rootParams" swipeBackEnabled="false">\n</ion-nav>'/*ion-inline-end:"/Users/thor/Webdev/mobile-app/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return constant; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__(131);

var constant = {
    apiUrl: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].apiUrl,
    tracking: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].tracking,
    trackingExcluded: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].trackingExcluded,
    currentEnv: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].currentEnv,
    currentVersion: '0.3.2',
    youtubeApiKey: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].youtubeApiKey,
    jwtToken: 'id_token',
    lastestUsedVersion: 'version',
    defaultUsername: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].defaultUsername,
    defaultPassword: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].defaultPassword,
    localstorage: { LOCALSTORAGE_SELECTEDLANG: 'langs' },
    privateImagesRegex: '/asset/',
    loadingImage: 'assets/img/homePage/loading.png',
    emptyAlbum: 'assets/img/empty-album.png',
    supportMailAddress: 'info@prisma.care',
    api: {
        getSignIn: 'signin',
        getPatient: 'patient',
        getAlbum: 'album',
        getStory: 'story',
        getAsset: 'asset',
        getUser: 'user',
        invite: 'invite'
    },
    temp: {
        albums: 'albums',
        currentUser: 'user',
        currentPatient: 'patient'
    },
    methods: {
        addNewStory: 'addNewStory',
        addYoutubeStory: 'addYoutubeStory',
        replaceDescription: 'replaceDescription',
        replaceImage: 'replaceImage',
        addFileStory: 'addFileStory'
    }
};
//# sourceMappingURL=constant.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MixpanelService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_mixpanel__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__di__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var MixpanelService = /** @class */ (function () {
    function MixpanelService(mixpanel, mixpanelPeople, constant) {
        this.mixpanel = mixpanel;
        this.mixpanelPeople = mixpanelPeople;
        this.constant = constant;
        this.isInit = false;
        this.token = '0c69ebeb92fc86a0b9d813b5fb6215e7';
        this.init();
    }
    MixpanelService.prototype.init = function () {
        var _this = this;
        return this.initMixpanel().then(function (success) {
            _this.isInit = true;
        });
    };
    MixpanelService.prototype.initMixpanel = function () {
        var _this = this;
        return this.mixpanel.init(this.token).catch(function (err) {
            console.error('Error mixpanel.init', err);
            _this.isInit = false;
        });
    };
    MixpanelService.prototype.track = function (eventName, props) {
        var _this = this;
        if (this.constant.tracking) {
            if (this.isInit) {
                this.mixpanel.track(eventName, props);
                return;
            }
            this.init().then(function () {
                _this.mixpanel.track(eventName, props);
            });
        }
        else {
            console.warn('Mixpanel tracking disabled in environment.ts. Use "gulp production" to enable.');
        }
    };
    MixpanelService.prototype.identify = function (user) {
        var _this = this;
        // a function that handles the mixpanel registration
        var mixpanelIdentify = function () {
            if (!_this.constant.trackingExcluded.find(function (excludedMail) { return excludedMail === user.email; })) {
                _this.mixpanel
                    .identify(String(user.id))
                    .then(function () {
                    _this.mixpanelPeople
                        .set({
                        $first_name: user.firstName,
                        $last_name: user.lastName,
                        $created: null,
                        $email: user.email
                    })
                        .catch(function (err) {
                        console.error('Error at binding user info to mixpanel identification.', err);
                    });
                })
                    .catch(function (err) {
                    return console.error('Mixpanel user identification error', err);
                });
            }
            else {
                _this.mixpanel.registerSuperProperties({ $ignore: true });
                console.warn("Mixpanel logging disabled for \"" + user.email + "\" in environment.ts.");
            }
        };
        if (this.isInit) {
            mixpanelIdentify();
        }
        else {
            this.init().then(mixpanelIdentify);
        }
    };
    MixpanelService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_mixpanel__["a" /* Mixpanel */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_mixpanel__["b" /* MixpanelPeople */], Object])
    ], MixpanelService);
    return MixpanelService;
}());

//# sourceMappingURL=mixpanel.service.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_utils__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var AlbumService = /** @class */ (function () {
    function AlbumService(constant, http) {
        var _this = this;
        this.constant = constant;
        this.http = http;
        this.albumPipe = Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["pipe"])(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }), 
        // when a specific album is requested, it's assumed new
        Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["tap"])(function (res) { return _this.removeHasNew(res); }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["catchError"])(this.handleError));
        this.hasNewCache = {};
        this.handleError = this.handleError.bind(this);
    }
    AlbumService.prototype.getAlbums = function (patientId) {
        var _this = this;
        if (localStorage.getItem('hasNewCache')) {
            try {
                this.hasNewCache = JSON.parse(localStorage.getItem('hasNewCache'));
            }
            catch (_a) {
                this.hasNewCache = {};
            }
        }
        return this.http
            .get(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getAlbum)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["map"])(function (_a) {
            var response = _a.response;
            return response.reduce(function (acc, it) { return acc.concat([_this.getOrSetHasNewCache(it)]); }, []);
        }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["tap"])(function () {
            localStorage.setItem('hasNewCache', JSON.stringify(_this.hasNewCache));
        }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["catchError"])(this.handleError));
    };
    AlbumService.prototype.getOrSetHasNewCache = function (album) {
        var expirationMs = 24 * 3600 * 1000;
        if (album.hasNew) {
            this.hasNewCache[album.id] = Date.now();
        }
        else {
            // exists in cache
            if (this.hasNewCache[album.id]) {
                // expired - remove from cache
                if (Date.now() - this.hasNewCache[album.id] > expirationMs) {
                    delete this.hasNewCache[album.id];
                }
                else {
                    album.hasNew = true;
                }
            }
            else {
                // not in cache -> change nothing
            }
        }
        return album;
    };
    AlbumService.prototype.removeHasNew = function (album) {
        delete this.hasNewCache[album.id];
        localStorage.setItem('hasNewCache', JSON.stringify(this.hasNewCache));
    };
    AlbumService.prototype.getAlbum = function (patientId, albumId) {
        return this.http
            .get(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getAlbum + "/" + albumId)
            .let(this.albumPipe);
    };
    AlbumService.prototype.deleteAlbum = function (patientId, albumId) {
        return this.http
            .delete(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getAlbum + "/" + albumId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["catchError"])(this.handleError));
    };
    AlbumService.prototype.addAlbum = function (patientId, title) {
        return this.http
            .post(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getAlbum, { title: title })
            .let(this.albumPipe);
    };
    AlbumService.prototype.getImage = function (filename) {
        return __WEBPACK_IMPORTED_MODULE_3__shared_utils__["c" /* getUrlImage */].call(this, filename);
    };
    AlbumService.prototype.getThumb = function (url) {
        return this.checkYoutubeLink(url).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["map"])(function (res) { return res.thumbnail; }));
    };
    AlbumService.prototype.checkYoutubeLink = function (url) {
        return __WEBPACK_IMPORTED_MODULE_3__shared_utils__["d" /* getYoutubeDescriptionAndThumbnail */].call(this, url);
    };
    AlbumService.prototype.getBackground = function (story) {
        return __WEBPACK_IMPORTED_MODULE_3__shared_utils__["a" /* background */].call(this, story);
    };
    AlbumService.prototype.handleError = function (err) {
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].of(new Error(Object(__WEBPACK_IMPORTED_MODULE_3__shared_utils__["b" /* getMessageFromBackendError */])(err.error && err.error.meta && err.error.meta.message) + "\n      "));
    };
    AlbumService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], AlbumService);
    return AlbumService;
}());

//# sourceMappingURL=album.service.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_utils__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_fromPromise__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_fromPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var StoryService = /** @class */ (function () {
    function StoryService(constant, http, camera) {
        this.constant = constant;
        this.http = http;
        this.camera = camera;
        this.storyPipe = Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["pipe"])(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError));
        this.handleError = this.handleError.bind(this);
    }
    StoryService.prototype.getUserStory = function (patientId, storyId) {
        return this.http
            .get(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getStory + "/" + storyId)
            .let(this.storyPipe);
    };
    StoryService.prototype.getUserStories = function () {
        return this.http
            .get('assets/json/stories.json')
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (_a) {
            var response = _a.response;
            return response.map(function (story) { return story; });
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError));
    };
    StoryService.prototype.addStory = function (patientId, newStory) {
        return this.http
            .post(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getStory, newStory)
            .let(this.storyPipe);
    };
    StoryService.prototype.addFile = function (patientId, storyId, formData) {
        return this.http
            .post(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getStory + "/" + storyId + "/" + this.constant.api.getAsset, formData)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError));
    };
    StoryService.prototype.deleteStory = function (patientId, storyId) {
        return this.http
            .delete(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getStory + "/" + storyId)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError));
    };
    StoryService.prototype.updateStory = function (patientId, newStory) {
        return this.http
            .patch(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patientId + "/" + this.constant.api.getStory + "/" + newStory.id, newStory)
            .let(this.storyPipe);
    };
    StoryService.prototype.getImage = function (filename) {
        return __WEBPACK_IMPORTED_MODULE_3__shared_utils__["c" /* getUrlImage */].call(this, filename);
    };
    StoryService.prototype.getYoutubeId = function (url) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__shared_utils__["e" /* youtubeId */])(url);
    };
    StoryService.prototype.getThumb = function (url) {
        return this.checkYoutubeLink(url).map(function (res) {
            return res.thumbnail;
        });
    };
    StoryService.prototype.getBackground = function (story) {
        return __WEBPACK_IMPORTED_MODULE_3__shared_utils__["a" /* background */].call(this, story);
    };
    StoryService.prototype.addYoutubeLinkAsset = function (patient_id, storyId, asset) {
        return this.http
            .post(this.constant.apiUrl + "/" + this.constant.api.getPatient + "/" + patient_id + "/" + this.constant.api.getStory + "/" + storyId + "/" + this.constant.api.getAsset, {
            asset: asset,
            assetType: 'youtube'
        })
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(this.handleError));
    };
    StoryService.prototype.takeAPicture = function () {
        return this.getPicture(this.camera.PictureSourceType.CAMERA);
    };
    StoryService.prototype.chooseAFile = function () {
        return this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
    };
    StoryService.prototype.getPicture = function (sourceType) {
        var options = {
            quality: 90,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: 1000,
            targetHeight: 1000,
            correctOrientation: true
        };
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].fromPromise(this.camera.getPicture(options));
    };
    StoryService.prototype.checkYoutubeLink = function (url) {
        return __WEBPACK_IMPORTED_MODULE_3__shared_utils__["d" /* getYoutubeDescriptionAndThumbnail */].call(this, url);
    };
    StoryService.prototype.handleError = function (err) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].of(new Error(Object(__WEBPACK_IMPORTED_MODULE_3__shared_utils__["b" /* getMessageFromBackendError */])(err.error && err.error.meta && err.error.meta.message) + "\n      "));
    };
    StoryService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]])
    ], StoryService);
    return StoryService;
}());

//# sourceMappingURL=story.service.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getMessageFromBackendError; });
/* harmony export (immutable) */ __webpack_exports__["c"] = getUrlImage;
/* harmony export (immutable) */ __webpack_exports__["a"] = background;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return youtubeId; });
/* unused harmony export validYoutubeLink */
/* harmony export (immutable) */ __webpack_exports__["d"] = getYoutubeDescriptionAndThumbnail;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var getMessageFromBackendError = function (message) {
    if (message === void 0) { message = ''; }
    if (typeof message === 'string') {
        return message;
    }
    return Object.keys(message).reduce(function (acc, next) {
        return acc + "\n      " + message[next].join('\n') + "\n    ";
    }, '');
};
function getUrlImage(filename) {
    var header = new Headers({ 'Content-Type': 'image/jpg' });
    return this.http
        .get("" + filename, {
        header: header,
        responseType: 'blob'
    })
        .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (blob) { return URL.createObjectURL(blob); }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["catchError"])(this.handleError));
}
function background(story) {
    var _this = this;
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].of(story).pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (item) {
        if (item.type === 'image') {
            return _this.getImage(item.source);
        }
        else if (item.type === 'youtube') {
            return _this.getThumb(item.source);
        }
        else {
            // probably text
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].of(new Error('story type does not have a background image'));
        }
    }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["switchMap"])(function (x) { return x; }));
}
var youtubeId = function (url) {
    var regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|watch\/|v\/)?)([\w\-]+)(\S+)?$/;
    var match = url.match(regExp);
    if (match && match[5].length === 11) {
        return match[5];
    }
    else {
        return '';
    }
};
var validYoutubeLink = function (url) {
    var youtubeLinkRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|watch\/|v\/)?)([\w\-]+)(\S+)?$/;
    return url.toLowerCase().match(youtubeLinkRegex);
};
function getYoutubeDescriptionAndThumbnail(url) {
    if (validYoutubeLink(url)) {
        var urlId = youtubeId(url);
        return this.http
            .get("https://www.googleapis.com/youtube/v3/videos?id=" + urlId + "&key=" + this.constant.youtubeApiKey + "&part=snippet")
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (res) { return ({
            // TODO: YT description not used anymore, but might be useful at some point
            thumbnail: res.pageInfo.totalResults
                ? res.items[0].snippet.thumbnails
                : null,
            description: res.items[0].snippet.description,
            title: res.items[0].snippet.title
        }); }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (res) {
            var last = Object.keys(res.thumbnail)[Object.keys(res.thumbnail).length - 1];
            return __assign({}, res, { thumbnail: res.thumbnail[last].url });
        }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["catchError"])(function () { return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].of(null); }));
    }
    else {
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"].of(null);
    }
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_types__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_album_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_mixpanel_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__storyList_storyList_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_navigation_nav_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash_sortBy__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash_sortBy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash_sortBy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_provider_util_service__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__core_user_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__root_component__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};














var AlbumListComponent = /** @class */ (function () {
    function AlbumListComponent(constant, patientService, authService, menu, albumService, mixpanel, navCtrl, utilService, userService, alertCtrl) {
        this.constant = constant;
        this.patientService = patientService;
        this.authService = authService;
        this.menu = menu;
        this.albumService = albumService;
        this.mixpanel = mixpanel;
        this.navCtrl = navCtrl;
        this.utilService = utilService;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
        this.enteredFirstTime = false;
        this.getBackground = this.getBackground.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }
    AlbumListComponent.prototype.getJsonFromUrl = function (url) {
        if (!url) {
            url = location.search;
        }
        var query = url.substr(1);
        var result = {};
        query.split('&').forEach(function (part) {
            var item = part.split('=');
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    };
    AlbumListComponent.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.menu.enable(true);
        this.patientService.patientExists().subscribe(function (bool) {
            if (bool && _this.patientService.patientExistsSync()) {
                _this.currentPatient = _this.patientService.getCurrentPatient();
                _this.albums = _this.sortAlbumArrayByOwnerAndTitle(_this.albumService.getAlbums(_this.currentPatient.patient_id));
            }
        });
    };
    AlbumListComponent.prototype.ionViewDidEnter = function () {
        var _this = this;
        // hack: redirect to specific album if necessary
        var params = this.getJsonFromUrl(window.location.search);
        if (!!params.album && !this.enteredFirstTime) {
            this.albums.first().subscribe(function (albums) {
                // the compiler is wrong, album id's are numbers. == for compatibility
                var album = albums.find(function (a) { return a.title === params.album; });
                if (album && !_this.enteredFirstTime) {
                    _this.enteredFirstTime = true;
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__storyList_storyList_component__["a" /* StoryListComponent */], { album: album });
                }
            });
        }
    };
    AlbumListComponent.prototype.sortAlbumArrayByOwnerAndTitle = function (albums) {
        return albums.map(function (albumArray) {
            return __WEBPACK_IMPORTED_MODULE_9_lodash_sortBy___default()(albumArray, [
                function (item) { return item.patientId; },
                function (item) { return item.title.toLowerCase(); }
            ]);
        });
    };
    AlbumListComponent.prototype.ionViewWillLeave = function () {
        this.menu.enable(false);
    };
    AlbumListComponent.prototype.showDetails = function (album) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__storyList_storyList_component__["a" /* StoryListComponent */], {
            album: album
        });
    };
    AlbumListComponent.prototype.getBackground = function (story) {
        return this.albumService.getBackground(story);
    };
    AlbumListComponent.prototype.addAlbum = function () {
        var _this = this;
        var albumFailedAlert = this.alertCtrl.create({
            title: 'Fout bij het maken van het album',
            subTitle: 'Onze excuses, het album kon niet aangemaakt worden. Er is iets fout met Prisma.\nProbeer later nog eens opnieuw!',
            buttons: ['Ok']
        });
        var text1 = 'Voeg album toe';
        var text2 = 'Annuleer';
        var text3 = 'Voeg toe';
        this.alertCtrl
            .create({
            title: text1,
            message: 'Hoe wil je het album noemen?',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'bv. Kajakclub'
                }
            ],
            buttons: [
                {
                    text: text2
                },
                {
                    text: text3,
                    handler: function (data) {
                        _this.albumService
                            .addAlbum(_this.currentPatient.patient_id, data.title)
                            .subscribe(function () {
                            _this.mixpanel.track('AlbumsComponent::add album success', {
                                patient_id: _this.currentPatient.patient_id,
                                title: data.title
                            });
                            _this.albums = _this.sortAlbumArrayByOwnerAndTitle(_this.albumService.getAlbums(_this.currentPatient.patient_id));
                        }, function () {
                            _this.mixpanel.track('AlbumsComponent::add album error', {
                                patient_id: _this.currentPatient.patient_id,
                                title: data.title
                            });
                            albumFailedAlert.present();
                        });
                    }
                }
            ]
        })
            .present();
    };
    AlbumListComponent.prototype.showRegisterPrompt = function (intentionText) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Meld je aan',
            subTitle: "Meld je aan om " + intentionText + ". Zo kan je je bewerkingen bijhouden.",
            buttons: [
                {
                    text: 'Ga terug'
                },
                {
                    text: 'Meld je aan',
                    handler: function () {
                        _this.authService.logout();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_13__root_component__["a" /* RootComponent */], { isLogging: true });
                    }
                }
            ]
        });
        alert.present();
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    AlbumListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-album-list',
            template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>Waarover babbelen we?</ion-title>\n        <ion-buttons left>\n          <button ion-button menuToggle class=\"albums-menu\">\n            <ion-icon color=\"black\" name=\"menu\"></ion-icon>\n          </button>\n        </ion-buttons>\n        <ion-buttons right>\n          <prisma-fullscreen-button></prisma-fullscreen-button>\n        </ion-buttons>\n      </ion-navbar>\n    </ion-header>\n    <ion-content>\n      <ion-grid *ngIf=\"albums\">\n        <ion-row>\n          <ion-col\n            col-6\n            col-md-4\n            col-lg-3\n            *ngFor=\"let album of (albums | async)\"\n          >\n            <prisma-album-story\n              [getBackground]=\"getBackground\"\n              [album]=\"album\"\n              [story]=\"album.stories[album.stories.length - 1]\"\n              [showDetails]=\"showDetails\"\n              [emptyAlbum]=\"constant.emptyAlbum\"\n              [isAlbum]=\"true\"\n            >\n            </prisma-album-story>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <div\n        class=\"add-new-container\"\n        (click)=\"this.userService.registrationGuard(this.addAlbum.bind(this),\n          this.showRegisterPrompt.bind(this, 'een album toe te voegen'))\"\n      >\n        <div class=\"add-new\">\n          <ion-icon class=\"add-icon\" name=\"md-add\"></ion-icon>\n          <span>Voeg album toe</span>\n        </div>\n      </div>\n    </ion-content>\n  "
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_8__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_types__["Constant"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_types__["Constant"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__core_patient_service__["a" /* PatientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_patient_service__["a" /* PatientService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_12__core_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__core_authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* MenuController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__core_album_service__["a" /* AlbumService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_album_service__["a" /* AlbumService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__core_mixpanel_service__["a" /* MixpanelService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_mixpanel_service__["a" /* MixpanelService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7_ionic_angular_navigation_nav_controller__["a" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ionic_angular_navigation_nav_controller__["a" /* NavController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_10__shared_provider_util_service__["a" /* UtilService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__shared_provider_util_service__["a" /* UtilService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_11__core_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__core_user_service__["a" /* UserService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]) === "function" && _k || Object])
    ], AlbumListComponent);
    return AlbumListComponent;
}());

//# sourceMappingURL=albumList.component.js.map

/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QUESTIONS; });
var QUESTIONS = [
    // PERSONAL
    {
        questions: ['Oude familieleden', 'Land van herkomst', 'Overgrootouders'],
        keywords: ['grootouders']
    },
    {
        questions: [
            'Huis',
            'Huisdieren',
            'Gewoontes of tradities',
            'Favoriet eten als kind',
            'Kinderkleding',
            'Opvoeding',
            'Broers en zussen',
            'Slaaprituelen',
            'Communiefeest',
            'Braaf of rebels',
            'Vrienden aan huis',
            'Grootouders',
            'Verhuizen'
        ],
        keywords: ['kindertijd', 'kind', 'jeugd', 'gezin']
    },
    {
        questions: [
            'Beroep',
            'Eerste werk',
            'Vakantiejobs',
            "Leuke collega's",
            'Bazen'
        ],
        keywords: ['werk', 'bureau']
    },
    {
        questions: [
            'Basisschool',
            'Leerkrachten',
            'Favoriete schoolvak',
            'Op straf',
            'Reglementen'
        ],
        keywords: ['school', 'leerkracht', 'klas', 'kindertijd']
    },
    {
        questions: [
            'Eerste verliefdheid',
            'Afspraakjes',
            'Voorstellen aan familie',
            'Trouwdag',
            'Chaperone',
            'Liefdesbrieven',
            'Geschenkjes'
        ],
        keywords: ['trouw', 'liefde']
    },
    {
        questions: [
            'Eerste kind',
            'Namen van kinderen',
            'Trouwfeesten',
            'Geboortes',
            'Familiefeesten',
            'Broers en zussen',
            'Familie in het buitenland'
        ],
        keywords: ['familie', 'gezin']
    },
    {
        questions: [
            'Vrijdetijdsbezigheden',
            'Uitgaan',
            "Lievelingsprogramma's",
            'Concerten',
            'Zelf een instrument bespelen'
        ],
        keywords: ['vrije tijd', 'hobby', 'hobbies']
    },
    {
        questions: [
            'Beste vriend(in)',
            'Activiteiten samen',
            'Nieuwe vrienden leren kennen',
            'Vrienden in kindertijd'
        ],
        keywords: ['vrienden', 'vriendschap', 'vriend', 'kennis', 'kennissen']
    },
    {
        questions: [
            'Eerste vakantie',
            'Verre landen',
            'Alleen op vakantie',
            'Vervoersmiddelen',
            'Mooie steden',
            'De zee',
            'Vakantiekolonies',
            'Buitenlands eten'
        ],
        keywords: ['vakantie', 'reizen', 'reis', 'avontuur']
    },
    // MORE GENERAL
    {
        questions: [
            'Favoriete voetballer',
            'Zelf sporten',
            'Favoriete sport',
            'Wedstrijd gewonnen'
        ],
        keywords: ['sport']
    },
    {
        questions: [
            'Lievelingsgerecht',
            'Exotisch eten',
            'Italiaanse gerechten',
            'Vlaamse kost',
            'Favoriet snoepgoed'
        ],
        keywords: ['voeding', 'eten']
    },
    {
        questions: [
            'Buurtcafés',
            'Buurtfeesten',
            'Feesten in gemeente',
            'Evenementen in de gemeente'
        ],
        keywords: ['gemeente']
    },
    {
        questions: [
            'Boodschappen doen',
            'Verwarming',
            'Wassen',
            'Vervoer',
            'Koken'
        ],
        keywords: ['dagelijks leven']
    },
    {
        questions: [
            "Spelprogramma's",
            'Luisterspelen',
            'Journaal',
            "Kinderprogramma's"
        ],
        keywords: ['vermaak']
    },
    {
        questions: [
            'Familiefeesten',
            'Communiefeest',
            'Kerstcadeaus',
            'Verjaardagstaart',
            'Naar de misdienst'
        ],
        keywords: ['feesten', 'tradities']
    }
];
//# sourceMappingURL=question.js.map

/***/ }),

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(852);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interceptors_authentication_interceptor__ = __webpack_require__(853);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interceptors_common_headers_interceptor__ = __webpack_require__(854);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__interceptors_unauthorized_error_interceptor__ = __webpack_require__(855);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__album_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__story_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__topic_service__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__interceptors_invalid_token_interceptor__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__interceptors_network_interceptor__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__mixpanel_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__fullstory_service__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_mixpanel__ = __webpack_require__(299);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var imports = [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["g" /* IonicModule */]];
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [],
            imports: imports,
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_4__interceptors_common_headers_interceptor__["a" /* CommonHeadersInterceptor */],
                    multi: true
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_3__interceptors_authentication_interceptor__["a" /* AuthenticationInterceptor */],
                    multi: true
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_13__interceptors_invalid_token_interceptor__["a" /* InvalidTokenInterceptor */],
                    multi: true
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_5__interceptors_unauthorized_error_interceptor__["a" /* UnauthorizedErrorInterceptor */],
                    multi: true
                },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_14__interceptors_network_interceptor__["a" /* NetworkInterceptor */],
                    multi: true
                },
                __WEBPACK_IMPORTED_MODULE_6__authentication_service__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_8__patient_service__["a" /* PatientService */],
                __WEBPACK_IMPORTED_MODULE_9__user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_10__album_service__["a" /* AlbumService */],
                __WEBPACK_IMPORTED_MODULE_11__story_service__["a" /* StoryService */],
                __WEBPACK_IMPORTED_MODULE_12__topic_service__["a" /* TopicService */],
                __WEBPACK_IMPORTED_MODULE_15__mixpanel_service__["a" /* MixpanelService */],
                __WEBPACK_IMPORTED_MODULE_16__fullstory_service__["a" /* FullstoryService */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_mixpanel__["a" /* Mixpanel */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_mixpanel__["b" /* MixpanelPeople */]
            ],
            exports: imports.slice()
        })
    ], CoreModule);
    return CoreModule;
}());

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var AuthenticationInterceptor = /** @class */ (function () {
    function AuthenticationInterceptor(constant) {
        this.constant = constant;
    }
    AuthenticationInterceptor.prototype.intercept = function (req, next) {
        if (req.url.includes(this.constant.apiUrl)) {
            return next.handle(this.setAuthorizationHeader(req));
        }
        return next.handle(req);
    };
    AuthenticationInterceptor.prototype.setAuthorizationHeader = function (req) {
        return req.clone({
            setHeaders: {
                Authorization: "Bearer " + localStorage.getItem(this.constant.jwtToken)
            }
        });
    };
    AuthenticationInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object])
    ], AuthenticationInterceptor);
    return AuthenticationInterceptor;
}());

//# sourceMappingURL=authentication.interceptor.js.map

/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonHeadersInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__di__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var CommonHeadersInterceptor = /** @class */ (function () {
    function CommonHeadersInterceptor(constant) {
        this.constant = constant;
    }
    CommonHeadersInterceptor.prototype.intercept = function (req, next) {
        if (req.url.includes(this.constant.apiUrl)) {
            return next.handle(this.setHeaders(req));
        }
        return next.handle(req);
    };
    CommonHeadersInterceptor.prototype.setHeaders = function (req) {
        return req.clone({
            setHeaders: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin': this.constant.apiUrl,
                // Request methods you wish to allow
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
                // Set to true if you need the website to include cookies in  requests
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
            }
        });
    };
    CommonHeadersInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [Object])
    ], CommonHeadersInterceptor);
    return CommonHeadersInterceptor;
}());

//# sourceMappingURL=common-headers.interceptor.js.map

/***/ }),

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnauthorizedErrorInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_authentication_component__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__di__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_catchError__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_catchError___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_catchError__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var UnauthorizedErrorInterceptor = /** @class */ (function () {
    function UnauthorizedErrorInterceptor(app, constant) {
        this.app = app;
        this.constant = constant;
        this.AUTHENTICATION_PAGE_NAME = 'AuthenticationComponent';
    }
    UnauthorizedErrorInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_catchError__["catchError"])(function (httpError) {
            // Check if we had 401 response
            if (httpError.status === 401 &&
                req.url.includes(_this.constant.apiUrl)) {
                _this.clearTokens();
                var nav = _this.app.getActiveNav();
                var activeNavName = nav.getActive().name;
                return activeNavName === _this.AUTHENTICATION_PAGE_NAME
                    ? __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(httpError)
                    : __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].from(nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__auth_authentication_component__["a" /* AuthenticationComponent */])).switchMapTo(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].empty());
            }
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(httpError);
        }));
    };
    UnauthorizedErrorInterceptor.prototype.clearTokens = function () {
        localStorage.clear();
    };
    UnauthorizedErrorInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__di__["b" /* ConstantToken */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */], Object])
    ], UnauthorizedErrorInterceptor);
    return UnauthorizedErrorInterceptor;
}());

//# sourceMappingURL=unauthorized-error.interceptor.js.map

/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvalidTokenInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_authentication_component__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_catchError__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_catchError___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_catchError__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InvalidTokenInterceptor = /** @class */ (function () {
    function InvalidTokenInterceptor(app) {
        this.app = app;
    }
    InvalidTokenInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_catchError__["catchError"])(function (httpError) {
            // Check if we had 400 response and if the error is about the token
            if (httpError.status === 400 &&
                typeof httpError.error.meta.message === 'string' &&
                httpError.error.meta.message.includes('token is invalid')) {
                _this.clearTokens();
                var nav = _this.app.getActiveNav();
                return nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__auth_authentication_component__["a" /* AuthenticationComponent */], {
                    error: httpError.error.meta.message
                });
            }
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(httpError);
        }));
    };
    InvalidTokenInterceptor.prototype.clearTokens = function () {
        localStorage.clear();
    };
    InvalidTokenInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */]])
    ], InvalidTokenInterceptor);
    return InvalidTokenInterceptor;
}());

//# sourceMappingURL=invalid-token.interceptor.js.map

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NetworkInterceptor = /** @class */ (function () {
    function NetworkInterceptor(network) {
        this.network = network;
    }
    NetworkInterceptor.prototype.intercept = function (req, next) {
        if (this.network.type === 'none') {
            return next
                .handle(req)
                .retryWhen(function (error) { return error.switchMap(function () { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].timer(1000); }); });
        }
        return next.handle(req);
    };
    NetworkInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */]])
    ], NetworkInterceptor);
    return NetworkInterceptor;
}());

//# sourceMappingURL=network.interceptor.js.map

/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_authentication_header_component__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_authentication_register_component__ = __webpack_require__(860);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_authentication_login_component__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__authentication_component__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_new_lovedone_new_lovedone__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_password_reset_password_reset_component__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_intro_intro_component__ = __webpack_require__(417);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var imports = [__WEBPACK_IMPORTED_MODULE_4__shared_shared_module__["a" /* SharedModule */]];
var declarations = [
    __WEBPACK_IMPORTED_MODULE_1__components_authentication_header_component__["a" /* AuthenticationHeaderComponent */],
    __WEBPACK_IMPORTED_MODULE_2__components_authentication_register_component__["a" /* AuthenticationRegisterComponent */],
    __WEBPACK_IMPORTED_MODULE_3__components_authentication_login_component__["a" /* AuthenticationLoginComponent */],
    __WEBPACK_IMPORTED_MODULE_5__authentication_component__["a" /* AuthenticationComponent */],
    __WEBPACK_IMPORTED_MODULE_6__components_new_lovedone_new_lovedone__["a" /* NewLovedoneComponent */],
    __WEBPACK_IMPORTED_MODULE_7__components_password_reset_password_reset_component__["a" /* PasswordResetComponent */],
    __WEBPACK_IMPORTED_MODULE_8__components_intro_intro_component__["a" /* IntroComponent */]
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: declarations,
            imports: imports,
            providers: [],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__components_intro_intro_component__["a" /* IntroComponent */],
                __WEBPACK_IMPORTED_MODULE_5__authentication_component__["a" /* AuthenticationComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_new_lovedone_new_lovedone__["a" /* NewLovedoneComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_password_reset_password_reset_component__["a" /* PasswordResetComponent */]
            ],
            exports: imports.concat(declarations)
        })
    ], AuthModule);
    return AuthModule;
}());

//# sourceMappingURL=auth.module.js.map

/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuthenticationHeaderComponent = /** @class */ (function () {
    function AuthenticationHeaderComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], AuthenticationHeaderComponent.prototype, "title", void 0);
    AuthenticationHeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-authentication-header',
            template: "\n  <ion-navbar>\n    <ion-title>\n      {{title}}\n    </ion-title>\n  </ion-navbar>\n  "
        })
    ], AuthenticationHeaderComponent);
    return AuthenticationHeaderComponent;
}());

//# sourceMappingURL=authentication-header.component.js.map

/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationRegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_mixpanel_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthenticationRegisterComponent = /** @class */ (function () {
    function AuthenticationRegisterComponent(fb, auth, alertCtrl, mixpanel) {
        this.fb = fb;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.mixpanel = mixpanel;
        this.type = 'password';
        this.show = false;
        this.loading = false;
    }
    // TODO: display error message
    AuthenticationRegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            email: [null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].email], []],
            password: [
                null,
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(40)
                ],
                []
            ],
            firstName: [null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required], []],
            lastName: [null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required], []]
        });
        setTimeout(function () {
            _this.inputFirstname.setFocus();
        }, 400);
    };
    AuthenticationRegisterComponent.prototype.toggleShow = function () {
        this.show = !this.show;
        this.type = this.show ? 'text' : 'password';
    };
    AuthenticationRegisterComponent.prototype.register = function (user) {
        var _this = this;
        this.loading = true;
        this.auth
            .signUp(user)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__["switchMap"])(function (res) {
            if (res instanceof Error) {
                _this.mixpanel.track('LoginComponent::Register error', {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
                _this.showError(res.message);
                return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].empty();
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].of(res);
        }), Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators__["tap"])(function () {
            _this.mixpanel.track('LoginComponent::Register success', {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            });
            _this.loading = false;
            _this.onComplete();
        }))
            .subscribe(undefined, function (err) {
            _this.mixpanel.track('LoginComponent::Register error', {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            });
            _this.showError(err.message);
        });
    };
    AuthenticationRegisterComponent.prototype.showError = function (errorMessage) {
        if (errorMessage === void 0) { errorMessage = 'Onmogelijk om u te registreren, neem dan contact op met de beheerder'; }
        this.loading = false;
        var alert = this.alertCtrl.create({
            title: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
        this.auth.logout();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('inputFirstname'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* TextInput */])
    ], AuthenticationRegisterComponent.prototype, "inputFirstname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Function)
    ], AuthenticationRegisterComponent.prototype, "onLoginClick", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Function)
    ], AuthenticationRegisterComponent.prototype, "onComplete", void 0);
    AuthenticationRegisterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-authentication-register',
            template: "\n    <form [formGroup]=\"form\" (ngSubmit)=\"register(form.getRawValue())\">\n      <ion-list class=\"list\">\n        <ion-item padding>\n          <ion-input #inputFirstname type=\"text\" value=\"\" formControlName=\"firstName\" placeholder=\"Voornaam\"\n          ></ion-input>\n        </ion-item>\n        <ion-item padding>\n          <ion-input type=\"text\" value=\"\" formControlName=\"lastName\" placeholder=\"Naam\"\n          ></ion-input>\n        </ion-item>\n        <ion-item padding>\n          <ion-input type=\"email\" value=\"\" formControlName=\"email\" placeholder=\"E-mail\"\n          ></ion-input>\n        </ion-item>\n        <ion-item padding>\n          <ion-input\n            [type]=\"type\" #input\n            formControlName=\"password\"\n            placeholder=\"Wachtwoord\"\n            clearOnEdit=\"false\" clearInput></ion-input>\n          <button ion-button icon-only (click)=\"toggleShow()\" type=\"button\" clear item-right>\n            <ion-icon *ngIf=\"!show\" name=\"eye\" color=\"medium-gray\"></ion-icon>\n            <ion-icon *ngIf=\"show\" name=\"eye-off\" color=\"medium-gray\"></ion-icon>\n          </button>\n        </ion-item>\n      </ion-list>\n\n      <button type=\"submit\" ion-button solid block full large color=\"primary\"\n              [disabled]=\"form.invalid\">\n        <div *ngIf=\"!loading\">Maak account</div>\n        <div *ngIf=\"loading\">\n          <ion-spinner item-start name=\"dots\" color=\"white\"></ion-spinner>\n        </div>\n      </button>\n\n      <div class=\"signup-suggestion\">\n        <p class=\"alternate-option\">Al een account? <a color=\"general\" (click)=\"onLoginClick()\">Aanmelden.</a></p>\n      </div>\n    </form>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__core_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__core_mixpanel_service__["a" /* MixpanelService */]])
    ], AuthenticationRegisterComponent);
    return AuthenticationRegisterComponent;
}());

//# sourceMappingURL=authentication-register.component.js.map

/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationLoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_mixpanel_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_fullstory_service__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_user_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__password_reset_password_reset_component__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_input_input__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__root_component__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var AuthenticationLoginComponent = /** @class */ (function () {
    function AuthenticationLoginComponent(fb, auth, alertCtrl, network, mixpanel, fullstory, userService, navCtrl) {
        this.fb = fb;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.mixpanel = mixpanel;
        this.fullstory = fullstory;
        this.userService = userService;
        this.navCtrl = navCtrl;
        this.type = 'password';
        this.show = false;
        this.loading = false;
        this.data = { email: '' };
    }
    // TODO: display error message
    AuthenticationLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            email: [this.data.email, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].email], []],
            password: [
                null,
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(40)
                ],
                []
            ]
        });
        setTimeout(function () {
            _this.inputEmail.setFocus();
        }, 400);
    };
    AuthenticationLoginComponent.prototype.toggleShow = function () {
        this.show = !this.show;
        this.type = this.show ? 'text' : 'password';
    };
    AuthenticationLoginComponent.prototype.login = function (_a) {
        var _this = this;
        var email = _a.email, password = _a.password;
        if (this.network.type === 'none') {
            return this.showError('Je bent niet verbonden met het internet.');
        }
        this.loading = true;
        var obs = this.auth.login(email, password).pipe(Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators__["switchMap"])(function (res) {
            if (res instanceof Error) {
                _this.mixpanel.track('LoginComponent::Login error', email);
                _this.showError(res.message);
                return __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__["Observable"].empty();
            }
            return __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__["Observable"].of(res);
        }), 
        /* timeout(10000),
          TODO this gave problems in re-login.
          Login succeeds, but the timeout still happens. This triggers showError, which does a logout...
          maybe the switchmap must complete ?
  
          */
        Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators__["tap"])(function () {
            _this.loading = false;
            _this.mixpanel.identify(_this.userService.getCurrentUser());
            _this.fullstory.identify(_this.userService.getCurrentUser());
            _this.mixpanel.track('LoginComponent::Login success', _this.userService.getCurrentUser().email);
            _this.onComplete();
        }));
        obs.subscribe(undefined, function (err) {
            _this.mixpanel.track('LoginComponent::Login error', email);
            _this.showError(err.message);
        });
    };
    AuthenticationLoginComponent.prototype.goToPasswordResetPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__password_reset_password_reset_component__["a" /* PasswordResetComponent */], {
            email: this.form.getRawValue().email
        });
    };
    AuthenticationLoginComponent.prototype.showError = function (errorMessage) {
        if (errorMessage === void 0) { errorMessage = 'Je gebruikersnaam of wachtwoord klopt niet.'; }
        this.loading = false;
        var alert = this.alertCtrl.create({
            title: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
        this.auth.logout();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_12__root_component__["a" /* RootComponent */], { isLogging: true });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('inputEmail'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_input_input__["a" /* TextInput */])
    ], AuthenticationLoginComponent.prototype, "inputEmail", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], AuthenticationLoginComponent.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Function)
    ], AuthenticationLoginComponent.prototype, "onRegisterClick", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Function)
    ], AuthenticationLoginComponent.prototype, "onComplete", void 0);
    AuthenticationLoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-authentication-login',
            template: "\n    <form [formGroup]=\"form\" (ngSubmit)=\"login(form.getRawValue())\">\n      <ion-list class=\"list\">\n        <ion-item padding>\n          <ion-input\n            type=\"email\"\n            formControlName=\"email\"\n            placeholder=\"E-mail\"\n            clearOnEdit=\"false\"\n            clearInput\n            #inputEmail>\n          </ion-input>\n        </ion-item>\n\n        <ion-item padding>\n          <ion-input\n            [type]=\"type\"\n            #input\n            formControlName=\"password\"\n            placeholder=\"Wachtwoord\"\n            clearOnEdit=\"false\"\n            clearInput>\n          </ion-input>\n\n          <button\n            ion-button icon-only clear item-right\n            (click)=\"toggleShow()\" type=\"button\">\n            <ion-icon *ngIf=\"!show\" name=\"eye\" color=\"medium-gray\"></ion-icon>\n            <ion-icon *ngIf=\"show\" name=\"eye-off\" color=\"medium-gray\"></ion-icon>\n          </button>\n        </ion-item>\n      </ion-list>\n\n      <button type=\"submit\" ion-button solid block full large color=\"general\"\n              [disabled]=\"form.invalid\">\n        <div *ngIf=\"!loading\">Aanmelden</div>\n        <div *ngIf=\"loading\">\n          <ion-spinner item-start name=\"dots\" color=\"white\"></ion-spinner>\n        </div>\n      </button>\n\n      <div class=\"signup-suggestion\">\n        <p class=\"alternate-option\" (click)=\"onRegisterClick()\">\n          Nog geen account?\n          <a color=\"general\">\n            Maak account.\n          </a>\n        </p>\n        <p class=\"alternate-option\" (click)=\"goToPasswordResetPage()\">\n          <a color=\"general\">\n            Wachtwoord vergeten?\n          </a>\n        </p>\n      </div>\n    </form>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__core_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_5__core_mixpanel_service__["a" /* MixpanelService */],
            __WEBPACK_IMPORTED_MODULE_6__core_fullstory_service__["a" /* FullstoryService */],
            __WEBPACK_IMPORTED_MODULE_9__core_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */]])
    ], AuthenticationLoginComponent);
    return AuthenticationLoginComponent;
}());

//# sourceMappingURL=authentication-login.component.js.map

/***/ }),

/***/ 862:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumOrStoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_types__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__(131);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AlbumOrStoryComponent = /** @class */ (function () {
    function AlbumOrStoryComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Subject"]();
        this.imageLoaded = false;
    }
    AlbumOrStoryComponent.prototype.ngOnInit = function () {
        this.setBackgroundImage(this.story);
    };
    AlbumOrStoryComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    AlbumOrStoryComponent.prototype.setBackgroundImage = function (story) {
        var _this = this;
        if (__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].currentEnv === 'test') {
            this.backgroundImage = '/assets/img/laadtijd.jpg';
            this.imageLoaded = true;
            return;
        }
        if (story) {
            this.getBackground(story)
                .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["takeUntil"])(this.destroy$))
                .subscribe(function (imageUrl) {
                _this.story = __assign({}, _this.story, { backgroundImage: imageUrl });
                _this.backgroundImage = _this.sanitizer.bypassSecurityTrustUrl(imageUrl);
                _this.imageLoaded = true;
            });
        }
        else {
            this.backgroundImage = this.emptyAlbum;
            this.imageLoaded = true;
        }
    };
    AlbumOrStoryComponent.prototype.typeYoutube = function (story) {
        return story.type === 'youtube';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__shared_types__["a" /* Album */])
    ], AlbumOrStoryComponent.prototype, "album", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__shared_types__["c" /* Story */])
    ], AlbumOrStoryComponent.prototype, "story", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Function)
    ], AlbumOrStoryComponent.prototype, "getBackground", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Function)
    ], AlbumOrStoryComponent.prototype, "showDetails", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], AlbumOrStoryComponent.prototype, "emptyAlbum", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], AlbumOrStoryComponent.prototype, "isAlbum", void 0);
    AlbumOrStoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-album-story',
            template: "\n    <div *ngIf=\"imageLoaded\"\n      class=\"album-thumb test\"\n      (click)=\"showDetails(album, story)\">\n      <img class=\"album-img\" [src]=\"backgroundImage\">\n      <div *ngIf=\"isAlbum\">\n          <div class=\"tile-overlay-gradient\"></div>\n          <div *ngIf=\"album.hasNew\" class=\"has-new-item\">NIEUW</div>\n          <h3 class=\"hist-title\">{{album.title || '?'}}</h3>\n      </div>\n      <div *ngIf=\"!isAlbum && story.source\">\n          <div class=\"boxPlay\">\n            <div *ngIf=\"typeYoutube(story)\" class=\"youtube-icon circle-icon movie-indicator\"></div>\n          </div>\n          <ion-icon *ngIf=\"story.favorited\" class=\"star tile-star\" name=\"star\"\n            [class.favorited]=\"isFavorited\"></ion-icon>\n          <h3 *ngIf=\"typeYoutube(story)\">{{story.description}}</h3>\n      </div>\n      <!-- If no story source -->\n      <div *ngIf=\"!isAlbum && !story.source\">\n          <div class=\"tile-overlay-gradient\"></div>\n          <div *ngIf=\"album.hasNew\" class=\"has-new-item\">NIEUW</div>\n          <div class=\"text-story-container\">\n            <span class=\"text-story\">{{story.description || ''}}</span>\n          </div>\n      </div>\n    </div>\n    <div *ngIf=\"!imageLoaded\" class=\"album-thumb\">\n      <ion-spinner item-start name=\"dots\" color=\"white\"></ion-spinner>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], AlbumOrStoryComponent);
    return AlbumOrStoryComponent;
}());

//# sourceMappingURL=albumOrStory.component.js.map

/***/ }),

/***/ 863:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleFullscreenDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_screenfull__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_screenfull___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_screenfull__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToggleFullscreenDirective = /** @class */ (function () {
    function ToggleFullscreenDirective() {
    }
    ToggleFullscreenDirective.prototype.onClick = function () {
        if (__WEBPACK_IMPORTED_MODULE_1_screenfull__["enabled"]) {
            __WEBPACK_IMPORTED_MODULE_1_screenfull__["toggle"]();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ToggleFullscreenDirective.prototype, "onClick", null);
    ToggleFullscreenDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
            selector: '[prismaToggleFullscreen]'
        })
    ], ToggleFullscreenDirective);
    return ToggleFullscreenDirective;
}());

//# sourceMappingURL=toggleFullscreen.directive.js.map

/***/ }),

/***/ 864:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IfFullscreenDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_screenfull__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_screenfull___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_screenfull__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var IfFullscreenDirective = /** @class */ (function () {
    function IfFullscreenDirective(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.hasView = false;
    }
    Object.defineProperty(IfFullscreenDirective.prototype, "prismaIfFullscreen", {
        set: function (condition) {
            if (this.fullscreenIs(condition) && !this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            }
            else if (!this.fullscreenIs(condition) && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    IfFullscreenDirective.prototype.fullscreenIs = function (condition) {
        return __WEBPACK_IMPORTED_MODULE_1_screenfull__["enabled"] ? __WEBPACK_IMPORTED_MODULE_1_screenfull__["isFullscreen"] === condition : false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], IfFullscreenDirective.prototype, "prismaIfFullscreen", null);
    IfFullscreenDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({ selector: '[prismaIfFullscreen]' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* TemplateRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewContainerRef */]])
    ], IfFullscreenDirective);
    return IfFullscreenDirective;
}());

//# sourceMappingURL=ifFullscreen.directive.js.map

/***/ }),

/***/ 865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IfPlatformDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_platform_platform__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var IfPlatformDirective = /** @class */ (function () {
    function IfPlatformDirective(templateRef, viewContainer, platform) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.platform = platform;
        this.hasView = false;
    }
    Object.defineProperty(IfPlatformDirective.prototype, "prismaIfPlatform", {
        set: function (id) {
            if (id) {
                if (this.platformIs(id) && !this.hasView) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                    this.hasView = true;
                }
                else if (!this.platformIs(id) && this.hasView) {
                    this.viewContainer.clear();
                    this.hasView = false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    IfPlatformDirective.prototype.platformIs = function (id) {
        /* Legal id's:
          cordova
          notCordova
        */
        switch (id.trim()) {
            case 'cordova': {
                return this.platform.is('cordova');
            }
            case 'notCordova': {
                return !this.platform.is('cordova');
            }
            default: {
                return this.platform.is(id);
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IfPlatformDirective.prototype, "prismaIfPlatform", null);
    IfPlatformDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({ selector: '[prismaIfPlatform]' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* TemplateRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewContainerRef */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular_platform_platform__["a" /* Platform */]])
    ], IfPlatformDirective);
    return IfPlatformDirective;
}());

//# sourceMappingURL=ifPlatform.directive.js.map

/***/ }),

/***/ 866:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullscreenButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_screenfull__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_screenfull___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_screenfull__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FullscreenButtonComponent = /** @class */ (function () {
    function FullscreenButtonComponent() {
    }
    FullscreenButtonComponent.prototype.isFullscreen = function () {
        return __WEBPACK_IMPORTED_MODULE_1_screenfull__["isFullscreen"];
    };
    FullscreenButtonComponent.prototype.toggleFullscreen = function () {
        __WEBPACK_IMPORTED_MODULE_1_screenfull__["toggle"]();
    };
    FullscreenButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            template: "\n        <button *prismaIfPlatform='\"notCordova\"' class=\"prisma-fs-button\" (click)=\"toggleFullscreen()\">\n            <img *ngIf=\"!isFullscreen()\" src=\"assets/icon/fs-icon.svg\"/>\n            <img *ngIf=\"isFullscreen()\" src=\"assets/icon/fs-icon-back.svg\"/>\n        </button>\n    ",
            styles: [
                "\n        .prisma-fs-button {\n            background: none;\n            width: 3.5rem;\n        }\n    "
            ],
            selector: 'prisma-fullscreen-button'
        })
    ], FullscreenButtonComponent);
    return FullscreenButtonComponent;
}());

//# sourceMappingURL=fullscreenButton.component.js.map

/***/ }),

/***/ 867:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__albumList_component__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__(126);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var imports = [__WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */]];
var declarations = [__WEBPACK_IMPORTED_MODULE_1__albumList_component__["a" /* AlbumListComponent */]];
var AlbumModule = /** @class */ (function () {
    function AlbumModule() {
    }
    AlbumModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: declarations,
            imports: imports,
            providers: [],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_1__albumList_component__["a" /* AlbumListComponent */]],
            exports: imports.concat(declarations)
        })
    ], AlbumModule);
    return AlbumModule;
}());

//# sourceMappingURL=album.module.js.map

/***/ }),

/***/ 868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoryModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storyList_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_question_question_component__ = __webpack_require__(869);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_storyDetail_storyDetail_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_storyDetail_component_storyOptions_component__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__component_storyListOptions_component__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_createOrUpdateStory_createOrUpdateStory_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__component_topic_popover_topic_popover_component__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__printList_component__ = __webpack_require__(415);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var imports = [__WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]];
var declarations = [
    __WEBPACK_IMPORTED_MODULE_2__storyList_component__["a" /* StoryListComponent */],
    __WEBPACK_IMPORTED_MODULE_9__printList_component__["a" /* PrintListComponent */],
    __WEBPACK_IMPORTED_MODULE_4__component_storyDetail_storyDetail_component__["a" /* StoryDetailsComponent */],
    __WEBPACK_IMPORTED_MODULE_5__component_storyDetail_component_storyOptions_component__["a" /* StoryOptionsComponent */],
    __WEBPACK_IMPORTED_MODULE_3__component_question_question_component__["a" /* QuestionComponent */],
    __WEBPACK_IMPORTED_MODULE_6__component_storyListOptions_component__["a" /* StoryListOptionsComponent */],
    __WEBPACK_IMPORTED_MODULE_7__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */],
    __WEBPACK_IMPORTED_MODULE_8__component_topic_popover_topic_popover_component__["a" /* TopicPopoverComponent */]
];
var StoryModule = /** @class */ (function () {
    function StoryModule() {
    }
    StoryModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: declarations,
            imports: imports,
            providers: [],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__storyList_component__["a" /* StoryListComponent */],
                __WEBPACK_IMPORTED_MODULE_9__printList_component__["a" /* PrintListComponent */],
                __WEBPACK_IMPORTED_MODULE_4__component_storyDetail_storyDetail_component__["a" /* StoryDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_5__component_storyDetail_component_storyOptions_component__["a" /* StoryOptionsComponent */],
                __WEBPACK_IMPORTED_MODULE_6__component_storyListOptions_component__["a" /* StoryListOptionsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__component_createOrUpdateStory_createOrUpdateStory_component__["a" /* CreateOrUpdateStoryComponent */],
                __WEBPACK_IMPORTED_MODULE_8__component_topic_popover_topic_popover_component__["a" /* TopicPopoverComponent */]
            ],
            exports: imports.concat(declarations)
        })
    ], StoryModule);
    return StoryModule;
}());

//# sourceMappingURL=story.module.js.map

/***/ }),

/***/ 869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_topic_service__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuestionComponent = /** @class */ (function () {
    function QuestionComponent(questionService) {
        this.questionService = questionService;
        this.questions = [];
        this.currentQuestion = '';
    }
    QuestionComponent.prototype.hasTopics = function () {
        return this.questions.length > 0;
    };
    QuestionComponent.prototype.ngOnInit = function () {
        this.questions = this.questionService.getQuestions(this.query);
        this.nextQuestion();
    };
    QuestionComponent.prototype.nextQuestion = function () {
        this.currentQuestion = this.questions[Math.floor(Math.random() * this.questions.length)];
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], QuestionComponent.prototype, "query", void 0);
    QuestionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-question',
            template: "\n    <div *ngIf=\"hasTopics()\">\n      <div class=\"clear\">\n      <div class=\"topic-wrapper\" *ngIf=\"hasTopics()\" (click)=\"nextQuestion()\">\n        <div class=\"topic-container\" *ngIf=\"currentQuestion\">\n          <span class=\"topic-sub\">Onderwerp</span>\n          <span class=\"topic-title\">{{currentQuestion}}</span>\n          <span class=\"topic-other\">\n            <ion-icon name=\"refresh\"></ion-icon>\n            &nbsp;Ander onderwerp\n          </span>\n        </div>\n      </div>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_topic_service__["a" /* TopicService */]])
    ], QuestionComponent);
    return QuestionComponent;
}());

//# sourceMappingURL=question.component.js.map

/***/ }),

/***/ 870:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar_component__ = __webpack_require__(871);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_invite_invite__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_giveFeedback_giveFeedback_component__ = __webpack_require__(421);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var imports = [__WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]];
var declarations = [__WEBPACK_IMPORTED_MODULE_2__sidebar_component__["a" /* SidebarComponent */], __WEBPACK_IMPORTED_MODULE_3__component_invite_invite__["a" /* InviteComponent */], __WEBPACK_IMPORTED_MODULE_4__component_giveFeedback_giveFeedback_component__["a" /* GiveFeedbackComponent */]];
var SidebarModule = /** @class */ (function () {
    function SidebarModule() {
    }
    SidebarModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: declarations,
            imports: imports,
            providers: [],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_4__component_giveFeedback_giveFeedback_component__["a" /* GiveFeedbackComponent */], __WEBPACK_IMPORTED_MODULE_3__component_invite_invite__["a" /* InviteComponent */]],
            exports: imports.concat(declarations)
        })
    ], SidebarModule);
    return SidebarModule;
}());

//# sourceMappingURL=sidebar.module.js.map

/***/ }),

/***/ 871:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_authentication_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_invite_invite__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_patient_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_giveFeedback_giveFeedback_component__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_navigation_nav_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_user_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_app_app__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__root_component__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(menu, authService, userService, patientService, appCtrl) {
        var _this = this;
        this.menu = menu;
        this.authService = authService;
        this.userService = userService;
        this.patientService = patientService;
        this.appCtrl = appCtrl;
        this.userService.isRegistered.subscribe(function (bool) { return (_this.isRegistered = bool); });
    }
    SidebarComponent.prototype.logout = function () {
        this.menu.close();
        this.authService.logout();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__root_component__["a" /* RootComponent */], { isLogging: true });
    };
    SidebarComponent.prototype.invite = function () {
        this.menu.close();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__component_invite_invite__["a" /* InviteComponent */], {
            patientId: this.patientService.getCurrentPatient().patient_id
        });
    };
    SidebarComponent.prototype.goToFeedbackPage = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__component_giveFeedback_giveFeedback_component__["a" /* GiveFeedbackComponent */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_ionic_angular_navigation_nav_controller__["a" /* NavController */])
    ], SidebarComponent.prototype, "nav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "content", void 0);
    SidebarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'prisma-sidebar',
            template: "<ion-menu [content]=\"content\" color=\"white\">\n    <ion-content>\n      <ion-toolbar color=\"white\">\n        <ion-title class=\"ion-title-color\">Menu</ion-title>\n      </ion-toolbar>\n      <ion-list>\n        <button ion-item (click)=\"invite()\" class=\"ion-menu-buttons\">\n          <ion-icon name=\"person-add\" color=\"general\"></ion-icon>\n          Nodig iemand uit\n        </button>\n        <button ion-item (click)=\"goToFeedbackPage()\" class=\"ion-menu-buttons\">\n          <ion-icon name=\"mail\" color=\"general\"></ion-icon>\n          Geef feedback\n        </button>\n        <button *ngIf=\"isRegistered\"ion-item (click)=\"logout()\" class=\"ion-menu-buttons\">\n          <ion-icon name=\"exit\" color=\"general\"></ion-icon>\n          Afmelden\n        </button>\n        <button *ngIf=\"!isRegistered\"ion-item (click)=\"logout()\" class=\"ion-menu-buttons\">\n        <ion-icon name=\"exit\" color=\"general\"></ion-icon>\n          Aanmelden of registeren\n        </button>\n      </ion-list>\n    </ion-content>\n  </ion-menu>\n  ",
            styles: [
                "\n      .ion-title-color {\n        color: #FFABAEB4\n      }\n    "
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__core_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_7__core_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__core_patient_service__["a" /* PatientService */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_app_app__["a" /* App */]])
    ], SidebarComponent);
    return SidebarComponent;
}());

//# sourceMappingURL=sidebar.component.js.map

/***/ })

},[422]);
//# sourceMappingURL=main.js.map