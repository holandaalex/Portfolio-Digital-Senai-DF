import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BackToTop from "../components/BackToTop";
import { useIsMobile } from "../hooks/use-mobile";
import { cn } from "../lib/utils";
import { renderHook } from "@testing-library/react";

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
});

describe("BackToTop Component", () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when scrollY < 320", () => {
    render(<BackToTop />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render when scrollY > 320", () => {
    window.scrollY = 500;
    render(<BackToTop />);
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call scrollTo with top: 0 on click", () => {
    window.scrollY = 500;
    render(<BackToTop />);
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("should have correct aria-label", () => {
    window.scrollY = 500;
    render(<BackToTop />);
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Voltar para o topo");
  });
});

describe("useIsMobile Hook", () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });
  });

  it("should return false on desktop", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should return true on mobile", () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 600,
    });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });
});

describe("cn Utility", () => {
  it("should merge Tailwind classes correctly", () => {
    const result = cn("px-2", "px-4");
    expect(result).toBe("px-4");
  });

  it("should handle conditional classes", () => {
    const result = cn("bg-red-500", true && "text-white", false && "hidden");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle arrays and objects", () => {
    const result = cn(["bg-blue-500", "text-white"], { "hover:bg-blue-700": true });
    expect(result).toBe("bg-blue-500 text-white hover:bg-blue-700");
  });
});
