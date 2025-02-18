import { TaskProvider } from "@/contexts/UseTask";
import { BoardProvider } from "@/contexts/UseBoard";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <BoardProvider>
          <TaskProvider>
            <body>{children}</body>
          </TaskProvider>
        </BoardProvider>
      </UserProvider>
    </html>
  );
}
