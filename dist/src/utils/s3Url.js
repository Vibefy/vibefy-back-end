"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3AvatarAdmUrl = exports.s3AvatarArtistUrl = exports.s3AvatarUserUrl = exports.s3ImageUrl = exports.s3MusicUrl = void 0;
const s3MusicUrl = (objectAws) => {
    return `https://vibefy.s3.sa-east-1.amazonaws.com/musics/${objectAws}`;
};
exports.s3MusicUrl = s3MusicUrl;
const s3ImageUrl = (objectAws) => {
    return `https://vibefy.s3.sa-east-1.amazonaws.com/musics/${objectAws}`;
};
exports.s3ImageUrl = s3ImageUrl;
const s3AvatarUserUrl = (objectAws) => {
    return `https://vibefy.s3.sa-east-1.amazonaws.com/avatar/user/${objectAws}`;
};
exports.s3AvatarUserUrl = s3AvatarUserUrl;
const s3AvatarArtistUrl = (objectAws) => {
    return `https://vibefy.s3.sa-east-1.amazonaws.com/avatar/artist/${objectAws}`;
};
exports.s3AvatarArtistUrl = s3AvatarArtistUrl;
const s3AvatarAdmUrl = (objectAws) => {
    return `https://vibefy.s3.sa-east-1.amazonaws.com/avatar/adm/${objectAws}`;
};
exports.s3AvatarAdmUrl = s3AvatarAdmUrl;
