
function reload_active_elements() {
	for(var i = 0 ; i < ref_list.length;i++)
		{					
				if(id_check==ref_list[i].id.toString())
				{
				console.log(lightbulb_m);
				lightbulb_m.material = ref_list[i].object.material;
				renderer_m.render(scene_m, camera_m);
				i = ref_list.length - 1;
				}	
		}
}

		function save_file()
		{
			//to jest z json'a na object
			//JSON.parse('{ "name":"John", "age":30, "city":"New York"}'); 

					var textFile = new Blob([JSON.stringify(lightbulb_m.material)], {
				   type: 'text/plain'
				});
				invokeSaveAsDialog(textFile, 'TextFile.txt');
		}
		
		function loadfilematerial(){
			var fileToLoad = document.getElementById("mInput").files[0];
			var fileReader = new FileReader();
			fileReader.onload = function(fileLoadedEvent){
				var textFromFileLoaded = fileLoadedEvent.target.result;
				file_value = fileLoadedEvent.target.result;
				var x = fileLoadedEvent.target.result.toString();


				console.log(fileReader.result.toString());
				
		}
		function invokeSaveAsDialog(file, fileName) {
			if (!file) {
				throw 'Blob object is required.';
			}

			if (!file.type) {
				try {
					file.type = 'video/webm';
				} catch (e) {}
			}

			var fileExtension = (file.type || 'video/webm').split('/')[1];

			if (fileName && fileName.indexOf('.') !== -1) {
				var splitted = fileName.split('.');
				fileName = splitted[0];
				fileExtension = splitted[1];
			}

			var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

			if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
				return navigator.msSaveOrOpenBlob(file, fileFullName);
			} else if (typeof navigator.msSaveBlob !== 'undefined') {
				return navigator.msSaveBlob(file, fileFullName);
			}

			var hyperlink = document.createElement('a');
			hyperlink.href = URL.createObjectURL(file);
			hyperlink.download = fileFullName;

			hyperlink.style = 'display:none;opacity:0;color:transparent;';
			(document.body || document.documentElement).appendChild(hyperlink);

			if (typeof hyperlink.click === 'function') {
				hyperlink.click();
			} else {
				hyperlink.target = '_blank';
				hyperlink.dispatchEvent(new MouseEvent('click', {
					view: window,
					bubbles: true,
					cancelable: true
				}));
			}

			(window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
		}
