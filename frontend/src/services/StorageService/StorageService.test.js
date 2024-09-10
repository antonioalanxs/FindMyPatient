import { describe, it, expect, vi, beforeEach } from "vitest";
import { Storage } from "@ionic/storage";

import { storageService } from "@/services/StorageService/StorageService";

vi.mock("@ionic/storage", () => {
  return {
    Storage: vi.fn().mockImplementation(() => {
      return {
        create: vi.fn(),
        set: vi.fn(),
        get: vi.fn(),
        clear: vi.fn(),
      };
    }),
  };
});

describe("StorageService", () => {
  let mockStorage;

  beforeEach(() => {
    mockStorage = new Storage();
    storageService.storage = mockStorage;
  });

  it("should be a singleton", () => {
    const instance = storageService;
    const instance2 = storageService;
    expect(instance).toBe(instance2);
  });

  it("should save a value in the storage", async () => {
    const key = storageService.ACCESS_TOKEN;
    const value = "test";

    await storageService._save(key, value);

    expect(mockStorage.set).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it("should get a value from the storage", async () => {
    const key = storageService.ACCESS_TOKEN;
    const value = "test";

    mockStorage.get.mockResolvedValueOnce(JSON.stringify(value));

    const result = await storageService._get(key);

    expect(mockStorage.get).toHaveBeenCalledWith(key);
    expect(result).toBe(value);
  });

  it("should clear the storage", async () => {
    await storageService._clear();

    expect(mockStorage.clear).toHaveBeenCalled();
  });
});
