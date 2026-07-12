import type { Role } from "@/lib/artyverse/contracts"

export type ArtyverseRouteKind =
  | "storefront"
  | "commerce"
  | "auth"
  | "account"
  | "seller"
  | "admin"
  | "support"

export interface ArtyverseRouteDefinition {
  pattern: string
  title: string
  description: string
  kind: ArtyverseRouteKind
  role: Role | "public"
  conversionAnchor: string
  memorableMoment: string
  permission?: string
}

const route = (
  pattern: string,
  title: string,
  description: string,
  kind: ArtyverseRouteKind,
  role: Role | "public",
  conversionAnchor: string,
  memorableMoment: string,
  permission?: string,
): ArtyverseRouteDefinition => ({
  pattern,
  title,
  description,
  kind,
  role,
  conversionAnchor,
  memorableMoment,
  permission,
})

export const artyverseRoutes: ArtyverseRouteDefinition[] = [
  route("/", "Enter ARTYVERSE", "Discover limited digital products, creator drops and verified collectibles.", "storefront", "public", "Explore the marketplace", "Orbit guides discovery without blocking product content."),
  route("/marketplace", "Marketplace", "Browse products with server-backed price, stock and seller trust signals.", "storefront", "public", "Browse verified products", "Product capsules reveal trust and availability at a glance."),
  route("/marketplace/category/[slug]", "Category", "Explore a focused category with URL-driven filters and stable sorting.", "storefront", "public", "Apply filters", "Warp tabs preserve context while changing category views."),
  route("/search", "Search", "Search products, shops, collections and drops with accessible command navigation.", "storefront", "public", "Search ARTYVERSE", "Orbit translates search intent into useful filter suggestions."),
  route("/marketplace/[slug]", "Product detail", "Review media, variants, seller trust, stock, shipping and COA eligibility.", "commerce", "public", "Choose a variant", "A collector pulse reacts only to real selection and stock state."),
  route("/shop/[slug]", "Shop", "Review a seller profile, verification state, policies and available products.", "storefront", "public", "Follow this shop", "Seller signal turns operational trust into a readable profile moment."),
  route("/collection/[slug]", "Collection", "Browse a curated series with provenance, availability and completion context.", "storefront", "public", "View collection items", "Orbit visualizes collection progress as useful status."),
  route("/drop/[slug]", "Limited drop", "Inspect server-timed availability, purchase limits and reservation status.", "commerce", "public", "Join the drop", "Drop Reactor responds to authoritative time and stock rather than fake urgency."),
  route("/wishlist", "Wishlist", "Review saved items and current server availability.", "commerce", "buyer", "Move an item to cart", "Saved items use reward feedback without hiding stock changes."),
  route("/cart", "Cart", "Review quantities and request a server-calculated checkout quote.", "commerce", "buyer", "Request checkout quote", "Orbit flags changed price or stock with a clear recovery action."),
  route("/checkout", "Checkout", "Complete address, delivery, payment and review using server totals.", "commerce", "buyer", "Submit checkout once", "CheckoutStepper shows causality and never fakes progress."),
  route("/checkout/result", "Checkout result", "Verify authoritative payment and order status after checkout.", "commerce", "buyer", "View order", "LootReveal celebrates only a confirmed server result."),
  route("/track", "Track order", "Find an order and review shipment events.", "commerce", "public", "Track shipment", "Shipping timeline turns carrier events into readable progress."),
  route("/verify/[serial]", "Verify authenticity", "Check a serial against the authoritative COA record.", "commerce", "public", "Verify serial", "COALock communicates verified, invalid and unavailable outcomes."),
  route("/community", "Community", "Discover collector stories, creator updates and moderated discussion.", "storefront", "public", "Open a community story", "Mischief copy supports discovery while moderation remains explicit."),
  route("/help", "Help center", "Find support guidance for orders, payments, returns and seller operations.", "support", "public", "Search help", "Orbit routes the user to the correct support path."),

  route("/auth/login", "Log in", "Access buyer, seller and admin experiences securely.", "auth", "public", "Log in", "Orbit confirms the active authentication step."),
  route("/auth/register", "Create account", "Create an ARTYVERSE account with clear consent and validation.", "auth", "public", "Create account", "Squish feedback confirms only valid field interactions."),
  route("/auth/otp", "Verify code", "Complete one-time-code verification with resend and expiry feedback.", "auth", "public", "Verify code", "Lock motion explains verification state."),
  route("/auth/forgot-password", "Forgot password", "Request a secure password reset message.", "auth", "public", "Send reset link", "Orbit explains whether the request can be retried."),
  route("/auth/reset-password", "Reset password", "Set a new password and review active sessions.", "auth", "public", "Save new password", "Lock feedback communicates security completion."),

  route("/account", "Account overview", "Review orders, rewards, messages and account actions.", "account", "buyer", "Open recent order", "Collector pulse summarizes meaningful account progress."),
  route("/account/profile", "Profile", "Manage buyer identity and communication details.", "account", "buyer", "Save profile", "Orbit confirms saved profile state."),
  route("/account/addresses", "Addresses", "Manage delivery addresses with validated postal details.", "account", "buyer", "Add address", "Address cards recompose for mobile without hidden actions."),
  route("/account/payments", "Payment methods", "Manage tokenized payment methods without exposing card data.", "account", "buyer", "Add payment method", "COALock-style trust feedback explains payment security."),
  route("/account/orders", "Orders", "Browse orders with stable sorting and status filters.", "account", "buyer", "Open order", "Order state signals remain readable without color alone."),
  route("/account/orders/[id]", "Order detail", "Review authoritative order, payment, shipment and return state.", "account", "buyer", "Track or request support", "Shipping timeline links every status to the next action."),
  route("/account/tracking/[id]", "Shipment tracking", "Review carrier events and delivery exceptions.", "account", "buyer", "View shipment details", "Orbit highlights the next meaningful tracking event."),
  route("/account/returns/[id]", "Return status", "Review return eligibility, shipment and refund status.", "account", "buyer", "Continue return", "ReturnStatus clearly separates user action from processing state."),
  route("/account/reviews", "Reviews", "Write and manage verified-purchase reviews.", "account", "buyer", "Write review", "Reward feedback appears only after a successful review submission."),
  route("/account/messages", "Messages", "Communicate with sellers and support through accessible threads.", "account", "buyer", "Open conversation", "Orbit signals unread and support escalation state."),
  route("/account/rewards", "Rewards", "Review credits, collector progress and eligibility.", "account", "buyer", "Use eligible reward", "LootReveal is reserved for real unlocked rewards."),
  route("/account/following", "Following", "Manage followed shops, creators and collections.", "account", "buyer", "View new releases", "Collector pulse reflects new activity, not decorative motion."),
  route("/account/notifications", "Notifications", "Manage notification preferences and delivery channels.", "account", "buyer", "Save preferences", "Signal list groups severity and action."),
  route("/account/security", "Security", "Manage password, sessions and account protection.", "account", "buyer", "Review sessions", "Lock motion communicates verified security actions."),

  route("/seller", "Seller dashboard", "Review orders, inventory, finance and operational signals.", "seller", "seller", "Resolve priority signal", "SellerSignal prioritizes real operational risk.", "seller:read"),
  route("/seller/onboarding", "Seller onboarding", "Complete business details, policy acceptance and shop setup.", "seller", "seller", "Continue onboarding", "Orbit guides the next incomplete requirement.", "seller:write"),
  route("/seller/verification", "Seller verification", "Submit and review KYC or business verification evidence.", "seller", "seller", "Submit verification", "Lock motion reflects authoritative verification state.", "seller:write"),
  route("/seller/shop", "Shop profile", "Manage storefront identity, policy and brand content.", "seller", "seller", "Publish shop changes", "Preview responds to actual shop configuration.", "seller:write"),
  route("/seller/products", "Products", "Manage the seller catalog using table and mobile-card layouts.", "seller", "seller", "Create product", "Bulk actions appear only after selection.", "seller:read"),
  route("/seller/products/new", "New product", "Create a typed product draft with media, variants and policies.", "seller", "seller", "Save product draft", "Orbit guides validation without acting as decoration.", "seller:write"),
  route("/seller/products/[id]", "Edit product", "Manage product details, variants, media and publication state.", "seller", "seller", "Publish product", "Product readiness score points to concrete missing fields.", "seller:write"),
  route("/seller/inventory", "Inventory", "Review stock, reservations and low-stock signals.", "seller", "seller", "Update inventory", "SellerSignal isolates urgent stock actions.", "seller:write"),
  route("/seller/pricing", "Pricing", "Manage authoritative price inputs, promotions and margin context.", "seller", "seller", "Save pricing", "Price changes show consequences before submission.", "seller:write"),
  route("/seller/shipping", "Shipping", "Manage shipping profiles, regions and delivery promises.", "seller", "seller", "Save shipping profile", "Timeline preview explains shopper-facing delivery impact.", "seller:write"),
  route("/seller/bulk-import", "Bulk import", "Validate product data before applying a batch mutation.", "seller", "seller", "Validate import", "Orbit reports rows requiring action.", "seller:write"),
  route("/seller/orders", "Seller orders", "Review orders by fulfillment and risk state.", "seller", "seller", "Open order", "SignalList prioritizes exceptions before routine orders.", "seller:read"),
  route("/seller/orders/[id]", "Seller order detail", "Review buyer-safe order details and fulfillment actions.", "seller", "seller", "Start fulfillment", "Shipping timeline clarifies responsibility and next action.", "seller:write"),
  route("/seller/fulfillment", "Fulfillment", "Batch process eligible orders with confirmation safeguards.", "seller", "seller", "Create fulfillment batch", "BulkActionBar explains the exact selected scope.", "seller:write"),
  route("/seller/labels", "Shipping labels", "Create and review carrier labels.", "seller", "seller", "Create label", "Lock feedback confirms label creation and prevents duplicates.", "seller:write"),
  route("/seller/returns", "Seller returns", "Review return requests, evidence and required action.", "seller", "seller", "Resolve return", "ReturnStatus communicates deadlines and state.", "seller:write"),
  route("/seller/disputes/[id]", "Dispute", "Review dispute evidence, timeline and allowed response.", "seller", "seller", "Submit response", "Audit timeline preserves decision context.", "seller:write"),
  route("/seller/promotions", "Promotions", "Create eligible promotions with server validation.", "seller", "seller", "Create promotion", "Reward motion previews only valid promotional outcomes.", "seller:write"),
  route("/seller/coupons", "Coupons", "Create coupons with limits, dates and eligibility.", "seller", "seller", "Create coupon", "Validation surfaces explain every constraint.", "seller:write"),
  route("/seller/drops", "Drops", "Manage server-timed drops, limits and reservation policy.", "seller", "seller", "Create drop", "DropReactor previews authoritative settings.", "seller:write"),
  route("/seller/analytics", "Analytics", "Review product, conversion and fulfillment performance.", "seller", "seller", "Inspect performance", "Chart panels expose data definitions and empty states.", "seller:read"),
  route("/seller/finance", "Finance", "Review payouts, fees and reconciliation.", "seller", "seller", "Review payout", "Metric cards link every figure to a source period.", "finance:read"),
  route("/seller/coa", "COA and serials", "Issue and review eligible certificates and serial records.", "seller", "seller", "Issue COA", "COALock communicates validity and issuance outcome.", "seller:write"),
  route("/seller/staff", "Staff", "Manage seller staff and scoped permissions.", "seller", "seller", "Invite staff", "PermissionGate previews exact access.", "seller:write"),
  route("/seller/settings", "Seller settings", "Manage shop operations, policies and integrations.", "seller", "seller", "Save settings", "Orbit highlights configuration requiring attention.", "seller:write"),

  route("/admin", "Admin dashboard", "Review marketplace health, risk and operational priorities.", "admin", "admin", "Open priority queue", "SignalList ranks real severity and ownership.", "admin:read"),
  route("/admin/users", "Users", "Search and manage marketplace users.", "admin", "admin", "Open user", "DataTable and MobileCardList preserve identical actions.", "admin:read"),
  route("/admin/users/[id]", "User detail", "Review user state, sessions, orders and audit events.", "admin", "admin", "Review user actions", "AuditTimeline exposes every administrative change.", "admin:read"),
  route("/admin/sellers", "Sellers", "Review seller applications and operational status.", "admin", "admin", "Open seller", "SellerSignal prioritizes verification and policy risk.", "admin:read"),
  route("/admin/sellers/[id]", "Seller detail", "Review verification, shop, finance and moderation context.", "admin", "admin", "Resolve seller state", "PermissionGate prevents unsupported mutations.", "admin:write"),
  route("/admin/moderation", "Moderation queue", "Review product and community moderation items.", "admin", "admin", "Open moderation case", "ModerationPanel groups evidence and decision options.", "moderation:write"),
  route("/admin/moderation/[id]", "Moderation detail", "Review evidence, policy references and audit history.", "admin", "admin", "Record moderation decision", "Lock motion confirms the final audited decision.", "moderation:write"),
  route("/admin/categories", "Categories", "Manage category hierarchy and storefront exposure.", "admin", "admin", "Update category", "Orbit previews navigation impact.", "admin:write"),
  route("/admin/collections", "Collections", "Manage curated marketplace collections.", "admin", "admin", "Publish collection", "Collection preview shows real included products.", "admin:write"),
  route("/admin/orders", "Admin orders", "Review marketplace orders and exceptions.", "admin", "admin", "Open order", "SignalList prioritizes payment and fulfillment exceptions.", "admin:read"),
  route("/admin/orders/[id]", "Admin order detail", "Review order, payment, shipment, refund and audit state.", "admin", "admin", "Resolve order issue", "AuditTimeline preserves every mutation.", "admin:write"),
  route("/admin/payments", "Payments", "Review provider-authoritative payment status.", "admin", "admin", "Inspect payment", "Payment state never relies on redirect query state.", "finance:read"),
  route("/admin/refunds", "Refunds", "Review refund requests and provider status.", "admin", "admin", "Process eligible refund", "Duplicate submission protection is visible.", "finance:write"),
  route("/admin/disputes", "Disputes", "Review marketplace disputes and deadlines.", "admin", "admin", "Open dispute", "Audit timeline exposes evidence and ownership.", "admin:read"),
  route("/admin/fees", "Fees", "Manage fee configuration with effective dates.", "admin", "admin", "Review fee change", "PriceBlock previews downstream impact.", "finance:write"),
  route("/admin/campaigns", "Campaigns", "Manage ARTYVERSE X campaign surfaces.", "admin", "admin", "Create campaign", "Warp motion is limited to approved immersive surfaces.", "admin:write"),
  route("/admin/cms", "CMS", "Manage editorial and help content.", "admin", "admin", "Publish content", "Preview exposes heading and accessibility structure.", "admin:write"),
  route("/admin/community", "Community operations", "Review community health and moderation signals.", "admin", "admin", "Resolve community signal", "Orbit guides moderators to the next case.", "moderation:write"),
  route("/admin/shipping", "Shipping operations", "Manage carriers, service regions and exceptions.", "admin", "admin", "Update shipping configuration", "Timeline preview explains operational impact.", "admin:write"),
  route("/admin/tax", "Tax", "Manage tax configuration and effective periods.", "admin", "admin", "Review tax configuration", "PriceBlock shows server-calculated impact context.", "finance:write"),
  route("/admin/reports", "Reports", "Generate operational reports with stable definitions.", "admin", "admin", "Run report", "Chart panels expose source and period.", "admin:read"),
  route("/admin/audit", "Audit log", "Review administrative mutations and request identifiers.", "admin", "admin", "Inspect audit event", "AuditTimeline is the primary interaction model.", "admin:read"),
  route("/admin/integrations", "Integrations", "Manage external service connections and health.", "admin", "admin", "Review integration", "SignalList separates degraded, blocked and healthy states.", "admin:write"),
  route("/admin/roles", "Roles and permissions", "Manage role templates and scoped permissions.", "admin", "admin", "Review permission change", "PermissionGate previews exact access before mutation.", "admin:write"),
  route("/admin/settings", "Admin settings", "Manage marketplace-wide configuration.", "admin", "admin", "Save configuration", "Orbit flags settings with release impact.", "admin:write"),
  route("/admin/health", "System health", "Review frontend, API, payment, inventory and integration health.", "admin", "admin", "Inspect degraded service", "SignalList communicates severity without color alone.", "admin:read"),
]

function patternToRegExp(pattern: string) {
  if (pattern === "/") return /^\/$/
  const escaped = pattern
    .split("/")
    .filter(Boolean)
    .map((segment) => (segment.startsWith("[") ? "[^/]+" : segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    .join("/")
  return new RegExp(`^/${escaped}/?$`)
}

export function resolveArtyverseRoute(pathname: string) {
  return artyverseRoutes.find((definition) => patternToRegExp(definition.pattern).test(pathname))
}

export const artyverseRoutePatterns = artyverseRoutes.map((definition) => definition.pattern)
