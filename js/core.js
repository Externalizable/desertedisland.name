var dictionary = {};

var files = [
  "Colors",
  "Elder Scrolls V Skyrim",
  "Flowers",
  "Fruits & Vegetables",
  "Gems & Minerals",
  "Pokemon DPPT",
  "Pokemon RBY",
  "Pokemon RSE",
  "Pokemon SwSh",
  "Planets & Stars",
  "Super Mario Galaxy",
  "Super Mario Odyssey",
  "Super Mario Sunshine",
  "Trees",
  "Undertale",
  "US Towns",
  "Zelda BOTW",
  "Zelda Majoras Mask",
  "Zelda OOT",
  "Zelda Wind Waker"
];

function getNames() {
  var names = {};
  for (var key in dictionary) {
    var id = convertToId(key);
    if ($("input#" + id).is(":checked")) {
      for (var entry in dictionary[key]) {
        var name = dictionary[key][entry];
        if (!names.hasOwnProperty(name)) {
          names[name] = key;
        }
      }
    }
  }
  return names;
}

function convertToId(name) {
  return name.toLowerCase().replace(/\s/g, "_").replace(/\W/g, "");
}

$(document).ready(function() {
  files.forEach(function(file, i) {
    $.get("./names/" + file.replace(/\s/g, "%20").replace("/\&/g", "%26") + ".txt", function(data) {
      dictionary[file] = data.split('\n');
      $("#content").append("<label><input type=\"checkbox\" id=\"" + convertToId(file) + "\" checked><i class=\"check fas\"></i><span>" + file + "</span></label>");
    });
  });

  $("#redo").on("click", function() {
    var button = $(this);
    button.removeClass("spin");
    setTimeout(function() {
      button.addClass("spin");

      var element = $("#name").find("span:first");

      var names = getNames();
      var keys = Object.keys(names);
      var values = Object.values(names);

      var currentName = element.text();
      var name;
      var category;
      if (keys.length > 0) {
        while (name == undefined || name == currentName) {
          var index = Math.floor(Math.random() * keys.length);
          name = keys[index] + " Island";
          category = values[index];
        }
      }
      if (name == undefined) name = "Isle of Nothingness";
      if (category == undefined) category = "Never Ending Void";

      element.text(name);
      element.attr("category", category);
    }, 100);
  });

  $("#select-all").click(function(event) {
    var checked = this.checked;
    $(":checkbox").each(function() {
      this.checked = checked;
    });
  });

  setTimeout(function() {
    $(":checkbox").change(function(event) {
      if (!this.checked) {
        $("#select-all").each(function() {
          this.checked = false;
        });
      }
    });

    $("#redo").click();
  }, 100);
});