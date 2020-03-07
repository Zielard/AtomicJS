			var name;
			var noe;
			var render;
			var loadfile;
			var visiblelights;
			var addlight;
			var dellight;
			var hemioflight;
			var lightintensP;
			var lightintensH;
			var sphereID;
			var OutlineVisible;
			var AxisVisible;
			var sphereShape;
			var sphereM;
			var scale;
			var radius;
			var sphereColor;
			var sphereColorA;
			var sphereColorE;
			var sphereColorS;
			var EnvColor;
			var Render_type;
			var cinematic;
			var normalCheck;
			var lightList;
			var flag_next_file = true;
			var cameraOrtho;
			//visible_lights

			function updateGUI(){
				gui = new dat.GUI();
				var basicf = gui.addFolder('General settings');
				var objectf = gui.addFolder('Object settings');
				var lightsf = gui.addFolder('Lights settings');
				///nazwa projektu
				name = basicf.add( parameters, 'name' ).name("Name : " + elementname).listen();
				///liczba elementow
				noe = basicf.add( parameters, 'noe' ).name("Elements : " + elementnumber).listen();
				///dodawanie render
				render = basicf.add( parameters, 'render' ).name("Render scene").listen();
				///dodawanie pliku
				loadfile = basicf.add(parameters, 'loadFile').name('Load XYZ file').listen();
				///dodawanie swiatla
				addlight = lightsf.add(parameters, 'new_light').name('Add light').listen();
				///usuwanie swiatla
				dellight = lightsf.add(parameters, 'old_light').name('Delete light').listen();
				///wylaczanie hemi
				hemioflight = lightsf.add(parameters, 'hemilight').name('On / Off hemi').listen();
				
				///nazwa projektu
				//cameraOrtho = basicf.add( parameters, 'cameraOrtho' ).name("Change Camera").listen();

				///Zmiana renderu
				cameraOrtho = basicf.add( parameters, 'cameraOrtho', [ "Ortho", "Perspective"] ).name('Camera type').listen();
				cameraOrtho.onChange(function(value) {   
										//camera_active = camera_percpective;
										console.log(value);

										if(value == "Ortho")
										{
											camera_active = camera_ortho;
											camera_active.position = camera_percpective.position;
											//camera_active.updateProjectionMatrix();
										///kontrola osi
										control = new THREE.TransformControls( camera_active, renderer.domElement );
										control.addEventListener( 'change', renderScene );
										control.addEventListener( 'dragging-changed', function ( event ) {
											Orbit.enabled = ! event.value;
											Orbitp.enabled = ! event.value;
											} );

										// ///////////////////////////////////////////////////////////
										// ///kontrola osi dla swiatla
										// control_light = new THREE.TransformControls( camera_active, renderer.domElement );
										// control_light.addEventListener( 'change', renderScene );
										// control_light.addEventListener( 'dragging-changed', function ( event ) {
										// 	Orbit.enabled = ! event.value;
										// 	Orbitp.enabled = ! event.value;
										// 	} );
										}
										else if(value == "Perspective")
										{
											camera_active = camera_percpective;
											camera_active.position = camera_ortho.position;
											//camera_active.updateProjectionMatrix();
											Orbit = Orbitp;
										///kontrola osi
										control = new THREE.TransformControls( camera_active, renderer.domElement );
										control.addEventListener( 'change', renderScene );
										control.addEventListener( 'dragging-changed', function ( event ) {
										Orbit.enabled = ! event.value;
										Orbitp.enabled = ! event.value;
											} );
											
										// ///////////////////////////////////////////////////////////
										// ///kontrola osi dla swiatla
										// control_light = new THREE.TransformControls( camera_percpective, renderer.domElement );
										// control_light.addEventListener( 'change', renderScene );
										// control_light.addEventListener( 'dragging-changed', function ( event ) {
										// 	Orbit.enabled = ! event.value;
										// 	Orbitp.enabled = ! event.value;
										// 	} );
										}

				});

				lightintensP = lightsf.add(parameters, 'lightIntensityP', 0.0, 1.0, 0.1).name('Point intensity').listen();
				lightintensP.onChange(function(value) {   
				chlightPoint(value);
				});

				lightList = lightsf.add( parameters,'lightList',list_lights ).name('Light List').listen();
				lightList.onChange(function(value) {   

					if(value != "None")
					{
						for(var  i = 0 ;i<onOffCubes.length;i++){ 

						

							for(var  y = 0 ;y<onOffCubes[i].children.length;y++)
							{ 
								var next = onOffCubes[i].children[y];
									console.log(next);
										if(value == next.uuid)
										{
											control.attach( next);
											for(var j = 0 ;j<next.children.length;j++)
											{
												if(next.children[j].type =="Mesh")
												{		
													activ_light = next.children[j];
													control.position.copy( next.children[j].position );
												}
											}
										}
							}
						}
					}
					else
					{
						control.position.set(orgin_ray_posx,orgin_ray_posy,orgin_ray_posz);
									control.attach( group_item );
					}
				
			});

				lightintensH = lightsf.add(parameters, 'lightIntensityH', 0.0, 1.0, 0.1).name('Hemi intensity').listen();
				lightintensH.onChange(function(value) {   
				chlighthemi(value);
				});
				///Aktywne id
				visiblelights = lightsf.add(parameters, 'visible_lights').name('Visible lights').listen();
					visiblelights.onChange(function(value) {  
						for(var  i = 0 ;i<group_Light.children.length;i++)
						{ 
							var next = group_Light.children[i];
							for(var  j = 0 ;j<next.children.length;j++)
							{ 		
								    //console.log(next.children[j]);
									if(next.children[j].type =="Mesh")
									{		
											next.children[j].visible = value;
									}
								}
						}
											
				//control.visible = value;
				});
				///Aktywne id
				sphereID = objectf.add( parameters, 'ID',list_id ).name('Object ID').listen();
				sphereID.onChange(function(value) { 
					if(value == "Stick")
					{
						$(radius.domElement).attr("hidden", false);   
					}
					else
					{
						$(radius.domElement).attr("hidden", true);   
					}
				id_check = value;
				updateOutline();
				});
				///Poswiata aktywnych elementow
				OutlineVisible = objectf.add( parameters, 'outlinevisible').listen();
				OutlineVisible.onChange(function(value) {   
				updateOutline();   
				});
				
				///Wektory XYZ
				AxisVisible = objectf.add( parameters, 'axis').listen();
				AxisVisible.onChange(function(value) {   
				
				control.visible = value;  
				});
				
				///Zmiana krztaltu z aktywnym id
				sphereShape = objectf.add( parameters, 'shape', [ "Sphere", "Cube", "Torus", "Knot" ] ).name('Object shape').listen();
				sphereShape.onChange(function(value) {   
				updateShape();   
				});
				///Zmiana renderu
				Render_type = objectf.add( parameters, 'render_type', [ "low", "high"] ).name('Render type').listen();
				Render_type.onChange(function(value) {   
				updateRenderType(value);
				
				});
				///Zmiana tekstury z aktywnym id
				sphereM = objectf.add( parameters, 'shader', [ "Aluminum", "Bronze", "None" , "Reflection","Steel Cabel","Copper" ] ).name('Type Shader').listen();
				sphereM.onChange(function(value) {   
					updateShadertype();
				});
				///Zmiana skali z aktywnym id
				scale = objectf.add( parameters, 'scale', 0.1, 5, 0.1).listen();
					scale.onChange(function(value) {   
							for(var i = 0 ; i < ref_list.length;i++)
							{
								if(id_check !="All")
								{
									
									if(id_check==ref_list[i].id.toString())
									{
								//console.log("!All");	
									ref_list[i].object.scale.set(value, value, value); 
									outline_list[i].object.scale.set(value+0.05, value+0.05, value+0.05); 
									}	
								}
								else
								{
								//console.log("All");
									ref_list[i].object.scale.set(value, value, value); 
									outline_list[i].object.scale.set(value+0.05, value+0.05, value+0.05); 
								}
							}
					  
				});
				///Zmiana skali z aktywnym id
				radius = objectf.add( parameters, 'radius', 0.1, 5, 0.1).listen();
				radius.onChange(function(value) {   
					radiusCylinderGlobal = value;
					for(var i = 0 ; i < ref_list.length;i++)
					{
						if(id_check !="All")
						{
	
							if(id_check==ref_list[i].id.toString())
							{	
								if(id_check =="Stick")
								{
									if(parameters.render_type == "low")
									{
										ref_list[i].object.geometry = new THREE.CylinderBufferGeometry( value, value, ref_list[i].object.geometry.parameters.height, 3,3,false );
										outline_list[i].object.geometry = new THREE.CylinderBufferGeometry( value, value, outline_list[i].object.geometry.parameters.height, 3,3,false );
									}
									else
									{
										ref_list[i].object.geometry = new THREE.CylinderBufferGeometry( value, value, ref_list[i].object.geometry.parameters.height, 15,15,false );
										outline_list[i].object.geometry = new THREE.CylinderBufferGeometry( value, value, outline_list[i].object.geometry.parameters.height, 15,15,false );
									}
									ref_list[i].object.geometry.applyMatrix(ref_list[i].orientation);
									outline_list[i].object.geometry.applyMatrix(outline_list[i].orientation);
									//outline_list[i].object.scale.multiplyScalar(1.15);
								}	
								else
								{
									//console.log(ref_list[i]);
									ref_list[i].object.scale.set(value, value, value); 
									outline_list[i].object.scale.set(value+0.05, value+0.05, value+0.05); 
								}	
								//console.log(ref_list[i]);
							}	
						}
						else
						{
							///console.log(ref_list[i].object);
							//ref_list[i].object.scale.set(value, value, value); 
							//outline_list[i].object.scale.set(value+0.05, value+0.05, value+0.05); 
						}
						}
								  
					});
				///Zmiana koloru z aktywnym id
				sphereColor = objectf.addColor( parameters, 'color' ).name('Color (Diffuse)').listen();
				sphereColor.onChange(function(value) {   
				mcolor_type="Diffuse";
				updateMaterialColor(value);
				});

				sphereColorA = objectf.addColor( parameters, 'colorA' ).name('Color (Ambient)').listen();
				sphereColorA.onChange(function(value) {  
				mcolor_type="Ambient";				
				updateMaterialColor(value);  
				});

				sphereColorE = objectf.addColor( parameters, 'colorE' ).name('Color (Emissive)').listen();
				sphereColorE.onChange(function(value) {  
				mcolor_type="Emissive";					
				updateMaterialColor(value);   
				});

				sphereColorS = objectf.addColor( parameters, 'colorS' ).name('Color (Specular)').listen();
				sphereColorS.onChange(function(value) {  
				mcolor_type="Specular";					
				updateMaterialColor(value);  
				});
				EnvColor = gui.addColor( parameters, 'colorEnv' ).name('Color (Env)').listen();
				EnvColor.onChange(function(value) {  
				renderer.setClearColor(new THREE.Color(value));
				});
				objectf.add( parameters, "metalness" ).min( 0 ).max( 1 ).onChange( function ( value ) {

					//ref_list[i].object.materialmetalness = value;
					
					for(var i = 0 ; i < ref_list.length;i++)
					{
						if(id_check !="All")
						{	
							if(id_check==ref_list[i].id.toString())
							{
							ref_list[i].object.material.metalness = value;
							}
						}
						else
						{
							ref_list[i].object.material.metalness = value;	
						}
				}
				} );

				objectf.add( parameters, "roughness" ).min( 0 ).max( 1 ).onChange( function ( value ) {

					//ref_list[i].object.materialroughness = value;
					for(var i = 0 ; i < ref_list.length;i++)
					{
						if(id_check !="All")
						{	if(id_check==ref_list[i].id.toString())
							{
							ref_list[i].object.material.roughness = value;
							}
						}
						else
						{
							ref_list[i].object.material.roughness = value;	
						}
					}
				} );
				objectf.add( parameters, "normalScale" ).min( - 1 ).max( 1 ).onChange( function ( value ) {

					//material.normalScale.set( 1, - 1 ).multiplyScalar( value );
					for(var i = 0 ; i < ref_list.length;i++)
					{
						if(id_check !="All")
						{	if(id_check==ref_list[i].id.toString())
							{
							ref_list[i].object.material.normalScale.set( 1, - 1 ).multiplyScalar( value );
							}
						}
						else
						{
							ref_list[i].object.material.normalScale.set( 1, - 1 ).multiplyScalar( value );
						}
					}
				} );
				objectf.add( parameters, "envMapIntensity" ).min( 0 ).max( 3 ).onChange( function ( value ) {

					//material.envMapIntensity = value;
					for(var i = 0 ; i < ref_list.length;i++)
					{
						if(id_check !="All")
						{	if(id_check==ref_list[i].id.toString())
							{
							ref_list[i].object.material.envMapIntensity = value;
							}
						}
						else
						{
							ref_list[i].object.material.envMapIntensity = value;
						}
					}
				} );


				if(id_check == "Stick")
				{
					$(radius.domElement).attr("hidden", false);   
				}
				else
				{
					$(radius.domElement).attr("hidden", true);   
				}
			}
			function removeGui() {	
			gui.destroy();			
			}
			

			function updateShadertype(){
				var value = parameters.shader;
				
				for(var i = 0 ; i < ref_list.length;i++)
					{
						
						if(id_check !="All")
						{	
							if(id_check==ref_list[i].id.toString())
							{
								console.log(parameters.shader);
							if(value =="Aluminum")
								{
								ref_list[i].object.material = new THREE.MeshStandardMaterial( {

											color: 0x888888,
											roughness:  parameters.roughness,
											metalness:  parameters.roughness,
											normalMap: normalMapA,
											aoMap: aoMapA,
											aoMapIntensity: 1,
											normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?

											
											//displacementMap: displacementMap,
											
											//displacementBias: - 0.428408, // from original model
											envMap: reflectionCube,


										} );
								ref_list[i].object.material.map = aoMapA;
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="Steel Cabel")
								{
								ref_list[i].object.material = new THREE.MeshStandardMaterial( {

											color: 0x888888,
											roughness:  parameters.roughness,
											metalness:  parameters.roughness,
											normalMap: normalMapCa,
											aoMap: aoMapCa,
											aoMapIntensity: 1,
											normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?

											
											//displacementMap: displacementMap,
											
											//displacementBias: - 0.428408, // from original model
											envMap: reflectionCube,


										} );
								ref_list[i].object.material.map = aoMapCa;
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="Copper")
								{
								ref_list[i].object.material = new THREE.MeshStandardMaterial( {

											color: 0x888888,
											roughness:  parameters.roughness,
											metalness:  parameters.roughness,
											normalMap: normalMapC,
											aoMap: aoMapC,
											aoMapIntensity: 1,
											normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?

											
											//displacementMap: displacementMap,
											
											//displacementBias: - 0.428408, // from original model
											envMap: reflectionCube,


										} );
								ref_list[i].object.material.map = aoMapC;
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="Bronze")
								{
								ref_list[i].object.material = new THREE.MeshStandardMaterial( {

											color: 0x888888,
											roughness:  parameters.roughness,
											metalness:  parameters.roughness,
											normalMap: normalMap,
											aoMap: aoMapB,
											aoMapIntensity: 1,
											normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?

											
											//displacementMap: displacementMap,
											
											//displacementBias: - 0.428408, // from original model
											envMap: reflectionCube,


										} );
								ref_list[i].object.material.map = aoMapB;
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="Reflection")
								{
								ref_list[i].object.material = new THREE.MeshPhongMaterial( { color: 0xffffff, envMap: reflectionCube} );
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="None")
								{
									//.material.map = null;
								ref_list[i].object.material.map = null;
								ref_list[i].object.material = new THREE.MeshPhongMaterial( { color: 0xffffff} );
								ref_list[i].object.material.needsUpdate = true;
								}
							}
						}
						else
						{
								if(value =="Aluminum")
								{
								ref_list[i].object.material = new THREE.MeshStandardMaterial( {

											color: 0x888888,
											roughness:  parameters.roughness,
											metalness:  parameters.roughness,
											normalMap: normalMapA,
											aoMap: aoMapA,
											aoMapIntensity: 1,
											normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?

											
											//displacementMap: displacementMap,
											
											//displacementBias: - 0.428408, // from original model
											envMap: reflectionCube,


										} );
								ref_list[i].object.material.map = aoMapA;
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="Steel Cabel")
								{
								ref_list[i].object.material = new THREE.MeshStandardMaterial( {

											color: 0x888888,
											roughness:  parameters.roughness,
											metalness:  parameters.roughness,
											normalMap: normalMapCa,
											aoMap: aoMapCa,
											aoMapIntensity: 1,
											normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?

											
											//displacementMap: displacementMap,
											
											//displacementBias: - 0.428408, // from original model
											envMap: reflectionCube,


										} );
								ref_list[i].object.material.map = aoMapCa;
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="Copper")
								{
								ref_list[i].object.material = new THREE.MeshStandardMaterial( {

											color: 0x888888,
											roughness:  parameters.roughness,
											metalness:  parameters.roughness,
											normalMap: normalMapC,
											aoMap: aoMapC,
											aoMapIntensity: 1,
											normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?

											
											//displacementMap: displacementMap,
											
											//displacementBias: - 0.428408, // from original model
											envMap: reflectionCube,


										} );
								ref_list[i].object.material.map = aoMapC;
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="Bronze")
								{
								ref_list[i].object.material = new THREE.MeshStandardMaterial( {

											color: 0x888888,
											roughness:  parameters.roughness,
											metalness:  parameters.roughness,
											normalMap: normalMap,
											aoMap: aoMapB,
											aoMapIntensity: 1,
											normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?

											
											//displacementMap: displacementMap,
											
											//displacementBias: - 0.428408, // from original model
											envMap: reflectionCube,


										} );
								ref_list[i].object.material.map = aoMapB;
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="Reflection")
								{
								ref_list[i].object.material = new THREE.MeshPhongMaterial( { color: 0xffffff, envMap: reflectionCube} );
								ref_list[i].object.material.needsUpdate = true;
								}
								else if(value =="None")
								{
									//.material.map = null;
								ref_list[i].object.material.map = null;
								ref_list[i].object.material = new THREE.MeshPhongMaterial( { color: 0xffffff} );
								ref_list[i].object.material.needsUpdate = true;
								}
						}
				}
			}
			function updateMaterialColor(value){
				for(var i = 0 ; i < ref_list.length;i++)
				{
					if(id_check !="All")
					{
						
						if(id_check==ref_list[i].id.toString())
						{
							if(mcolor_type=="Diffuse")
							{
							ref_list[i].object.material.color.setHex( value.replace("#", "0x") );  
									console.log("zmiana koloru id: " + ref_list[i].name );
							}
							else if(mcolor_type=="Ambient")
							{
							ref_list[i].object.material.ambient.setHex( value.replace("#", "0x") );  
							}
							else if(mcolor_type=="Emissive")
							{
							ref_list[i].object.material.emissive.setHex( value.replace("#", "0x") ); 
							}
							else if(mcolor_type=="Specular")
							{
							ref_list[i].object.material.specular.setHex( value.replace("#", "0x") ); 
							}
							///console.log("zmiana koloru id: " + id_check );
							///console.log("zmiana koloru id: " + ref_list[i].name );
						}	
					}
					else
					{
							if(mcolor_type=="Diffuse")
							{
							ref_list[i].object.material.color.setHex( value.replace("#", "0x") );  
							}
							else if(mcolor_type=="Ambient")
							{
							ref_list[i].object.material.ambient.setHex( value.replace("#", "0x") );  
							}
							else if(mcolor_type=="Emissive")
							{
							ref_list[i].object.material.emissive.setHex( value.replace("#", "0x") ); 
							}
							else if(mcolor_type=="Specular")
							{
							ref_list[i].object.material.specular.setHex( value.replace("#", "0x") ); 
							}
					}
				}
			}
			function updateShape(){
				var value = parameters.shape;
				var newGeometry;
				if (value == "Sphere")
					newGeometry = new THREE.SphereGeometry( 0.25, 20, 20 );
				else if(value == "Cube")
					newGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5, 0.1, 0.1, 0.1 );
				else if(value == "Torus")
					newGeometry = new THREE.TorusGeometry( 0.5, 0.5, 16, 100 );
					else if(value == "Knot")
					newGeometry = new THREE.TorusKnotGeometry( 0.5, 0.3, 100, 16 );
				
				//<!--sphere.geometry.dispose();-->

				for(var i = 0 ; i < ref_list.length;i++)
				{
					if(id_check !="All")
					{
						
						if(id_check==ref_list[i].id.toString())
						{
					console.log("!All");	
						ref_list[i].object.geometry = newGeometry;
						}	
					}
					else
					{
					console.log("All");
					ref_list[i].object.geometry = newGeometry;
					}
				}
				//<!--sphere.geometry = newGeometry;-->
			   
				// if(parameters.avgNormals)
				// 		sphere.geometry.computeVertexNormals();
				// 	else
				// 		sphere.geometry.computeFlatVertexNormals();
			}