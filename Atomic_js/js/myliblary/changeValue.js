$(function() 
{
	 $("#changeBox")
	.css( 
	{
	   "background":"rgba(255,255,255,0.5)"
	})
	.dialog({ autoOpen: false, 
		show: { effect: 'fade', duration: 500 },
		hide: { effect: 'fade', duration: 500 } 
	});
	
	 $("#changeButton")
       .text("") // sets text to empty
	.css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9", 
	  "position":"absolute", "top":"36px", "left":"4px"
	}) // adds CSS
    .append("<img width='32' height='32' src='images/A-button.png'/>")
    .button()
	.click( 
		function() 
		{ 
			$("#changeBox").dialog("open");
		});
});