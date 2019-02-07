var objPopGift;

//window.document.domain="genie.co.kr"

function fnGiftSong(songids){

    if (iMemUno == "" ){
        //alert("로그인 후 다운로드 가능합니다.");
        loginPopup();
        return false;
    }
    if (songids != "" ){
        if(songids.substr(0, 1) == ';') {
            songids = songids.substr(-1 * (songids.length - 1));
        }

        if(songids.length - songids.replace(/\;/gi, '').length > 99) {
            songids = songids.split(';', 100).join(';');
            alert('다운로드는 100곡까지 가능합니다.\n100곡으로 다운로드 진행합니다.');
        }
        songids = songids.replace(/\;/gi, '^');

        var strPlayUrl = "/gift/popSendGift?xgnm=" + songids;
        objPopGift = window.open(strPlayUrl, 'genieGiftLoader', 'width=670, height=650, resizable=no');
    }else{
        alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");
    }
    return false;
}


var objPopDownLoader;
var strDownSongids = "";
var iDownSongType = 1;
var InterValDown;

function fnAlbumDown(albumid){

    if (isConf == "1"){
        alert("다운로드는 본인 인증 완료 후 가능합니다.");
        fnMemConfirm('2');
        return;
    }
    if (albumid == "" )	{
        alert("다운로드 할 앨범이 존재하지 않습니다.");
        return;
    }

    var m = "/download/jAlbumDownload"
    var n = "post";
    var o = "axnm=" + albumid;

    $.ajax({
        type: n,
        url: m,
        contentType: "application/x-www-form-urlencoded; charset=euc-kr",
        data: o,
        dataType: "json",
        error: function (a, b) {
            alert("다운로드 데이터 로드 중 에러가 발생하였습니다.");
        },
        success: function (k) {
            var RetCode = k.Result.RetCode;
            var strHtmlList = "";
            var rownum = 0;

            if (RetCode == "0" ){
                if (k.DataSet.DATA) {
                    itemList = new Array();

                    $.each(k.DataSet.DATA, function (i) {
                        var list_songid = this.SONG_ID;
                        if (i == 0 ){
                            downsonglist = list_songid;
                        }else{
                            downsonglist += "^" + list_songid;
                        }
                    });
                    if (downsonglist != "" ){
                        fnDownSong(downsonglist);
                    }else{
                        alert("다운로드할 앨범의 곡들이 존재하지 않습니다.");
                        return;
                    }
                }
            }else
                alert("다운로드할 앨범의 곡들이 존재하지 않습니다.");
            return;
        }
    });
}

function fnDownSong(songids){
    if (isConf == "1"){
        alert("다운로드는 본인 인증 완료 후 가능합니다.");
        fnMemConfirm('2');
        return;
    }
    if (iMemUno == "" ){
        //alert("로그인 후 다운로드 가능합니다.");
        loginPopup();
        return false;
    }

    if (songids == "" || songids == "undefined"){
        alert("선택된 곡이 없습니다.");
        return false;
    }

//	var strPlayUrl = location.protocol +"//www.genie.co.kr/DownLoad/pop_download.asp";
    var strPlayUrl = "/download/popDownload"; //[TODO]
    songids = fnReArrSong(songids);
    strDownSongids = songids;
    //iDownSongType = type;
    var tempSongids = "";
    if (  iMemUno  ==  "302321484" || iMemUno  == "300577439"  ){
        if(objPopDownLoader != null ) {
            if (!objPopDownLoader.closed){
                tempSongids = objPopDownLoader.itemContent.downSongList;

                if (tempSongids  != "" ){
                    strDownSongids = tempSongids + strDownSongids;
                }
                strDownSongids = removeDuplicatedSong(strDownSongids);

                if (strDownSongids == tempSongids && tempSongids != ""  ){
                    objPopDownLoader.focus();
                }else{
                    objPopDownLoader.fnDownSongAdd(strDownSongids);
                    objPopDownLoader.focus();
                }
                fnClearIntervalByCommon(InterValDown);
                return ;
            }
        }

        objPopDownLoader = window.open('', 'genieDownLoader', 'width=670, height=650, resizable=no');

        try {
            tempSongids = objPopDownLoader.itemContent.downSongList;

            if (tempSongids  != "" ){
                strDownSongids = tempSongids + strDownSongids;
            }
            strDownSongids = removeDuplicatedSong(strDownSongids);

            if (strDownSongids == tempSongids && tempSongids != ""  ){
                objPopDownLoader.focus();
            }else{
                objPopDownLoader.fnDownSongAdd(strDownSongids);
                objPopDownLoader.focus();
            }
            fnClearIntervalByCommon(InterValDown);
        } catch (e) {
            objPopDownLoader.close();
            objPopDownLoader =window.open('/download/popDownload', 'genieDownLoader', 'width=670, height=650, resizable=no');
            InterValDown = setInterval(fnDownSongAdd, 1700);
        }
    }else{


        if((objPopDownLoader == null)||((typeof objPopDownLoader == "undefined"))){
            objPopDownLoader = window["genieDownLoader"];
        }

        if (strDownSongids != "" && strDownSongids.indexOf("undefined") == -1){
            objPopDownLoader = window.open("", 'genieDownLoader', 'width=670, height=650, resizable=no');

            var _chk_Url = objPopDownLoader.location.href.toLowerCase();
            _chk_Url = _chk_Url.replace("#","");
            if (_chk_Url.indexOf("?") != -1){
                var _chk_arr = _chk_Url.split("?");
                _chk_Url = _chk_arr[0];
            }

            //if (strPlayUrl.toLowerCase().indexOf(_chk_Url) != -1){
            if (_chk_Url.indexOf(strPlayUrl.toLowerCase()) != -1){
                //setTimeout("fnDownSongAdd()", 1000);
                InterValDown = setInterval(fnDownSongAdd, 1700);
            }else{
                objPopDownLoader.location.href = strPlayUrl;
                //setTimeout("fnDownSongAdd()", 1000);
                InterValDown = setInterval(fnDownSongAdd, 1700);
            }

        }else{
            alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");
        }
        return false;
    }
}

function fnDownSongAdd(){
    try	{
        var tempSongids = objPopDownLoader.itemContent.downSongList;

        if (tempSongids  != "" ){
            strDownSongids = tempSongids + strDownSongids;
        }
        strDownSongids = removeDuplicatedSong(strDownSongids);

        if (strDownSongids == tempSongids && tempSongids != ""  ){
            objPopDownLoader.focus();
        }else{
            objPopDownLoader.fnDownSongAdd(strDownSongids);
            objPopDownLoader.focus();
        }
        fnClearIntervalByCommon(InterValDown);
    }catch (e){};
};


//중복 제거
function fnReArrSong(str){
    var arr	= str.split(";");
    var str = "";
    for (var i=0; i<arr.length; i++){
        if (str.indexOf(arr[i])<0){
            str += arr[i]+"^";
        }
    }
    return str;
}
//중복 제거
function removeDuplicatedSong(str){
    var arr	= str.split("^");
    var str = "";
    for (var i=0; i<arr.length; i++){
        if (str.indexOf(arr[i])<0){
            str += arr[i]+"^";
        }
    }
    return str;
}


//####### 지니 플레이어 START #######
var objPopMusicPlayer;
var strMusicSongids = "";
var iMusicSongType = 3;
var strMusicAlbumid = "";
var iMusicAlbumType = 3;
var InterValPlaySong;
var InterValPlayAlbum;

var strMusicTsmSeq = "";
var iMusicTsmType = 3;
var InterValPlaySelect;

var GENIE_PLAYER_URL = "/player/fPlayer";

function fnSetObjPopMusicPlayer() {
    if(objPopMusicPlayer == null || typeof objPopMusicPlayer == "undefined") {
        objPopMusicPlayer = window.open("", 'genieMusicPlayer', 'width=880, height=690, resizable=yes');
    } else {
        if (objPopMusicPlayer.closed) {
            objPopMusicPlayer = window.open("", 'genieMusicPlayer', 'width=880, height=690, resizable=yes');
        }
    }
}

function fnChkMusicPlayerUrl(url) {
    fnSetObjPopMusicPlayer();

    var _chk_Url = objPopMusicPlayer.location.pathname.toLowerCase();

    if (_chk_Url==""){
        _chk_Url = objPopMusicPlayer.location.href.toLowerCase();
    }

    _chk_Url = _chk_Url.replace("#","");

    if (_chk_Url.indexOf("?") != -1){
        var _chk_arr = _chk_Url.split("?");
        _chk_Url = _chk_arr[0];
    }

    if (url.toLowerCase().indexOf(_chk_Url) != -1){
        return true;
    } else {
        return false;
    }
}

function fnPlaySong(songids, type) {
    strMusicSongids = songids;
    iMusicSongType = type;

    if (strMusicSongids == "" && type != 3) {
        alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");

    } else {
        if ($.cookie('musicPlayer') == "1"){ //크롬브라우저일경우만(플에이어창 하나라도 있음.) 2014.03.24
            $.cookie('StreamList' , strMusicSongids, { path: '/', domain: 'genie.co.kr'});
            $.cookie('StreamType' , iMusicSongType, { path: '/', domain: 'genie.co.kr'});

        }else{
            if (fnChkMusicPlayerUrl(GENIE_PLAYER_URL)){
                fnPlaySongAdd();
            }else{
                objPopMusicPlayer.location.href = GENIE_PLAYER_URL;
                InterValPlaySong = setInterval(fnPlaySongAdd, 2300); // 1700
            }
        }
    }
}

//지니 퀵 플레이어 추가 2014.01.02
function fnPlaySongQuick(){
    fnPlaySong("", 3);
}

function fnPlaySongAdd(){
    try {
        if(objPopMusicPlayer.isFlowplayerLoad) {
            objPopMusicPlayer.fnGetPlayList(strMusicSongids, iMusicSongType);
            objPopMusicPlayer.focus();
            strMusicSongids = "";
            iMusicSongType = 3;
            fnClearIntervalByCommon(InterValPlaySong);
        }
    }catch (e){
        //console.log("error");
    }
};


function fnPlayAlbum(albumid, type){
    strMusicAlbumid = albumid;
    iMusicAlbumType = type;

    if (strMusicAlbumid != ""){
        if (fnChkMusicPlayerUrl(GENIE_PLAYER_URL)){
            fnPlayAlbumAdd();
        }else{
            objPopMusicPlayer.location.href = GENIE_PLAYER_URL;
            InterValPlayAlbum = setInterval(fnPlayAlbumAdd, 1700);
        }
    }else{
        alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");
    }
}

function fnPlayAlbumAdd(){
    try{
        objPopMusicPlayer.fnGetAlbumList(strMusicAlbumid, iMusicAlbumType);
        objPopMusicPlayer.focus();
        strMusicAlbumid = ""
        iMusicAlbumType = 3;
        fnClearIntervalByCommon(InterValPlayAlbum);
    }catch (e){};
}


var strShareSeq = "";
function fnPlaySongShare(seq){
    strShareSeq = seq;

    if (strShareSeq != ""){
        fnSetObjPopMusicPlayer();
        objPopMusicPlayer.location.href = GENIE_PLAYER_URL + "?SmrsSeq=" + strShareSeq +"&pt=3";
        objPopMusicPlayer.focus();
    }else{
        alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");
    }

}

function fnPlaySongSearch(songids, varSongAdultYn) {
    if (varSongAdultYn == "Y") {
        switch(isMemStatus) {
            case "1":	//본인인증 안함
                alertLayer(
                    '청소년 이용제한 음원을 재생하시려면 본인인증이 필요 합니다. 확인을 클릭 하시면 본인인증 페이지로 이동 합니다.', [
                        ['확인', 'red', fnMemConfirmRetry, 'close'],
                        ['취소', 'grey', null, 'close']
                    ], '');
                break;

            case "2":	//미성년자
                alert('19세 이상 재생 가능한 곡 입니다.');
                break;

            case "3":	//본인재인증 필요
                alertLayer(
                    '청소년 이용제한 음원을 재생하시려면 본인인증이 필요 합니다. 확인을 클릭 하시면 본인인증 페이지로 이동 합니다.', [
                        ['본인인증하기', 'red', fnMemConfirmRetry, 'close'],
                        ['취소', 'grey', null, 'close']
                    ], '');
                break;

            case "4":	//성인
                fnPlaySong(songids,'3');
                break;

            default:
                alert('청소년 이용제한 음원으로, 로그인 후 이용 가능 합니다.');
        }
    }else{
        fnPlaySong(songids,'3');
    }
}

