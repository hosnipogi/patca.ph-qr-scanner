import React from "react";

export interface ChildrenProps {
  children: React.ReactNode;
}
export type MethodOfPaymentType = "Sponsored" | "Pay Later" | "Paypal";
export type QrMethodType = "webcam" | "scanner";

export interface IMember {
  city: string;
  company: string;
  country: string;
  designation: string;
  email: string;
  firstname: string;
  fullname: string;
  jobTitle: string;
  lastname: string;
  memberAssoc: string;
  methodOfPayment: MethodOfPaymentType;
  phoneNumber: string;
  whatsApp: string;
  isPaid: boolean;
  receivedSouvenir: boolean;
  id: string;
  isPresentDay1: boolean;
  isPresentDay2: boolean;
  isPresentDay3: boolean;
}

export interface IPatcaGuest {
  d0: string;
  d1: string;
  d2: string;
  d3: string;
  id: string;
  name: string;
  wiresign: string;
}
