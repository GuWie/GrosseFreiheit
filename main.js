import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from 'ol/source/Vector';
import GPX from 'ol/format/GPX';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {transform} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
// import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

// fixing physical-cpu-count
import os from 'os';

let amount;

const cores = os.cpus().filter(function(cpu, index) {
  const hasHyperthreading = cpu.model.includes('Intel');
  const isOdd = index % 2 === 1;
  return !hasHyperthreading || isOdd;
});
amount = cores.length;

module.exports = amount;
// 


// BaseMap
const map = new Map({
    view: new View({
      center: transform([8.625785037875176, 49.676954029127955], 'EPSG:4326', 'EPSG:3857'),
      zoom: 15
    }),
    layers: [
      new TileLayer({
        source: new OSM(),
        zIndex: 0,
        visible: true,
        title: "Basemap",
      })
    ],
    target: "map",
    keyboardEventTarget : document
  })
  
  const layerGroup = new LayerGroup({
    layers: [
      new TileLayer({
        source: new XYZ({
          url: "https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
        }),
        zIndex: 1,
        visible: false,
        title: "Seezeichen",
      })
    ],
  })
  
  map.addLayer(layerGroup)
  
  //LayerSwitcherLogic
  const baseLayerElements = document.querySelectorAll(".sidebar > input[type=checkbox");
  for (let baseLayerElement of baseLayerElements) {
    baseLayerElement.addEventListener("change", function() {
      let baseLayerElementValue = this.value;
      let baseLayer;
      layerGroup.getLayers().forEach(function(element, index, array){
        if (baseLayerElementValue === element.get("title")){
          baseLayer = element;
        }
      })
      this.checked ? baseLayer.setVisible(true) : baseLayer.setVisible(false);
    })
  }