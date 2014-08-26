var httpGet = "";
var output = "";
var matchFolders = new RegExp("href=\"[a-zA-Z0-9_]+/\"", "g");
var matchFiles = new RegExp("<a href=\".+(?=\").+(?:)(?=</a>)</a>", "g");
var i = 0;
var res = [];
var body = "";
var finished = false;
var vbl;
var URL = location.search.substring(1, location.search.length);

function displayHTML(value) {
    body += vbl + ",";
    console.log(vbl + "\n");

    //document.getElementById("body").innerHTML+=value;
    //console.log(value);
}

var endingAnchor = "\/</a>";
var endingZip = ".zip</a>";

function loader() {
    if (URL === "")
        URL = "/music/wedding/";
    httpGet = $.get(URL,
        function(my_var) {
            console.log("got " + URL);
            output = my_var;
            //console.log(output);
            while ((adder = matchFiles.exec(output)) != null) {
                res.push(adder);
            };
            //append 'Files' result to the array
            body = document.getElementById("body").innerHTML = "";
            displayHTML("\"");
            var lastEl = res.length - 1;
            res.every(function(item, ind, arr) {
                vbl = item;
                vbl = vbl[0];
                var vbl2 = vbl.toString().substr(vbl.toString().indexOf("\"") + 1, vbl.toString().length);
                URL = URL.toString();
                vbl = "<a href=\"".concat(URL).concat("\/").concat(vbl2);
                vbl = vbl.toString();

                var containsZipEnd = (!(vbl.lastIndexOf(endingZip) >= 1 && vbl.lastIndexOf(endingZip) === vbl.length - endingZip.length));

                var containsAncEnd = (!(vbl.lastIndexOf(endingAnchor) >= 1 && vbl.lastIndexOf(endingAnchor) === vbl.length - endingAnchor.length));
                var boolout = containsAncEnd && containsZipEnd;

                // index is of all elements in res[] - these happen to be []'s themselves but vbl deferences the first element, above
                if (ind > 2) {
                    if (boolout) {
                        displayHTML(vbl + ",");
                        //console.log("vbl["+ind+"]:"+ vbl+",res: "+boolout + ",arr.len:"+arr.length);
                    };
                };
                /*
if(ind===lastEl){
displayHTML("\"");
console.log('finished');
var songs=[];
//console.log(songs);
var song="";
//body=document.getElementById("body").innerHTML;

};
*/
                //console.log("vbl["+ind+"]:"+ vbl+",res: "+boolout);
                ///////body=document.getElementById("body").innerHTML;
                //document.getElementById("body").innerHTMtL="";
                return true; // returning 1 here req'd to make every() repeat/iterate
            });
            iterate(res); //.watch(finished,function(){console.log(songs)}); 
            loader2();

        });
};
var songs = [];
var iterate = function(context) {
    var song = "";
    var i = 0;
    var finished;
    context.every(function(song, index, array) {
        song = song.toString();
        song = song.substr(9, song.length);
        song = song.substr(0, song.indexOf("\""));
        //non-json ie: before JSON.parse()

        songs[i] = "{\"title\":\"" + decodeURI(song.substr(0, song.indexOf("."))) + "\",\"mp3\":\"" + URL.concat(song) + "\"}";
        //+"\",\"artist\":\"na"
        songs[i] = JSON.parse(songs[i]);
        //actual JSON
        //songs[i]="{ title:"+song+",artist:"+song+",mp3:"+song+"}";
        console.log("added:" + songs[i].title.toString());
        i++;
        if (index === array.length) {
            finished = true;
        };
        return true;
    });
    // songs.pop();
    // songs.pop();
    songs.reverse();
    songs.pop();
    songs.pop();
    songs.reverse();
};