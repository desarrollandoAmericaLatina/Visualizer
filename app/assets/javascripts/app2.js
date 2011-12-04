$(function () {
  var po = org.polymaps;
  var id = $('.tiles-map').attr('id');
  var ranges;

  var map = po.map()
      .container(document.getElementsByClassName("tiles-map")[0].appendChild(po.svg("svg")))
      .center({lat: 25.67, lon: -100.30})
      .zoom(6)
      .zoomRange([5, 8])
      .add(po.interact());

  map.add(po.image()
      .url(po.url("/tiles/{Z}/{X}/{Y}.png")
      ));

  if (id) {
    map.add(po.geoJson()
        .url("/datasets/" + id + ".json?bbox={B}")
        .on("load", load)
        .clip(false)
        .zoom(6));
  }

  map.add(po.compass()
      .pan("none"));

  var setRadius = function(points, name) {
    $.each(points, function(index, point){
      console.log(name);
      console.log(window.datasetRanges);

      var val    = point.feature.properties[name];
      var ranges = window.datasetRanges[name];
      var r = val / ranges[1] * 30;

      if (!isNaN(r)) {
        point.setAttribute("r", r);
      };
    });
  };

  function load(e) {
    points = [];

    for (var i = 0; i < e.features.length; i++) {
      var f = e.features[i],
      c = f.element;
      g = f.element = po.svg("g");

      point = g.appendChild(po.svg("circle"));
      point.setAttribute("cx", 0);
      point.setAttribute("cy", 0);
      point.setAttribute("class", "point");
      point.feature = f.data;

      points.push(point);

      g.setAttribute("transform", c.getAttribute("transform"));
      g.setAttribute("style","cursor:pointer;");
      g.setAttribute("data-name", f.data.id);
      c.parentNode.replaceChild(g, c);
    }
    setRadius(points, window.datasetDefaultColumn);
  };

  $('#config').on('change', 'input[type=radio]', function(){
    setRadius( $('svg.map circle.point').toArray(), $(this).val());
  })
});
