export type ArtyverseRole = "public" | "customer" | "seller" | "admin"

export type AsyncState = "idle" | "loading" | "success" | "empty" | "error" | "offline"
export type StockState = "available" | "low-stock" | "reserved" | "sold-out"
export type PaymentState = "draft" | "processing" | "pending" | "paid" | "failed" | "refunded"
export type OrderState = "created" | "confirmed" | "packing" | "shipped" | "delivered" | "return-requested" | "returned" | "cancelled"

export interface RouteContract {
  pattern: string
  role: ArtyverseRole
  title: string
  purpose: string
  primaryAction: string
  states: AsyncState[]
  permission?: string
}

export const artyverseRoutes: RouteContract[] = [
  { pattern: "/", role: "public", title: "ARTYVERSE", purpose: "Editorial discovery and creator-drop entry point.", primaryAction: "Explore marketplace", states: ["loading", "success", "error", "offline"] },
  { pattern: "/marketplace", role: "public", title: "Marketplace", purpose: "Browse verified creator products and limited editions.", primaryAction: "Open product", states: ["loading", "success", "empty", "error", "offline"] },
  { pattern: "/marketplace/category/[slug]", role: "public", title: "Category", purpose: "Curated category discovery with persistent filters.", primaryAction: "Filter collection", states: ["loading", "success", "empty", "error", "offline"] },
  { pattern: "/search", role: "public", title: "Search", purpose: "Command-led product and creator search.", primaryAction: "View result", states: ["loading", "success", "empty", "error", "offline"] },
  { pattern: "/marketplace/[slug]", role: "public", title: "Product", purpose: "Product truth, variants, trust, shipping and purchase actions.", primaryAction: "Add to cart", states: ["loading", "success", "error", "offline"] },
  { pattern: "/shop/[slug]", role: "public", title: "Shop", purpose: "Seller identity, trust and collection browsing.", primaryAction: "Follow shop", states: ["loading", "success", "empty", "error", "offline"] },
  { pattern: "/collection/[slug]", role: "public", title: "Collection", purpose: "Narrative merchandising and collectible grouping.", primaryAction: "Explore collection", states: ["loading", "success", "empty", "error"] },
  { pattern: "/drop/[slug]", role: "public", title: "Drop", purpose: "Server-timed limited release and stock state.", primaryAction: "Reserve item", states: ["loading", "success", "empty", "error", "offline"] },
  { pattern: "/wishlist", role: "customer", title: "Wishlist", purpose: "Saved products and stock-change awareness.", primaryAction: "Move to cart", states: ["loading", "success", "empty", "error", "offline"], permission: "customer" },
  { pattern: "/cart", role: "customer", title: "Cart", purpose: "Server-revalidated products, limits, discounts and shipping preview.", primaryAction: "Continue to checkout", states: ["loading", "success", "empty", "error", "offline"] },
  { pattern: "/checkout", role: "customer", title: "Checkout", purpose: "Address, shipping, payment and server-calculated total review.", primaryAction: "Submit order", states: ["idle", "loading", "success", "error", "offline"], permission: "customer" },
  { pattern: "/checkout/result", role: "customer", title: "Payment result", purpose: "Authoritative payment and order status outcome.", primaryAction: "View order", states: ["loading", "success", "error", "offline"] },
  { pattern: "/track", role: "public", title: "Track order", purpose: "Shipment lookup and delivery timeline.", primaryAction: "Track", states: ["idle", "loading", "success", "empty", "error", "offline"] },
  { pattern: "/verify/[serial]", role: "public", title: "Verify collectible", purpose: "COA authenticity and ownership verification.", primaryAction: "View certificate", states: ["loading", "success", "empty", "error", "offline"] },
  { pattern: "/community", role: "public", title: "Community", purpose: "Creator stories, collector activity and moderated discussion.", primaryAction: "Join discussion", states: ["loading", "success", "empty", "error", "offline"] },
  { pattern: "/help", role: "public", title: "Help", purpose: "Support, policy and guided recovery.", primaryAction: "Contact support", states: ["loading", "success", "empty", "error", "offline"] },
  { pattern: "/auth/[...flow]", role: "public", title: "Authentication", purpose: "Login, registration, OTP and password recovery.", primaryAction: "Continue securely", states: ["idle", "loading", "success", "error", "offline"] },
  { pattern: "/account/[...section]", role: "customer", title: "Account", purpose: "Profile, addresses, payments, orders, rewards and security.", primaryAction: "Save changes", states: ["loading", "success", "empty", "error", "offline"], permission: "customer" },
  { pattern: "/seller/[...section]", role: "seller", title: "Seller Center", purpose: "Products, orders, fulfillment, finance, analytics and settings.", primaryAction: "Complete task", states: ["loading", "success", "empty", "error", "offline"], permission: "seller" },
  { pattern: "/admin/[...section]", role: "admin", title: "Administration", purpose: "Users, sellers, moderation, finance, CMS, roles and audit.", primaryAction: "Apply change", states: ["loading", "success", "empty", "error", "offline"], permission: "admin" },
]

export function getRouteContract(pathname: string): RouteContract | undefined {
  return artyverseRoutes.find((route) => {
    const expression = route.pattern
      .replace(/\[\.\.\.[^\]]+\]/g, ".+")
      .replace(/\[[^\]]+\]/g, "[^/]+")
    return new RegExp(`^${expression}$`).test(pathname)
  })
}
