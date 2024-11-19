import { Storage } from "@ionic/storage";

/**
 * A service that provides methods to interact with the `@ionic/storage` API.
 *
 * It is a singleton class that can be accessed using the `instance` property.
 */
class StorageService {
  static instance = new StorageService();

  /**
   * Creates an instance of `StorageService`. If it already exists, it returns the existing instance.
   *
   * In addition, it initializes the `ACCESS_TOKEN`, `REFRESH_TOKEN`, `USER` and `THEME` properties.
   *
   * @returns {StorageService} - The `StorageService` instance.
   */
  constructor() {
    if (StorageService.instance) {
      return StorageService.instance;
    }

    this.storage = new Storage();

    Promise.resolve(this.storage.create())
      .then(() => {
        this.ACCESS_TOKEN = "accessToken";
        this.REFRESH_TOKEN = "refreshToken";
        this.USER = "user";
        this.THEME = "theme";

        StorageService.instance = this;
      })
      .catch((error) => console.error(error));
  }

  /**
   * Sets a key-value pair in the storage.
   *
   * @param {string} key - The key to store the value.
   * @param {any} value - The value to store.
   */
  save = async (key, value) => {
    value = JSON.stringify(value);

    await this.storage.set(key, value).catch((error) => console.error(error));
  };

  /**
   * Gets the value stored using its key.
   *
   * @param {string} key - The key to get the value.
   *
   * @returns {any} - The value stored in the storage.
   */
  get = async (key) => {
    let item;

    await this.storage.get(key).then((value) => (item = JSON.parse(value)));

    return item;
  };

  /**
   * Removes the value stored using its key.
   *
   * @param {string} key - The key to remove the value.
   */
  remove = async (key) => {
    await this.storage.remove(key).catch((error) => console.error(error));
  };
}

export const storageService = StorageService.instance;
