import * as T from './_snowpack/pkg/three.js'
import { OrbitControls } from "./_snowpack/pkg/three/examples/jsm/controls/OrbitControls.js";
import { TrackballControls } from "./_snowpack/pkg/three/examples/jsm/controls/TrackballControls.js";

class product {
    constructor(id, width, height) {
        this.id = id
        this.width = width
        this.height = height
        this.init()
    }


    init() {
        this.add_scene()
        this.add_light()
        this.add_camera()
        this.add_cube()
        this.add_renderer()
        this.add_controls()
        this.tick()
    }

    add_scene() {
        this.scene = new T.Scene()

    }

    add_renderer() {
        this.canvas = document.getElementById(this.id)
        this.renderer = new T.WebGL1Renderer({
            canvas: this.canvas
        })
        this.renderer.setSize(this.width, this.height)
        this.renderer.render(this.scene, this.camera)
        // 修改网页颜色
        this.renderer.setClearColor("red")
    }


    add_camera() {
        this.camera = new T.PerspectiveCamera(55, this.width / this.height, 1, 1000)
        this.camera.position.z = 5
        this.scene.add(this.camera)
    }

    add_cube() {
        this.cubeGeo = new T.BoxBufferGeometry(1.06, 2.710, 0.658)
        var loader = new T.TextureLoader();
        loader.setPath('./images/red/');
        var mats = [
            '红右侧面.jpg', '红左侧面.jpg',
            '红色部分上盖.jpg', '白灰条纹下盖.jpg',
            '红正面.jpg', '红背面.jpg'
        ].map(pic => {
            return new T.MeshLambertMaterial({ map: loader.load(pic) ,color:"#ffffff"});
        });

        this.cube = new T.Mesh(this.cubeGeo, mats)
        this.scene.add(this.cube)
    }

    add_light() {
        this.light = new T.AmbientLight(0xffffff, 1)
        this.scene.add(this.light)
    }
    add_controls() {
        this.controls = new TrackballControls(this.camera, this.canvas)
        // this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.rotateSpeed=3
        // this.controls.noPan=true
        this.controls.update()
    }

    tick = () => {
        requestAnimationFrame(this.tick)

        // this.cube.rotation.y += 0.01
        this.controls.update()
        this.renderer.render(this.scene, this.camera)

    }



}


new product("webgl", innerWidth, innerHeight*0.8)