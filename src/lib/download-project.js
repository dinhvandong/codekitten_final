import ConfigServer from "../config_server";
export default (filename, blob, projectName, projectDesc, cover, is_public) => {
    const formData = new FormData();
    // const  link_download = ConfigServer.host +'/api/upload';
    const link_upload = ConfigServer.host + "/code_kittens_api/projects";
    const file = new File([blob], filename);
    //  formData.append("file", file);
    //  formData.append("name", projectName);
    //  formData.append("projectDesc",projectDesc);

    formData.append("project_file", file);
    formData.append("thumbnail", cover);
    formData.append("description", projectDesc);
    formData.append("name", projectName);

    var isPublic = false;

    if(is_public==='false'){
        isPublic = false;
    }else
    {
        isPublic = true;
    }
    formData.append("is_public", isPublic);


    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        body:formData
    }; 

    fetch(link_upload, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log("JSON_LOGIN:", result);
            const value = result.message;
            if (value.status_code == 200)
            {
                alert("Dự án lưu thành công");
            }else
            {
                alert("Dự án lưu thất bại");
            }
        });

    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    console.log("download1");

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
            window.setTimeout(() => {
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(url);
            }, 1000);
        };
    } else {
    }
};