function fnClearIntervalByCommon(obj){
    if (typeof obj != "undefined"){
        clearInterval(obj);
    }
}
//####### 지니 플레이어 END  #######



/******************************************
 뮤직비디오 관련 - MV_ID로 호출하는 함수 추가 2013.10.15
 ******************************************/
var mvSongids = "";
var mvMvids = "";
var mvAt = 3;

var InterValPlayMovie;
var spl = "";
var spt = "";

var GENIE_MV_PLAYER_URL = "/mvPlayer/popMoviePlayerV2";

//곡리스트 뮤직비디오 아이콘 클릭시 1:N-레이어, 1:1 play - 2013.11.18
function fnPlayMv(songid, type) {
    var retCode, sDataSet;
    var iDataCnt = 0;
    var mvid = '';
    var mvHtml = '';
    var originSongId = 	songid;

    songid = songid.replace(/;/g,'');
    songid = songid.replace(/_Second/g,'');	//같은페이지에 뮤비목록이 2개 있을 경우 처리
    songid = songid.replace(/_Third/g,'');	//같은페이지에 뮤비목록이 3개 있을 경우 처리
    if($("#mv-list_"+originSongId+"").size() >0){
        $("div .toggle-button-box .lyr-mv").removeClass("select-button");
        return false;
    } else {
        $.ajax({
            type: "POST",
            url: "/detail/jSongMvList",
            dataType: "json",
            async: false,
            data: {"xgnm": songid},
            success: function (responseData) {
                retCode = responseData.Result.RetCode;
                if (retCode == "0") {
                    iDataCnt = responseData.PageInfo.TotCount;
                    sDataSet = responseData.LISTDATA;

                    if (iDataCnt > 0) {

                        //뮤직 비디오가 1개일 경우에는 바로 재생 시킴
                        if(iDataCnt == 1){
                            fnPlayMvID( + sDataSet[0].mvId  ,'1');
                            return false;
                        }

                        var mainBool = false;
                        mainBool = ($("span#list-mv_" + originSongId + "").length > 0);

                        mvHtml = mvHtml + '<ul class="' + ( mainBool ? '' : 'list ' ) + 'list-mv" id="list-mv">';
                        for (var i = 0; i < iDataCnt; i++) {
                            mvHtml = mvHtml + '<li id="mv-list_'+ originSongId +'">';
                            mvHtml = mvHtml + '<a href="#" title="'+sDataSet[i].mvName+'" onclick="fnPlayMvID(\'' + sDataSet[i].mvId + '\',\'1\');return false;" class="thumb"><span class="mask"></span><img src="//image.genie.co.kr/' + decodeURIComponent(sDataSet[i].mvImgPath) + '" onerror=\"this.src=\'//image.genie.co.kr/imageg/web/common/blank_mv_320.gif\';\" alt="' + sDataSet[i].mvName + '" />';
                            mvHtml = mvHtml + '		<time class="duration">' + getConvertDuration(sDataSet[i].duration) + '</time>';
                            mvHtml = mvHtml + '</a>';
                            mvHtml = mvHtml + '<a href="#" class="mv-title ellipsis" title="'+sDataSet[i].mvName+'" onclick="fnPlayMvID(\'' + sDataSet[i].mvId + '\',\'1\');return false;">';
                            var etcTag = "";
                            if (sDataSet[i].mvTypeCode == '30851') {
                            } else if (sDataSet[i].mvTypeCode == '30852') {
                                etcTag = "<span class='icon-type'>공연</span>";
                            } else if (sDataSet[i].mvTypeCode == '30853') {
                                etcTag = "<span class='icon-type'>티저</span>";
                            } else if (sDataSet[i].mvTypeCode == '30854') {
                                etcTag = "<span class='icon-type'>팬미팅</span>";
                            } else if (sDataSet[i].mvTypeCode == '30855') {
                                etcTag = "<span class='icon-type'>메이킹</span>";
                            } else if (sDataSet[i].mvTypeCode == '30856') {
                                etcTag = "<span class='icon-type'>기타</span>";
                            }
                            mvHtml = mvHtml + '' + etcTag + '' + decodeURIComponent(sDataSet[i].mvName) + '</a>';
                            mvHtml = mvHtml + '<a href="#" class="mv-artist ellipsis" onclick="fnViewArtist(\'' + sDataSet[i].artistId + '\'); return false;">' + decodeURIComponent(sDataSet[i].artistName) + '</a>';
                            mvHtml = mvHtml + '</li>';
                        }
                        mvHtml = mvHtml + '</ul>';
                        $("#list-mv_" + originSongId + "").append(mvHtml);

                    } else {
                        alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");
                    }
                } else {
                    alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");
                }
            },
            complete: function () {
                spl = "";
                spt = "";
            }
        });
    }
}
function mvPopClose(){
    $(".lyr-mv").hide();
}

//인기,차트 뮤비호출시.. 임시 2013.11.18
function fnPlayMvTmp(songids, type) {
    if (songids != ""){
        mvSongids = songids;
        mvAt = type;

        if(fnChkMusicPlayerUrl(GENIE_MV_PLAYER_URL)) {
            objPopMusicPlayer.fnAddPlaylist(songids, type);
        } else {
            objPopMusicPlayer.location.href = GENIE_MV_PLAYER_URL;
            InterValPlayMovie = setInterval(fnPlayMvAdd, 1000);
        }

        objPopMusicPlayer.focus();

    }else{
        alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");
    }
}

function fnPlayMvAdd(){
    try{
        if(objPopMusicPlayer.isFlowplayerLoad) {
            objPopMusicPlayer.fnGetPlayListMv(mvSongids, mvAt, '1');
            mvSongids = ""
            mvAt = 3;
            fnClearIntervalByCommon(InterValPlayMovie);
        }
    }catch (e){};
}


//MV_ID로 호출하는 함수 추가 2013.10.15
function fnPlayMvID(mvids, at) {
	at = at || '1';
    if (mvids != ""){
        mvMvids = mvids;
        mvAt = at;

        if(fnChkMusicPlayerUrl(GENIE_MV_PLAYER_URL)) {
            objPopMusicPlayer.fnGetPlayListMv(mvids, at, '1');
        } else {
            objPopMusicPlayer.location.href = GENIE_MV_PLAYER_URL;
            InterValPlayMovie = setInterval(fnPlayMvAddMvID, 1000);
        }

        objPopMusicPlayer.focus();

    }else{
        alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");
    }
}

function fnPlayMvAddMvID(){
    try{
        if(objPopMusicPlayer.isFlowplayerLoad) {
            objPopMusicPlayer.fnGetPlayListMv(mvMvids, mvAt, '1');
            mvMvids = ""
            mvAt = 3;
            fnClearIntervalByCommon(InterValPlayMovie);
        }
    }catch (e){ };
}

//곡 상세페이지 이동
function fnViewSongInfo(varSongID) {
    if (varSongID == "") {
        alert("잘못된 접근입니다.");
    } else {
        var dForm = $('<form />', {
//			'action':'/Detail/f_Song_Info.asp',
            'action':'/detail/songInfo',
            'method':'get',
            'name':'frmMoveData'
        }).html($('<input />',{
            'value':varSongID,
            'type':'hidden',
            'name':'xgnm'
        }));
        dForm.appendTo('body').trigger('submit');
    }
}

//곡 상세페이지 팝업
function fnViewSongInfoPop(varSongID)
{
    if (varSongID == "")
    {
        alert("잘못된 접근입니다.");
    }
    else if (varSongID == "-1")
    {
        alert("곡 정보가 존재하지 않습니다.");
    }
    else
    {
        try
        {
            //20140203 신성하 웹플레이어 성능 개선
            var openerUrl = window.opener.location.href.toLowerCase();
//			if (openerUrl.indexOf('//www.genie.co.kr/musicplayer/f_player.asp')> -1 )
//			if (openerUrl.indexOf('//www.genie.co.kr/musicplayer/f_Musicplayer.asp')> -1 )
            if (openerUrl.indexOf('/player/fPlayer')> -1 )
            {
                throw "opener is popup";
            }
            else
            {
                //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
                if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1){
                    var dForm = $('<form />', {
                        'action':'/detail/songInfo',
                        'target' :"genie_main",
                        'method':'get',
                        'name':'frmMoveData'
                    }).html($('<input />',{
                        'value':varSongID,
                        'type':'hidden',
                        'name':'xgnm'
                    }));
                    dForm.appendTo('body').trigger('submit');
                }else {
                    window.opener.fnViewSongInfo(varSongID);
                }
            }
        }
        catch (e) {
            var dForm = $('<form />', {
                'action':'/detail/songInfo',
                'target' :"genie_main",
                'method':'get',
                'name':'frmMoveData'
            }).html($('<input />',{
                'value':varSongID,
                'type':'hidden',
                'name':'xgnm'
            }));
            dForm.appendTo('body').trigger('submit');
            //iframe
            //javaParentHTTPSDefend('/detail/songInfo?xgnm='+varSongID)
        }
    }
}

//아티스트 상세페이지 이동
function fnViewArtist(varArtistID)
{
    if (varArtistID == "")
    {
        alert("잘못된 접근입니다.");
    }
    else if (varArtistID == "14951816" || varArtistID == "14958011")
    {
        alert("해당 아티스트 정보가 존재하지 않습니다.");
    }
    else
    {
        var dForm = $('<form />', {
            'action':'/detail/artistInfo',
            'method':'get',
            'name':'frmMoveData'
        }).html($('<input />',{
            'value':varArtistID,
            'type':'hidden',
            'name':'xxnm'
        }));
        dForm.appendTo('body').trigger('submit');
    }
}

//아티스트 상세페이지 팝업
function fnViewArtistPop(varArtistID)
{
    if (varArtistID == "")
    {
        alert("잘못된 접근입니다.");
    }
    else if (varArtistID == "14951816" || varArtistID == "14958011")
    {
        alert("해당 아티스트 정보가 존재하지 않습니다.");
    }
    else
    {
        try
        {
            //20140203 신성하 웹플레이어 성능 개선
            var openerUrl = window.opener.location.href.toLowerCase();

            if (openerUrl.indexOf('/player/fPlayer')> -1 )
            {
                throw "opener is popup";
            }
            else
            {
                //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
                if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1){
                    var dForm = $('<form />', {
                        'action':'/detail/artistInfo',
                        'target' :"genie_main",
                        'method':'get',
                        'name':'frmMoveData'
                    }).html($('<input />',{
                        'value':varArtistID,
                        'type':'hidden',
                        'name':'xxnm'
                    }));
                    dForm.appendTo('body').trigger('submit');
                }else {
                    window.opener.fnViewArtist(varArtistID);
                }
            }
        }
        catch (e)
        {
            //iframe
            var dForm = $('<form />', {
                'action':'/detail/artistInfo',
                'target' :"genie_main",
                'method':'get',
                'name':'frmMoveData'
            }).html($('<input />',{
                'value':varArtistID,
                'type':'hidden',
                'name':'xxnm'
            }));
            dForm.appendTo('body').trigger('submit');
            //iframe
            //javaParentHTTPSDefend('/detail/artistInfo?xxnm='+varArtistID)
        }
    }
}

//앨범 상세페이지 이동
function fnViewAlbumLayer(varAlbumID)
{
    if (varAlbumID == "")
    {
        alert("잘못된 접근입니다.");
    }
    else
    {
        var dForm = $('<form />', {
            'action':'/detail/albumInfo',
            'method':'get',
            'name':'frmMoveData'
        }).html($('<input />',{
            'value':varAlbumID,
            'type':'hidden',
            'name':'axnm'
        }));
        dForm.appendTo('body').trigger('submit');
    }
}

//앨범 상세페이지 팝업
function fnViewAlbumPop(varAlbumID)
{
    if (varAlbumID == "")
    {
        alert("잘못된 접근입니다.");
    }
    else
    {
        try
        {
            //20140203 신성하 웹플레이어 성능 개선
            var openerUrl = window.opener.location.href.toLowerCase();

            if (openerUrl.indexOf('/player/fPlayer')> -1 )
            {
                throw "opener is popup";
            }
            else
            {
                //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
                if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1){
                    var dForm = $('<form />', {
                        'action':'/detail/albumInfo',
                        'target' :"genie_main",
                        'method':'get',
                        'name':'frmMoveData'
                    }).html($('<input />',{
                        'value':varAlbumID,
                        'type':'hidden',
                        'name':'axnm'
                    }));
                    dForm.appendTo('body').trigger('submit');
                }else {
                    window.opener.fnViewAlbumLayer(varAlbumID);
                }
            }
        }
        catch (e)
        {
            var dForm = $('<form />', {
                'action':'/detail/albumInfo',
                'target' :"genie_main",
                'method':'get',
                'name':'frmMoveData'
            }).html($('<input />',{
                'value':varAlbumID,
                'type':'hidden',
                'name':'axnm'
            }));
            dForm.appendTo('body').trigger('submit');
            //iframe
            //javaParentHTTPSDefend('/detail/albumInfo?axnm='+varAlbumID)
        }
    }
}


