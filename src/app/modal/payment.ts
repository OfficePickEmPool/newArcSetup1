export class Payment {

    PaymentId: number;
    PaymentDate: Date;
    CardNumber: string;
    Amount: number;
    Message: string;
    TransactionCode: string;
    IsSuccessful: boolean;

    constructor() {
    }
}