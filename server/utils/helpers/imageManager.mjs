import cloudinary from "../../config/cloudinary.mjs";


export function  uploadImage(imgPath) {
  cloudinary.uploader
    .upload(imgPath)
    .then(result => console.log(result))
    .catch(error => console.error(error));
}

// export function  fetchImage(publicId) {
//    return cloudinary.url(publicId, {
//         crop: "scale"
//     })
// }
