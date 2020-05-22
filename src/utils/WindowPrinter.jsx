const PrintByDiv = (data, columns, title) =>
{
    let cssStyle='<style type="text/css">' +
    'table th, table td {' +
    'border:0.2px solid #000;' +
    'padding:0.5em;' +
    '}' +
    '</style>';
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><head><title>' + title  + '</title>');
    mywindow.document.write(cssStyle);
    mywindow.document.write('</head><body>');
    mywindow.document.write('<h1>' + title  + '</h1>');

    let body = "<table style='width: 100%'><thead class='thead-dark'>";
    for(let i = 0 ; i < columns.length; i++){
        body+="<th>" + columns[i].text + "</th>"
    }
    body+="</thead><tbody>"
    data && data.map(function(row){
        body+="<tr>"
        for(let i = 0 ; i < columns.length; i++){
            body+="<td>" + (row.hasOwnProperty(columns[i].dataField) ? row[columns[i].dataField] : " None ") + "</td>";
        }
        body+="</tr>"
    }) 
    body+="</tbody></table>"

    mywindow.document.write(body);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

export default PrintByDiv;