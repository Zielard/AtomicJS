/**
 * @author Piotr Zieli&#65533;ski http://pzcv.cba.pl/
 */
 
function updateDropdown(target, list){   
	innerHTMLStr = "";
	for(var i=0; i<list.length; i++){
		var str = "<option value='" + list[i] + "'>" + list[i] + "</option>";
		innerHTMLStr += str;        
	}
	console.log(target.domElement);
	if (innerHTMLStr != "") target.domElement.children[0].innerHTML = innerHTMLStr;
}

 function addLight()
 {	
 

			if( flag_light == true)
			{
				var new_group = new THREE.Group(); 
							// LIGHT
			var light = new THREE.PointLight(0xffffff);
			light.position.set(10,10,10);
			new_group.add(light );
			// need to add an ambient light
			//  for ambient colors to be visible
			// make the ambient light darker so that
			//  it doesn't overwhelm (like emmisive light)
			var light2 = new THREE.AmbientLight(0x333333); 
			light2.position.set( light.position );
			new_group.add(light2);
			
			var lightH = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );		//dodajemy tez delikatne swiatlo hemisferyczne
			new_group.add( lightH );

			// var lightbulbGeometry = new THREE.SphereGeometry( 2, 2, 2 );
			// var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
			// var lightbulb = new THREE.Mesh( lightbulbGeometry, wireMaterial );
			// lightbulb.position.copy( light.position );
			// group_Light.add(sphere);
			// scene.add(lightbulb);
			// scene.add(light);
			
					var lightbulbGeometry = new THREE.SphereGeometry(1,10,10);
					var wireMaterial = new THREE.MeshPhongMaterial( { color: 0xff8000} );	
					var lightbulb = new THREE.Mesh( lightbulbGeometry, wireMaterial );
					lightbulb.position.copy( light.position );
					new_group.add(lightbulb);
				    group_Light.add(new_group);
					//group_Light.add(control_light);
					scene.add(group_Light);
					const index = list_lights.length;
					group_Light.name ="Light " + (index +1);
					onOffCubes.push( group_Light );

					/////////////////	
					list_lights.push(new_group.uuid);
					updateDropdown(lightList , list_lights);
				}
				else
				{
					var new_group = new THREE.Group(); 
					flag_light = true;
								// LIGHT
			var light = new THREE.PointLight(0xffffff);
			light.position.set(10,10,10);
			new_group.add(light );
			// need to add an ambient light
			//  for ambient colors to be visible
			// make the ambient light darker so that
			//  it doesn't overwhelm (like emmisive light)
			var light2 = new THREE.AmbientLight(0x333333); 
			light2.position.set( light.position );
			new_group.add(light2);
			
			var lightH = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );		//dodajemy tez delikatne swiatlo hemisferyczne
			new_group.add( lightH );

					
					var lightbulbGeometry = new THREE.SphereGeometry(1,10,10);
					var wireMaterial = new THREE.MeshPhongMaterial( { color: 0xff8000} );	
					var lightbulb = new THREE.Mesh( lightbulbGeometry, wireMaterial );
					lightbulb.position.copy( light.position );
					new_group.add(lightbulb);
					group_Light.add(new_group);
					//new_group
					const index = list_lights.length;
					group_Light.name ="Light " + (index +1);
					list_lights.push(new_group.uuid);
					scene.add(group_Light);
					onOffCubes.push( group_Light );
					//removeGui();
					updateDropdown(lightList , list_lights);
				}
				
 }
  function deleteLight()
 {
						let flag = false;

						for(var  i = 0 ;i<group_Light.children.length;i++){ 
							var next = group_Light.children[i];
							for(var  j = 0 ;j<next.children.length;j++){ 
								if(next.children[j] == activ_light)
								{
									control.position.set(orgin_ray_posx,orgin_ray_posy,orgin_ray_posz);
									control.attach( group_item );
									//console.log( "aaa" );
									flag = true;
								next.remove(next.children[j]); 
								}
							}
							if(flag == true)
							{
								flag = false;
								var temp = [];
								for(var  x = 0 ;x<list_lights.length;x++)
								{
									if(group_Light.children[i].uuid !=list_lights[x])
									{
										temp.push(list_lights[x]);
									}
								}
								list_lights = temp;
							group_Light.remove(group_Light.children[i])
							}
						}

						

					updateDropdown(lightList , list_lights);
 }
   function on_off_hemi()
 {
						let flag = false;
						for(var  i = 0 ;i<group_Light.children.length;i++){ 
							var next = group_Light.children[i];
							for(var  j = 0 ;j<next.children.length;j++){ 
							console.log(next.children[j]);
								if(next.children[j].type == "HemisphereLight")
								{
									if(next.children[j].intensity > 0.0)
									{
										value_inten_hemi = next.children[j].intensity;
										next.children[j].intensity = 0.0;
									}
									else
									{
										next.children[j].intensity = value_inten_hemi;
									}
									
								}
							}
						}
 }
    function chlighthemi(value)
 {
						
						for(var  i = 0 ;i<group_Light.children.length;i++){ 
							var next = group_Light.children[i];
							for(var  j = 0 ;j<next.children.length;j++){ 
							if(next.children[j].type == "HemisphereLight")
								{
					           next.children[j].intensity = value;
								}
							}
						}
 }
     function chlightPoint(value)
 {
						
						for(var  i = 0 ;i<group_Light.children.length;i++){ 
							var next = group_Light.children[i];
							for(var  j = 0 ;j<next.children.length;j++){ 
							if(next.children[j].type == "PointLight")
								{
					           next.children[j].intensity = value;
								}
							}
						}
 }
 function reload_scene()
 {
	 for(let i =0;i<ref_list.length;i++)
	 {
		 if(ref_list[i].name == "Sphere")
		 {
			 if(parameters.render_type == "low")
			{
				let temp = ref_list[i];
				ref_list[i].object.geometry = new THREE.SphereBufferGeometry( parseFloat(atomrad[list[i].id])*0.5, 3, 5 );	
				ref_list[i].material = temp.material;
			}
			else
			{
				let temp = ref_list[i];
				ref_list[i].object.geometry = new THREE.SphereBufferGeometry( parseFloat(atomrad[list[i].id])*0.5, 10, 10 );
				ref_list[i].material = temp.material;
			}
			//console.log( "sphere" );
		 }
		 else
		 {
			 //console.log( ref_list[i].object);
			if(parameters.render_type == "low")
			{
				//cylinder.geometry.name = ref_list[j].id + ref_list[i].id;
								let temp = ref_list[i];
			let new_geo = new THREE.CylinderBufferGeometry(ref_list[i].object.geometry.parameters.radiusTop,
															ref_list[i].object.geometry.parameters.radiusTop,
															ref_list[i].object.geometry.parameters.height, 3, 3,false );
			new_geo.name = ref_list[i].object.geometry.name;
			ref_list[i].object.geometry = new_geo;
			ref_list[i].object.geometry.applyMatrix(ref_list[i].orientation);
							ref_list[i].material = temp.material;
			}
			else
			{
								let temp = ref_list[i];
			let new_geo = new THREE.CylinderBufferGeometry(ref_list[i].object.geometry.parameters.radiusTop,
																ref_list[i].object.geometry.parameters.radiusTop,
															ref_list[i].object.geometry.parameters.height, 15,15,false );
			new_geo.name = ref_list[i].object.geometry.name;
			ref_list[i].object.geometry = new_geo;
			ref_list[i].object.geometry.applyMatrix(ref_list[i].orientation);
										ref_list[i].material = temp.material;
			}
			// console.log( "stick" );
		 }
	 }
	 
	 for(let i =0;i<outline_list.length;i++)
	 {
		 if(outline_list[i].name == "Sphere")
		 {
			 if(parameters.render_type == "low")
			{
				outline_list[i].object.geometry = new THREE.SphereBufferGeometry( parseFloat(atomrad[outline_list[i].id])*0.5, 3, 5 );	
			}
			else
			{
				outline_list[i].object.geometry = new THREE.SphereBufferGeometry( parseFloat(atomrad[outline_list[i].id])*0.5, 10, 10 );
			}
			//console.log( "sphere" );
		 }
		 else
		 {
			 //console.log( ref_list[i].object);
			if(parameters.render_type == "low")
			{
				//cylinder.geometry.name = ref_list[j].id + ref_list[i].id;
			let new_geo = new THREE.CylinderBufferGeometry(outline_list[i].object.geometry.parameters.radiusTop,
															outline_list[i].object.geometry.parameters.radiusTop,
				  											outline_list[i].object.geometry.parameters.height, 3, 3,false );
			new_geo.name = outline_list[i].object.geometry.name;
			outline_list[i].object.geometry = new_geo;
			outline_list[i].object.geometry.applyMatrix(outline_list[i].orientation);
			}
			else
			{
			let new_geo = new THREE.CylinderBufferGeometry(outline_list[i].object.geometry.parameters.radiusTop,
															outline_list[i].object.geometry.parameters.radiusTop,
				 	 										outline_list[i].object.geometry.parameters.height, 15,15,false );
			new_geo.name = outline_list[i].object.geometry.name;
			outline_list[i].object.geometry = new_geo;
			outline_list[i].object.geometry.applyMatrix(outline_list[i].orientation);
			}
			// console.log( "stick" );
		 }
	 }
	 //scene.add(group_item);
 }
 function deletestick()
 {
						for(var  j = 0 ;j<group_item.children.length;j++){ 
							for(var  i = 0 ;i<group_item.children.length;i++){ 
									var next = group_item.children[i];

										if(next.geometry.name == stick_activ_group_1+stick_activ_group_2 || 
										   next.geometry.name == stick_activ_group_2+stick_activ_group_1)
										{
										group_item.remove(next); 
										}
								}
						}
									for(var  j = 0 ;j<group_item.children.length;j++){ 
							for(var  i = 0 ;i<group_item.children.length;i++){ 
									var next = group_item.children[i];

										if(next.name == "Stick" && next.id == stick_activ_group_1+stick_activ_group_2 || 
										   next.id == stick_activ_group_2+stick_activ_group_1)
										{
										group_item.remove(next); 
										}
								}
						}
 }
 
 function addstick()
 {
	 var checkFlagForId = false;
	 for(let i=0;i< list_id.length;i++)
	 {
		 if(list_id[i] == "Stick")
		 {
			checkFlagForId = true;
		 }
	 }

	 if(checkFlagForId == false)
	 {
		list_id.push("Stick");
		updateDropdown(sphereID , list_id);
	 }

	 for(var i=0;i< list.length;i++)
			{
			
				for(var j=i;j< list.length;j++)
				{
					if(i!=j)
					{
					var dx;
					var dy;
					var dz
					/////////////////////////////////
						
							var vstart = ref_list[j].object.position;
							var vend = ref_list[i].object.position;
							var distance = vstart.distanceTo(vend);
							var xd2 =(list[i].x-list[i].x)*(list[i].x-list[i].x);
							var yd2 =(list[j].y-list[i].y)*(list[j].y-list[i].y);
							//var zd2 =(Math.abs(list[i+j]).z-Math.abs(list[i].z))*(Math.abs(list[i+j]).z-Math.abs(list[i].z));
							
							//var dc = Math.sqrt(x2+y2)/1.0;
	
							//stick_activ_group_1 = x;
							//stick_activ_group_2 = y;
							//putdistance_stick = w; 
							if(distance < putdistance_stick_2 && ((ref_list[j].id == stick_activ_group_1 && ref_list[i].id == stick_activ_group_2) ||
																 (ref_list[i].id == stick_activ_group_1 && ref_list[j].id == stick_activ_group_2)))
							{
								var HALF_PI = +Math.PI * .5;
								var da = Math.sqrt(xd2+yd2)/1.0;
								if(parameters.render_type == "low")
								{
									var geometry = new THREE.CylinderBufferGeometry( radiusCylinderGlobal, radiusCylinderGlobal, distance, 3,3,false );
									var cylinderMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff} );
								}
								else
								{
									var geometry = new THREE.CylinderBufferGeometry( radiusCylinderGlobal,radiusCylinderGlobal, distance, 15,15,false );
									var cylinderMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff} );
								}
								
								var orientation = new THREE.Matrix4();//a new orientation matrix to offset pivot	
								var offsetRotation = new THREE.Matrix4();//a matrix to fix pivot rotation							
								orientation.lookAt(vstart,vend,new THREE.Vector3(0,1,0));//look at destination
								offsetRotation.makeRotationX(HALF_PI);//rotate 90 degs on X
								orientation.multiply(offsetRotation);//combine orientation with rotation transformations
								geometry.applyMatrix(orientation);
						
								
								
								var cylinder = new THREE.Mesh( geometry, cylinderMaterial  );
								cylinder.position.copy(vstart);
								cylinder.position.lerp(vend, 0.5);
								
								cylinder.geometry.name = ref_list[j].id + ref_list[i].id;
								var vec1 = new GFigure(cylinder,"Stick", ref_list[j].id + ref_list[i].id,orientation);
								ref_list.push(vec1);
								group_item.add(cylinder);	
								
								var outlineMaterial1 = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.BackSide } );
								var outlineMesh1 = new THREE.Mesh( cylinder.geometry, outlineMaterial1 );
								outlineMesh1.position.set(cylinder.position.x,
														cylinder.position.y,
														cylinder.position.z);
								outlineMesh1.scale.multiplyScalar(1.15);
								outlineMesh1.visible = false;
								scene.add( outlineMesh1 );
								var vec1 = new GFigure(outlineMesh1,ref_list[j].id + ref_list[i].id, "Stick",orientation);
								//console.log(ref_list[i].id);
								outline_list.push(vec1);
								group_item.add(outlineMesh1);
							}

						
					}
					else
					{
					console.log("dodajemy0");
					}
				}
				
			}
						if(id_check == "All")
					{
			updateOutline();
					}
	}