//인기검색어 결과 페이지 이동
function fnGoSearchKeyword(varSearchKeyword)
{
    if($.trim(varSearchKeyword).length < 1)
    {
        alert ("검색어를 입력해주세요.");

    }
    else if (!fnInvalidchar(varSearchKeyword))
    {
        alert ("검색어에 올바르지 않은 문자가 있습니다.");
    }
    else
    {
        var _searchQuery = fnGetSQString(varSearchKeyword);
        var dForm = $('<form />', {
            'action':'/search/searchMain',
            'method':'get',
            'name':'frmMoveData'
        }).html($('<input />',{
            'value':_searchQuery,
            'type':'hidden',
            'name':'query'
        }));
        dForm.appendTo('body').trigger('submit');
    }
    return false;
}


//아티스트 탭 상세 이동
function fnGoArtistTab(varType, varArtistID)
{
    if (varArtistID == "14951816" || varArtistID == "14958011")
    {
        alert("해당 아티스트 정보가 존재하지 않습니다.");
    }
    else
    {
        var sTargetURL = "";
        switch (varType)
        {
            case "main":
                sTargetURL = "/detail/artistInfo"
                break;
            case "album":
                sTargetURL = "/detail/artistAlbum"
                break;
            case "song":
                sTargetURL = "/detail/artistSong"
                break;
            case "mv":
                sTargetURL = "/detail/artistMv"
                break;
        }

        var dForm = $('<form />', {
            'action':sTargetURL,
            'method':'get',
            'name':'frmMoveData'
        }).html($('<input />',{
            'value':varArtistID,
            'type':'hidden',
            'name':'xxnm'
        }));
        dForm.appendTo('body').trigger('submit');
    }
}

//매거진 카테고리 이동
function fnViewMagazineCategory(ctId) {
	if (ctId == "")
	{
		alert("잘못된 접근입니다.");
	}
	else
	{
		var dForm = $('<form />', {
			'action':'/magazine',
			'method':'get',
			'name':'frmMoveData'
		}).html($('<input />',{
			'value':ctId,
			'type':'hidden',
			'name':'ctid'
		}));
		dForm.appendTo('body').trigger('submit');
	}
}

//영상 상세페이지 이동
function fnViewVideo(varMvID)
{
	if (varMvID == "") {
		alert("잘못된 접근입니다.");
	} else {
		var dForm = $('<form />', {
			'action':'/detail/tvInfo',
			'method':'get',
			'name':'frmMoveData'
		}).html($('<input />',{
			'value':varMvID,
			'type':'hidden',
			'name':'xvnm'
		}));
		dForm.appendTo('body').trigger('submit');
	}
}

// 영상 상세페이지 팝업
function fnViewVideoPop(varMvID) {
	if (varMvID == "") {
		alert("잘못된 접근입니다.");
	} else {
		try {
			var openerUrl = window.opener.location.href.toLowerCase();

			if (openerUrl.indexOf('/player/fPlayer')> -1 ) {
				throw "opener is popup";
			} else {
				// 외부연동일 경우
				if (openerUrl.indexOf('/api/musicplayer/')> -1) {
					var dForm = $('<form />', {
						'action':'/detail/tvInfo',
						'method':'get',
						'name':'frmMoveData'
					}).html($('<input />',{
						'value':varMvID,
						'type':'hidden',
						'name':'xvnm'
					}));
					dForm.appendTo('body').trigger('submit');
				} else {
					window.opener.fnViewVideo(varMvID);
				}
			}
		} catch (e) {
			var dForm = $('<form />', {
				'action':'/detail/tvInfo',
				'method':'get',
				'name':'frmMoveData'
			}).html($('<input />',{
				'value':varMvID,
				'type':'hidden',
				'name':'xvnm'
			}));
			dForm.appendTo('body').trigger('submit');
		}
	}
}

function fnViewVideoTagSearch(varTag) {
	varTag = varTag || '';
	if(varTag == '')	return;

	var dForm = $('<form />', {
		'action':'/genietv/tagSearch',
		'method':'get',
		'name':'frmMoveData'
	}).html($('<input />',{
		'value':varTag,
		'type':'hidden',
		'name':'tag'
	}));
	dForm.appendTo('body').trigger('submit');
}

//매거진 상세 이동
function fnViewMagazine(ctId, mgzSeq) {
	if (ctId == "" || mgzSeq == "")
	{
		alert("잘못된 접근입니다.");
	}
	else
	{
		var dForm = $('<form />', {
			'action':'/magazine/subMain',
			'method':'get',
			'name':'frmMoveData'
		}).html($('<input />',{
			'value':ctId,
			'type':'hidden',
			'name':'ctid'
		})).html($('<input />',{
			'value':mgzSeq,
			'type':'hidden',
			'name':'mgz_seq'
		}));
		dForm.appendTo('body').trigger('submit');
	}
}

/*
곡 리스트가 존재하는 페이지에서 페이지 로드 후 좋아요 여부 UI 업데이트 (신성하)
varType : SONG_LIKE, ARTIST_LIKE, ALBUM_LIKE 등
varSeqs : song_id 등 16250913;16255710;80033049;20371518;81235421;81240465;80602078;80775144;81203123;
varList : UI 업데이트 할 리스트 컨테이너 selector (예 : .newest-list .music-list-wrap', inc_Module_List.asp에서 sbSongList 의 s_DivArea와 같은 값
*/
function fnSetLikeList(varUno, varType, varSeqs, varList)
{
    if (isLogin=="true" && varUno != "")
    {
        $.ajax({
            type: "POST",
            url: "/Includes/Commons/Module/jLikeList",
            dataType: "json",
            data: { "unm": varUno, "ltype": varType, "seqs": varSeqs },
            success: function (responseData) {
                retCode = responseData.Result.RetCode;
                if (retCode == "0") {
                    var sDataSet = responseData.DataSet.DATA;
                    var iDataCnt = responseData.PageInfo.TotCount;
                    var iLikeSeq;

                    for (i = 0 ; i < iDataCnt ; i++)
                    {
                        iLikeSeq = sDataSet[i].CHK_SEQ;
                        $(varList).find('.like[likeSongID='+iLikeSeq+']').addClass('checked');
                    }
                }
            }
        });
    }
}

/*
 * author : Young
 * 작성 날짜 : 2013-05-09
 * 최종 수정 날짜 : 2013-05-09
 * descript : GNB, LNB 핫앨범,핫이슈뮤직비디오 컨텐츠 관리
 */
function FC_GLListRandom(obj,cnt){
    var iListLen = parseInt($(obj).length);
    var randNums = [];

    for (i=0; i<cnt; i++){
        randNums.push(Math.floor(Math.random() * iListLen));
    }

    if (randNums[0] == randNums[1]){ //같은값일 경우 기본으로 세팅
        randNums[0]= 0;
        randNums[1] = (iListLen-1);
    }

    randNums.sort();

    $(obj+':eq('+ randNums[0] +')').attr("style","display:block");
    $(obj+':eq('+ randNums[1] +')').attr("style","display:block");

    if (obj == ".aside_album ul li"){ //LNB 핫앨범일 경우
        $(obj+':eq('+ randNums[0] +')').css("margin-bottom","10px");
    }else if (obj == ".sub_menu_2 li"){ //GNB 핫앨범일 경우
        $(obj+':eq('+ randNums[0] +')').css("margin-bottom","15px");
    }else if (obj == ".sub_menu_4 li"){ //GNB 핫MV일 경우
        $(obj+':eq('+ randNums[0] +')').css("margin-bottom","15px");
    }
}

//유투브 조회수 가져오기
function FC_GLYtViewCnt(url){
    $.getJSON(url,function(data){
        if (data){
            var id = data.entry.id.$t.replace("http://gdata.youtube.com/feeds/api/videos/","");;
            var viewCnt = data.entry.yt$statistics.viewCount;
            $("#"+id).find("#viewcnt").html(FC_GLComma(viewCnt));
        }
    });
}

//숫자 3자리 콤마 표시
function FC_GLComma(number){
    number = '' + number;

    if (number.length > 3) {
        var mod = number.length % 3;
        var output = (mod > 0 ? (number.substring(0,mod)) : '');

        for (i=0 ; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0)){
                output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
            }else{
                output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
        }

        return (output);
    }else{
        return number;
    }
}

//네비게이션 표시
function FC_PageLocation(naviText){
    $(".bread-sc").remove();
    $('#wrap-body').append('<p class="bread-sc">'+naviText+'</p>');
}

/*
===================================================================================
이규남 리스트에서 여러곡 선택시 곡 ID반환 함수
*/
//전곡 리스트
function fnAllSongID() {
    var strArrSongID = "";

    if ($("#sTop100SongID").val() == "Y")
    {
        strArrSongID = $("#sAllSongID").val();
    }else{
        $(".list-wrap").find("div[songID]").each(function (i) {
            var songDiv = $(this);
            var currentSongId = $(this).attr("songID");
            //추천곡일 경우 제외
            if (currentSongId != "" && currentSongId != undefined && currentSongId !="-1" && !songDiv.hasClass("recommend") )
            {
                strArrSongID = strArrSongID + currentSongId + ";";
            }
        });
    }

    return strArrSongID;
}

function fnTop10SongID(op) {

    var strArrSongID = "";
    if(op=="S"){
        strArrSongID = $("#sTop10SongID").val();
    }else{
        strArrSongID = $("#sTop10DSongID").val();
    }
    return strArrSongID;
}

//해당 ID, Class 내에 모든 곡 리스트
function fnAllSongID2(_target) {
    var strArrSongID = "";
    $(_target + " .list-wrap div[songID]").each(function (i) {
        var songDiv = $(this);
        var currentSongId = $(this).attr("songID");
        //추천곡일 경우 제외
        if (currentSongId != "" && currentSongId != undefined && currentSongId !="-1" && !songDiv.hasClass("recommend") )
        {
            strArrSongID = strArrSongID + currentSongId + ";";
        }
    });

    return strArrSongID;
}

// 마이뮤직 많이 들은곡, 최근 감상곡에서 사용
function fnAllSongID3(_target) {
    var strArrSongID = "";

    if ($("#sTop100SongID").val() == "Y")
    {
        strArrSongID = $("#sAllSongID").val();
    }else{

        $(_target).find(".music-list-wrap").find(".list-wrap").find("div[songID]").each(function (i) {
            var songDiv = $(this);
            var currentSongId = $(this).attr("songID");
            //추천곡일 경우 제외
            if (currentSongId != "" && currentSongId != undefined && currentSongId !="-1" && !songDiv.hasClass("recommend") )
            {
                strArrSongID = strArrSongID + currentSongId + ";";
            }
        });
    }

    return strArrSongID;
}

//선택된 곡 리스트
function fnSelectArrSongID() {
    var strArrSongID = "";

    $(".list-wrap").find(".select-list").each(function (i) {
        var currentSongId = $(this).attr("songID");

        if (currentSongId == "" || currentSongId == undefined || currentSongId =="-1") {
            currentSongId = $(this).attr("songId");
        }

        if (currentSongId == "" || currentSongId == undefined || currentSongId =="-1") {
            currentSongId = $(this).attr("songid");
        }

        if (currentSongId == "" || currentSongId == undefined || currentSongId =="-1") {
            currentSongId = $(this).attr("music-id");
        }

        if (currentSongId != "" && currentSongId != undefined && currentSongId !="-1") {
            strArrSongID = strArrSongID + currentSongId + ";";
        }
    });
    // 곡 아이디 중복 제거 처리
    return sidDistinctCommon(strArrSongID);

}

/**
 * 곡의 중복 제거 처리
 * @param sidKey 111111;222222;111111;4444444
 * @returns ;111111;222222;4444444
 */
function sidDistinctCommon(sidKey){
    var sidArr = sidKey.split(";");
    var rstArr = [];
    var rstKey = "";
    $.each(sidArr, function(i, el){
        if($.inArray(el, rstArr) === -1){
            rstArr.push(el);
            if(el != '' && el != NaN){
                rstKey = rstKey + ";" + parseInt(el);

            }
        }
    });
    return rstKey;
}

