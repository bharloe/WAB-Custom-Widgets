///////////////////////////////////////////////////////////////////////////
// Copyright © 2016 Robert Scheitlin. All Rights Reserved.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'jimu/BaseWidget',
    'jimu/WidgetManager'
  ],
  function(
    declare,
    lang,
    BaseWidget,
    WidgetManager) {
    var clazz = declare([BaseWidget], {

      name: 'UrlButton',
      baseClass: 'widget-urlbutton',
      isOpening: false,

      onOpen: function(){
        if(!this.isOpening){
        this.isOpening = true;
        //RJS ADD
        var y;
        var x;
        if(this.config.addCenterParameter){
        y = this.map.extent.getCenter().getLatitude();
        x = this.map.extent.getCenter().getLongitude();
        }
        //RJS End Add
        //RJS Edit
        if(x){
        window.open(this.config.LinkUrl + x +"&y=" + y + "&z=16&gm=0&ve=3&gc=0&xb=" + x + "&yb="+ y +"&zb=1&db=0&bar=0&mw=1&sv=1&svb=0&mi=0&mg=1&mv=1 marginwidth='0' marginheight='0'frameborder='0'scrolling='no'", "_blank");
        }else{
        window.open(this.config.LinkUrl + "testing", "_blank");
        }
        //RJS End Edit
        setTimeout(lang.hitch(this, function(){
        this.isOpening = false;
        WidgetManager.getInstance().closeWidget(this);
        }), 300);
        }
        }
    });
    return clazz;
  });


