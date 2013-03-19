$(document).ready(function () {
  createTogglers();
  $(".content").each(function () {
    createCodeBlock($(this));
  });
  
  $("pre > code").each(function(i, e) {hljs.highlightBlock(e)});
  
  $(".snippet").attr("data-toggle-state", "content");
  $("body").css("background-color", generateRGB(0, 255, 150, 220));
});

$(document).on("click", ".toggleCode", function () {
  var div = $(this).closest(".snippet");

  if (div.attr("data-toggle-state") === "code") return;
  div.attr("data-toggle-state", "code");
});

$(document).on("click", ".toggleContent", function () {
  var div = $(this).closest(".snippet");

  if (div.attr("data-toggle-state") === "content") return;
  div.attr("data-toggle-state", "content");
});

var textarea = document.getElementById("textarea");

function escapeHTML(html) {
  textarea.innerHTML = html;
  return textarea.innerHTML;
}

function unescapeHTML(html) {
  textarea.innerHTML = html;
  return textarea.value;
}

function createCodeBlock(div) {
  var code = "<div class=\"code\"><pre><code class=\"language-html\">" + escapeHTML(div.html()) + "</code></pre></div>";
  $(code).insertAfter(div);
}

function createTogglers() {
  var toggler = $('<span></span>');
  var toggleContent = $('<span></span>');
  var toggleCode = $('<span></span>');
  
  toggler.addClass("toggler");

  toggleContent.addClass("toggleContent");
  toggleContent.text("content");

  toggleCode.addClass("toggleCode");
  toggleCode.text("code");
  
  toggler.append(toggleContent);
  toggler.append(toggleCode);
  
  toggler.insertBefore(".snippet > div");
}

function generateRGB(lower, upper, dark, light) {
  var dark = dark || 0;
  var light = light || 255;
  var a = lower >= 0 && lower < 255 ? lower : 0;
  var b = upper > a && upper <= 255 ? upper : 255;
  var color = {red: -1, green: -1, blue: -1};

  while ((color.red < dark && color.green < dark  && color.blue < dark) || color.red > light || color.green > light || color.blue > light) {
    color.red = Math.floor(Math.random() * (b - a)) + a;
    color.green = Math.floor(Math.random() * (b - a)) + a;
    color.blue = Math.floor(Math.random() * (b - a)) + a;
  }
  
  return "rgb(" + color.red + ", " + color.green + ", " + color.blue + ")";
}