/////////////////////////////
//KLASA PUNKT_SPHERE
class SPoint {
	constructor(x, y, z , id) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.id = id;
	}
}
/////////////////////////////
//Klasa przetrzymuje obiekt 3D wraz z jego id i nazwa
class GFigure {
	constructor(object, id, name , orientation) {
	this.object = object;
	this.name = name;
	this.id = id;
	this.orientation = orientation;
	}
}
/////////////////////////////
//Atom radius table
var atomrad = {" H": '0.37' ,"He": '0.32' ,"Li": '1.34' ,
			"Be": '0.90' ," B": '0.82' ," C": '0.77' ," N": '0.75' ,
			" O": '0.73' ," F": '0.71' ,"Ne": '0.69' ,"Na": '1.54' ,
			"Mg": '1.30' ,"Al": '1.18' ,"Si": '1.11' ," P": '1.06' ,
			" S": '1.02' ,"Cl": '0.99' ,"Ar": '0.97' ," K": '1.96' ,
			"Ca": '1.74' ,"Sc": '1.44' ,"Ti": '1.36' ," V": '1.25' ,
			"Cr": '1.27' ,"Mn": '1.39' ,"Fe": '1.25' ,"Co": '1.26' ,
			"Ni": '1.21' ,"Cu": '1.38' ,"Zn": '1.31' ,"Ga": '1.26' ,
			"Ge": '1.22' ,"As": '1.19' ,"Se": '1.16' ,"Br": '1.14' ,
			"Kr": '1.10' ,"Rb": '2.11' ,"Sr": '1.92' ," Y": '1.62' ,
			"Zr": '1.48' ,"Nb": '1.37' ,"Mo": '1.45' ,"Tc": '1.56' ,
			"Ru": '1.26' ,"Rh": '1.35' ,"Pd": '1.31' ,"Ag": '1.53' ,
			"Cd": '1.48' ,"In": '1.44' ,"Sn": '1.41' ,"Sb": '1.38' ,
			"Te": '1.35' ," I": '1.33' ,"Xe": '1.30' ,"Cs": '2.25' ,
			"Ba": '1.98' ,"La": '1.69' ,"Lu": '1.60' ,"Hf": '1.50' ,
			"Ta": '1.38' ," W": '1.46' ,"Re": '1.59' ,"Os": '1.28' ,
			"Ir": '1.37' ,"Pt": '1.28' ,"Au": '1.44' ,"Hg": '1.49' ,
			"Tl": '1.48' ,"Pb": '1.47' ,"Bi": '1.46' ,"Rn": '1.45' ,
			};
