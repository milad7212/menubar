"use client"

import { useState } from "react"
import { Clock, CheckCircle, Eye, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Order {
  id: string
  customerName: string
  customerPhone: string
  items: Array<{
    id: number
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
  orderTime: string
  estimatedTime?: string
  notes?: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "علی احمدی",
    customerPhone: "09123456789",
    items: [
      { id: 1, name: "اسپرسو کلاسیک", quantity: 2, price: 45000 },
      { id: 4, name: "ساندویچ کلاب", quantity: 1, price: 120000 },
    ],
    total: 210000,
    status: "pending",
    orderTime: "۱۴:۳۰",
    notes: "بدون شکر",
  },
  {
    id: "ORD-002",
    customerName: "مریم کریمی",
    customerPhone: "09187654321",
    items: [
      { id: 2, name: "کاپوچینو دلوکس", quantity: 1, price: 65000 },
      { id: 5, name: "تیرامیسو", quantity: 1, price: 85000 },
    ],
    total: 150000,
    status: "preparing",
    orderTime: "۱۴:۲۵",
    estimatedTime: "۱۵ دقیقه",
  },
  {
    id: "ORD-003",
    customerName: "حسن رضایی",
    customerPhone: "09112345678",
    items: [{ id: 3, name: "آیس کافه ویژه", quantity: 3, price: 55000 }],
    total: 165000,
    status: "ready",
    orderTime: "۱۴:۲۰",
  },
]

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "preparing":
        return "bg-blue-500"
      case "ready":
        return "bg-green-500"
      case "delivered":
        return "bg-gray-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "در انتظار"
      case "preparing":
        return "در حال آماده‌سازی"
      case "ready":
        return "آماده تحویل"
      case "delivered":
        return "تحویل داده شده"
      case "cancelled":
        return "لغو شده"
      default:
        return "نامشخص"
    }
  }

  const getOrdersByStatus = (status: Order["status"]) => {
    return orders.filter((order) => order.status === status)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">مدیریت سفارشات</h2>
        <div className="flex gap-2">
          <Badge variant="secondary">کل سفارشات: {orders.length}</Badge>
          <Badge className="bg-yellow-500">در انتظار: {getOrdersByStatus("pending").length}</Badge>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">همه ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending">در انتظار ({getOrdersByStatus("pending").length})</TabsTrigger>
          <TabsTrigger value="preparing">در حال آماده‌سازی ({getOrdersByStatus("preparing").length})</TabsTrigger>
          <TabsTrigger value="ready">آماده ({getOrdersByStatus("ready").length})</TabsTrigger>
          <TabsTrigger value="delivered">تحویل شده ({getOrdersByStatus("delivered").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={updateOrderStatus}
              onViewDetails={setSelectedOrder}
            />
          ))}
        </TabsContent>

        {(["pending", "preparing", "ready", "delivered"] as const).map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {getOrdersByStatus(status).map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={updateOrderStatus}
                onViewDetails={setSelectedOrder}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>جزئیات سفارش {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  <Badge className={getStatusColor(selectedOrder.status)}>{getStatusText(selectedOrder.status)}</Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">مشتری:</span>
                    <p>{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <span className="font-medium">زمان سفارش:</span>
                    <p>{selectedOrder.orderTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>{selectedOrder.customerPhone}</span>
                </div>

                <div>
                  <h4 className="font-medium mb-2">آیتم‌های سفارش:</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-600 mr-2">×{item.quantity}</span>
                        </div>
                        <span className="font-bold">{(item.price * item.quantity).toLocaleString("fa-IR")} تومان</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <h4 className="font-medium mb-1">یادداشت:</h4>
                    <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">{selectedOrder.notes}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>مجموع:</span>
                    <span className="text-green-600">{selectedOrder.total.toLocaleString("fa-IR")} تومان</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => updateOrderStatus(selectedOrder.id, value as Order["status"])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">در انتظار</SelectItem>
                      <SelectItem value="preparing">در حال آماده‌سازی</SelectItem>
                      <SelectItem value="ready">آماده تحویل</SelectItem>
                      <SelectItem value="delivered">تحویل داده شده</SelectItem>
                      <SelectItem value="cancelled">لغو شده</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function OrderCard({
  order,
  onStatusChange,
  onViewDetails,
}: {
  order: Order
  onStatusChange: (orderId: string, status: Order["status"]) => void
  onViewDetails: (order: Order) => void
}) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "preparing":
        return "bg-blue-500"
      case "ready":
        return "bg-green-500"
      case "delivered":
        return "bg-gray-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "در انتظار"
      case "preparing":
        return "در حال آماده‌سازی"
      case "ready":
        return "آماده تحویل"
      case "delivered":
        return "تحویل داده شده"
      case "cancelled":
        return "لغو شده"
      default:
        return "نامشخص"
    }
  }

  return (
    <Card className="text-right">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <CardDescription>{order.customerName}</CardDescription>
          </div>
          <div className="text-left">
            <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
            <p className="text-sm text-gray-600 mt-1">{order.orderTime}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm">
            <span className="font-medium">آیتم‌ها: </span>
            {order.items.map((item, index) => (
              <span key={index}>
                {item.name} ×{item.quantity}
                {index < order.items.length - 1 ? "، " : ""}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-green-600">{order.total.toLocaleString("fa-IR")} تومان</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
                <Eye className="h-4 w-4 ml-1" />
                جزئیات
              </Button>

              {order.status === "pending" && (
                <Button
                  size="sm"
                  onClick={() => onStatusChange(order.id, "preparing")}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Clock className="h-4 w-4 ml-1" />
                  شروع آماده‌سازی
                </Button>
              )}

              {order.status === "preparing" && (
                <Button
                  size="sm"
                  onClick={() => onStatusChange(order.id, "ready")}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="h-4 w-4 ml-1" />
                  آماده شد
                </Button>
              )}

              {order.status === "ready" && (
                <Button
                  size="sm"
                  onClick={() => onStatusChange(order.id, "delivered")}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  تحویل داده شد
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
