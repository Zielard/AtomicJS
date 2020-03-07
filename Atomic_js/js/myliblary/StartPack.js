/**
 * @author Piotr Zieliński http://pzcv.cba.pl/
 */
 
var StartPack = {
  loadbaseLight : function() {
	 			//tworzymy grupe zawierajaca kostke i swiatlo
			
			// LIGHT1
					var light = new THREE.PointLight( 0xff0000, 1, 100 );
					light.position.set(0.01,0.1,0.0);
					groupLight1.add( light );
					// need to add an ambient light
					//  for ambient colors to be visible
					// make the ambient light darker so that
					//  it doesn't overwhelm (like emmisive light)
					var light2 = new THREE.AmbientLight(0x333333); 
					light2.position.set( light.position );
					scene.add(light2);
					var lightH = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );		//dodajemy tez delikatne swiatlo hemisferyczne
					scene.add( lightH );
					
					var lightbulbGeometry = new THREE.SphereGeometry(0.01,40,40);
					var wireMaterial = new THREE.MeshPhongMaterial( { color: 0xff8000, envMap: reflectionCube} );	
					var lightbulb = new THREE.Mesh( lightbulbGeometry, wireMaterial );
					lightbulb.position.copy( light.position );
					groupLight1.add(lightbulb);
					scene.add(groupLight1);
					
			// LIGHT2
					var light = new THREE.PointLight( 0xff0000, 1, 100 );
					light.position.set(0.01,0.1,0.0);
					groupLight2.add( light );
					// need to add an ambient light
					//  for ambient colors to be visible
					// make the ambient light darker so that
					//  it doesn't overwhelm (like emmisive light)
					var light2 = new THREE.AmbientLight(0x333333); 
					light2.position.set( light.position );
					scene.add(light2);
					var lightH = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );		//dodajemy tez delikatne swiatlo hemisferyczne
					scene.add( lightH );

					var lightbulbGeometry = new THREE.SphereGeometry(0.01,40,40);
					var wireMaterial = new THREE.MeshPhongMaterial( { color: 0xff8000, envMap: reflectionCube} );	
					var lightbulb = new THREE.Mesh( lightbulbGeometry, wireMaterial );
					lightbulb.position.copy( light.position );
					groupLight2.add(lightbulb);
					scene.add(groupLight2);	

				
             ///////////////////////////////////////
            //Wczytanie kordynatow z pliku 
            //
			var ModelMaterial = new THREE.MeshPhongMaterial( { color: 0xf4be41, envMap: reflectionCube} );	
			
						var mtlLoader = new THREE.MTLLoader();
						mtlLoader.setPath('textures/');
						mtlLoader.load('Logo.mtl', function(materials) {
					  materials.flatShading = false;
					  materials.preload();
					  var objLoader = new THREE.OBJLoader();
					  objLoader.setMaterials(materials);
					  objLoader.setPath('models/');
					  objLoader.load('Logo.obj', function(object) {
						object.smooth = true;
							//object.material = wireMaterial;
							object.rotation.y = 0.5;
							
										//camera.lookAt( object.position );
						//console.log(camera.position);
						 object.traverse( function( child ) {
								if ( child instanceof THREE.Mesh ) {
									child.material = ModelMaterial;
								}
							} );
						group.add(object);
						scene.add(object);
					  });
					});
  }
};