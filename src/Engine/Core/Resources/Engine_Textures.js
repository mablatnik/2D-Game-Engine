"use strict";

var gEngine = gEngine || { };

function TextureInfo(name, w, h, id) {
    this.mName = name;
    this.mWidth = w;
    this.mHeight = h;
    this.mGLTexID = id;
}

gEngine.Textures = (function () {
    var _processLoadedImage = function (textureName, image) {
        var gl = gEngine.Core.getGL();
        
        // generate a texture reference to the webGL context
        var textureID = gl.createTexture();
        
        // bind the texture reference witht the current texture functionality
        gl.bindTexture(gl.TEXTURE_2D, textureID);
        
        // Load the texture into the texture data structure with descriptive info.
        // Parameters:
        //  1: Which "binding point" or target the texture is being loaded to.
        //  2: Level of detail. Used for mipmapping. 0 is base texture level.
        //  3: Internal format. The composition of each element. i.e. pixels.
        //  4: Format of texel data. Must match internal format.
        //  5: The data type of the texel data.
        //  6: Texture Data.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        
        // create a mipmap for this texture
        gl.generateMipmap(gl.TEXTURE_2D);
        
        // inform WebGL that maipulation of data is done
        gl.bindTexture(gl.TEXTURE_2D, null);
        
        var texInfo = new TextureInfo(textureName, image.naturalWidth, image.naturalHeight, textureID);
        gEngine.ResourceMap.asyncLoadCompleted(textureName, texInfo);
    };
    // load texture so that it can be drawn
    var loadTexture = function (textureName) {
        if (!(gEngine.ResourceMap.isAssetLoaded(textureName))) {
            // create new texture object
            var img = new Image();
            
            // update resources in loading counter
            gEngine.ResourceMap.asyncLoadRequested(textureName);
            
            // convert texture to WebGL format then put into the mTextureMap
            img.onload = function () {
                _processLoadedImage(textureName, img);
            };
            img.src = textureName;
        } else {
            gEngine.ResourceMap.incAssetRefCount(textureName);
        }
    };
    
    // Remove reference to allow associated memory be available for garbage collection
    var unloadTexture = function (textureName) {
        var gl = gEngine.Core.getGL();
        var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);
        gl.deleteTexture(texInfo.mGLTexID);
        gEngine.ResourceMap.unloadAsset(textureName);
    };
    
    var activateTexture = function (textureName) {
        var gl = gEngine.Core.getGL();
        var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);
        
        // binds texture reference to the current WebGL texture functionality
        gl.bindTexture(gl.TEXTURE_2D, texInfo.mGLTexID);
        
        // prevent texture wrappings
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        
        // handles magnigication and minimization filters work
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        
        // For pixel-graphics where you want the texture to look "sharp" do the following:
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    };
    
    var deactivateTexture = function () {
        var gl = gEngine.Core.getGL();
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    
    var getTextureInfo = function (textureName) {
        return gEngine.ResourceMap.retrieveAsset(textureName);
    };
    
    var mPublic = {
        loadTexture: loadTexture,
        unloadTexture: unloadTexture,
        activateTexture: activateTexture,
        deactivateTexture: deactivateTexture,
        getTextureInfo: getTextureInfo
    };
    return mPublic;
}());

