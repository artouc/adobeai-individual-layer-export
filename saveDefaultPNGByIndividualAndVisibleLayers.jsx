const folder = Folder.selectDialog("エクスポート先のフォルダを選択してください");
const document = app.activeDocument;

if(document && folder) {
    const options = new ExportOptionsPNG24();
    options.antiAliasing = true;
    options.transparency = true;
    options.artBoardClipping = true;
    
    const visibleLayers = getVisibleLayers();
    
    for(var i = 0; i < visibleLayers.length; ++i) {
        hideAllLayers();
        var layer = visibleLayers[i];
        layer.visible = true;
        var file = new File(folder.fsName+"/"+layer.name+".png");
        document.exportFile(file,ExportType.PNG24,options);
    }
    showAllLayers();
}

function getVisibleLayers() {
    var visibleLayers = [];
    forEach(document.layers, function(layer) {
        if(layer.visible) {
            visibleLayers.push(layer);
        }
    });
    return visibleLayers;
}

function hideAllLayers() {
    forEach(document.layers, function(layer) {
        layer.visible = false;
    });
}

function showAllLayers() {
    forEach(document.layers, function(layer) {
        layer.visible = true;
    });
}

function forEach(collection, fn) {
    const length = collection.length;
    for(var i = 0; i < length; ++i) {
        fn(collection[i]);
    }
}