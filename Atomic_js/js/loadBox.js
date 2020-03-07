$(function() 
{
	 $("#loadBox")
	.css( 
	{
		
	   "background":"rgba(255,255,255,0.5)"
	})
	.dialog({ autoOpen: false, 
		show: { effect: 'fade', duration: 200 },
		hide: { effect: 'fade', duration: 200 } 
	});
	
	 $("#loadButton")
       .text("") // sets text to empty
	.css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9", 
	  "position":"absolute", "top":"70px", "left":"4px"
	}) // adds CSS
    .append("<img width='32' height='32' src='images/B-button.png'/>")
    .button()
	.click( 
		function() 
		{ 
			$("#loadBox").dialog("open");
		});
});