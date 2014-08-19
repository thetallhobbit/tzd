
var map = new L.Map('map',{
	zoomControl:false,
	maxZoom:20,
	minZoom:16
});

//Disable zoom handlers, disable dragging function;
//map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
//map.scrollWheelZoom.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();

map.fitBounds([
	[53.34189,-6.259525],
	[53.345484,-6.249404]
]);

var imageUrl='https://www.scss.tcd.ie/~plin/zombie/images/map-big-new-black.jpg',
	imageBounds = [[53.346836,-6.262141],[53.340691,-6.247056]]; //northWest, southEast
	
L.imageOverlay(imageUrl,imageBounds).addTo(map);

//window.addEventListener('resize', function(event){
//	var width=document.documentElement.clientWidth;	
//	if (width < 640){
//		map.setZoom(16);
//		map.dragging.enable();
//};
//});


//set icon for markers
var redIcon = L.icon({
	iconUrl:'images/marker.png',
	iconSize:[20,20],
	iconAnchor:[10,10]
//popupAnchor:
})

//Create an empty layer to load the polygon
var featureLayer = new L.GeoJSON();

var defaultStyle = {
	color:"#EC8080",
	weight:1.5,
	opacity:1,
	fillColor:"#EC8080",
	fillOpacity:0.7
};

var highlightStyle = {
	color:"#D90000",
	weight:1.5,
	opacity:1,
	fillColor:"#D90000",
	fillOpacity:0.7
}

var enteredStyle = {
	color:"#95D1DA",
	weight:1.5,
	opacity:1,
	fillColor:"#95D1DA",
	fillOpacity:0.7	
}

