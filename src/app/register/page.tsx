"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stethoscope, User } from "lucide-react";

export default function Home() {
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
        {/* Doctor Card */}
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Stethoscope className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-xl font-semibold">Doctor</CardTitle>
            </div>
            <CardDescription>
              Access your dashboard to manage patients and appointments.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => setRole("doctor")}>
              Login as Doctor
            </Button>
          </CardFooter>
        </Card>

        {/* Patient Card */}
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-green-600" />
              <CardTitle className="text-xl font-semibold">Patient</CardTitle>
            </div>
            <CardDescription>
              Manage your appointments and health records.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" variant="secondary" onClick={() => setRole("patient")}>
              Login as Patient
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Doctor Form */}
      {role === "doctor" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Doctor Login</CardTitle>
              <CardDescription>Enter your professional details to continue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="doctor-email">Email</Label>
                <Input id="doctor-email" type="email" placeholder="doctor@example.com" />
              </div>
              <div>
                <Label htmlFor="doctor-license">License Number</Label>
                <Input id="doctor-license" type="text" placeholder="Your medical license" />
              </div>
              <div>
                <Label htmlFor="doctor-password">Password</Label>
                <Input id="doctor-password" type="password" placeholder="********" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setRole(null)}>Cancel</Button>
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Patient Form */}
      {role === "patient" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Patient Login</CardTitle>
              <CardDescription>Enter your details to access your health records.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="patient-email">Email</Label>
                <Input id="patient-email" type="email" placeholder="patient@example.com" />
              </div>
              <div>
                <Label htmlFor="patient-dob">Date of Birth</Label>
                <Input id="patient-dob" type="date" />
              </div>
              <div>
                <Label htmlFor="patient-password">Password</Label>
                <Input id="patient-password" type="password" placeholder="********" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setRole(null)}>Cancel</Button>
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}