
 $(document).ready(function() {
 		// Declaring main variables
 		var container, camera, scene, renderer, floormesh, TableTop, phi = 0, Leg1, Leg2, Leg3, Leg4, StackPaper, Paper;



 		init();
 		animate();

 		function init()
 		{
 				//
				container = $( 'div' ).attr('id','cardfield');
				$('body').append( container );

				//
				camera = new THREE.TrackballCamera({
					fov: 45,
					aspect: window.innerWidth / window.innerHeight,
					near: 1,
					far: 10000,
					rotateSpeed: 1.0,
					zoomSpeed: 1.2,
					panSpeed: 0.8,
					noZoom: false,
					noPan: false
				});


				// Set camera initial position
				camera.position.z = 250;
				camera.position.y = 175;
				camera.target.position.y = -75;
				// Creating a scene
				scene = new THREE.Scene();
				// Creating floor for our space
				var floorgeo = new THREE.CubeGeometry(700,700,5);
				//
				floormesh = new THREE.Mesh(floorgeo, new THREE.MeshBasicMaterial({color: 0x248C0F, opacity:0.9}));
				//
				floormesh.position.y = -200;
				//и разворачиваем его по оси х так, чтобы он был параллелен ей.
				floormesh.rotation.x = 90 * Math.PI / 180;
				//добавляем к сцене
				scene.addChild(floormesh);
				//обвертка для куба
				var materials = [
				 //делаем каждую сторону своего цвета
					new THREE.MeshBasicMaterial( { color: 0xE01B4C }), // правая сторона
					new THREE.MeshBasicMaterial( { color: 0x34609E }), // левая сторона
					new THREE.MeshBasicMaterial( { color: 0x7CAD18 }), //верх
					new THREE.MeshBasicMaterial( { color: 0x00EDB2 }), // низ
					new THREE.MeshBasicMaterial( { color: 0xED7700 }), // лицевая сторона
					new THREE.MeshBasicMaterial( { color: 0xB5B1AE }) // задняя сторона
				];
				// Texture for paper
				var texture = THREE.ImageUtils.loadTexture('textures/paper.jpg');
				var paper = [
					new THREE.MeshBasicMaterial( {map: texture}), // правая сторона
					new THREE.MeshBasicMaterial( {map: texture}), // левая сторона
					new THREE.MeshBasicMaterial( { color: 0xFFFFFF }), //верх
					new THREE.MeshBasicMaterial( { color: 0xFFFFFF }), // низ
					new THREE.MeshBasicMaterial( {map: texture}), // лицевая сторона
					new THREE.MeshBasicMaterial( {map: texture}) // задняя сторона
				]
				// Texture for new paper
				var newPaper = [
					new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.5}), // правая сторона
					new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.5}), // левая сторона
					new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent: true, opacity: 0.5 }), //верх
					new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent: true, opacity: 0.5 }), // низ
					new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.5}), // лицевая сторона
					new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.5}) // задняя сторона
				]

				// Creating top of the table
				var cube = new THREE.CubeGeometry( 300, 5, 500, 1, 1, 1, materials );
				//
				TableTop = new THREE.Mesh( cube, new THREE.MeshFaceMaterial() );
				//указываем позицию по оси y
				TableTop.position.y = -10;
				//добавляем к сцене
				scene.addChild(TableTop);
 				//Adding shadow to the object
 				new THREE.ShadowVolume(TableTop);

				//
				var cube = new THREE.CubeGeometry( 10, 190, 10, 1, 1, 1, materials );
				//создаем мэш для куба, в качестве материала мэша
				//будет браться тот, который применен к кубу
				Leg1 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial() );
				//указываем позицию по оси y
				Leg1.position.y = -105;
				Leg1.position.x = -140;
				Leg1.position.z = -240;
				//добавляем к сцене
				scene.addChild(Leg1);
 				//добавляем тень кубу
 				new THREE.ShadowVolume(Leg1);
				//

				//
				var cube = new THREE.CubeGeometry( 10, 190, 10, 1, 1, 1, materials );
				//создаем мэш для куба, в качестве материала мэша
				//будет браться тот, который применен к кубу
				Leg2 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial() );
				//указываем позицию по оси y
				Leg2.position.y = -105;
				Leg2.position.x = 140;
				Leg2.position.z = 240;
				//добавляем к сцене
				scene.addChild(Leg2);
 				//добавляем тень кубу
 				new THREE.ShadowVolume(Leg2);
				//

				//
				var cube = new THREE.CubeGeometry( 10, 190, 10, 1, 1, 1, materials );
				//создаем мэш для куба, в качестве материала мэша
				//будет браться тот, который применен к кубу
				Leg3 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial() );
				//указываем позицию по оси y
				Leg3.position.y = -105;
				Leg3.position.x = -140;
				Leg3.position.z = 240;
				//добавляем к сцене
				scene.addChild(Leg3);
 				//добавляем тень кубу
 				new THREE.ShadowVolume(Leg3);
				//

				//
				var cube = new THREE.CubeGeometry( 10, 190, 10, 1, 1, 1, materials );
				//создаем мэш для куба, в качестве материала мэша
				//будет браться тот, который применен к кубу
				Leg4 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial() );
				//указываем позицию по оси y
				Leg4.position.y = -105;
				Leg4.position.x = 140;
				Leg4.position.z = -240;
				//добавляем к сцене
				scene.addChild(Leg4);
 				//добавляем тень кубу
 				new THREE.ShadowVolume(Leg4);
				//

				//Бумага
				var cube = new THREE.CubeGeometry(80,20,60,1,1,1, paper);
				StackPaper = new THREE.Mesh( cube, new THREE.MeshFaceMaterial());
				scene.addChild(StackPaper);
				StackPaper.position.z = -10;
				StackPaper.position.x = 10;
				new THREE.ShadowVolume(StackPaper);
				//StackPaper.visible = false;
				//

				//
				var cube = new THREE.CubeGeometry(80,1,60,1,1,1, newPaper);
				Paper = new THREE.Mesh( cube, new THREE.MeshFaceMaterial());
				scene.addChild(Paper);
				Paper.position.z = -50;
				Paper.position.x = 100;
				Paper.position.y = -7;
				new THREE.ShadowVolume(Paper);



 				//устанавливаем белый свет
				light = new THREE.DirectionalLight( 0xffffff );
				//да, объекты должны отбрасывать тень
				light.castShadow = true;
				//сам пол у нас в -150, свет соотв. ставим выше (в 1 по y и 0 по x и z), чтобы он попадал на наш куб и заставлял его отбрасывать тень
				//напомню, что свет двигается от указанной точки к началу координат
				light.position.set( 0, 1, 0 );
				//добавлям свет
				scene.addChild(light);



				//рендерер
				renderer = new THREE.WebGLRenderer();
				//устанавливаем ему размеры экрана
				renderer.setSize( window.innerWidth, window.innerHeight );
				//и добавляем в наш созданный элемент
				container.append( renderer.domElement );


 		}




 		function animate()
 		{
 			requestAnimationFrame(animate);
 			render();
 		}

 		function render()
 		{
 			renderer.render(scene, camera);
 		}
});
