function retrieveMyUploads() {
    var results = YouTube.Channels.list('contentDetails', {mine: true});
    for(var i in results.items) {
        var item = results.items[i];
        // Get the playlist ID, which is nested in contentDetails, as described in the
        // Channel resource: https://developers.google.com/youtube/v3/docs/channels
        var playlistId = item.contentDetails.relatedPlaylists.uploads;

        var nextPageToken = '';

        // This loop retrieves a set of playlist items and checks the nextPageToken in the
        // response to determine whether the list contains additional items. It repeats that process
        // until it has retrieved all of the items in the list.
        while (nextPageToken != null) {
            var playlistResponse = YouTube.PlaylistItems.list('snippet', {
                playlistId: playlistId,
                maxResults: 25,
                pageToken: nextPageToken
            });

            for (var j = 0; j < playlistResponse.items.length; j++) {
                var playlistItem = playlistResponse.items[j];
                Logger.log('[%s] Title: %s',
                    playlistItem.snippet.resourceId.videoId,
                    playlistItem.snippet.title);

            }
            nextPageToken = playlistResponse.nextPageToken;
        }
    }
}


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'mhHqonzsuoA',
        playerVars: { 'autoplay': 0, 'controls': 1, 'playlist':['mhHqonzsuoA', 'iquhBgM-Qv0','Mgfe5tIwOj0','11DoZ4Fl928', 'JfsjpG2ivxQ', 'cxtnot8lY4U', 'J3YdO44YNBE', 'kN0iD0pI3o0', '8AtiHCDGZ8c', 'p6U7zIY6zkA']},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

function onPlayerReady(event) {
    event.target.setVolume(100);
    event.target.playVideo();
}