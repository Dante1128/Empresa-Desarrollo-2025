// Configuración del modelo 3D
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('model3d-container');
    const canvas = document.getElementById('3d-canvas');
    const loadingElement = document.querySelector('.model-loading');
    
    // Tamaño del contenedor
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1f);
    
    // Cámara
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderizador
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Iluminación
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x10aed8, 2, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);
    
    // Geometría personalizada (forma abstracta moderna)
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         0.0,  1.5,  0.0,
         0.0, -1.5,  0.0
    ]);
    
    const indices = [
        0, 1, 2, 3, 4, 5, 0, 3, 4,
        0, 4, 1, 1, 4, 5, 1, 5, 2,
        2, 5, 6, 3, 0, 7, 4, 3, 7,
        1, 4, 7, 0, 1, 7
    ];
    
    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    // Material
    const material = new THREE.MeshPhongMaterial({
        color: 0x10aed8,
        emissive: 0x072534,
        specular: 0x8fdde9,
        shininess: 30,
        wireframe: false,
        transparent: true,
        opacity: 0.9,
        flatShading: true
    });
    
    // Malla
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Animación
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    
    // Cuando todo esté listo, ocultar el loader
    setTimeout(() => {
        loadingElement.style.display = 'none';
        animate();
    }, 1500);
    
    // Redimensionamiento
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});