//선택된 MvID 리스트
function fnSelectArrMvID( ) {
    var strArrMvID = "";

    $(".list-wrap").find(".select-list").each(function (i) {
        var currentMvId = $(".list-wrap").find(".select-list").eq(i).attr("mvId");
        if (currentMvId != "" && currentMvId != undefined && currentMvId !="-1")
        {
            strArrMvID = strArrMvID + currentMvId + ";";
        }
    });
    return strArrMvID;

}

function fnPlayArrSong(iPlayType) {
    var strSelectArrSongID = fnSelectArrSongID();

    if (strSelectArrSongID == "") {
        alert("선택된 곡이 없습니다.");
    } else {
        fnPlaySong(strSelectArrSongID, iPlayType);
    }
}

function fnPlayTop100Song( iPlayType) {
    var strSelectArrSongID = fnAllSongID();

    if (strSelectArrSongID == "")
    {
        alert("선택된 곡이 없습니다.");
    }else{
        fnPlaySong(strSelectArrSongID, iPlayType);
    }
}

function fnPlayTop100Song2(_target, iPlayType) {
    var strSelectArrSongID = fnAllSongID2(_target);

    if (strSelectArrSongID == "")
    {
        alert("선택된 곡이 없습니다.");
    }else{
        fnPlaySong(strSelectArrSongID, iPlayType);
    }
}

function fnPlayTop100Song3(_target, iPlayType) {
    var strSelectArrSongID = fnAllSongID3(_target);

    if (strSelectArrSongID == "")
    {
        alert("선택된 곡이 없습니다.");
    }else{
        fnPlaySong(strSelectArrSongID, iPlayType);
    }
}


//선택된 MV리스트 재생
function fnPlayArrMV( iPlayType) {
    var strSelectArrSongID = fnSelectArrSongID();

    if (strSelectArrSongID == "")
    {
        alert("선택된 곡이 없습니다.");
    }else{
        fnPlayMvTmp(strSelectArrSongID, iPlayType);
    }
}

//선택된 MV리스트 재생 - MV_ID 재생
function fnPlayArrMVID( iPlayType) {
    var strSelectArrMvID = fnSelectArrMvID();

    if (strSelectArrMvID == "")
    {
        alert("선택된 뮤직비디오가 없습니다.");
    }else{
        fnPlayMvID(strSelectArrMvID, iPlayType);
    }
}

//선택된 곡 ID 반환(리스트가 여러개일때-TV속 음악) - HAN
function fnSelectArrSongIDListName(sDivName) {
    var strArrSongID = "";

    $("."+sDivName).find(".select-list").each(function (i) {
        strArrSongID = strArrSongID + $(this).attr("songID") + ";";
    });
    return strArrSongID;
}

//선택된 곡 듣기(선택된 리스트 내 있는 곡만 듣기) - HAN
function fnPlayArrSongListName(sDivName, iPlayType) {
    var strSelectArrSongID = fnSelectArrSongIDListName(sDivName);

    if (strSelectArrSongID == ""){
        alert("선택된 곡이 없습니다.");
    } else {
        fnPlaySong(strSelectArrSongID, iPlayType);
    }
}

//특정 Class 하단의 모든곡 듣기(TV속 음악) - HAN
function fnPlayAllSongListName(sDivName,type) {

    var strArrSongID = "";

    $("."+sDivName).find(".list-wrap").find("div[songid]").each(function (i) {
        var currentSongId = $(this).attr("songid");

        if (currentSongId != "" && currentSongId != undefined && currentSongId !="-1")
        {
            strArrSongID = strArrSongID + currentSongId + ";";
        }
    });

    fnPlaySong(strArrSongID,type);
}

//특정 div 이름 하단의 모든곡 듣기(통합 검색)
function fnPlayAllSongListDIV(sDivName,type) {

    var strArrSongID = "";

    $("#"+sDivName).find(".list-wrap").find("div[songid]").each(function (i) {
        var currentSongId = $(this).attr("songid");

        if (currentSongId != "" && currentSongId != undefined && currentSongId !="-1")
        {
            strArrSongID = strArrSongID + currentSongId + ";";
        }
    });

    fnPlaySong(strArrSongID,type);
}

//전체 뮤비 ID
function fnAllMvID() {
    var strArrMvID = "";

    $(".list-wrap").find("div[mvId]").each(function (i) {
        var mvDiv = $(this);
        var currentMvId = $(this).attr("mvId");
        //추천곡일 경우 제외
        if (currentMvId != "" && currentMvId != undefined && currentMvId !="-1" && !mvDiv.hasClass("recommend") )
        {
            strArrMvID = strArrMvID + currentMvId + ";";
        }
    });

    return strArrMvID;
}


//뮤직비디오 전체보기(mv_id 있을때와 없을때 처리)
function fnPlayMvAll(viewtype){
    var arrMvID =  fnAllMvID();

    if (arrMvID == ""){
        fnPlayMvTmp(fnAllSongID(),viewtype);
    } else {
        fnPlayMvID(arrMvID,viewtype);
    }
}








/*
 * author : Peter Hong
 ===================================================================================
*/

/*
 * 작성 날짜 : 2013-05-09
 * 최종 수정 날짜 : 2013-05-09
 * descript : 공유하기 팝업창 오픈
 -----------------------------------------------------------------------------------
 */
var winShareObj = null;
function shareDo(songids) {
    if (iMemUno == "" ){
        //alert("로그인 후 다운로드 가능합니다.");
        loginPopup();
        return false;
    }
    //수정하지 마세요. 포스트 및 중복 처리 안해도 됩니다
    winShareObj = window.open("", "_SharePresent", "top=0,left=0,width=670,height=630, toolbar=no, location=no, status=no, memubar=no, scrollbars=no, resizable=no");

	var dForm = $('<form />', {
		'action':'/share/sharePresent',
		'method':'post',
		'name':'frmSharePresent',
        'target':'_SharePresent'
	}).html($('<input />',{
		'value':songids,
		'type':'hidden',
		'name':'songids'
	}));
	dForm.appendTo('body').trigger('submit');
}



/*
 * 작성 날짜 : 2013-05-09
 * 최종 수정 날짜 : 2013-05-09
 * descript : 좋아요 및 좋아요취소
 * 			likeType		좋아요유형: 곡="SONG", 앨범="ALBUM", 아티스트="ARTIST", 뮤직비디오="MV"
 * 			clickedSongID	좋아요ID: 복수일 경우 ";"로 연결. ex) "812345678;249372193"
 -----------------------------------------------------------------------------------
 */
var cTempObj;

//좋아요 or 좋아요 취소 확인...마
function likeCancelCheck(cObj) {
    cTempObj = cObj;
    if ( $(cObj).hasClass("checked") ||  $(cObj).hasClass("active") ) {
        unlike($(cObj).attr("likeType"), $(cObj).attr("likeSongID")+";", "", likeCancelSuccess);
        return false;
    } else {
        like($(cObj).attr("likeType"), $(cObj).attr("likeSongID"), "", likeCancelSuccess);
        return false;
    }

}

//좋아요 or 좋아요 취소 확인 CSS조작 - 이규남
//2013-05-23. '|' 만으로 사용하기로 함. - 홍성호
function likeCancelSuccess(strMsg) {
    //좋아요,취소성공
    if (strMsg.indexOf('0|') != -1) {
        if ( $(cTempObj).hasClass("checked") ||  $(cTempObj).hasClass("active")) {
            if($(cTempObj).hasClass("active"))
                $(cTempObj).removeClass("active");
            else
                $(cTempObj).removeClass("checked");
        } else {
            if($(cTempObj).hasClass("active"))
                $(cTempObj).addClass("active");
            else
                $(cTempObj).addClass("checked");
        }

    }

}

//좋아요취소
function unlike(likeType, songids, unm, fnSuccess) {
    var retCode = -1;
    var selectArrID = "";
    var likeCnt	= 0;

    if (iMemUno == "" ){
        loginPopup();
        return false;
    }

    if (songids == "") {
        alert("먼저 선택해 주세요.");
        return false;
    }

    if (!confirm('좋아요 취소 하시겠습니까?') ) {
        return false;
    }

    if (songids == "") {
        selectArrID = fnSelectArrSongID();
    } else {
        selectArrID = songids;
    }

    $.ajax({
        type: "POST",
        url: "/Includes/Commons/Module/jMusicLikeCancel",
        dataType: "json",
        data: { "unm": iMemUno, "mltp": likeType, "mlsq": selectArrID },
        success: function (responseData) {
            retCode = responseData.Result.RetCode;
            if (retCode == "0") {
                likeCnt = responseData.DATA0.likeResult;
                //마이앨범에서만 refresh
                if (_rfr.indexOf('/myMusic/') != -1) {
                    location.href = _rfr; //06.01 Young
                }

                alert('좋아요 취소 되었습니다');

                fnSuccess(retCode+"|"+likeCnt);

            } else {
                retCode = "2";
                if (fnSuccess) {
                    fnSuccess(retCode+"|"+likeCnt);
                }
            }
        },
        complete: function() {
        },
        error: function(xhr,textStatus,error){
            //에러 발생시 실행
        }

    });
}

//좋아요
function like(likeType, songids, unm, fnSuccess) {
    var retCode = -1, unm = "";
    var selectArrID = "";
    var likeCnt	= 0;
    var retBadgeMsg = '';

    if (iMemUno == "" ){
        loginPopup();
        return false;
    }

    if (songids == "") {
        selectArrID = fnSelectArrSongID();

    } else {
        selectArrID = songids;

    }

    $.ajax({
        type: "POST",
        url: "/Includes/Commons/Module/jMusicLikeProc",
        dataType: "json",
        data: { "unm": iMemUno, "mltp": likeType, "mlsq": selectArrID },
        success: function (responseData) {
            retCode = responseData.Result.RetCode;
            if (retCode == "0") {
                likeCnt = responseData.DATA0.LikeCount;
                retBadgeMsg = responseData.DATA0.BADGE_MSG;

                //뱃지 발급 안내
                if (retBadgeMsg != ""){
                    FG_badgeTost(retBadgeMsg);
                }else{
                    alert('좋아요 되었습니다.');
                }

                if (fnSuccess) {
                    fnSuccess(retCode+"|"+likeCnt);
                }

            } else {
                likeCnt = 0;
                if ( retCode == "E00021" ) {
                    retCode = "2";

                } else {
                    retCode = "1";

                }

                if (fnSuccess) {
                    fnSuccess(retCode+"|"+likeCnt);

                }

            }

        }

    });

}


//중복 제거
function duplicatedSong(str){
    var arr	= str.split(";");
    var str = "";
    for (var i=0; i<arr.length; i++){
        if (str.indexOf(arr[i])<0){
            str += arr[i]+";";
        }
    }
    return str;
}

/*
 * 작성 날짜 : 2013-05-09
 * 최종 수정 날짜 : 2013-05-09
 * descript : (레이어 팝업용)새앨범 생성 및 새앨범 생성 후 리스트 바인딩
 -----------------------------------------------------------------------------------
 */
//(레이어 팝업용)새앨범 만들기
//albumName: 새앨범명
function fnNewMyAlbum(albumName, unm) {

    if (iMemUno == "" ){
        //alert("로그인 후 다운로드 가능합니다.");
        loginPopup();
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/myMusic/jSetNewAlbum",
        dataType: "json",
        data: { "unm": iMemUno, "albumName": albumName },
        success: function (responseData) {
            var retCode = responseData.Result.RetCode;
            if (retCode == "0") {
                fnMyAlbum(iMemUno);
            } else {
                alert("실패:" + retCode);
            }
        }
    });

}

//(레이어 팝업용)앨범리스트
function fnMyAlbum(unm) {
    $.ajax({
        type: "POST",
        url: "/myMusic/jGetMyAlbum",
        dataType: "json",
        data: { "unm": unm },
        success: function (responseData) {
            var retCode = responseData.Result.RetCode;
            var totalCnt = Number(responseData.PageInfo.TotCount);
            if (retCode == "0") {
                $(".myAlbumItem").remove();
                var myAlbumID, myAlbumTitle;
                for (var i = 0; i < totalCnt; i++) {
                    //myAlbumID = URLDecode(responseData.DataSet.DATA[i].MA_ID);
                    //myAlbumTitle = URLDecode(responseData.DataSet.DATA[i].MA_TITLE);
                    myAlbumID = responseData.DataSet.DATA[i].MA_ID;
                    myAlbumTitle = responseData.DataSet.DATA[i].MA_TITLE;
                    $(".myAlbum").append("<li class='myAlbumItem'><a href='#' id='myAlbumAdd' title='" + myAlbumID + "'>" + myAlbumTitle + "</a></li>");
                }
            }
        }
    });
}

