"use strict";
require("ali-oss");
const getFileNameUUID = () => {
  function rx() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  }
  function guid() {
    function S4() {
      return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    return S4() + S4();
  }
  return `${guid()}${rx()}${rx()}`;
};
exports.getFileNameUUID = getFileNameUUID;
