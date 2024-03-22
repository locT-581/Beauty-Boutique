import catchAsync from "../middlewares/catchAsync.js";

export const addBill = catchAsync(async (req, res, next) => {
  //   const { products, total, customer } = req.body;
  //   const db = getFirestore();
  //   const billCollection = db.collection("bills");
  //   const billRef = await addDoc(billCollection, {
  //     products,
  //     total,
  //     customer,
  //     status: "Đang chờ",
  //     timestamp: serverTimestamp(),
  //   });
  //   res.status(201).json({
  //     success: true,
  //     bill: { id: billRef.id, products, total, customer, status: "Đang chờ" },
  //   });
});