//add markers: [pointID{str}, buildingID{int}, Lat, Lng, url{str}, fileType{str}]
function add_marker(targetBounds){
	var points = [
		["p83", 0, 53.34447, -6.25895, "evidence/83_newsreport_outbreak.html", "image"],
		["p86", 3, 53.34453, -6.2585, "evidence/86_howtokill3.html", "image"],
		["p30", 3, 53.34443, -6.25854, "evidence/30_pamphlet.html", "image"],
		["p89", 3, 53.34446, -6.2583, "evidence/89_blowupdublin.html", "image"],
		["p90", 3, 53.34447, -6.25857, "evidence/90_aimforhead.html", "image"],
		["p92", 2, 53.34412, -6.25798, "evidence/92_trinity_evac_map.html", "image"],
		["p78", 2, 53.34401, -6.25808, "evidence/78_chase_video.html", "film"],
		["p48", 2, 53.34423, -6.25816, "evidence/48_rivera_id.html", "image"],
		["p08", 4, 53.34469, -6.25795, "evidence/08_axel_lab.html", "image"],
		["p93", 4, 53.3447, -6.25816, "evidence/93_aegis_report1.html", "image"],
		["p73", 4, 53.34484, -6.25798, "evidence/73_this_is_the_end.html", "image"],
		["p94", 19, 53.34435, -6.25205, "evidence/94_aegis_report2.html", "image"],
		["p40", 19, 53.34413, -6.25206, "evidence/40_newsreport_quarantine.html", "film"],
		["p15", 19, 53.34419, -6.25176, "evidence/15_benAudio.html", "audio"],
		["p67", 19, 53.34431, -6.25171, "evidence/67_diary5.html", "image"],
		["p05", 10, 53.34323, -6.25624, "evidence/05_newspaper_supercure.html", "image"],
		["p09", 10, 53.34324, -6.25586, "evidence/09_fergAudio.html", "audio"],
		["p37", 10, 53.34266, -6.25583, "evidence/37_china.html", "image"],
		["p23", 8, 53.34397, -6.25637, "", "image"],
		["p28", 8, 53.34393, -6.2563, "", "image"],
		["p00", 8, 53.34399, -6.25714, "evidence/00_bbc.html", "image"],
		["p60", 8, 53.34394, -6.25656, "evidence/60_book_of_kells.html", "image"],
		["p39", 8, 53.34394, -6.25682, "evidence/39_who_id.html", "image"],
		["p56", 9, 53.34529, -6.25665, "evidence/56_diary3.html", "image"],
		["p50", 9, 53.34516, -6.25685, "", "image"],
		["p77", 9, 53.345, -6.25709, "evidence/77_grave_video.html", "film"],
		["p01", 16, 53.34421, -6.2527, "", "image"],
		["p25", 16, 53.34426, -6.25286, "evidence/25_idm_bankrupt.html", "image"],
		["p35", 16, 53.34435, -6.25316, "evidence/35_ny_newspaper.html", "image"],
		["p79", 16, 53.34422, -6.25236, "", "film"],
		["p02", 1, 53.34374, -6.25877, "", "image"],
		["p03", 1, 53.34358, -6.25864, "evidence/03_deposit_receipt.html", "image"],
		["p22", 1, 53.34389, -6.25879, "evidence/22_Fire_Report.html", "image"],
		["p26", 1, 53.34361, -6.25874, "", "image"],
		["p57", 1, 53.34347, -6.2588, "evidence/57_classified_book_of_kells.html", "image"],
		["p58", 1, 53.3438, -6.25869, "evidence/58_kyleAudio.html", "audio"],
		["p7", 15, 53.34493, -6.25435, "", "film"],
		["p46", 15, 53.34472, -6.25441, "evidence/46_quarantine_skip.html", "image"],
		["p62", 15, 53.34474, -6.25433, "evidence/62_dustmasks.html", "image"],
		["p87", 15, 53.34481, -6.25415, "evidence/87_howtokill2.html", "image"],
		["p10", 14, 53.34319, -6.25502, "evidence/10_faulkner_child.html", "image"],
		["p33", 14, 53.34287, -6.2552, "", "image"],
		["p34", 14, 53.34332, -6.25425, "evidence/34_Faulkner1.html", "image"],
		["p55", 14, 53.34301, -6.25304, "evidence/55_quarantine_truck.html", "image"],
		["p59", 14, 53.34246, -6.25402, "evidence/59_virus.html", "image"],
		["p69", 14, 53.34292, -6.25456, "evidence/69_research_report_stage2.html", "image"],
		["p70", 14, 53.34277, -6.2548, "evidence/70_Experimental_Trial2.html", "image"],
		["p74", 14, 53.34285, -6.25449, "evidence/74_biohazard.html", "image"],
		["p04", 22, 53.34272, -6.25069, "evidence/04_newsreport_research_start.html", "film"],
		["p16", 22, 53.34267, -6.25114, "evidence/16_test_results_formula.html", "image"],
		["p51", 22, 53.34263, -6.25092, "evidence/51_Stage2.html", "image"],
		["p11", 7, 53.34313, -6.25684, "", "image"],
		["p52", 7, 53.34301, -6.2567, "evidence/52_RyanAudio.html", "audio"],
		["p54", 7, 53.34307, -6.25646, "evidence/54_Experimental_Trial1.html", "image"],
		["p91", 7, 53.34327, -6.25723, "evidence/91_dublin_map.html", "image"],
		["p12", 23, 53.34319, -6.25074, "", "image"],
		["p21", 23, 53.3433, -6.25035, "evidence/21_newsreport_explosion.html", "film"],
		["p76", 23, 53.3432, -6.2504, "evidence/76_Stage3.html", "image"],
		["p14", 6, 53.34527, -6.25792, "evidence/14_testing_results_phase4.html", "image"],
		["p29", 6, 53.34491, -6.25767, "", "image"],
		["p47", 6, 53.34513, -6.25751, "", "image"],
		["p53", 6, 53.34514, -6.25793, "evidence/53_Faulkner2.html", "image"],
		["p72", 6, 53.34526, -6.25743, "evidence/72_diary6.html", "image"],
		["p82", 6, 53.34505, -6.25737, "evidence/82_zombie_pic.html", "image"],
		["p17", 20, 53.34363, -6.25093, "", "image"],
		["p18", 20, 53.34367, -6.25122, "", "image"],
		["p19", 20, 53.34379, -6.25094, "", "image"],
		["p43", 20, 53.34391, -6.25108, "evidence/43_avoid_direct_contact.html", "image"],
		["p24", 17, 53.34212, -6.25313, "", "image"],
		["p38", 17, 53.34223, -6.25363, "evidence/38_press_conference.html", "film"],
		["p44", 17, 53.34214, -6.25348, "evidence/44_auth_personnel.html", "image"],
		["p81", 17, 53.34217, -6.25323, "evidence/81_cctv1.html", "image"],
		["p27", 5, 53.34384, -6.25776, "evidence/27_boarding_card.html", "image"],
		["p41", 5, 53.34388, -6.25757, "", "image"],
		["p68", 5, 53.34399, -6.25768, "evidence/68_classified_relocate.html", "image"],
		["p31", 12, 53.34428, -6.25626, "", "image"],
		["p32", 12, 53.34436, -6.25626, "evidence/32_medCert.html", "image"],
		["p42", 12, 53.34448, -6.25624, "evidence/42_diary1.html", "image"],
		["p49", 12, 53.34458, -6.25626, "evidence/49_diary2.html", "image"],
		["p65", 12, 53.34462, -6.25624, "evidence/65_diary4.html", "image"],
		["p63", 12, 53.34411, -6.25627, "evidence/63_syringe.html", "image"],
		["p36", 13, 53.34441, -6.25517, "", "image"],
		["p66", 13, 53.34419, -6.25525, "evidence/66_evac_med_centre.html", "image"],
		["p84", 13, 53.34419, -6.2557, "evidence/84_berkeley_cctv.html", "film"],
		["p71", 13, 53.34434, -6.25572, "evidence/71_classified_rivera.html", "image"],
		["p45", 18, 53.34275, -6.25283, "evidence/45_zombru.html", "image"],
		["p61", 18, 53.3427, -6.25289, "", "image"],
		["p85", 18, 53.3426, -6.25289, "evidence/85_CCTVToilet.html", "film"],
		["p88", 11, 53.34369, -6.25608, "evidence/88_how_to_kill1.html", "image"],
		["p75", 11, 53.34341, -6.25616, "evidence/75_Faulkner3.html", "image"],
		["p80", 11, 53.3434, -6.25584, "evidence/80_Infirmary.html", "film"],
		["p20", 11, 53.34361, -6.25589, "evidence/20_explosionvid.html", "film"],
		["p13", 21, 53.34243, -6.25123, "", "image"],
		["p06", 21, 53.34222, -6.251, "evidence/06_pic_of_team.html", "image"],
		["p64", 21, 53.34231, -6.25123, "evidence/64_bloodsample.html", "image"]
	];
	var marker = [];
	var i;
	for (i=0;i<points.length;i++){
		if (targetBounds.contains([points[i][2], points[i][3]])){
			marker[i] = new L.marker([points[i][2], points[i][3]],{icon:redIcon,win_url:points[i][4]});
			marker[i].addTo(map);
			marker[i].on('click',markerClick);
			};
	};
}

