// Ranks function

(function ( $ ) {
 
    $.fn.rank = function() {
        var rn = 0;
        $.each(this, function(index, value) {
            if(value != 0) {
                rn = rn + (5 - value);
            }
        })
        //console.log(rn);
        return rn;
    }
 
}( jQuery ));


// Disagreements Funciton

(function ( $ ) {
 
    $.fn.disagreements = function() {
        var sum = 0;
        var size = 0;
        $.each(this, function(index, value) {
            size = size + 1;
            sum = sum + value;
        })
        mean = sum / size;
        
        var variance = 0;
        var sum1 = 0;
        $.each(this, function(index, value) {
            var diff = value - mean;
            sum1 = sum1 + (diff * diff);
        })
        
        variance = sum1 / size;
        //console.log(variance);
        return variance;
    }
 
}( jQuery ));


$.getJSON("hybridportrait.json", function(mydata) {
    var table = $("body").append('<Table></Table>');
    $("Table").attr("id", "tableid").attr("class", "sortabletable");
    var thead = $("Table").append("<thead></thead>");
    var tbody = $("Table").append("<tbody></tbody>");
    
    $("thead").append("<tr></tr>").attr("class", "colhead");
    $("thead tr").append("<th>First Name</th>");
    $("thead tr").append("<th>Last Name</th>");
    $("thead tr").append("<th>Role</th>");
    $("thead tr").append("<th>p1</th>");
    $("thead tr").append("<th>p2</th>");
    $("thead tr").append("<th>p3</th>");
    $("thead tr").append("<th>p4</th>");
    $("thead tr").append("<th>p5</th>");
    $("thead tr").append("<th>p6</th>");
    $("thead tr").append("<th>Average</th>");
    $("thead tr").append("<th>Disagreement</th>");
    $("thead tr").append("<th>Wins</th>");
    $("thead tr").append("<th>AvgbyWins</th>");
    $("thead tr th").attr("class", "colname");
    
//    $(data[0].data).each(function(index) {
//        $("tbody").append("<tr></tr>");
//        $("tbody tr").attr("class", "rowname"+index);
//        $.each(function(index, value) {
//            
//        })
//    })
    
    $.each(mydata, function(index, value) {
        $(value.data).each(function(ind, va) {
            $(va.values).disagreements();
           var trrow = "<tr>";
            trrow += "<td>" +va.first_name+ "</td>";
            trrow += "<td>" +va.last_name+ "</td>";
            trrow += "<td>Role</td>";
            trrow += "<td>" +va.values[0]+ "</td>";
            trrow += "<td>" +va.values[1]+ "</td>";
            trrow += "<td>" +va.values[2]+ "</td>";
            trrow += "<td>" +va.values[3]+ "</td>";
            trrow += "<td>" +va.values[4]+ "</td>";
            trrow += "<td>" +va.values[5]+ "</td>";
//            $(va.values).each(function(index, value) {
//                trrow += "<td>" +value+ "</td>";
//            })
            trrow += "<td>" + va.primary_value.toFixed(2) + "</td>";
            trrow += "<td>" + $(va.values).disagreements().toFixed(2) +  "</td>";
            trrow += "<td>" +$(va.values).rank()+  "</td>";
            trrow += "<td>" +( $(va.values).rank().toFixed(2) / va.primary_value).toFixed(2) +  "</td>";
            trrow += "</tr>";
            $("tbody").append(trrow);
        })
    })
})