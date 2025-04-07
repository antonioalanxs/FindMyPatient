import { Preferences } from "@capacitor/preferences";

/**
 * @implements {InterfaceStorageService}
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

  session = async () => {
    const accessToken = await this.get(this.ACCESS_TOKEN);
    const refreshToken = await this.get(this.REFRESH_TOKEN);
    const user = await this.get(this.USER);

    return { accessToken, refreshToken, user };
  };

  saveSession = async (accessToken, refreshToken, user) => {
    await this.save(this.ACCESS_TOKEN, accessToken);
    await this.save(this.REFRESH_TOKEN, refreshToken);
    await this.save(this.USER, user);
  };

  destroySession = async () => {
    await this.remove(this.ACCESS_TOKEN);
    await this.remove(this.REFRESH_TOKEN);
    await this.remove(this.USER);
  };
}

export const storageService = StorageService.instance;
