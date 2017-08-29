define(['dojo/_base/declare', 'dijit/_WidgetsInTemplateMixin', 'jimu/BaseWidget', 'dojo/_base/lang', 'dojo/_base/array',
        'dojo/_base/html', 'dojo/i18n!esri/nls/jsapi', 'dojo/on', 'dojo/Deferred',
        'dojo/data/ObjectStore', 'dojo/store/Memory', 'dojo/json',
        'dijit/form/Form', 'dijit/form/Select', 'dijit/form/Button', 'dijit/form/TextBox', 'dijit/form/DateTextBox',
        'jimu/BaseWidget', 'jimu/MapManager', 'jimu/LayerInfos/LayerInfos', 'jimu/dijit/TabContainer',
        'esri/graphic', 'esri/geometry/Polyline', 'esri/geometry/Polygon', 'esri/layers/GraphicsLayer', 'esri/layers/FeatureLayer',
        'esri/tasks/GPMessage', 'esri/tasks/Geoprocessor', 'esri/tasks/JobInfo', 'esri/layers/ImageParameters', 'esri/request', 'esri/geometry/Extent',
        'jimu/dijit/DrawBox'
    ],
function(declare, _WidgetsInTemplateMixin, BaseWidget, lang,
    array, html, esriBundle, on, Deferred,
    ObjectStore, Memory, json,
    Form, Select, Button, TextBox, DateTextBox,
    BaseWidget, MapManager, LayerInfos, TabContainer,
    Graphic, Polyline, Polygon, GraphicsLayer, FeatureLayer,
    GPMessage, Geoprocessor, JobInfo, ImageParameters, esriRequest, Extent, Draw) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget, _WidgetsInTemplateMixin], {
        baseClass: 'jimu-widget-triview',
        name: 'Triview',
        tabs: null,
        _graphicsLayer: null,
        _pointLayer: null,
        _polylineLayer: null,
        _polygonLayer: null,
      
        postCreate: function() {
          this.inherited(arguments);
          this._initLayers();
          this.drawBox.setMap(this.map);
          this.own(on(this.drawBox, 'DrawEnd', lang.hitch(this, this.getDrawPnt)));
        },
      
        getDrawPnt: function(graphic){ 
          if(graphic.geometry.type === "point"){
            var pnt = graphic.geometry;
            var Lat = pnt.getLatitude();
            var Lon = pnt.getLongitude();
            //Now pass it to your url
            if(Lat,Lon){
                window.open("http://data.mapchannels.com/mm/dual2/map.htm?x=" + Lon +"&y=" + Lat + "&z=16&gm=0&ve=3&gc=0&xb=" + Lon + "&yb="+ Lat +"&zb=1&db=0&bar=0&mw=1&sv=1&svb=0&mi=0&mg=1&mv=1 marginwidth='0' marginheight='0'frameborder='0'scrolling='no'", "_blank");
                }else{
                window.open("http://data.mapchannels.com/mm/dual2/map.htm?x=" + "error", "_blank");
            }
          }
        },

        startup: function() {
          this.inherited(arguments);
          console.log('startup');
          this.tabs = new TabContainer({
              tabs: [{
                  title: "Draw a point on the map",
                  content: this.TriviewNode
              }],
              selected: "Draw a point on the map"
          });
          this.tabs.placeAt(this.tabsContainer);
          this.tabs.startup();
        },

        _initLayers: function() {
          this._graphicsLayer = new GraphicsLayer();
          this._pointLayer = new GraphicsLayer();
          this._polylineLayer = new GraphicsLayer();
          this._polygonLayer = new GraphicsLayer();
          this.map.addLayer(this._polygonLayer);
          this.map.addLayer(this._polylineLayer);
          this.map.addLayer(this._pointLayer);
        },

        onOpen: function() { 
          console.log('onOpen');    
          var panel = this.getPanel();
          panel.position.width = 200;
          panel.position.height = 200;
          panel._originalBox = {
              w: 200,
              h: 200,
              l: panel.position.left || 0,
              t: panel.position.top || 0
          };
          panel.setPosition(panel.position);
          panel.panelManager.normalizePanel(panel);

        }
    });
});