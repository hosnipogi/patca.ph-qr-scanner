export const functionUrl = process.env.REACT_APP_API_URL!;

export enum Endpoints {
  SEARCH_USER = "onSearchUser",
  UPDATE_PAYMENT = "onUpdatePaymentStatus",
  UPDATE_SOUVENIR = "onUpdateReceivedSouvenir",
  UPDATE_ATTENDANCE = "onUpdateAttendance",
}
