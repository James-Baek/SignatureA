(function(e){function t(t){for(var a,o,r=t[0],c=t[1],l=t[2],m=0,h=[];m<r.length;m++)o=r[m],i[o]&&h.push(i[o][0]),i[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(h.length)h.shift()();return n.push.apply(n,l||[]),s()}function s(){for(var e,t=0;t<n.length;t++){for(var s=n[t],a=!0,r=1;r<s.length;r++){var c=s[r];0!==i[c]&&(a=!1)}a&&(n.splice(t--,1),e=o(o.s=s[0]))}return e}var a={},i={app:0},n=[];function o(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=a,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(s,a,function(t){return e[t]}.bind(null,a));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var u=c;n.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"0967":function(e,t,s){"use strict";var a=s("319c"),i=s.n(a);i.a},"2eaf":function(e,t,s){"use strict";var a=s("5512"),i=s.n(a);i.a},"319c":function(e,t,s){},5512:function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);s("cadf"),s("551c"),s("097d");var a=s("2b0e"),i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("the-navbar",{attrs:{pageType:e.pageType,recentSearch:e.recentSearch,bookmarkAlbums:e.bookmarkAlbums,settings:e.settings,isMobile:e.isMobile,showRecentSearchBox:e.showRecentSearchBox},on:{clickToggleRecentSearchBox:e.toggleRecentSearchBox,clickShowBookmarks:e.showBookmarks,clickSettings:e.showSettingsModal,clickTitle:function(t){e.setPageType("search")}}}),s("the-searchbar",{attrs:{recentSearch:e.recentSearch,newSearchQuery:e.searchQuery,settings:e.settings},on:{clickSearch:e.searchAlbums,clickClearSearch:e.clearSearch}}),e.showRecentSearchBox&&e.recentSearch.length>0?s("recent-search-box",{attrs:{recentSearch:e.recentSearch},on:{clickSearchItem:e.searchAlbums,clickRemoveRecentSearchItem:e.removeRecentSearchItem}}):e._e(),s("album-list",{attrs:{albums:"search"===e.pageType?e.albums:e.bookmarkAlbums,pageType:e.pageType,isLoading:e.isLoading,searchFailed:e.searchFailed,bookmarkAlbums:e.bookmarkAlbums,settings:e.settings,isMobile:e.isMobile},on:{clickBookmarkAlbum:e.bookmarkAlbum,clickUpdateSettings:e.updateSettings}}),s("b-modal",{attrs:{active:e.isSettingsModalActive,canCancel:!1,"has-modal-card":""},on:{"update:active":function(t){e.isSettingsModalActive=t}}},[s("the-settings",{attrs:{settings:e.settings},on:{clickUpdateSettings:e.updateSettings}})],1)],1)},n=[],o=s("cebc"),r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("nav",{staticClass:"navbar is-gradient",attrs:{role:"navigation","aria-label":"main navigation"}},[s("div",{staticClass:"container"},[s("div",{staticClass:"navbar-brand is-inline-flex-mobile is-inline-flex-tablet"},[s("div",{staticClass:"navbar-item",on:{click:e.onClickTitle}},[s("h2",{staticClass:"is-size-3-desktop is-size-4-mobile"},[e._v("Vue iTunes")])])]),s("div",{staticClass:"navbar-end is-inline-flex-mobile is-inline-flex-tablet"},[s("div",{staticClass:"navbar-item"},[s("div",{staticClass:"buttons"},[e.recentSearch.length>0?s("div",{staticClass:"icon is-large nav-icon"},[s("b-tooltip",{attrs:{type:"is-light",label:"Recent Search",position:"is-bottom",active:!e.isMobile}},[s("i",{staticClass:"fas fa-history fa-2x",class:{"icon-active":e.showRecentSearchBox},on:{click:e.onClickToggleRecentSearchBox}})]),e.recentSearch.length>0?s("span",{staticClass:"badge"},[e._v(e._s(e.recentSearch.length))]):e._e()],1):e._e(),s("span",{staticClass:"icon is-large nav-icon"},[s("b-tooltip",{attrs:{type:"is-light",label:"Bookmarks",position:"is-bottom",active:!e.isMobile}},[s("i",{staticClass:"fas fa-2x",class:[{"icon-active":"bookmarks"===e.pageType},e.settings.bookmarkIcon],on:{click:e.onClickShowBookmarks}})]),e.bookmarkAlbums.length>0?s("span",{staticClass:"badge"},[e._v(e._s(e.bookmarkAlbums.length))]):e._e()],1),s("span",{staticClass:"icon is-large nav-icon"},[s("b-tooltip",{attrs:{type:"is-light",label:"Settings",position:"is-bottom",active:!e.isMobile}},[s("i",{staticClass:"fas fa-cog fa-2x",on:{click:e.onClickSettings}})])],1)])])])])])},c=[],l={name:"TheNavbar",props:{showRecentSearchBox:{type:Boolean,required:!0},recentSearch:{type:Array,required:!0},pageType:{type:String,required:!0},bookmarkAlbums:{type:Array,required:!0},settings:{type:Object,required:!0},isMobile:{type:Boolean,required:!0}},methods:{onClickToggleRecentSearchBox:function(){this.$emit("clickToggleRecentSearchBox")},onClickShowBookmarks:function(){this.$emit("clickShowBookmarks")},onClickSettings:function(){this.$emit("clickSettings")},onClickTitle:function(){this.$emit("clickTitle")}}},u=l,m=(s("2eaf"),s("2877")),h=Object(m["a"])(u,r,c,!1,null,"d4f92a80",null);h.options.__file="TheNavbar.vue";var p=h.exports,d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"section searchbar"},[s("div",{staticClass:"container"},[s("b-field",[s("b-autocomplete",{attrs:{size:"is-medium",expanded:"",data:e.filteredDataArray,placeholder:"e.g. Eminem",icon:"magnify"},on:{select:function(t){return e.selected=t},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onClickSearch(t):null}},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),e.searchQuery?s("p",{staticClass:"control"},[s("button",{staticClass:"button  is-medium ",on:{click:e.onClickClearSearch}},[s("i",{staticClass:"fas fa-times"})])]):e._e()],1)],1)])},b=[],g=(s("6b54"),s("2ef0")),f=s.n(g),k={name:"TheSearchbar",data:function(){return{data:[],searchQuery:"",selected:null}},props:{recentSearch:{type:Array,required:!0},newSearchQuery:{type:String,required:!0},settings:{type:Object,required:!0}},mounted:function(){this.searchQuery=this.settings.initialSearchQuery,this.onClickSearch()},watch:{searchQuery:{handler:f.a.debounce(function(e){""===e?this.$store.commit("CLEAR_SEARCH"):e!==this.newSearchQuery&&this.onClickSearch()},1e3)},newSearchQuery:function(e){this.searchQuery=e}},computed:{filteredDataArray:function(){var e=this;return this.recentSearch.filter(function(t){return t.toString().toLowerCase().indexOf(e.searchQuery.toLowerCase())>=0})}},methods:{onClickSearch:function(){this.$emit("clickSearch",this.searchQuery)},onClickClearSearch:function(){this.searchQuery="",this.$emit("clickClearSearch")}}},S=k,v=(s("793c"),Object(m["a"])(S,d,b,!1,null,null,null));v.options.__file="TheSearchbar.vue";var _=v.exports,C=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",[s("div",{staticClass:"container"},[s("div",{staticClass:"columns is-centered"},[s("div",{staticClass:"column",class:e.searchBoxResize},[s("div",{staticClass:"tag-wrap"},[s("div",{staticClass:"title block is-6 has-text-grey-light has-text-centered"},[e._v("Search History")]),s("b-field",{staticClass:"has-text-centered",attrs:{grouped:"","group-multiline":""}},e._l(e.recentSearch,function(t,a){return s("div",{key:a,staticClass:"control"},[s("b-tag",{attrs:{type:"is-primary",size:"is-small",closable:""},on:{close:function(s){e.onClickRemoveRecentSearchItem(t)}}},[s("span",{staticStyle:{cursor:"pointer"},on:{click:function(s){e.onClickSearchItem(t)}}},[e._v(" "+e._s(t)+" ")])])],1)}),0)],1)])])])])},y=[],E={name:"RecentSearch",props:{recentSearch:{type:Array,required:!0}},computed:{searchBoxResize:function(){return{"is-3":this.recentSearch.length>0&&this.recentSearch.length<=3,"is-5":this.recentSearch.length>=4&&this.recentSearch.length<=8,"is-8":this.recentSearch.length>=9}}},methods:{onClickRemoveRecentSearchItem:function(e){this.$emit("clickRemoveRecentSearchItem",e)},onClickSearchItem:function(e){e!==this.$store.state.settings.searchQuery&&this.$emit("clickSearchItem",e)}}},T=E,A=(s("9562"),Object(m["a"])(T,C,y,!1,null,null,null));A.options.__file="RecentSearchBox.vue";var R=A.exports,I=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"section"},[s("div",{staticClass:"container",staticStyle:{"margin-top":"0px"}},[!e.isLoading&&e.albums.length>0?s("div",{staticClass:"columns is-multiline is-mobile"},[s("div",{staticClass:"column is-6"},["bookmarks"!==e.pageType?s("span",{staticClass:"is-size-5-desktop is-size-6-mobile has-text-grey"},[e._v(" Search Results")]):s("span",{staticClass:"is-size-5-desktop is-size-6-mobile has-text-grey"},[e._v(" Bookmarks")])]),s("div",{staticClass:"column is-5 has-text-right "},[s("span",{staticClass:"has-text-grey-light is-size-6"},[e._v(" "+e._s(e.albums.length)+" album(s) ")])]),s("div",{staticClass:"column is-1 has-text-left"},[s("b-tooltip",{attrs:{type:"is-light",label:"switch panel view",position:"is-top",active:!e.isMobile}},[s("i",{staticClass:"fas  fa-lg",class:["card"===e.settings.panelType?"fa-th-list":"fa-th"],on:{click:e.onClickUpdateSettings}})])],1)]):e._e(),s("transition",{attrs:{name:"list",mode:"out-in"}},[!e.isLoading&&e.displayedAlbums.length>0?s("div",{key:e.pageType,staticClass:"columns is-multiline is-mobile"},e._l(e.displayedAlbums,function(t){return s("div",{key:t.collectionId,staticClass:"column ",class:["card"===e.settings.panelType?"is-3-widescreen is-3-desktop is-4-tablet":"is-4-widescreen  is-4-desktop is-6-tablet is-12-mobile"]},["card"===e.settings.panelType?s("div",{staticClass:"card"},[s("div",{staticClass:"card-image"},[s("figure",{staticClass:"image is-4by3"},[s("img",{attrs:{src:e.replaceArtworkUrlSize(t.artworkUrl100,"300x250"),alt:t.collectionCensoredName}})])]),s("div",{staticClass:"card-content"},[s("div",{staticClass:"media"},[s("div",{staticClass:"media-content overflow-content"},[s("div",{staticClass:"title is-size-6-widescreen is-size-6-desktop album-name"},[e._v(e._s(t.collectionCensoredName))]),s("div",{staticClass:"subtitle is-6"},[e._v(e._s(t.artistName)+" "),s("br"),s("span",{staticClass:"has-text-grey-light"},[e._v(e._s(t.primaryGenreName))])])])])]),s("footer",{staticClass:"card-footer"},[s("a",{staticClass:"card-footer-item",attrs:{href:t.collectionViewUrl,target:"_blank"}},[s("b-tooltip",{attrs:{type:"is-light",label:"visit itunes page",position:"is-top",active:!e.isMobile}},[s("i",{staticClass:"fab fa-itunes-note"})])],1),s("span",{staticClass:"heart card-footer-item"},[s("b-tooltip",{attrs:{type:"is-light",label:e.isInBookmark(t.collectionCensoredName)?"click to unbookmarked":"click to bookmark",position:"is-top",active:!e.isMobile}},[s("i",{staticClass:"fas fa-lg bookmarkIcon",class:[{favorite:e.isInBookmark(t.collectionCensoredName)},e.settings.bookmarkIcon],on:{click:function(s){e.onClickBookmarkAlbum(t)}}})])],1),"true"===e.settings.youtubeLink?s("a",{staticClass:"card-footer-item",attrs:{href:"https://www.youtube.com/results?search_query="+t.artistName+" - "+t.collectionCensoredName,target:"_blank"}},[s("b-tooltip",{attrs:{type:"is-light",label:"search on youtube",position:"is-top",active:!e.isMobile}},[s("i",{staticClass:"fab fa-youtube"})])],1):e._e()])]):e._e(),"media"===e.settings.panelType?s("article",{staticClass:"media media-wrap"},[s("figure",{staticClass:"media-left"},[s("p",{staticClass:"image "},[s("img",{attrs:{src:e.replaceArtworkUrlSize(t.artworkUrl100,"130x130"),alt:t.collectionCensoredName}})])]),s("div",{staticClass:"media-content"},[s("div",{staticClass:"content overflow-content"},[s("div",[s("strong",[e._v(e._s(t.collectionCensoredName))]),s("br"),e._v("\n                  "+e._s(t.artistName)+" ( "),s("span",{staticClass:"has-text-grey-light"},[e._v(e._s(t.primaryGenreName))]),e._v(" )\n                ")])]),s("div",{staticClass:"level is-mobile"},[s("div",{staticClass:"level-left"},[s("a",{staticClass:"level-item",attrs:{href:t.collectionViewUrl,target:"_blank"}},[s("b-tooltip",{attrs:{type:"is-light",label:"visit itunes page",position:"is-top",active:!e.isMobile}},[s("i",{staticClass:"fab fa-itunes-note"})])],1),s("a",{staticClass:"level-item"},[s("b-tooltip",{attrs:{type:"is-light",label:e.isInBookmark(t.collectionCensoredName)?"click to unbookmarked":"click to bookmark",position:"is-top",active:!e.isMobile}},[s("i",{staticClass:"fas bookmarkIcon",class:[{favorite:e.isInBookmark(t.collectionCensoredName)},e.settings.bookmarkIcon],on:{click:function(s){e.onClickBookmarkAlbum(t)}}})])],1),"true"===e.settings.youtubeLink?s("a",{staticClass:"level-item",attrs:{href:"https://www.youtube.com/results?search_query="+t.collectionCensoredName,target:"_blank"}},[s("b-tooltip",{attrs:{type:"is-light",label:"search on youtube",position:"is-top",active:!e.isMobile}},[s("i",{staticClass:"fab fa-youtube"})])],1):e._e()])])])]):e._e()])}),0):e._e()]),e.isLoading?s("div",{staticClass:"columns is-mobile"},[s("div",{staticClass:"column loading"},[s("b-loading",{attrs:{"is-full-page":!1,active:e.isLoading,"can-cancel":!1},on:{"update:active":function(t){e.isLoading=t}}})],1)]):e._e(),!e.isLoading&&e.albums.length>0?s("div",{staticClass:"columns is-multiline is-mobile"},[e.albums.length>0?s("div",{staticClass:"column is-12"},[s("hr"),s("b-pagination",{attrs:{total:e.albums.length,current:e.current,order:e.order,size:e.size,simple:e.isSimple,rounded:e.isRounded,"per-page":e.settings.perPage},on:{"update:current":function(t){e.current=t}}})],1):e._e()]):e._e(),"bookmarks"===e.pageType&&0===e.albums.length?[e._m(0)]:e._e(),e.searchFailed&&!e.isLoading?[e._m(1)]:e._e()],2)])},w=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"columns is-multiline is-mobile"},[s("div",{staticClass:"column"},[s("h3",{staticClass:"title is-4 has-text-centered"},[e._v("You have no saved bookmarks.")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"columns is-multiline is-mobile"},[s("div",{staticClass:"column"},[s("h3",{staticClass:"title is-4 has-text-centered"},[e._v("Nothing found. ")]),s("h3",{staticClass:"title is-4 has-text-centered"},[e._v(" Please Search Again!")])])])}],x=(s("a481"),s("20d6"),{name:"AlbumList",data:function(){return{current:1,order:"is-centered",size:"",isSimple:!1,isRounded:!1}},props:{albums:{type:Array,required:!0},pageType:{type:String,required:!0},isLoading:{type:Boolean,required:!0},searchFailed:{type:Boolean,required:!0},bookmarkAlbums:{type:Array,required:!0},settings:{type:Object,required:!0},isMobile:{type:Boolean,required:!0}},computed:{displayedAlbums:function(){return this.paginate(this.albums)}},methods:{paginate:function(e){var t=this.current,s=this.settings.perPage,a=t*s-s,i=t*s;return e.slice(a,i)},onClickBookmarkAlbum:function(e){var t=this;this.isInBookmark(e.collectionCensoredName)?this.$dialog.confirm({message:"Are you sure you want to unbookmark this album? <b>".concat(e.collectionCensoredName," album</b>"),type:"is-danger",hasIcon:!0,onConfirm:function(){t.$emit("clickBookmarkAlbum",e,"unbookmarked"),t.$toast.open({duration:3e3,message:'"'.concat(e.collectionCensoredName,' album" has been unbookmark!'),position:"is-bottom-right",type:"is-danger"})}}):(this.$toast.open({duration:3e3,message:'"'.concat(e.collectionCensoredName,' album" bookmarked!'),position:"is-bottom",type:"is-info"}),this.$emit("clickBookmarkAlbum",e,"bookmark"))},isInBookmark:function(e){return this.bookmarkAlbums.findIndex(function(t){return t.collectionCensoredName===e})>-1},onClickUpdateSettings:function(){var e="card"===this.settings.panelType?"media":"card";this.$emit("clickUpdateSettings","panelType",e)},replaceArtworkUrlSize:function(e,t){return e.replace("100x100",t)}}}),B=x,N=(s("cc23"),Object(m["a"])(B,I,w,!1,null,"3a811342",null));N.options.__file="AlbumList.vue";var O=N.exports,L=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"modal-card",staticStyle:{width:"auto","max-width":"480px"}},[e._m(0),s("section",{staticClass:"modal-card-body"},[s("div",{staticClass:"columns is-multiline"},[e._m(1),s("div",{staticClass:"column is-6"},[s("b-input",{model:{value:e.settings.initialSearchQuery,callback:function(t){e.$set(e.settings,"initialSearchQuery",t)},expression:"settings.initialSearchQuery"}})],1),e._m(2),s("div",{staticClass:"column is-6"},[s("b-field",[s("b-radio-button",{attrs:{"native-value":"card",type:"is-primary"},model:{value:e.settings.panelType,callback:function(t){e.$set(e.settings,"panelType",t)},expression:"settings.panelType"}},[s("b-icon",{attrs:{pack:"fas",icon:"th"}}),s("span",[e._v("Card")])],1),s("b-radio-button",{attrs:{"native-value":"media",type:"is-primary"},model:{value:e.settings.panelType,callback:function(t){e.$set(e.settings,"panelType",t)},expression:"settings.panelType"}},[s("b-icon",{attrs:{pack:"fas",icon:"th-list"}}),s("span",[e._v("Media")])],1)],1)],1),e._m(3),s("div",{staticClass:"column is-6"},[s("b-field",[s("b-radio-button",{attrs:{"native-value":"fa-heart",type:"is-primary"},model:{value:e.settings.bookmarkIcon,callback:function(t){e.$set(e.settings,"bookmarkIcon",t)},expression:"settings.bookmarkIcon"}},[s("b-icon",{attrs:{pack:"fas",icon:"heart"}}),s("span",[e._v("Heart")])],1),s("b-radio-button",{attrs:{"native-value":"fa-star",type:"is-primary"},model:{value:e.settings.bookmarkIcon,callback:function(t){e.$set(e.settings,"bookmarkIcon",t)},expression:"settings.bookmarkIcon"}},[s("b-icon",{attrs:{pack:"fas",icon:"star"}}),s("span",[e._v("Star")])],1)],1)],1),e._m(4),s("div",{staticClass:"column is-6"},[s("b-field",[s("b-radio-button",{attrs:{"native-value":"true",type:"is-primary"},model:{value:e.settings.youtubeLink,callback:function(t){e.$set(e.settings,"youtubeLink",t)},expression:"settings.youtubeLink"}},[s("b-icon",{attrs:{pack:"fas",icon:"check"}}),s("span",[e._v("Show")])],1),s("b-radio-button",{attrs:{"native-value":"false",type:"is-primary"},model:{value:e.settings.youtubeLink,callback:function(t){e.$set(e.settings,"youtubeLink",t)},expression:"settings.youtubeLink"}},[s("b-icon",{attrs:{pack:"fas",icon:"times"}}),s("span",[e._v("Hide")])],1)],1)],1),e._m(5),s("div",{staticClass:"column is-6"},[s("b-field",[s("b-radio-button",{attrs:{"native-value":"20",type:"is-primary"},model:{value:e.settings.perPage,callback:function(t){e.$set(e.settings,"perPage",t)},expression:"settings.perPage"}},[s("span",[e._v("20")])]),s("b-radio-button",{attrs:{"native-value":"40",type:"is-primary"},model:{value:e.settings.perPage,callback:function(t){e.$set(e.settings,"perPage",t)},expression:"settings.perPage"}},[s("span",[e._v("40")])]),s("b-radio-button",{attrs:{"native-value":"60",type:"is-primary"},model:{value:e.settings.perPage,callback:function(t){e.$set(e.settings,"perPage",t)},expression:"settings.perPage"}},[s("span",[e._v("60")])])],1)],1)])]),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button",attrs:{type:"button"},on:{click:function(t){e.$parent.close()}}},[e._v("Close")])])])},M=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[e._v("Settings")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"column is-6"},[s("label",[e._v("Initial Search Query")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"column is-6"},[s("label",[e._v("Panel Type")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"column is-6"},[s("label",[e._v("Bookmark Icon")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"column is-6"},[s("label",[e._v("Search on youtube icon")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"column is-6"},[s("label",[e._v("Search Results Per Page")])])}],$={name:"TheSettings",props:{settings:{type:Object,required:!0}},watch:{"settings.panelType":function(e){this.onClickUpdateSettings("panelType",e)},"settings.bookmarkIcon":function(e){this.onClickUpdateSettings("bookmarkIcon",e)},"settings.youtubeLink":function(e){this.onClickUpdateSettings("youtubeLink",e)},"settings.perPage":function(e){this.onClickUpdateSettings("perPage",e)},"settings.initialSearchQuery":function(e){this.onClickUpdateSettings("initialSearchQuery",e)}},methods:{onClickUpdateSettings:function(e,t){this.$emit("clickUpdateSettings",e,t)}}},G=$,U=(s("0967"),Object(m["a"])(G,L,M,!1,null,null,null));U.options.__file="TheSettings.vue";var P=U.exports,H=s("2f62"),Q={name:"app",data:function(){return{isSettingsModalActive:!1,isMobile:!1,windowWidth:window.innerWidth}},components:{TheNavbar:p,TheSearchbar:_,RecentSearchBox:R,AlbumList:O,TheSettings:P},computed:Object(o["a"])({},Object(H["b"])({recentSearch:"GET_RECENT_SEARCH",albums:"GET_ALBUMS",searchQuery:"SEARCH_QUERY",bookmarkAlbums:"BOOKMARK_ALBUMS",pageType:"PAGE_TYPE",showRecentSearchBox:"SHOW_RECENT_SEARCH_BOX",isLoading:"IS_LOADING",searchFailed:"SEARCH_FAILED",settings:"GET_SETTINGS"}),{showRecentSearchBox:function(){return this.$store.state.showRecentSearchBox}}),created:function(){this.$store.dispatch("GET_SETTINGS"),this.$store.dispatch("GET_RECENT_SEARCH"),this.$store.dispatch("GET_BOOKMARK_ALBUMS")},mounted:function(){var e=this;window.onresize=function(){e.windowWidth=window.innerWidth,e.windowWidth<=768?e.isMobile=!0:e.isMobile=!1}},methods:{searchAlbums:function(e){if(e){var t={url:"/api/search?term=".concat(e,"&entity=album"),query:e};this.$store.dispatch("SEARCH_ALBUMS",t)}this.$store.commit("SET_PAGE_TYPE","search")},clearSearch:function(){this.$store.commit("CLEAR_SEARCH")},toggleRecentSearchBox:function(){this.$store.commit("TOGGLE_RECENT_SEARCH")},removeRecentSearchItem:function(e){this.$store.dispatch("REMOVE_RECENT_SEARCH_ITEM",e)},bookmarkAlbum:function(e,t){var s={album:e,status:t};this.$store.dispatch("BOOKMARK_ALBUM",s)},showBookmarks:function(){this.$store.commit("SET_PAGE_TYPE","bookmarks")},updateSettings:function(e,t){var s={settingName:e,settingValue:t};this.$store.dispatch("UPDATE_SETTINGS",s)},showSettingsModal:function(){this.isSettingsModalActive=!0},setPageType:function(e){e!==this.pageType&&this.$store.commit("SET_PAGE_TYPE",e)}}},q=Q,j=(s("5c0b"),Object(m["a"])(q,i,n,!1,null,null,null));j.options.__file="App.vue";var z=j.exports,K=s("f499"),D=s.n(K),F=s("bc3a"),V=s.n(F);a["default"].use(H["a"]);var Y=new H["a"].Store({state:{settings:{initialSearchQuery:"eminem",searchQuery:"",panelType:"card",bookmarkIcon:"fa-star",perPage:"20",youtubeLink:"false"},albums:[],bookmarkAlbums:[],searchFailed:!1,recentSearch:[],showRecentSearchBox:!1,isLoading:!1,language:"en_us",pageType:"search"},getters:{SEARCH_QUERY:function(e){return e.settings.searchQuery},GET_ALBUMS:function(e){return e.albums},GET_RECENT_SEARCH:function(e){return e.recentSearch},IS_LOADING:function(e){return e.isLoading},SEARCH_FAILED:function(e){return e.searchFailed},BOOKMARK_ALBUMS:function(e){return e.bookmarkAlbums},PAGE_TYPE:function(e){return e.pageType},SHOW_RECENT_SEARCH_BOX:function(e){return e.showRecentSearchBox},GET_SETTINGS:function(e){return e.settings}},mutations:{SET_SEARCH_QUERY:function(e,t){e.pageType="search",e.settings.searchQuery=t},SET_ALBUM:function(e,t){e.albums=t},SEARCH_FAILED:function(e,t){e.searchFailed=t},SET_RECENT_SEARCH:function(e,t){e.pageType="search",e.recentSearch=t},CLEAR_SEARCH:function(e){e.albums=[],e.settings.searchQuery=""},TOGGLE_RECENT_SEARCH:function(e){e.showRecentSearchBox=!e.showRecentSearchBox},SET_BOOKMARK_ALBUMS:function(e,t){e.bookmarkAlbums=t},IS_LOADING:function(e,t){e.isLoading=t},SET_PAGE_TYPE:function(e,t){"bookmarks"===t&&(e.settings.searchQuery=""),e.pageType=t},SET_SETTINGS:function(e,t){e.settings=t}},actions:{SEARCH_ALBUMS:function(e,t){var s=e.commit,a=e.dispatch;return s("IS_LOADING",!0),V.a.get("".concat(t.url)).then(function(e){0===e.data.results.length?(s("CLEAR_SEARCH"),s("SEARCH_FAILED",!0),s("IS_LOADING",!1)):(s("IS_LOADING",!1),s("SEARCH_FAILED",!1),s("SET_ALBUM",e.data.results),s("SET_SEARCH_QUERY",t.query),a("SAVE_TO_RECENT_SEARCH",t.query))}).catch(function(){s("CLEAR_SEARCH"),s("SEARCH_FAILED",!0),s("IS_LOADING",!1)})},SAVE_TO_RECENT_SEARCH:function(e,t){var s=e.commit;try{var a=[];if(null===localStorage.getItem("recent_search"))a.push(t),localStorage.setItem("recent_search",D()(a));else{a=JSON.parse(localStorage.getItem("recent_search")),a.push(t);var i=a=a.filter(function(e,t){return a.indexOf(e)===t});localStorage.setItem("recent_search",D()(i))}s("SET_RECENT_SEARCH",a)}catch(n){alert(n.message)}},GET_RECENT_SEARCH:function(e){var t=e.commit;try{var s=localStorage.getItem("recent_search");null!==s&&t("SET_RECENT_SEARCH",JSON.parse(s))}catch(a){alert(a.message)}},REMOVE_RECENT_SEARCH_ITEM:function(e,t){var s=e.commit;try{var a=JSON.parse(localStorage.getItem("recent_search")),i=a.indexOf(t);-1!==i&&a.splice(i,1),localStorage.setItem("recent_search",D()(a)),0===a.length&&s("TOGGLE_RECENT_SEARCH"),s("SET_RECENT_SEARCH",a)}catch(n){alert(n.message)}},BOOKMARK_ALBUM:function(e,t){var s=e.commit;try{var a=t.album,i=a.artistName,n=a.collectionCensoredName,o=a.artworkUrl100,r=a.primaryGenreName,c=a.collectionViewUrl,l={artistName:i,collectionCensoredName:n,artworkUrl100:o,primaryGenreName:r,collectionViewUrl:c},u=[];if("unbookmarked"===t.status){u=JSON.parse(localStorage.getItem("bookmark_albums"));var m=u.map(function(e){return e.collectionCensoredName}).indexOf(n);-1!==m&&u.splice(m,1),localStorage.setItem("bookmark_albums",D()(u))}else null===localStorage.getItem("bookmark_albums")?(u.push(l),localStorage.setItem("bookmark_albums",D()(u))):(u=JSON.parse(localStorage.getItem("bookmark_albums")),u.push(l),localStorage.setItem("bookmark_albums",D()(u)));s("SET_BOOKMARK_ALBUMS",u)}catch(h){alert(h.message)}},GET_BOOKMARK_ALBUMS:function(e){var t=e.commit;try{var s=localStorage.getItem("bookmark_albums");null!==s&&t("SET_BOOKMARK_ALBUMS",JSON.parse(s))}catch(a){alert(a.message)}},GET_SETTINGS:function(e){var t=e.commit,s=e.state;try{var a=localStorage.getItem("settings");null!==a?t("SET_SETTINGS",JSON.parse(a)):localStorage.setItem("settings",D()(s.settings))}catch(i){alert(i.message)}},UPDATE_SETTINGS:function(e,t){var s=e.commit,a=e.state,i=t.settingValue,n=t.settingName,o=a.settings;o[n]=i,s("SET_SETTINGS",o),localStorage.setItem("settings",D()(o))}}}),J=s("8a03"),W=s.n(J);a["default"].use(W.a),a["default"].config.productionTip=!1,new a["default"]({store:Y,render:function(e){return e(z)}}).$mount("#app")},"5c0b":function(e,t,s){"use strict";var a=s("5e27"),i=s.n(a);i.a},"5e27":function(e,t,s){},"793c":function(e,t,s){"use strict";var a=s("84d3"),i=s.n(a);i.a},"84d3":function(e,t,s){},9562:function(e,t,s){"use strict";var a=s("c12c"),i=s.n(a);i.a},"962e":function(e,t,s){},c12c:function(e,t,s){},cc23:function(e,t,s){"use strict";var a=s("962e"),i=s.n(a);i.a}});
//# sourceMappingURL=app.f146382e.js.map