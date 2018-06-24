// Dropdown
$('.item.dropdown')
    .dropdown({
        action: 'item'
    });

// Modal new view
$('.modal__new')
    .modal('attach events', '#new', 'show');

// Modal Print
$('.modal__print')
    .modal('attach events', '#print', 'show');

// Modal confirm
$('.modal__confirm')
    .modal('attach events', '#confirm', 'show');

// Acordion
$('.accordion')
    .accordion({
        selector: {
            trigger: '.title'
        }
    });


// Exporting
var xport = {
    _fallbacktoCSV: true,  
    toXLS: function(tableId, filename) {   
        this._filename = (typeof filename == 'undefined') ? tableId : filename;
        
        //var ieVersion = this._getMsieVersion();
        //Fallback to CSV for IE & Edge
        if ((this._getMsieVersion() || this._isFirefox()) && this._fallbacktoCSV) {
        return this.toCSV(tableId);
        } else if (this._getMsieVersion() || this._isFirefox()) {
        alert("Not supported browser");
        }

        //Other Browser can download xls
        var htmltable = document.getElementById(tableId);
        var html = htmltable.outerHTML;

        this._downloadAnchor("data:application/vnd.ms-excel" + encodeURIComponent(html), 'xls'); 
    },
    toCSV: function(tableId, filename) {
        this._filename = (typeof filename === 'undefined') ? tableId : filename;
        // Generate our CSV string from out HTML Table
        var csv = this._tableToCSV(document.getElementById(tableId));
        // Create a CSV Blob
        var blob = new Blob([csv], { type: "text/csv" });

        // Determine which approach to take for the download
        if (navigator.msSaveOrOpenBlob) {
        // Works for Internet Explorer and Microsoft Edge
        navigator.msSaveOrOpenBlob(blob, this._filename + ".csv");
        } else {      
        this._downloadAnchor(URL.createObjectURL(blob), 'csv');      
        }
    },
    _getMsieVersion: function() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf("MSIE ");
        if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
        }

        var trident = ua.indexOf("Trident/");
        if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
        }

        var edge = ua.indexOf("Edge/");
        if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
        }

        // other browser
        return false;
    },
    _isFirefox: function(){
        if (navigator.userAgent.indexOf("Firefox") > 0) {
        return 1;
        }
        
        return 0;
    },
    _downloadAnchor: function(content, ext) {
        var anchor = document.createElement("a");
        anchor.style = "display:none !important";
        anchor.id = "downloadanchor";
        document.body.appendChild(anchor);
  
        // If the [download] attribute is supported, try to use it
        
        if ("download" in anchor) {
          anchor.download = this._filename + "." + ext;
        }
        anchor.href = content;
        anchor.click();
        anchor.remove();
    },
    _tableToCSV: function(table) {
        // We'll be co-opting `slice` to create arrays
        var slice = Array.prototype.slice;

        return slice
        .call(table.rows)
        .map(function(row) {
            return slice
            .call(row.cells)
            .map(function(cell) {
                return '"t"'.replace("t", cell.textContent);
            })
            .join(",");
        })
        .join("\r\n");
    }
};
  

$('#exportcsv').click(function(){
    xport.toCSV('datatable');
});


// PDF VIEWR
$('#exportpdf').click(function(){
    var columns = [
        {title: "ID", dataKey: "id"},
        {title: "Name", dataKey: "name"}, 
        {title: "Country", dataKey: "country"}, 
    ];
    var rows = [
        {"id": 1, "name": "Shaw", "country": "Tanzania"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
    ];
    
    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
        styles: {fillColor: [100, 255, 255]},
        columnStyles: {
            id: {fillColor: 255}
        },
        margin: {top: 60},
        addPageContent: function(data) {
            doc.text("Header", 40, 30);
        }
    });
    doc.save('table.pdf');
});