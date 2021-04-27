import storage from './storage';
import {inlineSvgFonts} from 'scratch-svg-renderer';
import ConfigServer from '../config_server';
// Contains 'font-family', but doesn't only contain 'font-family="none"'
const HAS_FONT_REGEXP = 'font-family(?!="none")';
const ip = require("ip");;
const getCostumeUrl = (function () {
    let cachedAssetId;
    let cachedUrl;
    return function (asset) {
        if (cachedAssetId === asset.assetId)
        {
            return cachedUrl;
        }
        cachedAssetId = asset.assetId;
        // If the SVG refers to fonts, they must be inlined in order to display correctly in the img tag.
        // Avoid parsing the SVG when possible, since it's expensive.
        if (asset.assetType === storage.AssetType.ImageVector) {
            const svgString = asset.decodeText();
            if (svgString.match(HAS_FONT_REGEXP)) 
            {
                const svgText = inlineSvgFonts(svgString);
                cachedUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
            } else 
            {
                cachedUrl = asset.encodeDataURI();
            }
        } else 
        {
            cachedUrl = asset.encodeDataURI();
        }


        var link_download =  ConfigServer.host + "/api/asset/find/" + asset.assetId;

        console.log("link_download",asset);
        //8e84b654a7b457f5c97d16ac255d6dee
        
        return cachedUrl;
    };
}());
export {
    getCostumeUrl as default,
    HAS_FONT_REGEXP
};
