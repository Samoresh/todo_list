//tried adding colors to category
/*var category= $("#del-category");
// console.log($("#del-category").text());
console.log($("#del-category").text().trim());
// console.log($("#del-category").val());
console.log($('#del-category').text()=="cleaning");
if(($('#del-category').text().trim())==="cleaning"){
    console.log(($('#del-category').text()));
    $('#del-category').addClass('btn-danger');
}*/

var toggled= false;
var switcher=$('#toggle-button');
var table=$('.table');
var tr=$('tr');
var togglebar=$('#toggle-bar');
switcher.click(function(){
    // switcher.toggleClass("right");
    table.toggleClass("table-striped-columns");
    tr.toggleClass("table-dark");
	if (!toggled) {

        switcher.css("left", "3rem");
        toggled = true;

    } else {

        switcher.css("left", "0");
        toggled = false;

    }

});
