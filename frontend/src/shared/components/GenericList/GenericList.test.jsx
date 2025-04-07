import { customRender } from "@/tests/customRender";
import GenericList from "@/shared/components/GenericList/GenericList";

import { describe, it, vi } from "vitest";

describe("GenericList", () => {
  it("should create", () => {
    const mockFetchService = vi.fn(() =>
      Promise.resolve({
        data: {
          results: [],
          count: 0,
        },
      })
    );

    const mockAdapter = {
      run: vi.fn((data) => data),
    };

    customRender(<GenericList fetchService={mockFetchService} adapter={mockAdapter} />);
  });
});
