import ScratchStorage from 'scratch-storage';
import ConfigServer from '../config_server';

import defaultProject from './default-project';

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
class Storage extends ScratchStorage {
    constructor () {
        super();
        this.cacheDefaultProject();
    }
    addOfficialScratchWebStores () {
        this.addWebStore(
            [this.AssetType.Project],
            this.getProjectGetConfig.bind(this),
            this.getProjectCreateConfig.bind(this),
            this.getProjectUpdateConfig.bind(this)
        );
        this.addWebStore(
            [this.AssetType.ImageVector, this.AssetType.ImageBitmap, this.AssetType.Sound],
            this.getAssetGetConfig.bind(this),
            // We set both the create and update configs to the same method because
            // storage assumes it should update if there is an assetId, but the
            // asset store uses the assetId as part of the create URI.
            this.getAssetCreateConfig.bind(this),
            this.getAssetCreateConfig.bind(this)
        );
        this.addWebStore(
            [this.AssetType.Sound],
            asset => `static/extension-assets/scratch3_music/${asset.assetId}.${asset.dataFormat}`
        );
    }
    setProjectHost (projectHost) {
        this.projectHost = projectHost;
    }
    getProjectGetConfig (projectAsset) {

        console.log("getProjectGetConfig");

        return `${this.projectHost}/${projectAsset.assetId}`;
    }
    getProjectCreateConfig () {
        console.log("getProjectCreateConfig");

        return {
            url: `${this.projectHost}/`,
            withCredentials: true
        };
    }
    getProjectUpdateConfig (projectAsset) {

        console.log("getProjectUpdateConfig");
        return {
            url: `${this.projectHost}/${projectAsset.assetId}`,
            withCredentials: true
        };
    }
    setAssetHost (assetHost) {
        this.assetHost = assetHost;
    }
    getAssetGetConfig (asset) {
        var ip = require("ip");;
        console.log ("Dia chi IP:", ip.address() );

        if(localStorage.getItem("choice") === "extension")
        {

          return `${this.assetHost}/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`;


        }

       // const host = ip.address()+":8080";
        // const baseUrl =  host + ":8080";
         //ConfigServer.host = host;
      //  return `${this.assetHost}/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`;
      // var link_download = ConfigServer.host + "/api/asset/find/" + asset.assetId;
      

      var host = ConfigServer.host + "/code_kittens_api/assets/";

      const isSprite = localStorage.getItem("sprite");
      console.log("isSprite",isSprite);
      var iconURL = "";
      if(isSprite==='true'){
          iconURL = host + asset.assetId
      }else
      {
          iconURL = host + asset.assetId + "?type=background";
      }

      //const link = 'https://dev.teky.asia/v1/code_kittens_api/assets/10989781-da64-4409-843a-4c1aecdbeeb3';
      //"https://sgp1.digitaloceanspaces.com/devlms/teky20/media/code-kitten/assets/2021/05/25/robot_8.svg";

      console.log("LINNNNNN:",iconURL);
       return iconURL;
    }
    getAssetCreateConfig (asset) {
        return {
            // There is no such thing as updating assets, but storage assumes it
            // should update if there is an assetId, and the asset store uses the
            // assetId as part of the create URI. So, force the method to POST.
            // Then when storage finds this config to use for the "update", still POSTs
            method: 'post',
            url: `${this.assetHost}/${asset.assetId}.${asset.dataFormat}`,
            withCredentials: true
        };
    }
    setTranslatorFunction (translator) {
        this.translator = translator;
        this.cacheDefaultProject();
    }
    cacheDefaultProject () {
        const defaultProjectAssets = defaultProject(this.translator);
        defaultProjectAssets.forEach(asset => this.builtinHelper._store(
            this.AssetType[asset.assetType],
            this.DataFormat[asset.dataFormat],
            asset.data,
            asset.id
        ));
    }
}

const storage = new Storage();

export default storage;
