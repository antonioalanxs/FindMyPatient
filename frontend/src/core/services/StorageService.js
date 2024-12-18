import { Preferences } from "@capacitor/preferences";

/**
 * A service that provides methods to interact with the `@capacitor/preferences` API.
 *
 * It is a singleton class that can be accessed using the `instance` property.
 */
class StorageService {
  static instance = new StorageService();

  constructor() {
    if (StorageService.instance) {
      return StorageService.instance;
    }

    this.storage = Preferences;

    this.ACCESS_TOKEN = "accessToken";
    this.REFRESH_TOKEN = "refreshToken";
    this.USER = "user";
    this.THEME = "theme";

    StorageService.instance = this;
  }

  save = async (key, value) => {
    value = JSON.stringify(value);

    await this.storage
      .set({ key, value })
      .catch((error) => console.error(error));
  };

  get = async (key) => {
    return await this.storage
      .get({ key })
      .then(({ value }) => JSON.parse(value))
      .catch((error) => console.error(error));
  };

  remove = async (key) => {
    await this.storage.remove({ key }).catch((error) => console.error(error));
  };

  clear = async () => {
    await this.storage.clear().catch((error) => console.error(error));
  };
}

export const storageService = StorageService.instance;
