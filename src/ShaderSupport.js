var gSimpleShader = null;

var gShaderVertexPositionAttribute = null;

function loadAndCompileShader(id, shaderType) {
    var shaderText, shaderSource, compiledShader;
    // get shader source for index
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;
    // create shader based on source type: vertex or fragment
    compiledShader = gGL.createShader(shaderType);
    // compile and create shader
    gGL.shaderSource(compiledShader, shaderSource);
    gGL.compileShader(compiledShader);
    // check for error and return result
    if (!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS))
    {
        alert("A shader compiling error occured:" + 
                gGL.getShaderInfoLog(compiledShader));
    }
    
    return compiledShader;
}

function initSimpleShader(vertexShaderID, fragmentShaderID) {
    // load and compile vertex and fragment shaders
    var vertexShader = loadAndCompileShader(vertexShaderID, gGL.VERTEX_SHADER);
    var fragmentShader = loadAndCompileShader(fragmentShaderID, gGL.FRAGMENT_SHADER);
    // create and link shaders into a program
    gSimpleShader = gGL.createProgram();
    gGL.attachShader(gSimpleShader, vertexShader);
    gGL.attachShader(gSimpleShader, fragmentShader);
    gGL.linkProgram(gSimpleShader);
    // check for error
    if(!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS))
        alert("Error linking shader");
    // get reference to aSquareVertexPosition attribute
    gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, "aSquareVertexPosition");
    // activates the vertex buffer in VertexBuffer.js
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);
    /*
    describes the characteristics of the vertex position attribute
    3: each vertex element is a 3-float
    gGL.FLOAT: data is FLOAT
    false: if the content is normalized vectors
    0: number of bytes to skip between elements
    0: offsets to the first element
    */
    gGL.vertexAttribPointer(gShaderVertexPositionAttribute, 3, gGL.FLOAT, false, 0, 0);
}
