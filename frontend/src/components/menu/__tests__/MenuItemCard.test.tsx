import { render, screen, fireEvent } from "@testing-library/react";
import MenuItemCard from "../MenuItemCard";
import { useCartStore } from "../../../store/cart.store";
import { vi } from "vitest";

// Mock the cart store
vi.mock("../../../store/cart.store", () => ({
  useCartStore: vi.fn(),
}));

describe("MenuItemCard", () => {
  const mockItem = {
    id: "item1",
    name: "Classic Burger",
    description: "A very tasty burger",
    price: 150,
    imageUrl: "/burger.jpg",
  };

  const mockAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) => {
      // Return a mocked store state depending on what selector is looking for
      const mockStore = {
        items: [],
        addToCart: mockAddToCart,
      };
      return selector(mockStore);
    });
  });

  it("renders item details correctly", () => {
    render(<MenuItemCard item={mockItem} />);

    expect(screen.getByText("Classic Burger")).toBeInTheDocument();
    expect(screen.getByText("₹150")).toBeInTheDocument();
    expect(screen.getByText("A very tasty burger")).toBeInTheDocument();
  });

  it("calls addToCart when 'Add to Cart' button is clicked", () => {
    render(<MenuItemCard item={mockItem} />);

    const addButton = screen.getByText("Add to Cart");
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith({
      menuItemId: "item1",
      name: "Classic Burger",
      price: 150,
      quantity: 1,
    });
  });

  it("shows 'Add Again' if item is already in cart", () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) => {
      const mockStore = {
        items: [{ menuItemId: "item1", quantity: 2 }],
        addToCart: mockAddToCart,
      };
      return selector(mockStore);
    });

    render(<MenuItemCard item={mockItem} />);

    expect(screen.getByText("Add Again (2 in cart)")).toBeInTheDocument();
    // And there should be a cart indicator on the image
    expect(screen.getByText("2 in cart")).toBeInTheDocument(); 
  });
});