function fnGetMyAlbumSongIds(iMaId) {
    var songIds = "";

    $.ajax({
        type: "POST",
        url: "/myMusic/jProfileRecommandDetail",
        dataType: "json",
        async: false,
        data: { bgsq: iMemUno, axnm: iMaId },
        success: function (responseData) {
            songIds = responseData;
        }
    });

    return (songIds == null || typeof songIds == 'undefined') ? '' : songIds;
}

function fnPlayMyAlbum(iMaId, iPlayType) {
    var songIds = fnGetMyAlbumSongIds(iMaId);

    if(songIds != '') {
        fnPlaySong(songIds, iPlayType);
    } else {
        alert('마이앨범에 담긴 곡이 없습니다.');
    }
}

function fnDownMyAlbum(iMaId) {
    var songIds = fnGetMyAlbumSongIds(iMaId);

    if(songIds != '' && typeof songIds != 'undefined') fnDownSong(songIds);
}

function fnShareMyAlbum(iMaId) {
    var songIds = fnGetMyAlbumSongIds(iMaId);

    if(songIds != '' && typeof songIds != 'undefined') shareDo(songIds);
}

// SNS 공유하기
function shareSNS(type, url) {
    var title = '';
    var summary = 'genie';
    var settings = 'toolbar=0, status=0, width=600, height=400';

    $.get('/makeShortUrl', { allurl : url })
        .done(function (data) {
            url = data;
            title = $("TITLE").text();

            switch (type) {
                case "facebook":
                    var FACEBOOK_URL = 'http://www.facebook.com/sharer.php?s=100';
                    var query;
                    query += '&p[url]=' + encodeURIComponent(url);

                    if (title != '') query += '&p[title]=' + encodeURIComponent(title);
                    if (summary != '') query += '&p[summary]=' + encodeURIComponent(summary);

                    var new_window = window.open(FACEBOOK_URL + query, 'shareFacebook', settings);
                    if (window.focus) { new_window.focus(); }
                    break;
                case "twitter":
                    var TWITTER_URL = 'http://twitter.com/share';
                    var RAND = Math.floor(Math.random() * 10);
                    var query = '?nocache=' + RAND;
                    query += '&url=' + encodeURIComponent(url);

                    if (title != '') query += '&text=' + encodeURIComponent('[' + title + ']');

                    var new_window = window.open(TWITTER_URL + query, 'shareTwitter', settings);
                    if (window.focus) { new_window.focus(); }
                    break;
            }
        });
}
//==================================================================================


//===========================================================================================
//jQuery 1.9에서 $.browser 미지원되어 재정의
/*
$.browser = {};
$.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
*/
//iframe 생성
function buildIframe(id) {
    if (!id || id=="") id="ifrm";
    $("#" + id).remove();

    var $io = $('<iframe id="' + id + '" name="' + id + '" />');
    var io = $io[0];
    var op8 = /opera/.test(navigator.userAgent.toLowerCase()) && window.opera.version() < 9;
    if (/msie/.test(navigator.userAgent.toLowerCase()) || op8) io.src = 'javascript:false;document.write("");';
    $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
    $("body").append($io);
}
//===========================================================================================



//===========================================================================================
//Data Valid Check
function fnIsNum(num){
    return (/^[0-9]+$/).test(num) ? true : false;
}

//아이디 대문자 불가 2014.09.15
function fnIsUserid(id) {
    return (/^[a-z]{1}[0-9a-z]+$/).test(id) ? true : false;
}

function fnIsPwd(pw) {
    return (/^[0-9a-zA-Z]+$/).test(pw) ? true : false;
}

function fnIsEmail(em){
    return (/\w+([-+.]+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/).test(em);
}

function fnIsEmailNew(em){
    return (/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i).test(em);
}

function fnIsMobile(hp){
    var arg = "";
    return eval("(/01[016789]" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(hp)");
}
//===========================================================================================

//팝업에서 메인창 페이지 이동
function fnViewPagePop(url) {
    try {
        var openerUrl = window.opener.location.href.toLowerCase();

        //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
        if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1 || window.opener.window.name != "genie_main"){
            var dForm = $('<form />', {
                'action': url,
                'target': "genie_main"
            });
            dForm.appendTo('body').trigger('submit');
        }else {
            window.opener.location.href=url;
        }
    }
    catch (e){
        /*
         var dForm = $('<form />', {
            'action': url,
            'target': "genie_main"
        });
        dForm.appendTo('body').trigger('submit');
        */
        javaParentHTTPSDefend(url)

    }
}

//유저 프로필 페이지 이동
function fnViewUser(varUserID)
{
    if (varUserID == "")
    {
        alert("잘못된 접근입니다.");
    }
    else
    {
        var dForm = $('<form />', {
            'action':'/myMusic',
            'method':'get',
            'name':'frmMoveData'
        }).html($('<input />',{
            'value':varUserID,
            'type':'hidden',
            'name':'bgsq'
        }));
        dForm.appendTo('body').trigger('submit');
    }
}

//유저 프로필 페이지 이동
function fnViewUserPop(varUserID)
{
    if (varUserID == ""){
        alert("잘못된 접근입니다.");
    }
    else{
        try {
            //20140203 신성하 웹플레이어 성능 개선
            var openerUrl = window.opener.location.href.toLowerCase();
//			if (openerUrl.indexOf('//www.genie.co.kr/musicplayer/f_player.asp')> -1 )
//			if (openerUrl.indexOf('//www.genie.co.kr/musicplayer/f_Musicplayer.asp')> -1 )
            if (openerUrl.indexOf('/player/fPlayer')> -1 )
            {
                throw "opener is popup";
            }
            else
            {
                //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
                if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1 || window.opener.window.name != "genie_main"){
                    var dForm = $('<form />', {
                        'action':'/myMusic',
                        'target' :"genie_main",
                        'method':'get',
                        'name':'frmMoveData'
                    }).html($('<input />',{
                        'value':varUserID,
                        'type':'hidden',
                        'name':'bgsq'
                    }));
                    dForm.appendTo('body').trigger('submit');
                }else {
                    window.opener.fnViewUser(varUserID);
                }
            }
        }
        catch (e){
            /*
             var dForm = $('<form />', {
                'action':'/myMusic',
                'target' :"genie_main",
                'method':'get',
                'name':'frmMoveData'
            }).html($('<input />',{
                'value':varUserID,
                'type':'hidden',
                'name':'bgsq'
            }));
            dForm.appendTo('body').trigger('submit');
            */
            javaParentHTTPSDefend('/myMusic?bgsq='+varUserID);
        }
    }
}

//3회 체험존 이동
function fnViewExperiencePop(){
    try {
        var openerUrl = window.opener.location.href.toLowerCase();

        //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
        if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1 || window.opener.window.name != "genie_main"){
            var dForm = $('<form />', {
                'action':'/newest/freeExperienceService',
                'target' :"genie_main"
            });
            dForm.appendTo('body').trigger('submit');
        }else {
            window.opener.location.href="/newest/freeExperienceService";
        }
    }
    catch (e){
        /*
         var dForm = $('<form />', {
            'action':'/newest/freeExperienceService',
            'target' :"genie_main"
        });
        dForm.appendTo('body').trigger('submit');
        */
        javaParentHTTPSDefend('/newest/freeExperienceService');
    }
}

//회원 가입 이동
function fnViewMemberJoinPop(op){
    var ActionUrl = (op=="j") ? "/member/signUp" : "/member/find/findPwd";

    try {
        var openerUrl = window.opener.location.href.toLowerCase();

        //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
        if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1 || window.opener.window.name != "genie_main"){
            var dForm = $('<form />', {
                'action':ActionUrl,
                'target' :"genie_main"
            });
            dForm.appendTo('body').trigger('submit');
        }else {
            window.opener.location.href="https://www.genie.co.kr"+ActionUrl;
        }
    }
    catch (e){
        /*
         var dForm = $('<form />', {
            'action': "https://www.genie.co.kr"+ActionUrl,
            'target' : "genie_main"
        });
        dForm.appendTo('body').trigger('submit');
        */
        javaParentHTTPSDefend("https://www.genie.co.kr"+ActionUrl);
    }
}

//상품페이지 이동
function fnBuyProductPop(){
    try {
        var openerUrl = window.opener.location.href.toLowerCase();

        //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
        if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1 || window.opener.window.name != "genie_main"){
            var dForm = $('<form />', {
                'action':'/buy/recommend',
                'target' :"genie_main"
            });

            dForm.appendTo('body').trigger('submit');
        }else {
            window.opener.location.href = "/buy/recommend";
        }
    }
    catch (e){
        /*
         var dForm = $('<form />', {
            'action':'/buy/recommend',
            'target' :"genie_main"
        });
        dForm.appendTo('body').trigger('submit');
        */
        javaParentHTTPSDefend("/buy/recommend");
    }
}

//이용안내 - 모바일 - PC로 변경 2014.02.06
function fnViewUseGuidePop(){
    try {
        var openerUrl = window.opener.location.href.toLowerCase();

        //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
        if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1 || window.opener.window.name != "genie_main"){
            var dForm = $('<form />', {
                'action':'/guide/genieWeb',
                'target' :"genie_main"
            });
            dForm.appendTo('body').trigger('submit');
        }else {
            window.opener.location.href="/guide/genieWeb";
        }
    }
    catch (e){
        /*
         var dForm = $('<form />', {
            'action':'/guide/genieWeb',
            'target' :"genie_main"
        });
        dForm.appendTo('body').trigger('submit');
        */
        javaParentHTTPSDefend("/guide/genieWeb");
    }
}

// 좋아요-뮤비,아티스트 좋아요 멀티 취소
function fnMultiUnlike(likeType, unm) {

    var s=0;
    var selectArrID = "";

    if(likeType=="mv") {
        $(".mv-list").find(".checkbox").each(function () {
            if ( $(".mv-list").find(".checkbox").eq(s).is(":checked") ) {
                selectArrID = selectArrID + $(this).attr("likeMVID") + ";";
            }
            s += 1;
        });
    } else {
        $(".list-wrap").find(".checkbox").each(function () {

            if ( $(".list-wrap").find(".checkbox").eq(s).is(":checked") ) {
                selectArrID = selectArrID + $(this).attr("likeArtistID") + ";";
            }
            s += 1;
        });
    }

    unlike(likeType, selectArrID, unm, '');

}

//--------------------------------------------------------------------------------------------------------------------------------
/* 이벤트 응모 후 내 정보 레이어 띄우기	*/
function fnEventJoin(uno, evtId) {
    if(uno != '' && evtId != '') {
        var param = "unm=" + uno + "&exnm=" + evtId;
        //sendRequest( "/Event/b_Event_Join.asp", param, viewResult, "POST"  );
        sendRequest( "/event/bEventJoin", param, viewResult, "POST"  );
    }
}

var httpRequest = null;

function getXMLHttpRequest() {
    if (window.ActiveXObject) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e1) {
                return null;
            }
        }
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        return null;
    }
}

