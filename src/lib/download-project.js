import ConfigServer from "../config_server";

export default (filename, blob, projectName, projectDesc) => {
    const formData = new FormData();
    // const  link_download = ConfigServer.host +'/api/upload';
     const link_download = ConfigServer.host + "/api/project/create";
     const file = new File([blob], filename);
     formData.append("file", file);
     formData.append("name", projectName);
     formData.append("projectDesc",projectDesc);
     return fetch(link_download, {
         method: "POST",
         body: formData,
     });
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    console.log("download1");
    // Use special ms version if available to get it working on Edge.
    // if (navigator.msSaveOrOpenBlob) {
    //     navigator.msSaveOrOpenBlob(blob, filename);
    //     return;
    // }

    if ("download" in HTMLAnchorElement.prototype) {
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.type = blob.type;
        downloadLink.click();
        // console.log("download2");
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            // const formData = new FormData();
            // const file = new File([blob], filename);
            // formData.append("file", file);
            // formData.append("name", "projectName");
            // formData.append("projectDesc", "projectDesc");
            // console.log("formData", projectName);
            // console.log("formData", projectDesc);
            // //const  link_download = ConfigServer.host +'/api/upload';
            // const link_download = ConfigServer.host + "/api/project/create";
            // fetch(link_download, {
            //     method: "POST",
            //     body: formData,
            //     headers: {
            //         "Content-Type": "application/x-www-form-urlencoded",
            //     },
            // })
            //     .then((response) => response.json())
            //     .then((result) => {
            //         console.log("Success:", result);
            //     })
            //     .catch((error) => {
            //         console.error("Error:", error);
            //     });

          

            window.setTimeout(() => {
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(url);
            }, 1000);
        };
    } else {
        // iOS 12 Safari, open a new page and set href to data-uri
        // let popup = window.open("", "_blank");
        // const reader = new FileReader();
        // reader.onloadend = function () {
        //     popup.location.href = reader.result;
        //     popup = null;
        // };
        // reader.readAsDataURL(blob);
    }
};
