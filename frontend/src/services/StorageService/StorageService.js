import { Storage } from "@ionic/storage";

/**
 * A service that provides methods to interact with the `@ionic/storage` API.
 *
 * It is a singleton class that can be accessed using the `instance` property.
 *
 * It is implemented using the `Singleton` and `Builder` design patterns.
 */
class StorageService {
  static instance = new StorageService();

  /**
   * Creates an instance of `StorageService`. If it already exists, it returns the existing instance.
   *
   * In addition, it initializes the `ACCESS_TOKEN`, `REFRESH_TOKEN`, and `USER` constants keys.
   *
   * @returns {StorageService} - The `StorageService` instance.
   */
  constructor() {
    if (StorageService.instance) {
      return StorageService.instance;
    }

    this.storage = new Storage();

    this.ACCESS_TOKEN = "accessToken";
    this.REFRESH_TOKEN = "refreshToken";
    this.USER = "user";

    StorageService.instance = this;
  }

  /**
   * Sets a key-value pair in the storage.
   *
   * @param {string} key - The key to store the value.
   * @param {any} value - The value to store.
   *
   * @returns {Storage} - The `Storage` object.
   */
  _save = async (key, value) => {
    value = JSON.stringify(value);
    await this.storage.set(key, value);
    return this.storage;
  };

  /**
   * Gets the value stored using its key.
   *
   * @param {string} key - The key to get the value.
   *
   * @returns {any} - The value stored in the storage.
   */
  _get = async (key) => {
    let item = await this.storage.get(key);
    item = item ? JSON.parse(item) : null;
    return item;
  };

  /**
   * Removes all the key-value pairs from the storage.
   *
   * @param {string} key - The key to remove.
   */
  _clear = async () => {
    await this.storage.clear();
  };
}

export const storageService = StorageService.instance;
