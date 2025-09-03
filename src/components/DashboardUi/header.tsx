// import { Menu, Bell, Search, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface HeaderProps {
//   onMenuClick: () => void;
// }

// export const Header = ({ onMenuClick }: HeaderProps) => {
//   return (
//     <header className="bg-surface border-b border-border px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={onMenuClick}
//             className="lg:hidden"
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
          
//           <div className="relative hidden md:block">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <Input
//               placeholder="Search transactions, customers..."
//               className="pl-9 w-80 bg-background"
//             />
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <Button variant="ghost" size="sm" className="relative">
//             <Bell className="w-5 h-5" />
//             <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
//               3
//             </span>
//           </Button>
          
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//                 <Avatar className="h-10 w-10">
//                   <AvatarImage src="/avatars/user.jpg" alt="User" />
//                   <AvatarFallback className="bg-primary text-primary-foreground">
//                     <User className="w-5 h-5" />
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56 bg-popover" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">John Doe</p>
//                   <p className="text-xs leading-none text-muted-foreground">
//                     john@payflow.com
//                   </p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Profile</DropdownMenuItem>
//               <DropdownMenuItem>Billing</DropdownMenuItem>
//               <DropdownMenuItem>Team</DropdownMenuItem>
//               <DropdownMenuItem>Subscription</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Log out</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// };