import { Payment } from "./payment";

export class Subscribe {
    SubscriptionId: number;
    StartDate: Date;
    EndDate: Date;
    IsSuccessful: boolean;
    SubscriptionName: string;
    Payment: Payment;

    constructor() {
    }
}