function sendRequest(url, params, callback, method) {
    httpRequest = getXMLHttpRequest();
    var httpMethod = method ;
    if (httpMethod != 'GET' && httpMethod != 'POST') {
        httpMethod = 'GET';
    }
    var httpParams = (params == null || params == '') ? null : params;
    var httpUrl = url;
    if (httpMethod == 'GET' && httpParams != null) {
        httpUrl = httpUrl + "?" + httpParams;
    }

    httpRequest.open(httpMethod, httpUrl, true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.onreadystatechange = callback;
    httpRequest.send(httpMethod == 'POST' ? httpParams : null);
}

/* 이벤트 응모 결과*/
function viewResult(){
    if(httpRequest.readyState == 4){   //서버 데이터 처리가 완료된경우 4
        if(httpRequest.status == 200){ //정상적으로 처리되었을경우 200

            var reseultCode = httpRequest.responseText;

            if(reseultCode == "0") {
                fnShowMyInfo(iMemUno);	//	이벤트 응모 완료(내 정보 확인) 레이어 띄우기
            } else if(reseultCode == "1") {
                alert("이미 응모하신 이벤트입니다.");
                return false;
            } else if(reseultCode == "2") {
                alert("회원정보가 정확하지 않아 이벤트 응모가 정상적으로 이루어지지 않았습니다.");
                return false;
            } else if(reseultCode == "3") {
                alert("이벤트 응모에 실패하였습니다. 잠시후에 시도해 주세요.");
                return false;
            } else {
                return false;
            }

        }
    }
}

/*	이벤트 최초 응모시 이벤트 응모완료 레이어 띄우기 */
function fnShowMyInfo(uno) {
    if(uno != '' && $('#divMyInfo').length > 0) {
        FG_layerPopup.show($('#divMyInfo'));
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------

/* URL Decoding */
function URLDecode(txt)
{
    if (txt==undefined || txt==null || txt=="")
    {
        return txt;
    }
    //txt = txt.replaceAll(txt,"%2C",",");
    var HEXCHARS = "0123456789ABCDEFabcdef";
    var encoded = txt;
    var plaintext = "";
    var i = 0;
    while (i < encoded.length) {
        var ch = encoded.charAt(i);
        if (ch == "+") {
            plaintext += " ";
            i++;
        } else if (ch == "%") {
            if (i < (encoded.length-2) && HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 && HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
                plaintext += unescape( encoded.substr(i,3) );
                i += 3;
            } else {
                plaintext += ch;
                i++;
            }
        } else {
            plaintext += ch;
            i++;
        }
    }
    plaintext = replaceAll(plaintext,"%2C",",")
    return plaintext;
};

function replaceAll(str, searchStr, replaceStr) {
    while (str.indexOf(searchStr) != -1) {
        str = str.replace(searchStr, replaceStr);
    }
    return str;
}

function fnViewTodayMusic(date,seq){
    document.location.href = "/todayChoiceMusic/detailView?select_date=" +date + "&TSM_SEQ=" + seq;
}

function fnViewEvent(seq){
    document.location.href = "/event/detail?exnm=" + seq;
}

function fnWizBellRing(varLid) {
    alert("웹사이트의 벨/링 서비스가 종료되었습니다.\n지니 안드로이드 앱의 벨/링 메뉴를 이용해 주세요.");
    return false;
    //window.open('http://genie.wiz.co.kr/html/intro.asp?cpid=507&ktfmid='+varLid, 'WizBellRing', "width=552, height=338 , resizable=no, toolbar=no, location=no, status=no, memubar=no, scrollbars=no");
}

function fnPopPhoneCert(cert) {
    window.open("/member/info/popMobileCert?cert=" + cert, "popMobileCert", "width=552, height=338");
}

function fnSnsLink(snsFlag, url){
    var curUrl =  (url == '' || url == null || typeof url == 'undefined') ? new String(window.location): url;
    var m = "/api/makeShortUrl"
    var n = "post";
    var o = "lurl=" + escape(curUrl);
    sharFlag = "s";
    $.ajax({
        type: n,
        url: m,
        contentType: "application/x-www-form-urlencoded; charset=euc-kr",
        data: o,
        dataType: "json",
        error: function (a, b) {
            alert("SNS 공유 처리 중 에러가 발생하였습니다.");
        },
        success: function (k) {
            var RetCode = k.Result.RetCode;
            if (RetCode == "0" ){
                if (k.DataSet) {
                    //console.log("k.DataSet= "+k.DataSet.S_URL)
                    var sharUrl = URLDecode(k.DataSet.S_URL);
                    var strMsg = document.title;

                    var strSiteUrl = "";
                    if (snsFlag == "F"){
                        strSiteUrl = "http://www.facebook.com/sharer.php?u=http://"+sharUrl+"&t=" + encodeURIComponent(""+strMsg+" ") ;	// 구버전
                        window.open(strSiteUrl);
                    }else{
                        var RAND = Math.floor(Math.random() * 10);
                        strSiteUrl = "http://twitter.com/share?nocache=" + RAND+"&url=http://" + sharUrl+"&text="+encodeURIComponent("[" +strMsg+"]");
                        window.open(strSiteUrl);
                    }
                }
            }
        }
    });
}

//통합검색 결과에서 SNS 링크 공유 시 링크 URL을 아티스트, 앨범 곡 상세로 이동
function fnSnsLinkBySearch(snsFlag, snsType, snsSeq, snsTitle){
    var curUrl =  "http://www.genie.co.kr/detail/"

    switch (snsType.toLowerCase())
    {
        case "artist":
            curUrl = curUrl + "artistInfo?xxnm="+snsSeq
            break;
        case "album":
            curUrl = curUrl + "albumInfo?axnm="+snsSeq
            break;
        case "song":
            curUrl = curUrl + "songInfo?xgnm="+snsSeq
            break;
    }

    var m = "/api/makeShortUrl"
    var n = "post";
    var o = "lurl=" + escape(curUrl);
    sharFlag = "s";
    $.ajax({
        type: n,
        url: m,
        contentType: "application/x-www-form-urlencoded; charset=euc-kr",
        data: o,
        dataType: "json",
        error: function (a, b) {
            alert("SNS 공유 처리 중 에러가 발생하였습니다.");
        },
        success: function (k) {
            var RetCode = k.Result.RetCode;
            if (RetCode == "0" ){
                if (k.DataSet) {
                    var sharUrl = URLDecode(k.DataSet.S_URL);
                    var strMsg = snsTitle;
                    var strSiteUrl = "";
                    if (snsFlag == "F"){
                        strSiteUrl = "http://www.facebook.com/sharer.php?u="+sharUrl+"&t=" + encodeURIComponent(""+strMsg+" ") ;	// 구버전
                        window.open(strSiteUrl);
                    }else{
                        var RAND = Math.floor(Math.random() * 10);
                        strSiteUrl = "http://twitter.com/share?nocache=" + RAND+"&url=" + sharUrl+"&text="+encodeURIComponent("[" +strMsg+"]");
                        window.open(strSiteUrl);
                    }
                }
            }
        }
    });
}


//통합검색 결과에서 SNS 링크 공유 시 링크 URL을 아티스트, 앨범 곡 상세로 이동
function fnSnsLinkV2(snsFlag, snsType, snsSeq, snsTitle){
    var shareUrl =  "http://app.genie.co.kr/Iv3/SNS/f_get_genie.asp",
        _lt = "",
        _lp = "";

    switch(snsType.toLowerCase()) {
        case "artist":
            _lt = "07";
            _lp = snsSeq;
            break;

        case "album":
            _lt = "05";
            _lp = snsSeq;
            break;

        case "song":
            _lt = "06";
            _lp = snsSeq;
            break;

		case "today":
			_lt = "24";
			_lp = snsSeq;
			break;
		case "magazine":
			_lt = "26";
			_lp = snsSeq;
			break;
		case "video":
			_lt = "39";
			_lp = snsSeq;
			break;
	}

    if(_lp != "") {
        shareUrl = shareUrl + "?landingtype=" + _lt + "&landingtarget=" + _lp;

		var m = "/api/makeShortUrl"
		var n = "post";
		var o = "lurl=" + escape(shareUrl);
		sharFlag = "s";
		$.ajax({
			type: n,
			url: m,
			contentType: "application/x-www-form-urlencoded; charset=euc-kr",
			data: o,
			dataType: "json",
			error: function (a, b) {
				alert("SNS 공유 처리 중 에러가 발생하였습니다.");
			},
			success: function (k) {
				var RetCode = k.Result.RetCode;
				if (RetCode == "0" ){
					if (k.DataSet) {
						var sharUrl = URLDecode(k.DataSet.S_URL);
						var strMsg = snsTitle;
						var strSiteUrl = "";
						if (snsFlag == "F"){
							strSiteUrl = "http://www.facebook.com/sharer.php?u="+sharUrl+"&t=" + encodeURIComponent(""+strMsg+" ") ;	// 구버전
							window.open(strSiteUrl);
						}else if (snsFlag == "L"){
							fnCopyLink(sharUrl);
						}else{
							var RAND = Math.floor(Math.random() * 10);
							strSiteUrl = "http://twitter.com/share?nocache=" + RAND+"&url=" + sharUrl+"&text="+encodeURIComponent("[" +strMsg+"] "+sharUrl);
							window.open(strSiteUrl);
						}
					}
				}
			}
		});
	}
}



//본인인증
function fnMemConfirm(ucty) {
    /*
    1: 회원가입 시 14세미만 부모 승인
    2: 결제 시 본인 인증
    3: 스트리밍다운 본인인증(뮤직)
    4: 본인인증시 14세미만 부모 인증
    5: ID 찾기시 본인 인증
    6: PW 찾기시 본인 인증
    7: ID 전체보기시 본인 인증
    */
    window.open(vGenieUri+"/member/confirm/memberConfirmInfo?ucty=" + ucty, "popMemConfirm", "width=470, height=544");
}

function fnMemConfirmRetry() {
    fnMemConfirm(3);
}


//배너 클릭시 로그 기록 후 페이지 이동
function fnBannerLogWriteAndGoUrl(sBan_ID, sBan_ScopeID, sBan_ImgTitle, sBan_ImgPath, goUrl){
//	sBan_ID : 배너 ID , sBan_ScopeID : 영역 ID , sBan_ImgTitle : 배너 타이틀 , sBan_ImgPath : 배너 경로, goUrl : 링크 경로

    //http, https 모두 이동 하기때문에 제거 (http://www.genie.co.kr > //www.genie.cokr)
    goUrl = goUrl.replace('https:','');
    goUrl = goUrl.replace('http:','');

    //성공 실패여부와 관계없이 완료시 실행
    if (sBan_ScopeID == 'WEB_PLAYER' || sBan_ScopeID == 'MV_PLAYER'){
        //팝업창 실행시
        try
        {
            //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
            var openerUrl = window.opener.location.href.toLowerCase();
            if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1){
                var dForm = $('<form />', {
                    'action':goUrl,
                    'target' :"genie_main"
                });
                dForm.appendTo('body').trigger('submit');
            }else {
                window.opener.document.location.href=goUrl;	//페이지 이동
            }
        }
        catch (e)
        {
            //에러시 새창 띄움
            var newWin = window.open('about:blank');
            newWin.location.href = goUrl;
        }
    } else {
        location.href=goUrl;	//페이지 이동
    }

    $.ajax({
        url:"/api/banner/log",		//로그 URL
        type:"POST",
        dataType:"json",
        data:"banId="+sBan_ID+"&banScopeId="+sBan_ScopeID+"&banImgTitle="+sBan_ImgTitle+"&banImgPath="+sBan_ImgPath,
        success: function(jsonData){
            //성공시 실행
        },
        complete: function() {
        },
        error: function(xhr,textStatus,error){
            //에러 발생시 실행
        }
    });
}

//배너 클릭시 로그 기록 후 페이지 이동, 새창여부에 따라서 페이지 실행 2014.02.03 수정
function fnBannerLogWriteAndGoUrl2(sBan_ID, sBan_ScopeID, sBan_ImgTitle, sBan_ImgPath, goUrl){

    goUrl = goUrl.replace('https:','');
    goUrl = goUrl.replace('http:','');

    //성공 실패여부와 관계없이 완료시 실행
    if (sBan_ScopeID == 'NEW_WINDOW'){ //새로운 창으로
        var newWin = window.open('about:blank');
        newWin.location.href = goUrl;
    }else if (sBan_ScopeID == 'WEB_PLAYER' || sBan_ScopeID == 'MV_PLAYER'){
        try{
            //ystar일 경우 -> 외부연동일 경우로 변경 2014.04.21
            var openerUrl = window.opener.location.href.toLowerCase();
            if (openerUrl.indexOf('/ystar/?songid=')> -1 || openerUrl.indexOf('/api/musicplayer/')> -1){
                var dForm = $('<form />', {
                    'action':goUrl,
                    'target' :"genie_main"
                });
                dForm.appendTo('body').trigger('submit');
            }else {
                window.opener.document.location.href=goUrl;    //페이지 이동
            }
        }catch (e){
            if(sBan_ScopeID == 'WEB_PLAYER' || sBan_ScopeID == 'MV_PLAYER'){
                try{
                    javaParentHTTPSDefend(goUrl);
                }catch (e){
                    var newWin = window.open('about:blank'); //에러시 새창 띄움
                    newWin.location.href = goUrl;
                }
            }else{

                var newWin = window.open('about:blank'); //에러시 새창 띄움
                newWin.location.href = goUrl;
            }
        }
    } else {
        location.href=goUrl;    //페이지 이동
    }

    $.ajax({
        url:"/api/banner/log",        //로그 URL
        type:"POST",
        dataType:"json",
        data:"banId="+sBan_ID+"&banScopeId="+sBan_ScopeID+"&banImgTitle="+sBan_ImgTitle+"&banImgPath="+sBan_ImgPath,
        success: function(jsonData){
            //성공시 실행
        },
        complete: function() {
        },
        error: function(xhr,textStatus,error){
            //에러 발생시 실행
        }
    });
}


//해당 으로 사용 해야 함.
function javaParentHTTPSDefend(goUrl2)
{
    $("#httpDefend").remove();
    var dForm = $('<form />', {
        'id':"httpDefend",
        'name':"httpDefend",
        'action':goUrl2,
        'target' :"genie_main"
    });
    if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (navigator.userAgent.toLowerCase().indexOf("msie") != -1) )
    {
        if (location.protocol=="http:")
            goUrl="https://www.genie.co.kr/common/goTargetPage";
        else
            goUrl="http://www.genie.co.kr/common/goTargetPage";

        dForm.html($('<input />',{
            'value':goUrl2,
            'type':'hidden',
            'name':'goUrl'
        }));
        dForm.appendTo('body');
        buildIframe("ifr_POP");
        $("#httpDefend").attr("target","ifr_POP");
        $("#httpDefend").attr("action",goUrl);
        $("#httpDefend").submit();

    }
    else
    {
        dForm.appendTo('body').trigger('submit');
    }
}




/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));

