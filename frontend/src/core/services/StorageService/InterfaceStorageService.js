/**
 * @interface InterfaceStorageService
 */

InterfaceStorageService.prototype.save = function (key, value) {};
InterfaceStorageService.prototype.get = function (key) {};
InterfaceStorageService.prototype.remove = function (key) {};

InteraceStorageService.prototype.session = function () {};
InterfaceStorageService.prototype.saveSession = function (
  accessToken,
  refreshToken,
  user
) {};
InterfaceStorageService.prototype.destroySession = function () {};
