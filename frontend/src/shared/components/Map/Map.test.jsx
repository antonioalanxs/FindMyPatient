import React from "react";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { describe, it, vi, beforeAll, afterEach, beforeEach } from "vitest";

import Map from "@/shared/components/Map/Map";

vi.mock("leaflet", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Map: vi.fn(() => ({
      setView: vi.fn(),
      zoomControl: {
        setPosition: vi.fn(),
      },
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      invalidateSize: vi.fn(),
    })),
    TileLayer: vi.fn(() => ({
      addTo: vi.fn(),
      remove: vi.fn(),
    })),
    Marker: vi.fn(() => ({
      addTo: vi.fn(),
      remove: vi.fn(),
    })),
    Polyline: vi.fn(() => ({
      addTo: vi.fn(),
      remove: vi.fn(),
    })),
    divIcon: vi.fn((options) => ({
      options,
    })),
    latLng: vi.fn((latitude, longitude) => ({ latitude, longitude })),
    latLngBounds: vi.fn((southWest, northEast) => ({ southWest, northEast })),
    Layer: vi.fn(() => ({
      addTo: vi.fn(),
      remove: vi.fn(),
    })),
    Path: vi.fn(() => ({
      addTo: vi.fn(),
      remove: vi.fn(),
      _removePath: vi.fn(),
    })),
    Util: {
      stamp: vi.fn((obj) => (obj._leaflet_id = 1)),
    },
  };
});

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  const originalCreateElement = document.createElement;
  document.createElement = function (tagName) {
    if (tagName === "div") {
      const div = originalCreateElement.call(document, tagName);
      Object.defineProperty(div, "clientHeight", { value: 500 });
      Object.defineProperty(div, "clientWidth", { value: 500 });
      return div;
    }
    return originalCreateElement.call(document, tagName);
  };
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, information) {
    console.error(error, information);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

describe("Map", () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    container = null;
    root = null;
  });

  it("should render", async () => {
    await act(async () => {
      root.render(
        <ErrorBoundary>
          <Map
            position={[51.505, -0.09]}
            path={[
              [51.505, -0.09],
              [51.51, -0.1],
            ]}
            address={"test"}
          />
        </ErrorBoundary>
      );
    });
  });
});
