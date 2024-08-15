document.addEventListener('DOMContentLoaded', () => {
    const cont = document.getElementById('three-container');
    const scn = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const rend = new THREE.WebGLRenderer({ antialias: true });

    rend.setSize(window.innerWidth, window.innerHeight);
    cont.appendChild(rend.domElement);

    function addStar() {
        const geom = new THREE.SphereGeometry(0.15, 24, 24);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geom, mat);

        star.position.set(
            THREE.MathUtils.randFloatSpread(1000),
            THREE.MathUtils.randFloatSpread(1000),
            THREE.MathUtils.randFloatSpread(1000)
        );

        scn.add(star);
    }

    Array(1000).fill().forEach(addStar);

    cam.position.z = 1;

    function anim() {
        requestAnimationFrame(anim);
        scn.rotation.x += 0.0005;
        scn.rotation.y += 0.0005;
        rend.render(scn, cam);
    }

    anim();

    window.addEventListener('resize', () => {
        rend.setSize(window.innerWidth, window.innerHeight);
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
    });
});