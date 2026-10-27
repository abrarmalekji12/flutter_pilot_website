// Cost and delivery facts for the homepage "What it costs and what you can
// ship" section. Each one comes from FlutterPilot's source; re-check them
// whenever pricing or export targets change:
//   credit packs            flutterpilot-cloudflare config/razorpay_pricing.json (50 credits = 259 US cents)
//   APK and web credits     flutterpilot-pro lib/cubit/credit/credit_use_model.dart
//   build times             flutterpilot-pro lib/models/export/export_target.dart
//   AI cost per screen      flutterpilot-pro lib/ui/credits/credits_usage_dialog.dart
//   free source export      flutterpilot-pro lib/ui/export/project_source_code_export_widget.dart
//   not yet available       DeploymentTarget.androidPlay / ExportTarget.ios (not dispatchable)
// See docs/website-growth/PLATFORM_CAPABILITY_AUDIT.md (B1–B5, S5).

export const PRICING_AS_OF = "October 27, 2026";

export const costAndDelivery = {
  id: "pricing-and-delivery",
  badge: "Pricing & delivery",
  title: "What it costs and what you can ship",
  subtitle:
    "Pay as you go with credits—there is no subscription. Export your Flutter project whenever you want.",
  items: [
    {
      key: "export",
      title: "Flutter source export",
      description:
        "Download the complete Flutter project as a ZIP from the web or desktop Studio. Exporting doesn't use credits.",
    },
    {
      key: "credits",
      title: "Pay-as-you-go credits",
      description:
        "Buy a credit pack only when you need one. On the web, packs start at about US$2.59 for 50 credits; checkout shows your local currency.",
    },
    {
      key: "ai",
      title: "AI generation",
      description: "Generating screens starts at 1 credit per screen. The cost depends on the AI model you choose.",
    },
    {
      key: "android",
      title: "Android APK",
      description:
        "Build an installable APK in the cloud for 3 credits, usually in 5–7 minutes. It's for testing and sharing, not a signed Play Store release.",
    },
    {
      key: "web",
      title: "Live web app",
      description:
        "Publish a hosted Flutter web app to a shareable flutterpilot.com address for 5 credits, usually in 3–4 minutes.",
    },
    {
      key: "notYet",
      title: "Not built in yet",
      description:
        "One-click Google Play and App Store publishing, and iOS builds. For store releases, build the exported Flutter project with your own Flutter tools.",
    },
  ],
  note: `Credit costs as of ${PRICING_AS_OF}. The Studio shows current prices before you buy; app-store purchases use your store's price.`,
};
