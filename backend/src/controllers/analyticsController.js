const Order = require('../models/Order');
const Product = require('../models/Product');

// Aggregated analytics
exports.getAnalytics = async (req, res, next) => {
  try {
    // Total revenue from all orders (delivered and shipped and processing)
    const revenueAgg = await Order.aggregate([
      { $match: { status: { $in: ['processing', 'shipped', 'delivered'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' }, totalOrders: { $sum: 1 } } },
    ]);

    const { totalRevenue = 0, totalOrders = 0 } = revenueAgg[0] || {};

    // Sales growth: compare last 30 days to previous 30 days
    const now = new Date();
    const last30Start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const prev30Start = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const last30Agg = await Order.aggregate([
      { $match: { createdAt: { $gte: last30Start } } },
      { $group: { _id: null, revenue: { $sum: '$totalPrice' }, orders: { $sum: 1 } } },
    ]);

    const prev30Agg = await Order.aggregate([
      { $match: { createdAt: { $gte: prev30Start, $lt: last30Start } } },
      { $group: { _id: null, revenue: { $sum: '$totalPrice' }, orders: { $sum: 1 } } },
    ]);

    const lastRevenue = last30Agg[0]?.revenue || 0;
    const prevRevenue = prev30Agg[0]?.revenue || 0;
    let growth = 0;
    if (prevRevenue === 0) growth = lastRevenue === 0 ? 0 : 100;
    else growth = ((lastRevenue - prevRevenue) / prevRevenue) * 100;

    // Low stock count
    const lowStockCount = await Product.countDocuments({ $expr: { $lt: ['$stock', '$minStock'] } });

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        salesGrowthPercent: Number(growth.toFixed(2)),
        lowStockCount,
        last30Revenue: lastRevenue,
        prev30Revenue: prevRevenue,
      },
    });
  } catch (err) {
    next(err);
  }
};
