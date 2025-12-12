export type OpportunityType = "full-time" | "internship" | "contract" | "open";

export type OpportunityOption = {
  id: OpportunityType;
  label: string;
};

export type QuickFact = {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type ContactFormState = {
  name: string;
  email: string;
  company: string;
  roleTitle: string;
  contactLink: string;
  message: string;
};

export type ContactFormErrors = {
  name?: string;
  email?: string;
  message?: string;
};
