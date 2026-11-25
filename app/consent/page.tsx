import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/document";
import { consentDocument } from "@/lib/legal-documents";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  robots: { index: false, follow: false },
};

export default function ConsentPage() {
  return <LegalDocument title={consentDocument.title} blocks={consentDocument.blocks} />;
}
