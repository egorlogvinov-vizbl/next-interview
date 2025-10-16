import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Frontend Developer Interview Tasks
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome! Complete the following tasks to demonstrate your React
            skills.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Task 1: Fix Form</CardTitle>
              <CardDescription>
                Исправьте баги в форме с валидацией
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/task1">
                  <Button className="w-full">Start</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task 2: Fix Table</CardTitle>
              <CardDescription>
                Исправьте проблемы с фильтрацией таблицы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/task2">
                  <Button className="w-full">Start</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task 3: Product 3D Viewer</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/task3">
                  <Button className="w-full">Start</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
