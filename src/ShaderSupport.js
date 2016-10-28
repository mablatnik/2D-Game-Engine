var gSimpleShader = null;

var gShaderVertexPositionAttribute = null;

function loadAndCompileShader(id, shaderType) {
    var shaderText, shaderSource, compiledShader;
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;
    compiledShader = gGL.createShader(shaderType);
    gGL.shaderSource(compiledShader, shaderSource);
    gGL.compiledShader(compiledShader);
    
    if (!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS))
    {
        alert("A shader compiling error occured:" + 
                gGL.getShaderInfoLog(compiledShader));
    }
    
    return compiledShader;
}