function markerClick(e){
	console.log(this.options.win_url);
	window.open(this.options.win_url,"_blank");
}


				//location [53.34258,-6.25125]
				//location:[53.34228,-6.25141]

var onEachFeature = function(feature, layer) {
	layer.setStyle(defaultStyle);

	(function(layer, properties){
		layer.on("mouseover",function(e){
		
			layer.setStyle(highlightStyle);

			var popup = $("<div></div>", {
				id:"popup-" + properties.ID,
				class:"popup-map",
			});

			var hed = $("<div></div>",{
				text:properties.BUILDING,
			}).appendTo(popup);

			popup.appendTo("#map");

			layer.on("click",function(e){
				var targetBounds = e.target.getBounds()
				map.fitBounds(targetBounds);

				add_marker(targetBounds);				
				
				map.removeLayer(featureLayer);
				$("#popup-"+properties.ID).remove();


				
//Todo: the marker should be loaded via GeoJson or a list!
				//location [53.34258,-6.25125]
				//location:[53.34228,-6.25141]

//				var marker_1 = L.marker([53.34258,-6.25125],{icon:redIcon},{win_url:"http://www.google.com/"}).addTo(map);
//				var marker_2 = L.marker([53.34228,-6.25141],{icon:redIcon},{win_url:"http://www.baidu.com/"}).addTo(map);

//				marker_1.on('click',onClick);
//				marker_2.on('click',onClick);
				
//				function onClick(e){
//					console.log(this.options.win_url);
//					window.open(this.options.win_url);
//				}
//might be useful in the future:
//				map.addLayer(marker);
//				map.removeLayer(marker);
//Todo: add a back-button which will send the user back to the original setting/map if clicked, and suicide once the original setting/map is achieved.
			});
		});
		//create a mouseover event that undoes the mouseover changes
		layer.on("mouseout",function(e){
			layer.setStyle(defaultStyle);
			$("#popup-"+properties.ID).remove();
		});

	})(layer, feature.properties);
};

//Add the GeoJSON to the layer, which is loaded in the <head>
var featureLayer = L.geoJson(boundaries, {
	onEachFeature: onEachFeature
});

//for testing
		var popup = L.popup();
		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
		}
		map.on('click', onMapClick);
//end of for testing

map.addLayer(featureLayer);