import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from 'ol/source/Vector';
import GPX from 'ol/format/GPX';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
// import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

const goetzingerLonLat = [8.6517143982536, 49.67539982152498];
const goetzingerLonLatWebMercator = fromLonLat(goetzingerLonLat);

let tile = new TileLayer({
    source: new OSM()
});

let map = new Map({
    target: document.getElementById('map'),
    layers: [tile],
    view: new View({
        center: goetzingerLonLatWebMercator,
        zoom: 15
    }),
});

