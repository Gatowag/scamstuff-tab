function populateScamStuffLatest(){
    getScamStuffLatest();

    tab3.insertRowBefore(2);
    tab3.getRange("B2")
        .setValue("https://youtu.be/" + uploads.items[0].snippet.resourceId.videoId);
    tab3.setActiveSelection(tab3.getRange("D2"));
    expandScamStuffLink();
}

function getScamStuffLatest(){
	
	let results = YouTube.Channels.list('contentDetails', {
		id: "UCRI95a1fRD_8RTH1Wpz7P9A"
	});

	for (var i = 0; i < results.items.length; i++) {
		var item = results.items[i];
		var playlistId = item.contentDetails.relatedPlaylists.uploads;
		var playlistResponse = YouTube.PlaylistItems.list('snippet', {
			playlistId: playlistId,
			maxResults: 1,
		});
	}

	uploads = playlistResponse;
}