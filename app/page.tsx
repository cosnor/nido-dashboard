"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { HomeSection } from "@/components/sections/home-section"
import { MotivationSection } from "@/components/sections/motivation-section"
import { AnalysisSection } from "@/components/sections/analysis-section"
import { InteractionSection } from "@/components/sections/interaction-section"
import { PipelineSection } from "@/components/sections/pipeline-section"
import { LightGBMSection } from "@/components/sections/lightgbm-section"
import { RetrainingSection } from "@/components/sections/retraining-section"
import { ApplicationsSection } from "@/components/sections/applications-section"
import { ComparisonSection } from "@/components/sections/comparison-section"

export default function NidoDashboard() {
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />
      case "motivation":
        return <MotivationSection />
      case "analysis":
        return <AnalysisSection />
      case "interaction":
        return <InteractionSection />
      case "pipeline":
        return <PipelineSection />
 //     case "lightgbm":
   //     return <LightGBMSection />
      case "retraining":
        return <RetrainingSection />
      case "applications":
        return <ApplicationsSection />
      case "comparison":
        return <ComparisonSection />
      default:
        return <HomeSection />
    }
  }

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </DashboardLayout>
  )
}
