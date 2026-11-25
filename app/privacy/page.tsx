import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/document";
import { privacyDocument } from "@/lib/legal-documents";

export const metadata: Metadata = {
  title: "Политика в отношении обработки персональных данных",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <LegalDocument title={privacyDocument.title} blocks={privacyDocument.blocks} />;
}
