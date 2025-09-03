// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

// const chartData = [
//   { name: "Jan", revenue: 4000, transactions: 240 },
//   { name: "Feb", revenue: 3000, transactions: 139 },
//   { name: "Mar", revenue: 2000, transactions: 980 },
//   { name: "Apr", revenue: 2780, transactions: 390 },
//   { name: "May", revenue: 1890, transactions: 480 },
//   { name: "Jun", revenue: 2390, transactions: 380 },
//   { name: "Jul", revenue: 3490, transactions: 430 },
//   { name: "Aug", revenue: 4200, transactions: 520 },
//   { name: "Sep", revenue: 5100, transactions: 610 },
//   { name: "Oct", revenue: 4800, transactions: 580 },
//   { name: "Nov", revenue: 5200, transactions: 620 },
//   { name: "Dec", revenue: 6100, transactions: 720 },
// ];

// export const PaymentChart = () => {
//   return (
//     <Card className="interactive">
//       <CardHeader>
//         <CardTitle>Revenue & Transaction Trends</CardTitle>
//         <CardDescription>
//           Monthly overview of revenue and transaction volume
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart data={chartData}>
//               <defs>
//                 <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0.1}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//               <XAxis 
//                 dataKey="name" 
//                 stroke="hsl(var(--muted-foreground))"
//                 fontSize={12}
//               />
//               <YAxis 
//                 yAxisId="revenue"
//                 orientation="left"
//                 stroke="hsl(var(--muted-foreground))"
//                 fontSize={12}
//               />
//               <YAxis 
//                 yAxisId="transactions"
//                 orientation="right"
//                 stroke="hsl(var(--muted-foreground))"
//                 fontSize={12}
//               />
//               <Area
//                 yAxisId="revenue"
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="hsl(217 91% 60%)"
//                 fillOpacity={1}
//                 fill="url(#revenueGradient)"
//                 strokeWidth={2}
//               />
//               <Line
//                 yAxisId="transactions"
//                 type="monotone"
//                 dataKey="transactions"
//                 stroke="hsl(142 71% 45%)"
//                 strokeWidth={2}
//                 dot={{ fill: "hsl(142 71% 45%)", strokeWidth: 2, r: 4 }}
//                 activeDot={{ r: 6, stroke: "hsl(142 71% 45%)", strokeWidth: 2 }}
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };