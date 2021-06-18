import ConfigServer from "../config_server.js";
export default (filename, blob, projectName, projectDesc, cover, is_public) => {
    const formData = new FormData();
    // const  link_download = ConfigServer.host +'/api/upload';
    const link_upload = ConfigServer.host + "/code_kittens_api/projects";

    const id_project = localStorage.getItem("id_project_selected");

    const link_update_project = ConfigServer.host + "/code_kittens_api/projects/" + id_project;

    const file = new File([blob], filename);

    if(file != null)
    {

        formData.append("project_file", file);

    }
   
    if(localStorage.getItem("update_cover") == 'true')
    {
        if(cover != null)
        {
            formData.append("thumbnail", cover);
        }

    }
    formData.append("description", projectDesc);
    formData.append("name", projectName);
    //formData.append("published", is_public);

    var isPublic = false;

    if(is_public==='false'){
        isPublic = false;
    }else
    {
        isPublic = true;
    }

    console.log("Public_project", isPublic);
    formData.append("is_public", isPublic);

    if(localStorage.getItem("update_project")=='true')
    {
        console.log("Update");

        const requestOptions = {
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body:formData
        }; 
    
        return fetch(link_update_project, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("JSON_LOGIN:", result.message);
                const value = result.message;
                if (value.status_code == 200)
                {
                    alert("Dự án cập nhật thành công");
                }else
                {
                    alert("Dự án cập nhật thất bại");
                }
            });
    }else
    {

        console.log("CreateNew");

        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body:formData
        }; 
    
        return fetch(link_upload, requestOptions)
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
    }
};