var ATOMFILE = {
  name: "in/simple.txt",
  type: "low",
  loadAtom : function() {
	  


			var fileToLoad = document.getElementById("myInput").files[0];
console.log(fileToLoad);
			var fileReader = new FileReader();
			fileReader.onload = function(fileLoadedEvent){
				var textFromFileLoaded = fileLoadedEvent.target.result;
				file_value = fileLoadedEvent.target.result;
				var x = fileLoadedEvent.target.result.toString();
			
				console.log(fileReader.result.toString());
					//wczytanie pliku i podzielenie do na linie.
						var lines = x.split('\n');
						for(var line = 0; line < lines.length; line++){
						  var someline = lines[line];
						  var index = 0.0;
						  var x = 0.0;
						  var y = 0.0;
						  var z = 0.0;
						  var id = 0.0;
						  var help_value = "";
						  var flag_new_number = false;
						  var flag_add = false;
						  for(var charr = 0; charr < someline.length; charr++)
						  {
								if(line>1)
								{
									if(charr==2)
									{
									//console.log("Dodanie id sfery");
									help_value+=someline[0];
									help_value+=someline[1];
										id = help_value;
										var flag = true;
										for(var i =0; i<list_id.length;i++)
										{
										
											if(list_id[i] == id.toString())
											{
												flag = false;
											}
										}
										if(flag)
										{
										list_id.push(help_value);
										}
										flag_new_number=true;
										help_value = "";
									}
									else if(flag_new_number == true && flag_add == true)
									{
											flag_add=false;
											flag_new_number=false;
											if(index == 0)
											{ 
											x = parseFloat(help_value); 
											//console.log("x : "+help_value); 
											}
											if(index == 1)
											{ 
											y = parseFloat(help_value); 
											//console.log("y : "+help_value); 
											} 
											if(index == 2)
											{ 
											z = parseFloat(help_value); 
											//console.log("z : "+help_value); 
											} 		
											index++;											
									help_value = "";
									}
									else if(charr>2)
									{
										//console.log("No value"); 
										if(someline[charr] != ' ')
										{
										//console.log("flag_add : " + flag_add); 
										flag_add= true;
										flag_new_number = false;
										help_value+=someline[charr];
											if(charr ==38)
											{
												if(index == 2)
												{ 
												z = parseFloat(help_value); 
												} 
											}
										}
										else
										{
											//console.log("flag_new_number : " + flag_new_number); 
										flag_new_number=true;
										}
									}
								
								}
								else if(line==0)
								{
									elementnumber = lines[line];
								}
								else if(line==1)
								{
									elementname = lines[line];
								}
  
						  }
							if(line>1 && line< lines.length-1)
								{
								var vec1 = new SPoint(x,y,z,id);
								list.push(vec1);
								
								}
						}
						
			/////////////////////////////////////////////
			//Dodanie spher 	
			for(var line = 0; line < list.length; line++){
			var group = new THREE.Group();
			if(parameters.render_type == "low")
			{
				var sphereGeometry = new THREE.SphereBufferGeometry( parseFloat(atomrad[list[line].id])*0.5, 3, 5 );	
			}
			else
			{
				var sphereGeometry = new THREE.SphereBufferGeometry( parseFloat(atomrad[list[line].id])*0.5, 10, 10 );
			}
			sphereGeometry = sphereGeometry.toNonIndexed();
		
			////Glass material
			//var cubeMaterial3 = new THREE.MeshPhongMaterial( { color: 0xccddff, envMap: reflectionCube, refractionRatio: 0.98, reflectivity: 0.9 } );
		    //var cubeMaterial2 = new THREE.MeshPhongMaterial( { color: 0xccfffd, envMap: reflectionCube, refractionRatio: 0.985 } );
			//var cubeMaterial1 = new THREE.MeshPhongMaterial( { color: 0xffffff, envMap: reflectionCube, refractionRatio: 0.98 } );

		    if(parameters.render_type == "low")
			{
				var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff} );
			}
			else
			{
			var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, envMap: reflectionCube} );
			}

			sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
			sphere.material.shininess = 300;
			sphere.material.map = aoMapA;
			sphere.material.roughness = roughnessMap;
			sphere.material.metalness = metalnessMap;
			sphere.material.normalMap = normalMap;
			sphere.position.set(list[line].x, list[line].y, list[line].z);
			var vec1 = new GFigure(sphere,list[line].id, "Sphere","None");
			ref_list.push(vec1);
			//console.log(sphere.material);
			// group
			group_item.add(sphere);
			
			////sortowanie po x
			}
				updateGUI();
				scene.add(group_item);
					updateOutline();
					updateShadertype();
					addlistelemets();
					addFontToList();
			///////////////////////////////////////////////////////////
			///Light
			if(onOffCubes.length == 0 )
			{
				addLight();	
			}
					//group_item.add(frontv);

		};
				fileReader.readAsText(fileToLoad);
				console.log(fileReader.result);

  }
};