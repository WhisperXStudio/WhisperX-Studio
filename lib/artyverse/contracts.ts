export type AsyncState = "idle" | "loading" | "success" | "empty" | "error" | "offline"
export type StockState = "available" | "low-stock" | "reserved" | "sold-out"
export type PaymentState = "draft" | "processing" | "pending" | "paid" | "failed" | "refunded"
export type OrderState =
  | "created"
  | "confirmed"
  | "packing"
  | "shipped"
  | "delivered"
  | "return-requested"
  | "returned"
  | "cancelled"

export type Role = "buyer" | "seller" | "admin"
export type Permission =
  | "buyer:read"
  | "buyer:write"
  | "seller:read"
  | "seller:write"
  | "admin:read"
  | "admin:write"
  | "moderation:write"
  | "finance:read"
  | "finance:write"

export interface ApiErrorEnvelope {
  code: string
  message: string
  fieldErrors?: Record<string, string>
  retryable: boolean
  requestId: string
}

export interface Money {
  currency: "THB" | "USD"
  amountMinor: number
}

export interface User {
  id: string
  email: string
  displayName: string
  roles: Role[]
  permissions: Permission[]
}

export interface Session {
  id: string
  userId: string
  expiresAt: string
}

export interface Address {
  id: string
  recipientName: string
  phone: string
  line1: string
  line2?: string
  district: string
  province: string
  postalCode: string
  countryCode: string
}

export interface Seller {
  id: string
  displayName: string
  verification: "unverified" | "pending" | "verified" | "rejected"
  rating: number
  responseRate: number
}

export interface Shop {
  id: string
  sellerId: string
  slug: string
  name: string
  summary: string
}

export interface ProductVariant {
  id: string
  sku: string
  label: string
  attributes: Record<string, string>
  authoritativePrice: Money
  stockState: StockState
  availableQuantity: number
  purchaseLimit: number
}

export interface CommerceProduct {
  id: string
  slug: string
  shopId: string
  name: string
  summary: string
  description: string
  media: Array<{ src: string; alt: string; aspectRatio: `${number}/${number}` }>
  variants: ProductVariant[]
  sellerVerification: Seller["verification"]
  coaEligible: boolean
}

export interface InventoryReservation {
  id: string
  variantId: string
  quantity: number
  expiresAt: string
  idempotencyKey: string
}

export interface CartItem {
  id: string
  productId: string
  variantId: string
  quantity: number
}

export interface Cart {
  id: string
  items: CartItem[]
  version: string
}

export interface CheckoutQuote {
  id: string
  cartVersion: string
  subtotal: Money
  discount: Money
  shipping: Money
  tax: Money
  total: Money
  expiresAt: string
  serverCalculated: true
}

export interface Order {
  id: string
  state: OrderState
  quoteId: string
  paymentState: PaymentState
  total: Money
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  orderId: string
  state: PaymentState
  providerReference?: string
  webhookVerifiedAt?: string
}

export interface Shipment {
  id: string
  orderId: string
  carrier: string
  trackingCode?: string
  status: "pending" | "label-created" | "in-transit" | "delivered" | "exception"
}

export interface ReturnRequest {
  id: string
  orderId: string
  status: "requested" | "approved" | "rejected" | "in-transit" | "received" | "refunded"
  reason: string
}

export interface Refund {
  id: string
  paymentId: string
  amount: Money
  state: "requested" | "processing" | "completed" | "failed"
}

export interface Voucher {
  id: string
  code: string
  state: "active" | "redeemed" | "expired"
}

export interface COARecord {
  serial: string
  productId: string
  ownerId?: string
  valid: boolean
  verifiedAt?: string
}

export interface NotificationRecord {
  id: string
  type: string
  title: string
  body: string
  readAt?: string
}

export interface MessageRecord {
  id: string
  threadId: string
  senderId: string
  body: string
  createdAt: string
}

export interface AuditLog {
  id: string
  actorId: string
  action: string
  resourceType: string
  resourceId: string
  createdAt: string
  requestId: string
  metadata: Record<string, string | number | boolean | null>
}

export interface MutationContext {
  idempotencyKey: string
  requestId: string
  sessionId: string
}

export interface CommerceApi {
  getProduct(slug: string): Promise<CommerceProduct>
  createQuote(cartId: string): Promise<CheckoutQuote>
  reserveStock(input: { variantId: string; quantity: number }, context: MutationContext): Promise<InventoryReservation>
  submitCheckout(input: { quoteId: string; addressId: string; paymentMethodId: string }, context: MutationContext): Promise<Order>
  getPaymentStatus(orderId: string): Promise<Payment>
  getOrder(id: string): Promise<Order>
  verifyCOA(serial: string): Promise<COARecord>
}

export function formatMoney(value: Money, locale = "th-TH") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: value.currency,
    maximumFractionDigits: 2,
  }).format(value.amountMinor / 100)
}
