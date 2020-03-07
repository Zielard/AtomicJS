/**
 * @author Piotr Zieliński http://pzcv.cba.pl/
 */
 
			function updateOutline(){
			
				for(var i = 0 ; i < ref_list.length;i++)
				{
					if(flag_outline == false)
					{
						if(ref_list[i].id !="Stick")
						{
											var outlineMaterial1 = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.BackSide } );
					var outlineMesh1 = new THREE.Mesh( ref_list[i].object.geometry, outlineMaterial1 );
						outlineMesh1.position.set(ref_list[i].object.position.x,
													ref_list[i].object.position.y,
													ref_list[i].object.position.z);
							outlineMesh1.scale.multiplyScalar(1.05);
							outlineMesh1.visible = false;
							scene.add( outlineMesh1 );
								var vec1 = new GFigure(outlineMesh1,ref_list[i].id, "Sphere","none");
								console.log(ref_list[i].id);
								outline_list.push(vec1);
								group_item.add(outlineMesh1);	
						}
						
					}
					if(id_check =="None")
					{
					for(var j = 0 ; j < outline_list.length;j++)
							{
								outline_list[j].object.visible = false;
							}
					}
					else if(parameters.outlinevisible==true)
					{
						if(id_check !="All")
						{
							for(var j = 0 ; j < outline_list.length;j++)
							{
								if(id_check == outline_list[j].id.toString() || id_check == outline_list[j].name.toString())
								{
								outline_list[j].object.visible = true;
								}
								else
								{
								outline_list[j].object.visible = false;
								}
								
							}
						}
						else
						{
							for(var j = 0 ; j < outline_list.length;j++)
							{
								outline_list[j].object.visible = true;
							}
						}					
					}
					else if(parameters.outlinevisible==false)
					{
							for(var j = 0 ; j < outline_list.length;j++)
							{
								outline_list[j].object.visible = false;
								}

					}

				}
				flag_outline=true;
			}