export interface DashboardSummaryResponse {
  numberOfClients: number;
  numberOfProducts: number;
  lowInventory: number;
  productsWithNoInventory: number;
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
}
