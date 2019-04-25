$("#scrape").on("click", function() {
  $.get("/api/scrape", function(data) {
    console.log(data);
  });
});

$.getJSON("/api/articles", function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});
// An on click for a note modal to appear
$(document).on("click", "p", function() {
  $("#notes").empty();

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/api/articles/" + thisId
  }).then(function(data) {
    console.log(data);

    //$("#notes").append("<h2>" + data.title + "</h2>");

    $("#notes").append("<textarea id='bodyinput' name='text'></textarea>");
    $("#notes").append(
      "<button data-id='" + thisId + "' id='savenote'>Save Note</button>"
    );
    data.forEach(function(item) {
      $("#notes").append(
        `<div>
        <p>${item.text}</p>
        ${item.date}
        <button id='delete' data-id=${item._id}>delete
        </button></div>`
      );
    });
  });
});

// on click to save the note
$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/api/notes/",
    data: {
      //title: $("#titleinput").val(),
      articleId: thisId,
      text: $("#bodyinput").val()
    }
  }).then(function(data) {
    console.log(data);
    $("#notes").empty();
  });

  $("#bodyinput").val("");
});

$(document).on("click", "#delete", function() {
  var selected = $(this).parent();
  $.ajax({
    method: "GET",
    url: "/api/delete/" + selected.attr("data-id"),
    success: function(response) {
      selected.remove();
    }
  });
});