//아이디/비밀번호 뉴정책_2014.09.12_수란
//대문자or소문자or숫자or허용특수문자가능여부 체크
//대or소문자+숫자
//대or소문자+특수문자
//대or소문자+숫자+특수문자
//공백 불가
function fnIsPwdNumberAndChar(pw) {
    if ((/^[0-9a-zA-Z\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~]+$/).test(pw) == true)
    {
        if (/[a-zA-Z]/.test(pw) && (/[0-9]/.test(pw)|| /[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~]/.test(pw))){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
//비밀번호 연속성 검사
//아스키 코드 변환하여 3자이상 중복시 불가 처리
function fnChkPwContinuity(pw){
    var nowChar = "";
    var nextChar = "";
    var len = pw.length;
    var equalscount = 0;
    var continuePlusCount = 0;
    var continueMinusCount = 0;
    for(var i = 0 ; i < len ; i++){
        if(i+1<len){
            nowChar = pw.charCodeAt(i);
            nextChar = pw.charCodeAt(i+1);
            if(nowChar==nextChar){
                equalscount++;
            }else if(nowChar!=nextChar&&equalscount==2){
                equalscount=0;
            }
            if((nowChar+1)==nextChar){
                continuePlusCount++;
            }else if((nowChar+1)!=nextChar&&continuePlusCount==2){
                continuePlusCount = 0;
            }
            if ((nowChar-1)==nextChar){
                continueMinusCount++;
            }else if((nowChar-1)!=nextChar&&continuePlusCount==2){
                continueMinusCount = 0;
            }
        }
        if(continuePlusCount >= 3 || continueMinusCount >= 3||equalscount >= 3){
            return false;
        }
    }
}
//아이디/비밀번호 일치 검사
function fnChkPwSameIDCheck(id,pw){
    var cnt = 0;
    var temp = "";
    var temp_id,temp_pass;

    for(var i = 0; i < id.length; i++){
        temp_id = id.charAt(i);

        for(var j=0;j < pw.length;j++){
            if (cnt >0){
                j = tmp_pass_no + 1;
            }
            if (temp == "r"){
                j=0;
                temp="";
            }
            temp_pass = pw.charAt(j);
            if (temp_id == temp_pass){
                cnt = cnt + 1;
                tmp_pass_no = j;
                break;
            }else if(cnt > 0 && j > 0){
                temp="r";
                cnt = 0;
            }else{
                cnt = 0;
            }
        }
        if (cnt > 3) break;
    }
    if (cnt > 3){
        return false;
    }
}

function fnChkPwd(url) {
    $("#fMyInfoPwdChk").remove();
    window.open("/member/info/popMyInfoPwdChk?forward_url="+url, "popMyInfoPwdChk", "width=388, height=193, resizable=no");
//	$("body").append(
//		"<form id='fMyInfoPwdChk' method='post' target='popMyInfoPwdChk' action='/member/info/popMyInfoPwdChk'>" +
//		"	<input type='hidden' name='forward_url' value='" + url + "' />" +
//		"</form>"
//	);
//	fMyInfoPwdChk.submit();
}

function ResizeWindow(x,y) {
    try
    {
        // tool box and border length
        var deltaHeight, deltaWidth;

        if (window.outerHeight) {
            deltaWidth = window.outerWidth - window.innerWidth;
            deltaHeight = window.outerHeight - window.innerHeight;
        }
        else {
            // if ie..
            if (document.documentElement.clientWidth) {

                // get window fake outer size
                var fakeOuterWidth = document.documentElement.clientWidth;
                var fakeOuterHeight = document.documentElement.clientHeight;

                // resize to innerSize
                window.resizeTo(fakeOuterWidth, fakeOuterHeight);

                // get window fake inner size
                var fakeInnerWidth = document.documentElement.clientWidth;
                var fakeInnerHeight = document.documentElement.clientHeight;

                // get delta
                deltaWidth = fakeOuterWidth - fakeInnerWidth;
                deltaHeight = fakeOuterHeight - fakeInnerHeight;
            }
            else {
                // not support -_-;;; ignore resizing;;;; sorry;;;;
                throw "browser does not support!"
            }
        }
        window.resizeTo(x + deltaWidth, y + deltaHeight);
    }catch(e){}
}
//관련 아티스트 정보
function fnRelationArtistList(songid) {
    var retCode, sDataSet;
    var iDataCnt = 0;
    var artistID = '';
    var relationArtistHtml = '';
    var originSongId = songid;
    songid = songid.replace(/;/g,'');
    songid = songid.replace(/_Second/g,'');	//같은페이지에 아티스트 외 목록이 2개 있을 경우 처리
    songid = songid.replace(/_Third/g,'');	//같은페이지에 아티스트 외 목록이 3개 있을 경우 처리

    //list size check
    if($("#relation-list_"+songid+"").size() >0){
        $("div .toggle-button-box").removeClass("select-button");
        return false;
    } else {
        $.ajax({
            type: "POST",
            url: "/Includes/Commons/Module/jRelationArtistList",
            dataType: "json",
            async: false,
            data: {"xgnm": songid},
            success: function (responseData) {
                retCode = responseData.Result.RetCode;
                if (retCode == "0") {
                    iDataCnt = responseData.pageInfo.TotCount;
                    sDataSet = responseData.DataSet.DATA;
                    if (iDataCnt > 1) {

                        for(var c=0; c < iDataCnt; c++){
                            relationArtistHtml += "<dt>" + sDataSet[c].key + "</dt>";
                            relationArtistHtml += "<dd>" + sDataSet[c].value + "</dd>";
                        }

                        $("#RelationArtist_" + originSongId + "").html(relationArtistHtml);
                    } else {
                        alert("관련 아티스트 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!1");
                    }
                } else {
                    alert("관련 아티스트 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!2");
                }
            },
            complete: function () {

            }
        });
    }
}

var objPopMusicHug;

//지니 뮤직허그 링크
function fnPlayMusicHug(roomId){
//	var strPlayUrl = location.protocol + "//mh-web.genie.co.kr/main/";

    var strPlayUrl = "http://mh-web.genie.co.kr/main/";

    if(roomId != null && typeof roomId !="undefined") {
//		strPlayUrl = location.protocol + "//mh-web.genie.co.kr/main/" + roomId;
        strPlayUrl = "http://mh-web.genie.co.kr/main/" + roomId;
    }


    if((objPopMusicHug == null)||((typeof objPopMusicHug == "undefined"))){
        objPopMusicHug = window["genieMugicHug"];
    }

    objPopMusicHug = window.open("", 'genieMugicHug', 'width=940, height=665, resizable=yes');
    //20140425 신성하 - 퀵플레이어 버튼 재클릭 시 리로드 방지
    try {
        var _chk_Url = objPopMusicHug.location.href.toLowerCase();

        if (_chk_Url.toLowerCase() != strPlayUrl.toLowerCase())
        {
            objPopMusicHug.location.href = strPlayUrl;
        }
        else
        {
            objPopMusicHug.focus();
        }
    } catch(e) {
        objPopMusicHug.focus();
    }
}

function fnGetSelectList(tsmseq, at){
    if (tsmseq != ""){
        var strParams = {axnm: tsmseq};
        $.post("/player/bPlayerSelectList", strParams,
            function(strResult){
                if (strResult != ""){
                    fnGetPlayList(strResult, at);
                }else{
                    alert("오늘의 선곡 수록곡 정보가 존재 하지 않습니다.");
                }
            }
        ).error(function(){
            //alert("네트워크 상태가 원할 하지 않습니다.\n잠시 후 다시 이용 해주세요![4]");
        });
    }else{
        alert("파라미터 정보가 존재 하지 않습니다.");
    }
}

function fnPlaySelectAdd(){
    try{
        objPopMusicPlayer.fnGetSelectList(strMusicTsmSeq, iMusicTsmType);
        objPopMusicPlayer.focus();
        strMusicTsmSeq = ""
        iMusicTsmType = 3;
        fnClearIntervalByCommon(InterValPlaySelect);
    }catch (e){};
};

function fnPlaySelect(tsmseq, type){
//	var strPlayUrl = location.protocol + "//www.genie.co.kr/MusicPlayer/f_MusicPlayer.asp";
    var strPlayUrl = "/player/fPlayer";

    strMusicTsmSeq = tsmseq;
    iMusicTsmType = type;

    if((objPopMusicPlayer == null)||((typeof objPopMusicPlayer == "undefined"))){
        objPopMusicPlayer = window["genieMusicPlayer"];
    }

    if (strMusicTsmSeq != ""){
        objPopMusicPlayer = window.open("", 'genieMusicPlayer', 'width=735, height=490, resizable=yes');
        var _chk_Url = objPopMusicPlayer.location.pathname.toLowerCase();
        _chk_Url = _chk_Url.replace("#","");
        if (_chk_Url.indexOf("?") != -1){
            var _chk_arr = _chk_Url.split("?");
            _chk_Url = _chk_arr[0];
        }

        if (strPlayUrl.toLowerCase().indexOf(_chk_Url) != -1){
            fnPlaySelectAdd();
        }else{
            objPopMusicPlayer.location.href = strPlayUrl;
            //setTimeout("fnPlaySelectAdd()", 1000);
            InterValPlaySelect = setInterval(fnPlaySelectAdd, 1700);
        }

    }else{
        alert("음원 정보가 없습니다.\n 정상적인 방법으로 접근 해주세요!");
    }
}

/**
 * 뮤직비디오 시간리턴
 */
function getConvertDuration(duration) {
    var retVal = "";

    var hour, temp, minute, second;

    if(duration > 86400) {
        duration = duration/24;
    }

    hour = duration / 3600;
    temp = duration % 3600;
    minute = temp / 60;
    second = temp % 60;

    pad = '00';

    hour = (pad+parseInt(hour)).slice(-pad.length);
    minute = (pad+parseInt(minute)).slice(-pad.length);
    second = (pad+parseInt(second)).slice(-pad.length);

    retVal = (hour != '00' ? hour + ':' : '') + minute + ':' + second;

    return retVal;
}


//Object 정렬
function sortObject(arr, prop, asc) {
    arr.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop] ? 1 : (a[prop] < b[prop] ? -1 : 0));
        else return (b[prop] > a[prop] ? 1 : (b[prop] < a[prop]? -1 : 0));
    });

    return arr;
}

//Array Sort
var arraySort = function(arr, prop, asc) {
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var pivot = Math.ceil(len/2);
    return arrayMerge(arraySort(arr.slice(0,pivot), prop, asc), arraySort(arr.slice(pivot), prop, asc), prop, asc);
};

var arrayMerge = function(left, right, prop, asc) {
    var result = [];
    while((left.length > 0) && (right.length > 0)) {
        //var l = decodeURIComponent(left[0][prop]),
        //	r = decodeURIComponent(right[0][prop]);
        var l = unescape(left[0][prop]),
            r = unescape(right[0][prop]);

        if(asc) {
            if(l < r) {
                result.push(left.shift());
            }else {
                result.push(right.shift());
            }
        } else {
            if(l > r) {
                result.push(left.shift());
            }else {
                result.push(right.shift());
            }
        }
    }

    result = result.concat(left, right);
    return result;
};

var arrayShuffle = function(arr) {
    var shuffle = [];
    if(arr.length < 2) return arr;

    while(arr.length > 0) {
        var ran = Math.floor(Math.random() * (arr.length - 1));
        shuffle.push(arr.splice(ran, 1)[0]);
    }

    return shuffle;
};

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

/**
 * 구매 불가 안내 팝업
 */
