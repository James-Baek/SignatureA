
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });
        // initialize playlist and controls
        
        var index = 0,
            playing = false,
            // mediaPath = 'https://archive.org/download/mythium/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "밤 편지",
                "duration": "2:46",
                "hash": "QmdhhVSLYEWZM3MgU2xHyiQM3sFwzfcFNoEbUM3NJiE6Mk"
            }, {
                "track": 2,
                "name": "음양사",
                "duration": "2:30",
                "hash": "QmW7jeszPnELWjGo1HwzuEfjQGXHndMTm4WYLMCXoKuNys"
            }, {
                "track": 3,
                "name": "Osaka",
                "duration":"3:10",
                "hash": "QmcZxSN8xrh7Q3TchamHpkLtzF4RzwHABJbk1cs4bJaYJU"
                // "file": "BS_ATKM"
            }, {
                "track": 4,
                "name": "lemon tree",
                "duration": "2:37",
                "hash": "QmYYLuYxFjRJy8VQchbu8SJfR5s2fJdsQXrur88qjXADrM"
            }, {
                
                "track": 5,
                "name": "피땀 눈물",
                "duration": "4:31",
                "hash": "QmYYLuYxFjRJy8VQchbu8SJfR5s2fJdsQXrur88qjXADrM"
                
            }, {
                "track": 6,
                "name": "Life is race",
                "duration": "3:34",
                "hash": "QmYYLuYxFjRJy8VQchbu8SJfR5s2fJdsQXrur88qjXADrM"
            }, {
                "track": 7,
                "name": "We will rock you",
                "duration": "3:38",
                "hash": "QmYYLuYxFjRJy8VQchbu8SJfR5s2fJdsQXrur88qjXADrM"
            },

    
        
        
        ],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                    console.log(trackNumber,trackName,trackDuration)
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                // audio.src = mediaPath + tracks[id].file + extension;
                const repoPath = 'ipfs-' + Math.random()
                const node = new Ipfs({ repo: repoPath })
                node.on('ready',() => {
                Hls.DefaultConfig.loader = HlsjsIpfsLoader
                Hls.DefaultConfig.debug = false 
                if (Hls.isSupported()) {
                    const audio = document.getElementById('audio1')
                    const hls = new Hls()
                    hls.config.ipfs = node 
                    hls.config.ipfsHash = tracks[id].hash 
                    hls.loadSource('master.m3u8')
                    hls.attachMedia(audio)
                    hls.on(Hls.Events.MANIFEST_PARSED, () => audio.play())
                }
            })
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        // extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // boo hoo
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
    });
    
    
    