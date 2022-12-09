let tab3 = ss.getSheetByName("Published: Scam Stuff");

// ░░░░░░░░░▓ FUNCTION THAT GETS CALLED FROM THE MENU ITEM
function expandScamStuffLink() {
	
	const selected_range = SpreadsheetApp.getActiveRange();
	const number_of_rows = selected_range.getNumRows();
	const top_row = selected_range.getRow();
	let target_ids = [];

	for (i = 0; i < number_of_rows; i++){
		let active_link = tab3.getRange("B" + Number(top_row + i)).getValue();
		target_ids.push(active_link.slice(active_link.lastIndexOf("/") + 1));
	};

	getDataFromLink(target_ids);
	
	for (i = 0; i < number_of_rows; i++){
		let target_row = Number(top_row + i);
		expandLinkData(target_row, i);
	};
}

// ░░░░░░░░░▓ PULLS YOUTUBE DATA, STORES IT IN GLOBAL VARIABLE "UPLOADS"
function getDataFromLink(target_ids){
	
	let results = YouTube.Videos.list(
		'snippet, status', {
		id: target_ids
	});

	uploads = results;
}

// ░░░░░░░░░▓ SUBMITS AND MODIFIES DATA IN TAB 3
function expandLinkData(row, i){
	
	let vidTitle = uploads.items[i].snippet.title;
	let vidType;
		if (vidTitle.toLowerCase().includes("outtakes") == true) {
			vidType = "outtakes"
		} else if (vidTitle.toLowerCase().includes("teardown") == true) {
			vidType = "teardown"
		} else if (vidTitle.toLowerCase().includes("first pass edit") == true) {
			vidType = "fpe"
		} else if (vidTitle.toLowerCase().includes("the bizarre briefing") == true) {
			vidType = "tbb"
		} else if (vidTitle.toLowerCase().includes("guest interview") == true) {
			vidType = "guest interview"
		} else if (vidTitle.toLowerCase().includes("a very important meeting") == true) {
			vidType = "avim" };

	tab3.getRange("A" + row + ":B" + row)		// sets small text
		.setFontSize(8);

	tab3.getRange("C" + row + ":I" + row)		// sets normal text
		.setFontSize(10);

	tab3.getRange("G" + row)					// sets small text
		.setFontSize(8);

	tab3.getRange(row + ":" + row)				// sets alignment for entire row
		.setVerticalAlignment("middle")
		.setHorizontalAlignment("left");

	tab3.getRange("A" + row + ":F" + row)		// horizontally centers A to F
		.setHorizontalAlignment("center");

	tab3.getRange("B" + row)					// horizontally rights B
		.setHorizontalAlignment("right");

	tab3.getRange("E" + row)					// horizontally lefts E
		.setHorizontalAlignment("left");
	
	tab3.getRange("G" + row)					// horizontally rights G
		.setHorizontalAlignment("right");
	
	tab3.getRange("A" + row)					// sets the air date to the date the selected video was published
		.setValue(new Date(uploads.items[i].snippet.publishedAt))
		.setNumberFormat("yyyy-mm-dd");

	tab3.getRange("C" + row)					// updates video status
		.setValue(uploads.items[i].status.privacyStatus);
	
	tab3.getRange("E" + row)					// updates the published episode title
		.setValue(vidTitle);

	if (vidType != null){
		tab3.getRange("F" + row)
			.setValue(vidType);};
}