function blockGeniePackAlert(){
    alert('KT 전산 시스템 개편 작업으로 인해\n5월 25일(금) 23:00 ~ 5월 26일(토) 08:00 동안 \nKT 부가서비스 (지니팩, 미디어팩 상품) 가입이 중단 되오니 \n양해 부탁 드립니다.');
}

function blockPurchaseAlert(){
    //alert('KT 전산 시스템 통합 작업으로 상품 가입이 불가합니다.\n중단 일시 : 2018년 5월 25일(금) 23시 ~ 5월 26일(토) 8시\n보다 나은 서비스로 최선을 다하겠습니다.\n감사합니다.');
    alert('KT 전산 시스템 개편 작업으로 인해\n5월 25일(금) 23:00 ~ 5월 26일(토) 08:00 동안 \nKT 부가서비스 (지니팩, 미디어팩 상품) 가입이 중단 되오니 \n양해 부탁 드립니다.');
}

function blockLGPurchaseAlert(){
    alert('통신사 시스템 점검으로 상품 가입이 불가합니다.\n중단 일시 : 2018년 4월 7일 2시00분 ~ 4월 7일 4시 00분\n보다 나은 서비스로 최선을 다하겠습니다.\n감사합니다.');
}


/**
 * int value check
 */
var isInt = (function() {
    var re = /^[+-]?\d+$/;

    return function(n) {
        return re.test(n);
    }
}());


/*
 * User Agent로부터 OS, 브라우저 정보 획득
 */
function fnGetBrowserInfo() {
	var ua = navigator.userAgent.toLowerCase(),
		info = {
			os: {type: '', name: '', version: '', nickname: ''},
			browser: {name: '', version: ''}
		}

	//OS, version > browser, version
	if(ua.indexOf('windows') > -1) {
		if(ua.indexOf('nt 5.1') > -1 || ua.indexOf('nt 5.2') > -1) {
			info['os'] = {'type': 'desktop', 'name': 'Windows', 'version': 'XP'};

		} else if(ua.indexOf('nt 6.0') > -1) {
			info['os'] = {'type': 'desktop', 'name': 'Windows', 'version': 'Vista'};

		} else if(ua.indexOf('nt 6.1') > -1) {
			info['os'] = {'type': 'desktop', 'name': 'Windows', 'version': '7'};

		} else if(ua.indexOf('nt 6.2') > -1) {
			info['os'] = {'type': 'desktop', 'name': 'Windows', 'version': '8'};

		} else if(ua.indexOf('nt 6.3') > -1) {
			info['os'] = {'type': 'desktop', 'name': 'Windows', 'version': '8.1'};

		} else if(ua.indexOf('nt 6.4') > -1 || ua.indexOf('nt 10.0') > -1) {
			info['os'] = {'type': 'desktop', 'name': 'Windows', 'version': '10'};
		}

		info['os'] = {'type': 'desktop', 'name': 'Windows'};

		if(ua.indexOf('msie 8') > -1 || ua.indexOf('trident/4.0') > -1) {
			info['browser'] = {'name': 'ie', 'version': '8'};

		} else if(ua.indexOf('msie 9') > -1 || ua.indexOf('trident/5.0') > -1) {
			info['browser'] = {'name': 'ie', 'version': '9'};

		} else if(ua.indexOf('msie 10') > -1 || ua.indexOf('trident/6.0') > -1) {
			info['browser'] = {'name': 'ie', 'version': '10'};

		} else if(ua.indexOf('trident/7.0') > -1) {
			info['browser'] = {'name': 'ie', 'version': '11'};

		} else if(ua.indexOf('edge') > -1) {
            var ver = /(edge)\/([\w\s\.]+)/g.exec(ua)[2].replace(/\s/g, '');
            info['browser'] = {'name': 'Edge', 'version': ver};

		} else if(ua.indexOf('chrome') > -1) {
			var ver = /(chrome)\/([\w\s\.]+\w\s)/g.exec(ua)[2].replace(/\s/g, '');
			info['browser'] = {'name': 'Chrome', 'version': ver};

		} else if(ua.indexOf('firefox') > -1) {
			var ver = /(firefox)\/([\w\s\.]+\w\s*)/g.exec(ua)[2].replace(/\s/g, '');
			info['browser'] = {'name': 'Firefox', 'version': ver};

		} else if(ua.indexOf('safari') > -1) {
			var ver = /(safari)\/([\w\s\.]+\w)/g.exec(ua)[2].replace(/\s/g, '');
			info['browser'] = {'name': 'Safari', 'version': ver};
		}

	} else if(ua.indexOf('macintosh') > -1) {
		var ver = /(mac\sos\sx)\s?([\w\s\.]+\w)*/gi.exec(ua)[2].replace(/\_/g, '.') || '',
			nick = '';

		if(ver.indexOf('10.5') > -1) {
			nick = 'Leopard';

		} else if(ver.indexOf('10.6') > -1) {
			nick = 'Snow Leopard';

		} else if(ver.indexOf('10.7') > -1) {
			nick = 'Lion';

		} else if(ver.indexOf('10.8') > -1) {
			nick = 'Mountain Lion';

		} else if(ver.indexOf('10.9') > -1) {
			nick = 'Mavericks';

		} else if(ver.indexOf('10.10') > -1) {
			nick = 'Yosemite';

		} else if(ver.indexOf('10.11') > -1) {
			nick = 'El Capitan';

		} else if(ver.indexOf('10.12') > -1) {
			nick = 'Sierra';

		} else if(ver.indexOf('10.13') > -1) {
			nick = 'High Sierra';
		}

		info['os'] = {'type': 'desktop', 'name': 'Mac', 'version': ver, 'nickname': nick};

		if(ua.indexOf('chrome') > -1) {
			var ver = /(chrome)\/([\w\s\.]+\w\s)/g.exec(ua)[2].replace(/\s/g, '');
			info['browser'] = {'name': 'Chrome', 'version': ver};

		} else if(ua.indexOf('firefox') > -1) {
			var ver = /(firefox)\/([\w\s\.]+\w)/g.exec(ua)[2].replace(/\s/g, '');
			info['browser'] = {'name': 'Firefox', 'version': ver};

		} else if(ua.indexOf('safari') > -1) {
			var ver = /(safari)\/([\w\s\.]+\w)/g.exec(ua)[2].replace(/\s/g, '');
			info['browser'] = {'name': 'Safari', 'version': ver};
		}

	} else if(ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
		var ver = /(iphone\sos)\s?([\w\s\.]+\w)*/gi.exec(ua)[2].replace(/\slike\smac\sos\sx/g, '').replace(/\_/g, '.');
		info['os'] = {'type': 'mobile', 'name': 'iOS', 'version': ver};

	} else if(ua.indexOf('android') > -1) {
		var ver = /(android\s)\s?([\w\s\.]+\w)*/gi.exec(ua)[2];
		info['os'] = {'type': 'mobile', 'name': 'Android', 'version': ver};

	} else if(ua.indexOf('linux') > -1) {
		var ver = /(linux\s)\s?([\w\s\.]+\w)*/gi.exec(ua)[2];
		info['os'] = {'type': 'desktop', 'name': 'Linux', 'version': ''};

		if(ua.indexOf('firefox') > -1) {
			var ver = /(firefox)\/([\w\s\.]+\w)/g.exec(ua)[2].replace(/\s/g, '');
			info['browser'] = {'name': 'Firefox', 'version': ver};

		} else if(ua.indexOf('chrome') > -1) {
			var ver = /(chrome)\/([\w\s\.]+\w\s)/g.exec(ua)[2].replace(/\s/g, '');
			info['browser'] = {'name': 'Chrome', 'version': ver};
		}
	}


    return info;
}

function loginPopup() {
    PopupCenter(vGenieSsl + "/member/popLogin?page_rfr=" + escape(location.href), "popLoginSecure", 312, 382);
}

function getOpener(obj) {
    var _opener = null;

    if(typeof obj == "undefined" || obj == null) {
        if(typeof opener != "undefined") {
            if(opener != null) {
                _opener = opener;
            }
        }
    } else {
        if(typeof obj.opener != "undefined") {
            if(obj.opener != null) {
                _opener = obj.opener;
            }
        }
    }

    return _opener;
}

function fnPrntByConfirmPopop() {
    PopupCenter('/member/confirm/memberPrntByConfirm?ucty=10','popMemConfirm', 470, 462);
}

function PopupCenter(url, title, w, h) {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left + ", fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no");

    if (window.focus) {
        newWindow.focus();
    }
}

function goTagsSearch(tagCode, logYn){

    if(logYn == 'Y'){
        // 태그 검색 로그
        insertTagSearchLog(tagCode);
    }
    location.href="/playlist/tags?tags="+tagCode;
    return;
}

/**
 * 태그 검색 전 로그 쌓기
 * @param tags
 */
function insertTagSearchLog(tags){

    var strParams = {"tags" : tags};
    $.ajax({
        type:"POST",
        url:"/playlist/insertTagSearchLog",
        async: true,
        cache: false,
        data:strParams,
        success : function(data){
            var result = eval(data);
            if(result.retCode == 0 ){
                // alert(" 로그 쌓기 성공!");
                // return false;

            }
        }
    });

}

function fnGetMvTypeTag(mvType, cls) {
    var rtnTxt = '';

    if(cls == null || typeof cls == 'undefined') {
        cls = 'icon icon-box';
    }

    switch(mvType) {
        case '30851'	:	rtnTxt=''; break;
        case '30852'	:	rtnTxt='공연'; break;
        case '30853'	:	rtnTxt='티저'; break;
        case '30854'	:	rtnTxt='팬미팅'; break;
        case '30855'	:	rtnTxt='메이킹'; break;
        case '30856'	:	rtnTxt='기타'; break;
        case '31219'	:	rtnTxt='방송'; break;
        case '31220'	:	rtnTxt='스페셜'; break;
        case '31221'	:	rtnTxt='지니스픽'; break;
    }

    return rtnTxt != '' ? '<span class="' + cls + '">' + rtnTxt + '</span>' : '';
}

function fnCopyLink(link) {
	if(window.clipboardData) {
		window.clipboardData.setData("Text", link);
		alert("링크가 클립보드에 복사되었습니다.\nCTRL+V하시면 링크가 입력됩니다");
	} else {
		window.prompt("CTRL+C를 눌러 아래 링크를 복사하세요", link);
	}
}


function trustedIE(){
    var trusted = 0;

	if(isIE.toLowerCase() == 'true') {
		try {
			window.status = "test";

			if (window.status == "test") {
				trusted = 2;
			}
		} catch (e) {
			trusted = 1;
		}
	}

	return trusted;
}

function fnPrintPage(id){

	var initBody = document.body.innerHTML;

	window.onbeforeprint = function(){
		document.body.innerHTML = document.getElementById(id).outerHTML;
	}
	window.onafterprint = function(){
		document.body.innerHTML = initBody;
	}
	window.print();
}

function ResizeWindow(x,y) {
	try
	{
		// tool box and border length
		var deltaHeight, deltaWidth;

		if (window.outerHeight) {
			deltaWidth = window.outerWidth - window.innerWidth;
			deltaHeight = window.outerHeight - window.innerHeight;
		}
		else {
			// if ie..
			if (document.documentElement.clientWidth) {

				// get window fake outer size
				var fakeOuterWidth = document.documentElement.clientWidth;
				var fakeOuterHeight = document.documentElement.clientHeight;

				// resize to innerSize
				window.resizeTo(fakeOuterWidth, fakeOuterHeight);

				// get window fake inner size
				var fakeInnerWidth = document.documentElement.clientWidth;
				var fakeInnerHeight = document.documentElement.clientHeight;

				// get delta
				deltaWidth = fakeOuterWidth - fakeInnerWidth;
				deltaHeight = fakeOuterHeight - fakeInnerHeight;
			}
			else {
				// not support -_-;;; ignore resizing;;;; sorry;;;;
				throw "browser does not support!"
			}
		}
		window.resizeTo(x + deltaWidth, y + deltaHeight);
	}catch(e){}
}

function dateDiff(tp, _date1, _date2) {
	var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
	var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

	var diff = diffDate_2.getTime() - diffDate_1.getTime();
	var adder = 1;

	if(tp == 's' || tp == 'm' || tp == 'h' || tp == 'd') {
		adder *= 1000;
	}

	if(tp == 'm' || tp == 'h' || tp == 'd') {
		adder *= 60;
	}

	if(tp == 'h' || tp == 'd') {
		adder *= 60;
	}

	if(tp == 'd') {
		adder *= 24;
	}

	diff = Math.ceil(diff / adder);

	return diff;
}
