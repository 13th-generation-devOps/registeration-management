"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Zap, Users, Trophy, Heart, MapPin, Clock } from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  experienceLevel: string
  runningGoals: string
  preferredDays: string[]
  emergencyContact: string
  emergencyPhone: string
  medicalConditions: string
  shirtSize: string
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  age: "",
  experienceLevel: "",
  runningGoals: "",
  preferredDays: [],
  emergencyContact: "",
  emergencyPhone: "",
  medicalConditions: "",
  shirtSize: "",
}

const runningDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const experienceLevels = [
  { value: "beginner", label: "Beginner", description: "New to running or getting back into it" },
  { value: "intermediate", label: "Intermediate", description: "Can run 3-5 miles comfortably" },
  { value: "advanced", label: "Advanced", description: "Experienced runner, 5+ miles regularly" },
  { value: "competitive", label: "Competitive", description: "Race regularly, training focused" },
]

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter((d) => d !== day)
        : [...prev.preferredDays, day],
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.age.trim()) newErrors.age = "Age is required"
    if (!formData.experienceLevel) newErrors.experienceLevel = "Experience level is required"
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact is required"
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency phone is required"
    if (!formData.shirtSize) newErrors.shirtSize = "Shirt size is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Welcome to the Run Club! 🏃‍♂️",
      description: "Your registration has been submitted successfully. Check your email for next steps!",
    })

    setFormData(initialFormData)
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          <Zap className="w-4 h-4" />
          Join Our Community
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-balance">
          Join the <span className="text-primary">Run Club!</span>
        </h1>
        <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
          Unleash Your Potential - All Levels Welcome! Connect with fellow runners, achieve your goals, and discover the
          joy of running together.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">15+</div>
            <div className="text-sm text-muted-foreground">Running Routes</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">50+</div>
            <div className="text-sm text-muted-foreground">Events Per Year</div>
          </CardContent>
        </Card>
      </div>

      {/* Registration Form */}
      <Card className="shadow-xl">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl">Start Your Running Journey!</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Fill out the form below to become part of our amazing running community.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">What's your first name? *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">And your last name? *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="13"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="25"
                    className={errors.age ? "border-destructive" : ""}
                  />
                  {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shirtSize">T-shirt size *</Label>
                  <Select value={formData.shirtSize} onValueChange={(value) => handleInputChange("shirtSize", value)}>
                    <SelectTrigger className={errors.shirtSize ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.shirtSize && <p className="text-sm text-destructive">{errors.shirtSize}</p>}
                </div>
              </div>
            </div>

            {/* Running Experience */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Running Experience
              </h3>
              <div className="space-y-2">
                <Label>What's your running experience level? *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {experienceLevels.map((level) => (
                    <Card
                      key={level.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.experienceLevel === level.value
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleInputChange("experienceLevel", level.value)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              formData.experienceLevel === level.value
                                ? "bg-primary border-primary"
                                : "border-muted-foreground"
                            }`}
                          />
                          <div>
                            <div className="font-medium">{level.label}</div>
                            <div className="text-sm text-muted-foreground">{level.description}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {errors.experienceLevel && <p className="text-sm text-destructive">{errors.experienceLevel}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="runningGoals">What are your running goals?</Label>
                <Textarea
                  id="runningGoals"
                  value={formData.runningGoals}
                  onChange={(e) => handleInputChange("runningGoals", e.target.value)}
                  placeholder="Tell us about your running aspirations, whether it's completing your first 5K, improving your marathon time, or just staying healthy!"
                  rows={3}
                />
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                When can you run with us?
              </h3>
              <div className="space-y-2">
                <Label>Select your preferred running days:</Label>
                <div className="flex flex-wrap gap-2">
                  {runningDays.map((day) => (
                    <Badge
                      key={day}
                      variant={formData.preferredDays.includes(day) ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2 text-sm"
                      onClick={() => handleDayToggle(day)}
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Don't worry, you can always change this later!</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency contact name *</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    placeholder="Full name"
                    className={errors.emergencyContact ? "border-destructive" : ""}
                  />
                  {errors.emergencyContact && <p className="text-sm text-destructive">{errors.emergencyContact}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency contact phone *</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className={errors.emergencyPhone ? "border-destructive" : ""}
                  />
                  {errors.emergencyPhone && <p className="text-sm text-destructive">{errors.emergencyPhone}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Any medical conditions we should know about?</Label>
                <Textarea
                  id="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                  placeholder="Please list any medical conditions, allergies, or medications that might affect your running (optional)"
                  rows={2}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Start Your Running Journey!
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Motivational Quote */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <blockquote className="text-2xl font-semibold text-balance mb-4">"Every mile is a victory!"</blockquote>
          <p className="text-muted-foreground">
            Join hundreds of runners who have transformed their lives through our supportive community.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
