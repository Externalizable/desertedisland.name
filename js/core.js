var dictionary = {};

var files = [
  "Captain Toad Treasure Tracker",
  "Colors",
  "Elder Scrolls V Skyrim",
  "Flowers",
  "Fruits & Vegetables",
  "Gems & Minerals",
  "Planets & Stars",
  "Pokemon DPPT",
  "Pokemon RBY",
  "Pokemon RSE",
  "Pokemon SwSh",
  "Splatoon",
  "Super Mario Galaxy",
  "Super Mario Kart 8",
  "Super Mario Odyssey",
  "Super Mario Sunshine",
  "Trees",
  "Undertale",
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
  let selectAll = $("input#select-all")[0];

  for (const file of files) {
    $.get("./names/" + file.replace(/\s/g, "%20").replace("/\&/g", "%26") + ".txt", function(data) {
      dictionary[file] = data.split('\n');
      var id = convertToId(file);
      $("#content").append("<label><input type=\"checkbox\" id=\"" + id + "\" class=\"checkbox\" checked><i class=\"check fas\"></i><span>" + file + "</span></label>");
      $("#" + id).change(function(event) {
        var allChecked = true;
        $(":checkbox").each(function() {
          if (allChecked && !this.checked && this != selectAll) {
            allChecked = false;
          }
        });
        selectAll.checked = allChecked;
      });
    });
  }

  $("#redo").on("click", function() {
    var button = $(this);
    button.removeClass("spin");
    setTimeout(function() {
      button.addClass("spin");
    }, 100);

    var element = $("#name").find("span:first");

    var names = getNames();
    var keys = Object.keys(names);
    var values = Object.values(names);

    var currentName = element.text();
    var name, category;
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
  });

  $("input#select-all").click(function(event) {
    var checked = this.checked;
    $(":checkbox").each(function() {
      this.checked = checked;
    });
  });

  setTimeout(function() {
    $("#redo").click();
  }, 250);
});